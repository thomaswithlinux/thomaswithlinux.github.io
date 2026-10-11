/* ==========================================================================
   capture-screenshots.mjs — Génère docs/screenshots/*.png
   --------------------------------------------------------------------------
   Lance un petit serveur statique, ouvre le site dans Chromium (Playwright)
   et enregistre une capture par écran. Exécuté automatiquement par GitHub
   Actions (.github/workflows/screenshots.yml) ; utilisable en local :

       npm install
       npx playwright install chromium
       npm run screenshots
   ========================================================================== */

import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs', 'screenshots');
mkdirSync(OUT, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json'
};

/* ----- Serveur statique minimal ----- */
const server = http.createServer(async (req, res) => {
  try {
    let rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const BASE = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const shot = (name) => path.join(OUT, name);

/** Ouvre le site sans l'écran de démarrage, polices chargées. */
async function openSite(viewport, extra = {}) {
  const context = await browser.newContext({ viewport, ...extra });
  await context.addInitScript(() => { try { sessionStorage.setItem('pf-booted', '1'); } catch (_) { /* ignoré */ } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

/** Affiche tout (animations d'apparition terminées) et se place sur une section. */
async function reveal(page) {
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.reveal').forEach((n) => n.classList.add('in'));
  });
}

/** Capture une section entière, sans la barre du haut ni le menu qui la recouvriraient. */
async function captureSection(page, id, file) {
  await reveal(page);
  await page.addStyleTag({ content: '.topbar,.sidebar,.progress{visibility:hidden!important}' });
  await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id);
  await page.waitForTimeout(1200);              // laisse finir les transitions (barres de compétence…)
  await page.locator('#' + id).screenshot({ path: shot(file) });
}

/* ================= Bureau 1440 × 900 ================= */
{
  const page = await openSite({ width: 1440, height: 900 });

  // 01 — Accueil : on laisse la démonstration du terminal se jouer
  await reveal(page);
  await page.waitForTimeout(7000);
  await page.screenshot({ path: shot('01-accueil.png') });

  // 02 — Terminal interactif : quelques vraies commandes
  for (const cmd of ['help', 'projects']) {
    await page.fill('#term-input', cmd);
    await page.press('#term-input', 'Enter');
    await page.waitForTimeout(300);
  }
  await page.locator('.hero__term').screenshot({ path: shot('02-terminal-interactif.png') });

  // 03 → 09 — Sections
  await captureSection(page, 'about', '03-a-propos.png');
  await captureSection(page, 'skills', '04-competences.png');
  await captureSection(page, 'projects', '05-projets.png');
  await captureSection(page, 'archive', '06-depots-github.png');
  await captureSection(page, 'experience', '07-experience.png');
  await captureSection(page, 'education', '08-formation.png');
  await captureSection(page, 'contact', '09-contact.png');
  await page.context().close();
}

/* ----- 10 — Palette de commandes (Ctrl + K) ----- */
{
  const page = await openSite({ width: 1440, height: 900 });
  await reveal(page);
  await page.waitForTimeout(1500);
  await page.keyboard.press('Control+K');
  await page.keyboard.type('proj');
  await page.waitForTimeout(500);
  await page.screenshot({ path: shot('10-palette-commandes.png') });
  await page.context().close();
}

/* ================= Mobile 390 × 844 ================= */
{
  const page = await openSite({ width: 390, height: 844 }, { deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await reveal(page);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: shot('11-mobile.png') });
  await page.click('#menu-btn');
  await page.waitForTimeout(600);
  await page.screenshot({ path: shot('12-mobile-menu.png') });
  await page.context().close();
}

await browser.close();
server.close();
console.log('✔ Captures enregistrées dans docs/screenshots/');
