/* ==========================================================================
   core.js — Utilitaires partagés
   --------------------------------------------------------------------------
   Expose un petit espace de noms `PF` (portfolio) utilisé par les autres
   scripts : accès au DOM, création d'éléments sûrs, icônes, préférences.
   Aucune dépendance externe.
   ========================================================================== */

(function () {
  'use strict';

  /** Raccourcis de sélection */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /**
   * Crée un élément DOM sans passer par innerHTML (pas de risque d'injection).
   * @param {string} tag      nom de la balise
   * @param {object} [props]  attributs ; `class`, `text` et `onXxx` sont gérés
   * @param {...(Node|string|Array)} kids  enfants
   */
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(props || {})) {
      if (val == null || val === false) continue;
      if (key === 'class') el.className = val;
      else if (key === 'text') el.textContent = val;
      else if (key.startsWith('on') && typeof val === 'function') el.addEventListener(key.slice(2), val);
      else el.setAttribute(key, val === true ? '' : val);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }

  /** Lit une valeur imbriquée : get(obj, 'profile.links.github') */
  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  /** Icônes SVG (trait 1.8px, héritent de currentColor) */
  const ICONS = {
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    copy:  '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>'
  };
  function icon(name, size = 18) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.innerHTML = ICONS[name] || '';   // chaînes statiques définies ci-dessus uniquement
    return svg;
  }

  /** Préférences */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer   = window.matchMedia('(pointer: fine)').matches;

  /** Accès sûr au stockage de session (peut être bloqué par le navigateur) */
  const session = {
    get(k)    { try { return sessionStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (_) { /* ignoré */ } }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  window.PF = { $, $$, h, get, icon, reducedMotion, finePointer, session, sleep, D: window.PORTFOLIO };
})();
