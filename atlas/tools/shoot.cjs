// Screenshots of the built editions (reads atlas/dist over file://, no server needed).
//   node atlas/tools/shoot.cjs                       library + three stories, 1600x900 and 1280x720, general edition
//   node atlas/tools/shoot.cjs --ed=msk --uc=wifi,security --steps=1,3,approval,summary --size=1600x900 --theme=dark --out=shots
// --steps takes step numbers, "approval" (the step with the Approve button), "approved", "mid" and "summary".
// --uc=all shoots every use case. --details also opens the Details drawer on the first step.
// --stage clips each presenter screenshot to the floor plan panel. --nolib skips the library page.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), url = require('url');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes('--' + k);
const root = path.resolve(arg('dist', path.join(__dirname, '..', 'dist'))); // --dist=<dir> reads another build folder
const ed = arg('ed', 'general'), sizes = arg('size', '1600x900,1280x720').split(',').map((s) => s.split('x').map(Number));
const theme = arg('theme', 'light'), aud = arg('aud', 'exec');
const out = path.resolve(arg('out', path.join(__dirname, '..', 'shots'))); fs.mkdirSync(out, { recursive: true });
const base = url.pathToFileURL(path.join(root, ed)).href;

(async () => {
  if (!fs.existsSync(path.join(root, ed, 'index.html'))) { console.error('Build first: node atlas/build.mjs'); process.exit(1); }
  const browser = await chromium.launch();
  for (const [w, h] of sizes) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    page.on('pageerror', (e) => console.log('PAGE ERROR', e.message));
    page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
    const snap = async (name) => {
      const f = path.join(out, `${ed}-${name}-${w}x${h}${theme === 'dark' ? '-dark' : ''}.png`);
      const st = flag('stage') ? await page.$('#stage') : null, box = st ? await st.boundingBox() : null;
      await page.screenshot(box ? { path: f, clip: box } : { path: f }); console.log(path.relative(process.cwd(), f));
    };
    await page.goto(`${base}/index.html?theme=${theme}`); await page.waitForTimeout(300);
    const ids = await page.evaluate(() => ATLAS.catalog.map((c) => c.id));
    if (!flag('nolib')) { await snap('library'); }
    const want = arg('uc', 'security,wifi,iomt'); const ucs = want === 'all' ? ids : want.split(',').filter((id) => ids.includes(id));
    for (const id of ucs) {
      await page.goto(`${base}/play.html?uc=${id}&theme=${theme}&aud=${aud}`); await page.waitForFunction(() => window.__atlas);
      const info = await page.evaluate(() => { const c = ATLAS.cases[__atlas.id]; return { n: __atlas.steps, modal: c.N.steps.findIndex((s) => s.modal) }; });
      for (const s of arg('steps', '1,mid,approval,summary').split(',')) {
        if (s === 'summary') await page.evaluate(() => __atlas.go(__atlas.steps));
        else if (s === 'approval' || s === 'approved') { if (info.modal < 0) continue; await page.evaluate((k) => __atlas.go(k), info.modal); if (s === 'approved') await page.keyboard.press('Enter'); }
        else await page.evaluate((k) => __atlas.go(k), s === 'mid' ? Math.floor(info.n / 2) - 1 : +s - 1);
        await page.evaluate(() => __atlas.settle()); await page.waitForTimeout(120);
        await snap(`${id}-${s}`);
      }
      if (flag('details')) { await page.evaluate(() => __atlas.go(0)); await page.keyboard.press('i'); await page.waitForTimeout(400); await snap(`${id}-details`); }
    }
    await page.close();
  }
  await browser.close();
})();
