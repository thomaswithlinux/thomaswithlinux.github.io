/* ==========================================================================
   ui.js — Interactions de l'interface
   --------------------------------------------------------------------------
   Sommaire :
     1. Texte qui s'écrit (hero)
     2. Apparition au scroll + compteurs
     3. Navigation : scrollspy, barre de progression, menu mobile
     4. Effets de souris (halo, spotlight des cartes)
     5. Palette de commandes (Ctrl/⌘ + K)
     6. Contact : copie de l'e-mail + formulaire mailto
   ========================================================================== */

(function () {
  'use strict';
  const { $, $$, D, reducedMotion, finePointer, sleep } = window.PF;

  /* ------------------------------------------------------------------ *
   * 1. Texte qui s'écrit — boucle sur D.profile.roles
   * ------------------------------------------------------------------ */
  async function typedRoles() {
    const el = $('#typed');
    const roles = D.profile.roles;
    if (reducedMotion) { el.textContent = roles[0]; return; }
    let i = 0;
    for (;;) {
      const text = roles[i % roles.length];
      for (let c = 1; c <= text.length; c++) { el.textContent = text.slice(0, c); await sleep(48); }
      await sleep(1700);
      for (let c = text.length; c >= 0; c--) { el.textContent = text.slice(0, c); await sleep(22); }
      await sleep(260);
      i++;
    }
  }

  /* ------------------------------------------------------------------ *
   * 2. Apparition au scroll (IntersectionObserver) + compteurs animés
   * ------------------------------------------------------------------ */
  function animateCount(el) {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reducedMotion) return;
    const t0 = performance.now(), dur = 1400;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);              // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function reveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((n) => n.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(animateCount);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------------ *
   * 3. Navigation
   * ------------------------------------------------------------------ */
  function scrollSpy() {
    const links = new Map($$('[data-spy]').map((a) => [a.dataset.spy, a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        const a = links.get(e.target.id);
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });   // bande de détection au milieu de l'écran
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  function progressBar() {
    const bar = $('#progress-bar');
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function mobileMenu() {
    const btn = $('#menu-btn');
    const set = (open) => {
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => set(!document.body.classList.contains('nav-open')));
    $('#scrim').addEventListener('click', () => set(false));
    $$('#sidebar a').forEach((a) => a.addEventListener('click', () => set(false)));
  }

  /* ------------------------------------------------------------------ *
   * 4. Effets de souris (uniquement avec un pointeur précis)
   * ------------------------------------------------------------------ */
  function pointerEffects() {
    if (!finePointer || reducedMotion) return;
    const root = document.documentElement;
    window.addEventListener('mousemove', (e) => {
      root.style.setProperty('--mx', e.clientX + 'px');
      root.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
    // Halo local sur chaque carte projet
    $$('.project').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--px', e.clientX - r.left + 'px');
        card.style.setProperty('--py', e.clientY - r.top + 'px');
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. Palette de commandes
   * ------------------------------------------------------------------ */
  function palette() {
    const dlg = $('#palette'), input = $('#palette-input'), list = $('#palette-list');

    const go = (id) => () => document.getElementById(id).scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    const open = (url) => () => window.open(url, '_blank', 'noopener');
    const entries = [
      { label: 'Accueil', hint: 'section', run: go('hero') },
      { label: 'À propos', hint: 'section', run: go('about') },
      { label: 'Compétences', hint: 'section', run: go('skills') },
      { label: 'Projets', hint: 'section', run: go('projects') },
      { label: 'Dépôts GitHub', hint: 'section', run: go('archive') },
      { label: 'Expérience', hint: 'section', run: go('experience') },
      { label: 'Formation & certifications', hint: 'section', run: go('education') },
      { label: 'Contact', hint: 'section', run: go('contact') },
      { label: "Copier l'adresse e-mail", hint: 'action', run: () => copyMail() }
    ];
    if (D.profile.links.github) entries.push({ label: 'Ouvrir GitHub', hint: 'lien', run: open(D.profile.links.github) });
    if (D.profile.links.linkedin) entries.push({ label: 'Ouvrir LinkedIn', hint: 'lien', run: open(D.profile.links.linkedin) });
    D.projects.forEach((p) => entries.push({ label: p.title, hint: 'projet', run: go('projects') }));

    let shown = [], sel = 0;

    function render() {
      const q = input.value.trim().toLowerCase();
      shown = entries.filter((e) => e.label.toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.replaceChildren(...shown.map((e, i) => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', String(i === sel));
        li.append(e.label);
        const s = document.createElement('small'); s.textContent = e.hint; li.append(s);
        li.addEventListener('mousemove', () => { sel = i; mark(); });
        li.addEventListener('click', () => choose(i));
        return li;
      }));
      if (!shown.length) { const li = document.createElement('li'); li.textContent = 'Aucun résultat'; list.append(li); }
    }
    const mark = () => $$('li', list).forEach((li, i) => li.setAttribute('aria-selected', String(i === sel)));
    function choose(i) { const e = shown[i]; if (!e) return; close(); e.run(); }
    function openPalette() { dlg.hidden = false; input.value = ''; sel = 0; render(); input.focus(); }
    function close() { dlg.hidden = true; }

    input.addEventListener('input', () => { sel = 0; render(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { sel = (sel + 1) % Math.max(1, shown.length); mark(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = (sel - 1 + shown.length) % Math.max(1, shown.length); mark(); e.preventDefault(); }
      else if (e.key === 'Enter') { choose(sel); }
    });
    dlg.addEventListener('mousedown', (e) => { if (e.target === dlg) close(); });
    $('#search-btn').addEventListener('click', openPalette);
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.hidden ? openPalette() : close(); }
      else if (e.key === 'Escape' && !dlg.hidden) close();
    });
  }

  /* ------------------------------------------------------------------ *
   * 6. Contact
   * ------------------------------------------------------------------ */
  function copyMail() {
    const state = $('#copy-state');
    const done = (txt) => { state.textContent = txt; setTimeout(() => (state.textContent = 'Copier'), 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(D.profile.email).then(() => done('Copié ✓'), () => done('Échec'));
    else done('Non supporté');
  }

  function contact() {
    $('#copy-mail').addEventListener('click', copyMail);
    // Pas de serveur : on prépare un mailto avec les champs saisis
    $('#contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const subject = encodeURIComponent(`Contact portfolio — ${f.get('name')}`);
      const text = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
      window.location.href = `mailto:${D.profile.email}?subject=${subject}&body=${text}`;
    });
  }

  /* ------------------------------------------------------------------ */
  reveal(); scrollSpy(); progressBar(); mobileMenu(); pointerEffects(); palette(); contact();
  typedRoles();
})();
