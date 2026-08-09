/**
 * Generate the repo's presentation assets from the built site:
 *
 *   public/og.png       1200x630 social card (screenshot of the gallery hero)
 *   docs/shots/<id>.png above-the-fold shot of every skin, plus the gallery
 *
 * Same serving constraint as qa.mjs: headless Chrome cannot reach a server
 * started in a separate sandboxed command, so serve and drive in ONE shell:
 *
 *   npm run build && (python3 -m http.server 4411 --directory dist &) && sleep 1 && \
 *     QA_BASE=http://127.0.0.1:4411 npm run shots
 *
 * og.png lands in public/, so commit it and the NEXT build ships it.
 */
import puppeteer from 'puppeteer';
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';

const BASE = process.env.QA_BASE || 'http://127.0.0.1:4411';
const SKIN_IDS = ['wire', 'linear', 'stripe', 'aesop', 'gumroad', 'longform'];

mkdirSync('docs/shots', { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();

// Social card: the gallery hero at exactly the OG aspect.
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: 'public/og.png' });
console.log('public/og.png');

// README shots: desktop, above the fold. ?embed=1 keeps the switcher bar and
// the longform entry modal out of the frame.
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });
for (const target of [
  { id: 'index', path: '/' },
  ...SKIN_IDS.map((id) => ({ id, path: `/s/${id}/?embed=1` })),
]) {
  await page.goto(BASE + target.path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `docs/shots/${target.id}.png` });
  console.log(`docs/shots/${target.id}.png`);
}

await browser.close();

// Let the already-built dist serve the fresh og.png without a rebuild.
if (existsSync('dist')) copyFileSync('public/og.png', 'dist/og.png');
