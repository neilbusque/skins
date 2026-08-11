/**
 * QA the built site.
 *
 * Headless Chrome cannot reach a localhost server started in a separate
 * sandboxed command, so serve and drive in ONE shell invocation:
 *
 *   python3 -m http.server 4411 --directory dist &
 *   QA_BASE=http://127.0.0.1:4411 node scripts/qa.mjs
 */
import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.QA_BASE || 'http://127.0.0.1:4411';
const OUT = process.env.QA_OUT || 'qa-shots';
const SKIN_IDS = [
  'linear',
  'stripe',
  'aesop',
  'gumroad',
  'longform',
  'aurora',
  'studio',
  'canvas',
  'prism',
  'atelier',
  'lookbook',
  'wire',
];
const ROUTES = [{ id: 'index', path: '/' }, ...SKIN_IDS.map((id) => ({ id, path: `/s/${id}/` }))];
const REQUIRED_ANCHORS = ['features', 'showcase', 'proof', 'pricing', 'cta'];
const BANNED = /[—–]/; // em dash, en dash

mkdirSync(OUT, { recursive: true });

/**
 * Walk the page top to bottom so lazy sections lay out and every scroll reveal
 * fires, then return to the top.
 *
 * `scroll-behavior: smooth` is set on <html>, and window.scrollTo honours it:
 * each call ANIMATES, the next call interrupts the previous animation, and the
 * loop finishes having travelled a fraction of the page. Everything below the
 * fold then reads as "never revealed". Force instant scrolling for the walk and
 * restore the declared behaviour after.
 */
const prime = async () => {
  const de = document.documentElement;
  const prev = de.style.scrollBehavior;
  de.style.scrollBehavior = 'auto';
  const step = window.innerHeight * 0.75;
  const max = de.scrollHeight;
  for (let y = 0; y < max; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 55));
  }
  window.scrollTo(0, max);
  await new Promise((r) => setTimeout(r, 200));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 900));
  de.style.scrollBehavior = prev;
};

const results = [];
let failures = 0;

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const route of ROUTES) {
  const url = BASE + route.path;
  const page = await browser.newPage();
  const errs = [];
  const badRequests = [];

  page.on('console', (m) => {
    if (m.type() === 'error') errs.push(m.text());
  });
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => {
    // Google Fonts can be blocked offline; that is not a page defect.
    if (!/fonts\.(googleapis|gstatic)\.com/.test(r.url())) {
      badRequests.push(r.url() + ' :: ' + (r.failure()?.errorText ?? '?'));
    }
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !/fonts\.(googleapis|gstatic)\.com/.test(r.url())) {
      badRequests.push(r.url() + ' :: HTTP ' + r.status());
    }
  });

  const checks = [];
  const fail = (msg) => {
    checks.push(['FAIL', msg]);
    failures++;
  };
  const pass = (msg) => checks.push(['ok', msg]);

  // ---- desktop ----
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });

  if (!resp || resp.status() !== 200) fail(`HTTP ${resp ? resp.status() : 'no response'}`);
  else pass('HTTP 200');

  // Entry modals (the longform skin opens one after ~900ms) lock scroll. Capture
  // it, then dismiss with Escape, then confirm the lock is actually released.
  await new Promise((r) => setTimeout(r, 1400));
  const hadModal = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-modal="true"]');
    return !!d && getComputedStyle(d).display !== 'none' && getComputedStyle(d).visibility !== 'hidden';
  });
  if (hadModal) {
    await page.screenshot({ path: `${OUT}/${route.id}-modal.png` });
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 500));
    const lock = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"][aria-modal="true"]');
      const open = !!d && getComputedStyle(d).display !== 'none' && getComputedStyle(d).visibility !== 'hidden';
      return { open, bodyOverflow: getComputedStyle(document.body).overflow };
    });
    if (lock.open) fail('entry modal did not close on Escape');
    else if (lock.bodyOverflow === 'hidden') fail('entry modal closed but left body scroll locked');
    else pass('entry modal opens, closes on Escape, releases scroll');
  }

  // Prime lazy sections + reveals, then settle.
  await page.evaluate(prime);

  const info = await page.evaluate((required) => {
    const de = document.documentElement;
    const text = document.body.innerText;
    const hidden = [...document.querySelectorAll('[data-reveal]')].filter(
      (el) => getComputedStyle(el).opacity === '0'
    ).length;
    /* The GSAP skins release [data-anim] from their own timelines instead of the
       layout observer. Only count elements that actually render: a data-anim
       element inside a container the breakpoint hides is not a stuck reveal. */
    const animHidden = [...document.querySelectorAll('[data-anim]')].filter((el) => {
      const r = el.getBoundingClientRect();
      return (r.width > 0 || r.height > 0) && getComputedStyle(el).opacity === '0';
    }).length;
    return {
      scrollWidth: de.scrollWidth,
      innerWidth: window.innerWidth,
      height: de.scrollHeight,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      anchors: required.filter((id) => !!document.getElementById(id)),
      textLen: text.length,
      dashSamples: text
        .split('\n')
        .filter((l) => /[—–]/.test(l))
        .slice(0, 3),
      stillHidden: hidden,
      animTotal: document.querySelectorAll('[data-anim]').length,
      animHidden,
      skinbar: !!document.querySelector('[data-skinbar]'),
    };
  }, REQUIRED_ANCHORS);

  if (info.scrollWidth > info.innerWidth + 1)
    fail(`horizontal overflow @1440: scrollWidth ${info.scrollWidth} > ${info.innerWidth}`);
  else pass('no h-overflow @1440');

  if (info.h1 !== 1) fail(`expected exactly 1 <h1>, found ${info.h1}`);
  else pass('one h1');

  if (!info.title) fail('empty <title>');
  else pass('has title');

  if (info.height < 1800) fail(`page is only ${info.height}px tall, content likely missing`);
  else pass(`height ${info.height}px`);

  if (info.textLen < 1500) fail(`only ${info.textLen} chars of text, content likely missing`);
  else pass(`${info.textLen} chars of copy`);

  if (info.dashSamples.length) fail(`em/en dash in copy: ${JSON.stringify(info.dashSamples)}`);
  else pass('no em/en dashes');

  if (info.stillHidden > 0) fail(`${info.stillHidden} [data-reveal] elements never revealed`);
  else pass('all reveals fired');

  if (info.animHidden > 0) fail(`${info.animHidden} visible [data-anim] elements never released by GSAP`);
  else if (info.animTotal) pass(`all ${info.animTotal} GSAP reveals fired`);

  if (route.id !== 'index') {
    const missing = REQUIRED_ANCHORS.filter((a) => !info.anchors.includes(a));
    if (missing.length) fail(`missing section ids: ${missing.join(', ')}`);
    else pass('all section anchors present');

    if (!info.skinbar) fail('skin switcher bar missing');
    else pass('skin switcher present');
  } else {
    const idx = await page.evaluate(() => ({
      livePreviews: [...document.querySelectorAll('iframe.gal-card__live')].filter((f) =>
        /\?embed=1$/.test(f.getAttribute('src') || '')
      ).length,
      github: !!document.querySelector('a[href*="github.com/neilbusque/skins"]'),
    }));
    if (idx.livePreviews !== SKIN_IDS.length)
      fail(`expected ${SKIN_IDS.length} live preview iframes with ?embed=1, found ${idx.livePreviews}`);
    else pass(`${idx.livePreviews} live preview iframes`);

    if (!idx.github) fail('no GitHub repo link on the gallery');
    else pass('GitHub repo link present');
  }

  if (errs.length) fail(`console errors: ${errs.slice(0, 3).join(' | ')}`);
  else pass('no console errors');

  if (badRequests.length) fail(`bad requests: ${badRequests.slice(0, 3).join(' | ')}`);
  else pass('no failed requests');

  await page.screenshot({ path: `${OUT}/${route.id}-desktop.png`, fullPage: true });

  // ---- mobile ----
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1, isMobile: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.evaluate(prime);

  const mob = await page.evaluate(() => {
    const de = document.documentElement;
    const wide = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > window.innerWidth + 2 && r.height > 0 && getComputedStyle(el).position !== 'fixed';
      })
      .slice(0, 4)
      .map((el) => el.className || el.tagName);
    const animHidden = [...document.querySelectorAll('[data-anim]')].filter((el) => {
      const r = el.getBoundingClientRect();
      return (r.width > 0 || r.height > 0) && getComputedStyle(el).opacity === '0';
    }).length;
    return { scrollWidth: de.scrollWidth, innerWidth: window.innerWidth, wide, animHidden };
  });

  if (mob.scrollWidth > mob.innerWidth + 1)
    fail(`horizontal overflow @375: ${mob.scrollWidth} > ${mob.innerWidth}; culprits ${JSON.stringify(mob.wide)}`);
  else pass('no h-overflow @375');

  if (mob.animHidden > 0) fail(`${mob.animHidden} visible [data-anim] elements never released @375`);
  else pass('GSAP reveals fired @375');

  await page.screenshot({ path: `${OUT}/${route.id}-mobile.png`, fullPage: true });
  await page.close();

  results.push({ route: route.path, checks });
}

