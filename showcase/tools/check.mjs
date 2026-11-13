// node tools/check.mjs : runs the ?check overflow sweep (13 use cases x 2 modes x 3 audiences x 12 times) in both themes.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, defaultViewport: { width: 1900, height: 1064 } });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
const file = pathToFileURL(join(here, '..', 'healthcare-2d-models.html')).href;
let total = 0;
for (const theme of ['light', 'dark']) {
  await page.goto(`${file}?paused&check&theme=${theme}`, { waitUntil: 'load', timeout: 180000 });
  const res = await page.evaluate(() => window.__check || ['no result']);
  const m = new Map();
  res.forEach((s) => { const mm = s.match(/^(\w+)\/(\w+)\/(\w+)@\d+: (.*)$/); const k = mm ? `${mm[1]}/${mm[2]}: ${mm[4]}` : s; m.set(k, (m.get(k) || 0) + 1); });
  console.log(`${theme}: ${m.size} distinct overflow items`); m.forEach((n, k) => console.log('  ', k));
  total += m.size;
}
await browser.close();
process.exit(total ? 1 : 0);
