/* ==========================================================================
   terminal.js — Terminal interactif du hero
   --------------------------------------------------------------------------
   - Une petite démo se joue seule au chargement.
   - Dès que le visiteur clique dans le champ, la démo s'arrête et il peut
     taper de vraies commandes (tapez « help »).
   - Les réponses sont générées depuis data.js : rien à dupliquer.
   ========================================================================== */

(function () {
  'use strict';
  const { $, h, D, sleep, reducedMotion } = window.PF;

  const body  = $('#term-body');
  const form  = $('#term-form');
  const input = $('#term-input');
  const promptLabel = $('#term-prompt');
  const user = D.profile.handle;

  promptLabel.textContent = `${user}@portfolio:~$`;
  $('#term-title').textContent = `${user} — zsh`;

  /* ---------- Sortie ---------- */
  function line(...parts) {
    const row = h('div', { class: 'ln' }, parts);
    body.append(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }
  const k = (t) => h('span', { class: 'k', text: t });
  const v = (t) => h('span', { class: 'v', text: t });
  const dim = (t) => h('span', { class: 'dim', text: t });
  const ok = (t) => h('span', { class: 'ok', text: t });
  const echo = (cmd) => line(h('span', { class: 'ok', text: `${user}@portfolio:~$ ` }), h('span', { class: 'cmd', text: cmd }));

  /* ---------- Commandes ---------- */
  const commands = {
    help() {
      line(dim('Commandes disponibles :'));
      [
        ['whoami', 'qui suis-je ?'],
        ['skills', 'mes compétences clés'],
        ['projects', 'liste des projets'],
        ['experience', 'parcours professionnel'],
        ['contact', 'me joindre'],
        ['goto <section>', 'naviguer (about, skills, projects…)'],
        ['clear', 'vider le terminal']
      ].forEach(([c, d]) => line(k(c.padEnd(16)), dim(d)));
    },
    whoami() {
      line(v(D.profile.name), dim(' — '), v(D.profile.role));
      line(dim('localisation  '), v(D.profile.location));
      line(dim('statut        '), ok(D.profile.availability));
    },
    skills() {
      // Pas de padEnd : les lignes longues passent à la ligne proprement dans un terminal étroit
      D.skills.forEach((g) => line(k(g.group + ' › '), v(g.items.map((i) => i.name.split(' (')[0]).join(', '))));
    },
    projects() {
      D.projects.forEach((p) => line(ok('▸ '), v(p.title.padEnd(32)), dim(`${p.category} · ${p.year}`)));
      line(dim('→ détails : '), k('goto projects'));
    },
    experience() {
      D.experience.forEach((x) => line(k(x.period.padEnd(16)), v(x.title), dim(` @ ${x.org}`)));
    },
    contact() {
      line(dim('mail      '), h('a', { href: 'mailto:' + D.profile.email, text: D.profile.email }));
      if (D.profile.links.github) line(dim('github    '), h('a', { href: D.profile.links.github, target: '_blank', rel: 'noopener', text: D.profile.links.github }));
      if (D.profile.links.linkedin) line(dim('linkedin  '), h('a', { href: D.profile.links.linkedin, target: '_blank', rel: 'noopener', text: D.profile.links.linkedin }));
    },
    goto(arg) {
      const target = document.getElementById((arg || '').trim());
      if (!target) return line(dim('section inconnue. Essayez : about, skills, projects, archive, experience, education, contact'));
      line(ok('→ '), v('#' + target.id));
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    clear() { body.replaceChildren(); },
    sudo() { line(dim('Nice try. Cet incident sera… ignoré. 😉')); },
    ls() { line(v('about/  skills/  projects/  archive/  experience/  contact/')); }
  };

  function run(raw) {
    const [name, ...rest] = raw.trim().split(/\s+/);
    if (!name) return;
    echo(raw);
    const fn = commands[name.toLowerCase()];
    if (fn) fn(rest.join(' '));
    else line(dim(`commande introuvable : ${name} — tapez `), k('help'));
  }

  /* ---------- Saisie utilisateur + historique (↑ ↓) ---------- */
  const history = [];
  let cursor = 0;
  let userTookOver = false;

  input.addEventListener('focus', () => { userTookOver = true; });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    if (val.trim()) { history.push(val); cursor = history.length; }
    input.value = '';
    run(val);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && history.length) { cursor = Math.max(0, cursor - 1); input.value = history[cursor]; e.preventDefault(); }
    if (e.key === 'ArrowDown') { cursor = Math.min(history.length, cursor + 1); input.value = history[cursor] || ''; e.preventDefault(); }
  });

  /* ---------- Démo automatique ---------- */
  async function typeCommand(cmd) {
    const row = line(h('span', { class: 'ok', text: `${user}@portfolio:~$ ` }));
    const out = h('span', { class: 'cmd' });
    row.append(out);
    for (const ch of cmd) {
      if (userTookOver) return false;
      out.textContent += ch;
      await sleep(reducedMotion ? 0 : 55);
    }
    await sleep(reducedMotion ? 0 : 250);
    return true;
  }

  async function demo() {
    for (const cmd of ['whoami', 'skills']) {
      if (userTookOver) return;
      if (!(await typeCommand(cmd))) return;
      commands[cmd]();
      await sleep(reducedMotion ? 0 : 900);
    }
    if (!userTookOver) line(dim('Tapez '), k('help'), dim(' pour explorer.'));
  }

  // Exposé pour boot.js : lancer la démo une fois le « boot » terminé
  window.PF.startTerminalDemo = demo;
})();
