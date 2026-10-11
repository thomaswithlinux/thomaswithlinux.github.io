/* ==========================================================================
   validate.mjs — Lance la validation du site (npm test)
   --------------------------------------------------------------------------
   1. Vérifie la syntaxe de chaque fichier JavaScript.
   2. Charge data.js dans un contexte isolé et applique validate-lib.mjs.
   Code de sortie : 0 = tout est bon, 1 = au moins une erreur.
   ========================================================================== */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { validate } from './validate-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const errors = [];

/* 1. Syntaxe JavaScript */
const jsDir = path.join(ROOT, 'assets', 'js');
const sources = {};
for (const f of readdirSync(jsDir).filter((n) => n.endsWith('.js'))) {
  sources[f] = read(`assets/js/${f}`);
  try { new vm.Script(sources[f], { filename: f }); }
  catch (e) { errors.push(`Syntaxe invalide dans ${f} : ${e.message}`); }
}

/* 2. Contenu + cohérence */
const sandbox = { window: {} };
vm.createContext(sandbox);
try { vm.runInContext(sources['data.js'], sandbox); }
catch (e) { errors.push(`data.js ne s'exécute pas : ${e.message}`); }

if (sandbox.window.PORTFOLIO) {
  errors.push(...validate(sandbox.window.PORTFOLIO, read('index.html'), sources, (p) => existsSync(path.join(ROOT, p))));
}

if (errors.length) {
  console.error(`\n✘ ${errors.length} problème(s) détecté(s) :\n`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log(`✔ Validation réussie (${Object.keys(sources).length} scripts, contenu et structure cohérents).`);
