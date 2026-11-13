// Automated checks for the built explainer.  node tools/check.cjs [--shots]
// Walks every story and step, the platform explorer, the composer and the home page.
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
(async () => {
  const shots = process.argv.includes("--shots");
  const file = "file://" + path.resolve(__dirname, "../dist/index.html");
  const out = path.resolve(__dirname, "../shots/all"); if (shots) fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const sizes = shots ? [[1600, 900]] : [[1600, 900], [1280, 720], [1920, 1080]];
  const problems = []; let steps = 0;
  for (const [w, h] of sizes) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on("console", (m) => { if (m.type() === "error") problems.push(`[console ${w}x${h}] ${m.text()}`); });
    p.on("pageerror", (e) => problems.push(`[pageerror ${w}x${h}] ${e.message}`));
    await p.goto(file + "?shot=1#/"); await p.waitForTimeout(500);
    const meta = await p.evaluate(() => {
      const a = window.__app, ids = new Set(a.CATALOG.map((i) => i.id)), out = [];
      for (const sc of a.ALL) {
        const st = a.STAGING[sc.id]; if (!st) { out.push(`${sc.id}: no staging`); continue; }
        for (const n of sc.nodes) if (!st.place[n.id]) out.push(`${sc.id}: node ${n.id} has no place`);
        for (const k of Object.keys(st.place)) if (!sc.nodes.find((n) => n.id === k)) out.push(`${sc.id}: place for unknown node ${k}`);
        for (const r of st.recipe) if (!ids.has(r)) out.push(`${sc.id}: recipe id ${r} not in catalog`);
        const nodeIds = new Set(sc.nodes.map((n) => n.id)), linkIds = new Set(sc.links.map((l) => l.id));
        for (const s of sc.steps) {
          for (const k of [...Object.keys(s.n || {}), ...Object.keys(s.label || {})]) if (!nodeIds.has(k)) out.push(`${sc.id}: step "${s.title}" unknown node ${k}`);
          for (const k of Object.keys(s.l || {})) if (!linkIds.has(k)) out.push(`${sc.id}: step "${s.title}" unknown link ${k}`);
          for (const k of (s.fx && s.fx.lit) || []) if (!ids.has(k)) out.push(`${sc.id}: fx.lit ${k} not in catalog`);
        }
      }
      return { problems: out, scenes: a.ALL.map((s) => ({ id: s.id, n: s.steps.length })) };
    });
    if (w === sizes[0][0]) problems.push(...meta.problems);
    for (const sc of meta.scenes) for (let i = 0; i < sc.n; i++) {
      await p.evaluate(([id, i]) => window.__app.openStory(id, i), [sc.id, i]); await p.waitForTimeout(shots ? 420 : 140); steps++;
      const r = await p.evaluate(() => {
        const R = (s) => { const e = document.querySelector(s); if (!e || e.classList.contains("hidden")) return null; const b = e.getBoundingClientRect(); return b.width ? b : null; };
        const out = []; const W = innerWidth, H = innerHeight, lower = R("#lower"), side = R("#side"), rail = R("#rail");
        if (lower && rail && lower.bottom > rail.top + 2) out.push("caption overlaps the rail");
        if (lower && lower.top < H * 0.42) out.push(`caption too tall (top ${Math.round(lower.top)})`);
        if (side && side.top < 64) out.push(`side column too tall (top ${Math.round(side.top)})`);
        if (side && lower && side.left < lower.right - 4 && side.top < lower.bottom && side.bottom > lower.top) { const txt = document.querySelector("#lower p").getBoundingClientRect(); if (side.left < txt.right - 4) out.push("side column overlaps the caption text"); }
        let vis = 0, off = 0; document.querySelectorAll(".lbl.show .lbl-in").forEach((e) => { const b = e.getBoundingClientRect(); vis++; if (b.right < 0 || b.left > W || b.bottom < 60 || b.top > H) off++; else if (b.left < -2 || b.right > W + 2) off += 0.5; });
        if (off >= 1) out.push(`${off} label(s) outside the frame`);
        if (vis === 0 && document.querySelectorAll(".lbl").length && !document.querySelector(".chip.show")) out.push("no labels visible");
        const boxes = [...document.querySelectorAll(".lbl.show .lbl-in")].map((e) => e.getBoundingClientRect()); let ov = 0;
        for (let a = 0; a < boxes.length; a++) for (let c = a + 1; c < boxes.length; c++) { const x = Math.min(boxes[a].right, boxes[c].right) - Math.max(boxes[a].left, boxes[c].left), y = Math.min(boxes[a].bottom, boxes[c].bottom) - Math.max(boxes[a].top, boxes[c].top); if (x > 6 && y > 6) ov++; }
        if (ov) out.push(`${ov} label overlap(s)`);
        return out;
      });
      for (const m of r) problems.push(`[${w}x${h}] ${sc.id} step ${i + 1}: ${m}`);
      if (shots) await p.screenshot({ path: path.join(out, `${sc.id}_${i + 1}.png`) });
    }
    // approval flow
    await p.evaluate(() => window.__app.openStory("security", 5)); await p.waitForTimeout(150);
    await p.keyboard.press("ArrowRight"); await p.waitForTimeout(1500);
    const stepAfter = await p.evaluate(() => window.__app.S.step); if (stepAfter !== 6) problems.push(`[${w}x${h}] approval did not advance (step ${stepAfter})`);
    for (const fn of ["openPlatform", "openCompose", "goHome"]) { await p.evaluate((f) => window.__app[f](), fn); await p.waitForTimeout(200); }
    for (const k of ["s", "Escape", "c", "p", "Escape"]) { await p.keyboard.press(k); await p.waitForTimeout(120); }
    await p.close();
  }
  await b.close();
  console.log(`${steps} story steps checked across ${sizes.length} viewport(s).`);
  if (problems.length) { console.log(`${problems.length} problem(s):`); for (const x of problems) console.log(" -", x); process.exitCode = 1; } else console.log("No problems found.");
})();
