/* ==========================================================================
   boot.js — Séquence de démarrage (écran d'intro)
   --------------------------------------------------------------------------
   Jouée une seule fois par session (sessionStorage). Un clic ou une touche
   la passe. Ensuite, la démo du terminal démarre.
   ========================================================================== */

(function () {
  'use strict';
  const { $, h, D, session, sleep, reducedMotion } = window.PF;

  const root = $('#boot');
  const log = $('#boot-log');

  const LINES = [
    ['[  OK  ]', 'ok', 'Initialisation du portfolio'],
    ['[  OK  ]', 'ok', 'Chargement des modules : réseau, sécurité, systèmes'],
    ['[  OK  ]', 'ok', 'Segmentation des VLAN'],
    ['[  OK  ]', 'ok', 'Pare-feu actif — politique : deny all'],
    ['[ INFO ]', 'hl', `Session ouverte : ${D.profile.name}`]
  ];

  let skipped = false;

  function finish() {
    if (root.classList.contains('done')) return;
    root.classList.add('done');
    session.set('pf-booted', '1');
    setTimeout(() => root.remove(), 700);
    window.PF.startTerminalDemo();
  }

  async function play() {
    for (const [tag, cls, text] of LINES) {
      if (skipped) return;
      log.append(h('span', { class: cls, text: tag }), ' ' + text + '\n');
      await sleep(240);
    }
    await sleep(450);
    finish();
  }

  // Déjà vu pendant cette session, ou animations réduites → on passe directement
  if (session.get('pf-booted') || reducedMotion) {
    root.remove();
    window.PF.startTerminalDemo();
  } else {
    const skip = () => { skipped = true; finish(); };
    root.addEventListener('click', skip);
    window.addEventListener('keydown', skip, { once: true });
    play();
  }
})();
