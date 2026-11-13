// node tools/smoke.mjs : exercises hover tooltip, rail click, story auto-advance, flow, panels, audience, theme, tour, tab switching.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launchOptions } from './chrome.mjs';

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(here, '..', 'shots'), { recursive: true });
const browser = await puppeteer.launch({ ...launchOptions(), headless: true, defaultViewport: { width: 1900, height: 1064 } });
const page = await browser.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(join(here, '..', 'healthcare-2d-models.html')).href + '?paused&uc=4&panel=0&t=0', { waitUntil: 'load' });
const ok = (n, v) => console.log(v ? 'PASS' : 'FAIL', n);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await page.evaluate(() => window.__rec.step(0.02));

// the stage fills the window when panels are closed
ok('side panel closed by default via ?panel=0', await page.evaluate(() => !document.getElementById('app').classList.contains('side-open')));

// hover a device in the Cloud Control half
await page.evaluate(() => { APP.t0 = APP.t - 8.3 * SD; window.__rec.step(0.02); });
const hot = await page.evaluate(() => { const h = APP.hots.find((q) => /^n_wow/.test(q.id)); const r = document.getElementById('cv').getBoundingClientRect(), s = r.width / APP.W; return h ? { x: r.left + (h.x + h.w / 2) * s, y: r.top + (h.y + h.h / 2) * s } : null; });
ok('device hotspot exists', !!hot);
if (hot) { await page.mouse.move(hot.x, hot.y); await page.evaluate(() => window.__rec.step(0.02)); await wait(250); ok('tooltip shows on hover', await page.evaluate(() => document.getElementById('tip').classList.contains('show') && /./.test(document.getElementById('tip').textContent))); }
await page.mouse.move(5, 5);

// story: Today then With Cloud Control, one continuous flow
ok('story starts in Today and later switches to Cloud Control', await page.evaluate(() => { APP.setFlow('story'); APP.t0 = APP.t; window.__rec.step(0.02); const a = APP.cur.mode; APP.t0 = APP.t - (APP.span() / SD - 0.5) * SD; window.__rec.step(0.02); return a === 'legacy' && APP.cur.mode === 'tobe'; }));

// rail click replays from that step
const box = await page.evaluate(() => { APP.t0 = APP.t; window.__rec.step(0.02); const b = APP.stepBoxes[3], r = document.getElementById('cv').getBoundingClientRect(), s = r.width / APP.W; return b ? { x: r.left + (b.x + b.w / 2) * s, y: r.top + (b.y + b.h / 2) * s } : null; });
ok('rail step boxes exist', !!box);
if (box) { await page.mouse.click(box.x, box.y); await page.evaluate(() => window.__rec.step(0.02)); const g = await page.evaluate(() => APP.cur.g); ok(`rail click jumps to step 4 (g = ${g.toFixed(2)})`, g > 3 && g < 3.2); }

// audience, flow, theme, panels, tab
await page.keyboard.press('3'); ok('audience = eng', await page.evaluate(() => APP.aud === 'eng'));
await page.keyboard.press('m'); ok('flow cycled (story to Today only)', await page.evaluate(() => APP.flow === 'legacy'));
await page.keyboard.press('d'); ok('theme dark', await page.evaluate(() => THEME === 'dark')); await page.keyboard.press('d');
await page.keyboard.press('p'); await wait(150); ok('panels open with P', await page.evaluate(() => document.getElementById('app').classList.contains('side-open') && document.getElementById('side').offsetWidth > 200));
const wOpen = await page.evaluate(() => document.getElementById('stage').getBoundingClientRect().width);
await page.click('#sideTab'); await wait(150);
const wShut = await page.evaluate(() => document.getElementById('stage').getBoundingClientRect().width);
ok(`closing panels gives the stage more room (${Math.round(wOpen)} to ${Math.round(wShut)} px)`, wShut > wOpen + 250);
await page.click('#tabs button[data-i="9"]'); ok('tab click switches use case', await page.evaluate(() => APP.uc === 9));
await page.keyboard.press('ArrowRight'); ok('arrow next', await page.evaluate(() => APP.uc === 10));

// guided tour
await page.click('#bTour'); await page.evaluate(() => { APP.playing = true; });
await wait(1200); await page.evaluate(() => window.__rec.step(9));
ok('tour caption visible', await page.evaluate(() => document.getElementById('caption').classList.contains('show')));
await page.screenshot({ path: join(here, '..', 'shots', 'tour.png') });
console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors');
await browser.close();
