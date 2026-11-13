// Rough frame-time probe (software rendering in headless Chromium, so treat as an upper bound).
const { chromium } = require("playwright"); const path = require("path");
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  await p.goto("file://" + path.resolve(__dirname, "../dist/index.html") + "#/s/security/7"); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 3000) requestAnimationFrame(f); else res(n / 3); }; requestAnimationFrame(f); }));
  console.log("frames per second (headless, software):", r.toFixed(1)); await b.close();
})();
