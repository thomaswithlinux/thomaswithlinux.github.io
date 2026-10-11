/* ==========================================================================
   background.js — Réseau de nœuds animé (canvas)
   --------------------------------------------------------------------------
   Des « machines » flottent et se relient quand elles sont proches ; le
   curseur attire légèrement les nœuds. Clin d'œil au thème réseau/sécurité.

   Performance :
   - densité adaptée à la surface de l'écran (plafonnée)
   - pause quand l'onglet est caché
   - rendu statique si l'utilisateur préfère réduire les animations
   ========================================================================== */

(function () {
  'use strict';
  const { $, reducedMotion } = window.PF;

  const canvas = $('#net');
  const ctx = canvas.getContext('2d');

  const LINK_DIST = 150;        // distance max pour tracer un lien
  const MOUSE_RADIUS = 180;     // rayon d'influence du curseur
  const COLORS = ['245,181,63', '255,212,121'];   // accent / accent-2 (RVB)

  let w = 0, h = 0, dpr = 1, nodes = [], raf = 0;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ~1 nœud pour 22 000 px², entre 28 et 90
    const count = Math.max(28, Math.min(90, Math.round((w * h) / 22000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.8,
      c: COLORS[Math.random() < 0.7 ? 0 : 1]
    }));
    if (reducedMotion) draw();
  }

  function step() {
    for (const n of nodes) {
      // Attraction douce vers le curseur
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 1) {
        const f = (1 - Math.sqrt(d2) / MOUSE_RADIUS) * 0.012;
        n.vx += dx * f * 0.05;
        n.vy += dy * f * 0.05;
      }
      // Limite de vitesse + frottement pour rester calme
      n.vx *= 0.995; n.vy *= 0.995;
      n.x += n.vx; n.y += n.vy;
      // Rebond sur les bords
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Liens
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK_DIST) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    // Nœuds
    for (const n of nodes) {
      ctx.fillStyle = `rgba(${n.c},.55)`;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function loop() { step(); draw(); raf = requestAnimationFrame(loop); }

  window.addEventListener('resize', resize);
  resize();

  if (!reducedMotion) {
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) loop();
    });
    loop();
  }
})();
