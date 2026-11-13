// Screenshot routes of the built explainer.
//   node tools/shoot.cjs "#/" "#/s/security/2" ...        (writes shots/<name>.png)
//   SHOT_W=1920 SHOT_H=1080 SCALE=2 node tools/shoot.cjs ...
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
(async () => {
  const routes = process.argv.slice(2);
  const file = "file://" + path.resolve(__dirname, "../dist/index.html");
  const out = path.resolve(__dirname, "../shots"); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +(process.env.SHOT_W || 1600), height: +(process.env.SHOT_H || 900) }, deviceScaleFactor: +(process.env.SCALE || 1) });
  p.on("console", (m) => { if (m.type() === "error") console.log("[console]", m.text()); });
  p.on("pageerror", (e) => console.log("[pageerror]", e.message));
  for (const r of routes) {
    const [hash, extra = ""] = r.split("?");
    await p.goto(`${file}?shot=1${extra ? "&" + extra : ""}${hash}`);
    await p.waitForTimeout(+(process.env.WAIT || 1800));
    const name = (hash.replace(/[#/]+/g, "_").replace(/^_/, "") || "home") + (extra ? "_" + extra.replace(/\W+/g, "") : "");
    await p.screenshot({ path: path.join(out, name + ".png") });
    console.log("shot", name);
  }
  await b.close();
})();
