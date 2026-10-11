/* ==========================================================================
   render.js — Construit la page à partir de data.js
   --------------------------------------------------------------------------
   Une fonction par section. Chacune lit PF.D (le contenu) et remplit un
   conteneur du HTML. Pas de logique d'interaction ici (voir ui.js).
   ========================================================================== */

(function () {
  'use strict';
  const { $, $$, h, get, icon, D } = window.PF;

  /* ----- Liaisons simples : data-bind="profile.name" / data-href="..." ----- */
  function bind() {
    $$('[data-bind]').forEach((el) => { el.textContent = get(D, el.dataset.bind) ?? ''; });
    $$('[data-href]').forEach((el) => {
      const value = get(D, el.dataset.href);
      if (!value) { el.hidden = true; return; }          // lien vide → masqué
      el.href = el.dataset.href.endsWith('email') ? 'mailto:' + value : value;
      el.hidden = false;
    });
    $('#year').textContent = new Date().getFullYear();
  }

  /* ----- Hero ----- */
  function hero() {
    $('#hero-lead').textContent = D.about.paragraphs[0];
    const stats = $('#stats');
    D.profile.stats.forEach((s) => {
      stats.append(h('div', null,
        h('dt', { text: s.label }),
        // data-count : animé par ui.js
        h('dd', { 'data-count': s.value, 'data-suffix': s.suffix, text: s.value + s.suffix })
      ));
    });
  }

  /* ----- À propos ----- */
  function about() {
    const box = $('#about-text');
    D.about.paragraphs.forEach((p) => box.append(h('p', { text: p })));
    const facts = $('#facts');
    D.about.facts.forEach((f) => facts.append(h('div', null, h('dt', { text: f.k }), h('dd', { text: f.v }))));
  }

  /* ----- Compétences : 5 segments, `level` allumés ----- */
  function skills() {
    const grid = $('#skills-grid');
    D.skills.forEach((group, gi) => {
      const card = h('article', { class: 'skill-card reveal', style: `--d:${gi * 0.08}s` }, h('h3', { text: group.group }));
      group.items.forEach((it) => {
        const bar = h('div', { class: 'skill__bar', role: 'img', 'aria-label': `Niveau ${it.level} sur 5` });
        for (let i = 0; i < 5; i++) bar.append(h('i', { class: i < it.level ? 'on' : '', style: `--i:${i}` }));
        card.append(h('div', { class: 'skill' },
          h('div', { class: 'skill__row' }, h('span', { text: it.name }), h('span', { class: 'skill__lvl', text: `${it.level}/5` })),
          bar
        ));
      });
      grid.append(card);
    });
    const box = $('#toolbox');
    D.toolbox.forEach((t) => box.append(h('li', { class: 'chip', text: t })));
  }

  /* ----- Projets + filtres par catégorie ----- */
  function projects() {
    const grid = $('#projects-grid');
    const cats = ['Tous', ...new Set(D.projects.map((p) => p.category))];

    const cards = D.projects.map((p, i) => {
      const tag = p.link ? 'a' : 'article';
      const card = h(tag, {
        class: 'project reveal' + (p.featured ? ' project--featured' : ''),
        'data-cat': p.category,
        style: `--d:${(i % 2) * 0.08}s`,
        href: p.link || null, target: p.link ? '_blank' : null, rel: p.link ? 'noopener' : null
      },
        h('div', { class: 'project__meta' }, h('span', { class: 'project__cat', text: p.category }), h('span', { text: p.year })),
        h('h3', { text: p.title }),
        h('p', { text: p.summary }),
        h('ul', { class: 'project__stack' }, p.stack.map((s) => h('li', { class: 'chip chip--sm', text: s })))
      );
      if (p.link) card.append(h('span', { class: 'project__go' }, icon('arrow')));
      grid.append(card);
      return card;
    });

    const bar = $('#project-filters');
    cats.forEach((c, i) => {
      bar.append(h('button', {
        class: 'filter', type: 'button', 'aria-pressed': i === 0 ? 'true' : 'false', text: c,
        onclick(e) {
          $$('.filter', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
          cards.forEach((card) => card.classList.toggle('project--hidden', c !== 'Tous' && card.dataset.cat !== c));
        }
      }));
    });
  }

  /* ----- Archive filtrable (style Exploit-DB) ----- */
  function archive() {
    const body = $('#archive-body');
    const count = $('#archive-count');
    const input = $('#archive-search');
    const rows = [...D.archive].sort((a, b) => b.date.localeCompare(a.date));

    function draw() {
      const q = input.value.trim().toLowerCase();
      body.replaceChildren();
      const shown = rows.filter((r) => !q || [r.title, r.type, ...r.tags].join(' ').toLowerCase().includes(q));
      shown.forEach((r) => {
        const title = r.url ? h('a', { href: r.url, target: '_blank', rel: 'noopener', text: r.title }) : r.title;
        body.append(h('tr', null,
          h('td', { class: 'date', text: r.date }),
          h('td', { class: 'title' }, title),
          h('td', null, h('span', { class: 'badge badge--' + r.type.toLowerCase().replace(/\s+/g, '-'), text: r.type })),
          h('td', null, h('div', { class: 'tags' }, r.tags.map((t) => h('span', { class: 'chip chip--sm', text: t }))))
        ));
      });
      if (!shown.length) body.append(h('tr', null, h('td', { colspan: 4, class: 'empty', text: 'Aucun résultat.' })));
      count.textContent = `${shown.length} / ${rows.length} entrées`;
    }
    input.addEventListener('input', draw);
    draw();
  }

  /* ----- Expérience & formation (même gabarit « timeline ») ----- */
  function experience() {
    const list = $('#xp-list');
    D.experience.forEach((x, i) => {
      list.append(h('li', { class: 'tl reveal', style: `--d:${i * 0.08}s` },
        h('span', { class: 'tl__period', text: x.period }),
        h('h3', { text: x.title }),
        h('p', { class: 'tl__org', text: `${x.org} · ${x.place}` }),
        h('ul', null, x.points.map((p) => h('li', { text: p }))),
        h('div', { class: 'tags' }, x.tags.map((t) => h('span', { class: 'chip chip--sm', text: t })))
      ));
    });
  }

  function education() {
    const list = $('#edu-list');
    D.education.forEach((e, i) => {
      list.append(h('li', { class: 'tl reveal', style: `--d:${i * 0.08}s` },
        h('span', { class: 'tl__period', text: e.period }),
        h('h3', { text: e.title }),
        h('p', { class: 'tl__org', text: e.org }),
        h('p', { class: 'tl__detail', text: e.detail })
      ));
    });
    const box = $('#cert-list');
    D.certifications.forEach((c) => {
      const done = /obtenu/i.test(c.status);
      box.append(h('div', { class: 'cert' },
        h('span', { class: 'cert__icon', text: c.issuer.slice(0, 2).toUpperCase() }),
        h('div', null, h('div', { class: 'cert__name', text: c.name }), h('div', { class: 'cert__meta', text: `${c.issuer} · ${c.year}` })),
        h('span', { class: 'cert__status' + (done ? '' : ' cert__status--pending'), text: c.status })
      ));
    });
  }

  bind(); hero(); about(); skills(); projects(); archive(); experience(); education();
})();
