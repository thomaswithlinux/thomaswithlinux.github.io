/* ==========================================================================
   validate-lib.mjs — Règles de validation du contenu et de la structure
   --------------------------------------------------------------------------
   Fonction pure (aucune dépendance Node) : elle reçoit les données et le
   HTML et renvoie la liste des erreurs. Elle est appelée par validate.mjs
   (ligne de commande / CI) et peut aussi être testée dans un navigateur.
   ========================================================================== */

const TYPES_ARCHIVE = ['Article', 'Write-up', 'Lab', 'Veille', 'Dépôt', 'Formation'];
const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isUrlOrEmpty = (v) => v === '' || /^https:\/\/\S+$/.test(v);
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

/**
 * @param {object} D        contenu (window.PORTFOLIO)
 * @param {string} html     contenu de index.html
 * @param {object} sources  { 'render.js': '...', ... } code JavaScript à analyser
 * @param {(p: string) => boolean} exists  teste l'existence d'un fichier local
 * @returns {string[]} erreurs (tableau vide = tout est bon)
 */
export function validate(D, html, sources, exists) {
  const errors = [];
  const err = (m) => errors.push(m);

  /* ----- Identité ----- */
  const p = D.profile || {};
  ['name', 'handle', 'role', 'location', 'availability', 'email'].forEach((k) => { if (!isStr(p[k])) err(`profile.${k} est vide`); });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email || '')) err('profile.email invalide');
  if (!/^[a-z0-9_-]+$/i.test(p.handle || '')) err('profile.handle : lettres, chiffres, - et _ uniquement');
  if (!Array.isArray(p.roles) || !p.roles.length) err('profile.roles doit contenir au moins une phrase');
  ['github', 'linkedin'].forEach((k) => { if (!isUrlOrEmpty(get(p, 'links.' + k) ?? '')) err(`profile.links.${k} doit être une URL https`); });
  if (p.cv && !exists(p.cv)) err(`profile.cv : fichier introuvable (${p.cv})`);
  (p.stats || []).forEach((s, i) => { if (typeof s.value !== 'number' || !isStr(s.label)) err(`profile.stats[${i}] incomplet`); });

  /* ----- À propos ----- */
  if (!Array.isArray(D.about?.paragraphs) || !D.about.paragraphs.length) err('about.paragraphs est vide');
  (D.about?.facts || []).forEach((f, i) => { if (!isStr(f.k) || !isStr(f.v)) err(`about.facts[${i}] incomplet`); });

  /* ----- Compétences ----- */
  if (!Array.isArray(D.skills) || !D.skills.length) err('skills est vide');
  (D.skills || []).forEach((g, gi) => {
    if (!isStr(g.group)) err(`skills[${gi}].group est vide`);
    (g.items || []).forEach((it, ii) => {
      if (!isStr(it.name)) err(`skills[${gi}].items[${ii}].name est vide`);
      if (!Number.isInteger(it.level) || it.level < 1 || it.level > 5) err(`skills[${gi}].items[${ii}].level doit être un entier de 1 à 5`);
    });
  });

  /* ----- Projets ----- */
  const ids = new Set();
  (D.projects || []).forEach((pr, i) => {
    ['id', 'title', 'category', 'year', 'summary'].forEach((k) => { if (!isStr(pr[k])) err(`projects[${i}].${k} est vide`); });
    if (ids.has(pr.id)) err(`projects : identifiant en double « ${pr.id} »`);
    ids.add(pr.id);
    if (!Array.isArray(pr.stack) || !pr.stack.length) err(`projects[${i}].stack est vide`);
    if (typeof pr.featured !== 'boolean') err(`projects[${i}].featured doit être true ou false`);
    if (!isUrlOrEmpty(pr.link ?? '')) err(`projects[${i}].link doit être une URL https ou ""`);
  });

  /* ----- Parcours ----- */
  (D.experience || []).forEach((x, i) => {
    ['period', 'title', 'org', 'place'].forEach((k) => { if (!isStr(x[k])) err(`experience[${i}].${k} est vide`); });
    if (!Array.isArray(x.points) || !x.points.length) err(`experience[${i}].points est vide`);
  });
  (D.education || []).forEach((x, i) => {
    ['period', 'title', 'org', 'detail'].forEach((k) => { if (!isStr(x[k])) err(`education[${i}].${k} est vide`); });
  });
  (D.certifications || []).forEach((c, i) => {
    ['name', 'issuer', 'year', 'status'].forEach((k) => { if (!isStr(c[k])) err(`certifications[${i}].${k} est vide`); });
  });

  /* ----- Archive ----- */
  (D.archive || []).forEach((a, i) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date || '')) err(`archive[${i}].date doit être AAAA-MM-JJ`);
    if (!TYPES_ARCHIVE.includes(a.type)) err(`archive[${i}].type « ${a.type} » inconnu (${TYPES_ARCHIVE.join(', ')})`);
    if (!isStr(a.title)) err(`archive[${i}].title est vide`);
    if (!isUrlOrEmpty(a.url ?? '')) err(`archive[${i}].url doit être une URL https ou ""`);
  });

  /* ----- Cohérence HTML ↔ données ↔ scripts ----- */
  for (const m of html.matchAll(/data-(?:bind|href)="([^"]+)"/g)) {
    if (get(D, m[1]) === undefined) err(`index.html : la donnée « ${m[1]} » n'existe pas dans data.js`);
  }
  const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const [file, code] of Object.entries(sources)) {
    for (const m of code.matchAll(/\$\('#([\w-]+)'\)/g)) {
      if (!htmlIds.has(m[1])) err(`${file} cherche #${m[1]} mais index.html ne le contient pas`);
    }
  }
  for (const m of html.matchAll(/(?:href|src)="((?:assets)\/[^"]+)"/g)) {
    if (!exists(m[1])) err(`index.html référence un fichier absent : ${m[1]}`);
  }
  for (const m of html.matchAll(/data-spy="([^"]+)"/g)) {
    if (!htmlIds.has(m[1])) err(`index.html : data-spy="${m[1]}" ne correspond à aucune section`);
  }

  return errors;
}