// ---- index links resolve ----
{
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="/s/"]')].map((a) => a.getAttribute('href'))
  );
  const missing = SKIN_IDS.filter((id) => !hrefs.includes(`/s/${id}/`));
  if (missing.length) {
    failures++;
    results.push({ route: 'index links', checks: [['FAIL', `gallery missing links: ${missing.join(', ')}`]] });
  } else {
    results.push({ route: 'index links', checks: [['ok', `all ${SKIN_IDS.length} skins linked`]] });
  }
  await page.close();
}

// ---- embed mode: previews must hide the skinbar and never open modals ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + '/s/longform/?embed=1', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1600));
  const embed = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-modal="true"]');
    const modalOpen =
      !!d && getComputedStyle(d).display !== 'none' && getComputedStyle(d).visibility !== 'hidden' && !d.hidden;
    const barEl = document.querySelector('[data-skinbar]');
    const barVisible = !!barEl && getComputedStyle(barEl).display !== 'none';
    return { modalOpen, barVisible };
  });
  const checks = [];
  if (embed.modalOpen) {
    failures++;
    checks.push(['FAIL', 'entry modal opened inside ?embed=1']);
  } else checks.push(['ok', 'no entry modal in embed mode']);
  if (embed.barVisible) {
    failures++;
    checks.push(['FAIL', 'skinbar visible inside ?embed=1']);
  } else checks.push(['ok', 'skinbar hidden in embed mode']);
  results.push({ route: '/s/longform/?embed=1', checks });
  await page.close();
}

await browser.close();

let report = '';
for (const r of results) {
  report += `\n${r.route}\n`;
  for (const [status, msg] of r.checks) {
    report += `  ${status === 'ok' ? '  ok' : 'FAIL'}  ${msg}\n`;
  }
}
report += `\n${failures === 0 ? 'PASS' : `FAILURES: ${failures}`}\n`;
writeFileSync(`${OUT}/report.txt`, report);
console.log(report);
process.exit(failures === 0 ? 0 : 1);
