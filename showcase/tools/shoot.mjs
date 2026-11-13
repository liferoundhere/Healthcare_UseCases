// node tools/shoot.mjs [--uc=1,2,3] [--mode=legacy,tobe] [--theme=light] [--u=0.5,0.9] [--out=shots] [--aud=exec]
// Renders the built HTML at a 1:1 stage scale (1600x900 logical) and saves PNGs. Also prints console errors and the overflow list.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launchOptions } from './chrome.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const ids = ['security', 'facilities', 'ai', 'ehr', 'iomt', 'ransom', 'wifi', 'imaging', 'home', 'wan', 'identity', 'compliance', 'aiwork'];
const ucs = arg('uc', ids.map((_, i) => i + 1).join(',')).split(',').map(Number);
const modes = arg('mode', 'legacy,tobe').split(','); // flows: story, legacy, tobe
const themes = arg('theme', 'light').split(',');
const us = arg('u', '0.9').split(',').map(Number);
const aud = arg('aud', 'exec');
const out = join(here, '..', arg('out', 'shots')); mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ ...launchOptions(['--allow-file-access-from-files']), headless: true, defaultViewport: { width: +arg('vw', 1900), height: +arg('vh', 1064), deviceScaleFactor: 1 } });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
const file = pathToFileURL(join(here, '..', 'healthcare-2d-models.html')).href;
for (const uc of ucs) for (const mode of modes) for (const theme of themes) for (const u of us) {
  const url = `${file}?paused&uc=${uc}&flow=${mode}&theme=${theme}&aud=${aud}&panel=${arg('panel', '0')}&u=${u}&t=${arg('t', '0')}`;
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => window.__rec.step(0.02));
  await new Promise((r) => setTimeout(r, 150));
  const ovf = await page.evaluate(() => window.__overflow || []);
  const name = `${ids[uc - 1]}-${mode}-${theme}-u${Math.round(u * 100)}.png`;
  await page.screenshot({ path: join(out, name) });
  console.log(name, ovf.length ? 'OVERFLOW: ' + ovf.join(' | ') : 'ok');
}
await browser.close();
