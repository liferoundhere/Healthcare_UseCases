// End to end check of the built editions with Playwright (reads atlas/dist over file://).
//   node atlas/tools/check.cjs                 all editions
//   node atlas/tools/check.cjs --ed=msk        one edition
//   node atlas/tools/check.cjs --fast          skip the two real-time waits (15 s no-advance, 12 s auto)
//   node atlas/tools/check.cjs --url=http://localhost:8080   run against the host server instead of file://
//   node atlas/tools/check.cjs --dist=<dir>    check another build folder
//   node atlas/tools/check.cjs --uc=<id>,<id>  only these use cases (the first one in the library is always walked too)
// For each edition: loads the library, opens every use case, walks every step with the keyboard, and fails on
//   console errors, HTML text under 14px, canvas text under 12px at 1600x900, text overflow or label collisions the
//   engine reports, a node without a position, another account's name in the DOM, a step that advances by itself,
//   a control that does nothing, and content that does not fit at 1600x900 or 1280x720.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), url = require('url');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const fast = process.argv.includes('--fast');
const root = path.resolve(arg('dist', path.join(__dirname, '..', 'dist'))); // --dist=<dir> reads another build folder
const EDITIONS = {
  general: { label: 'General edition', forbid: ['MSK', 'Memorial Sloan', 'Sloan Kettering', 'NYU', 'Langone', 'NYULH'], account: false },
  msk: { label: 'Prepared for Memorial Sloan Kettering Cancer Center', org: 'Memorial Sloan Kettering Cancer Center', forbid: ['NYU', 'Langone', 'NYULH'], account: true },
  nyulh: { label: 'Prepared for NYU Langone Health', org: 'NYU Langone Health', forbid: ['MSK', 'Memorial Sloan', 'Sloan Kettering'], account: true },
};
const fails = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails.push(msg); console.log('  FAIL ' + msg); } return cond; };

/* Runs in the page: every visible text node must be at least 14px; no other account may be named; boxes must not clip. */
const domAudit = (forbid) => {
  const small = [], clipped = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) {
    const txt = n.nodeValue.trim(); if (!txt) continue;
    const el = n.parentElement; if (!el || ['SCRIPT', 'STYLE'].includes(el.tagName)) continue;
    if (!el.getClientRects().length) continue;
    if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const px = parseFloat(getComputedStyle(el).fontSize);
    if (px < 14) small.push(`${px}px "${txt.slice(0, 40)}"`);
  }
  document.querySelectorAll('.top, .bar, #now, #stageHead, #summary, #strip .gl, #ucName, .approval, header, .queue, .card h3').forEach((el) => {
    if (!el.getClientRects().length) return;
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) clipped.push(`${el.id || el.className}: content ${el.scrollWidth}x${el.scrollHeight} in box ${el.clientWidth}x${el.clientHeight}`);
  });
  const html = document.documentElement.outerHTML;
  const names = forbid.filter((f) => html.includes(f) || html.toLowerCase().includes(f.toLowerCase()) && f.length > 4);
  return { small, clipped, names, pageOverflow: document.documentElement.scrollWidth > window.innerWidth + 1 };
};

(async () => {
  const eds = arg('ed', 'general,msk,nyulh').split(',');
  const browser = await chromium.launch();
  for (const ed of eds) {
    const E = EDITIONS[ed], base = arg('url', '') ? `${arg('url', '').replace(/\/$/, '')}/${ed}` : url.pathToFileURL(path.join(root, ed)).href;
    if (!fs.existsSync(path.join(root, ed, 'index.html'))) { ok(false, `${ed}: not built. Run node atlas/build.mjs`); continue; }
    console.log(`\n== ${ed} ==`);
    const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push('page error: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console error: ' + m.text()); });
    page.on('requestfailed', (r) => errors.push('request failed: ' + r.url()));
    const dom = async (where) => {
      const a = await page.evaluate(domAudit, E.forbid);
      ok(!a.small.length, `${ed} ${where}: HTML text under 14px: ${a.small.slice(0, 4).join('; ')}`);
      ok(!a.clipped.length, `${ed} ${where}: clipped or overflowing box: ${a.clipped.slice(0, 3).join('; ')}`);
      ok(!a.names.length, `${ed} ${where}: another account is named in the DOM: ${a.names.join(', ')}`);
      ok(!a.pageOverflow, `${ed} ${where}: page is wider than the window`);
    };

    /* ---------- library ---------- */
    await page.goto(`${base}/index.html`); await page.waitForSelector('.card');
    const cat = await page.evaluate(() => ATLAS.catalog);
    ok((await page.textContent('#edition')) === E.label, `${ed} library: header label should be "${E.label}"`);
    ok((await page.locator('.card').count()) === cat.length, `${ed} library: one card per use case`);
    ok((await page.locator('#acctHead').count()) === (E.account ? 1 : 0), `${ed} library: account section ${E.account ? 'missing' : 'must not exist'}`);
    if (E.account) {
      ok((await page.textContent('#acctHead')) === `For ${E.org}: hypotheses to validate`, `${ed} library: the account section heading names the organization`);
      ok(await page.evaluate(() => { const h = Array.from(document.querySelectorAll('#lists h2')); return h[0] && h[0].id === 'acctHead' && document.querySelectorAll('#lists .grid')[0].querySelectorAll('.card').length === ATLAS.catalog.filter((c) => c.account).length; }), `${ed} library: the account use cases come first`);
    }
    ok((await page.locator('#fCat button', { hasText: 'Account' }).count()) === (E.account ? 1 : 0), `${ed} library: Account filter ${E.account ? 'missing' : 'must not exist'}`);
    ok(!(await page.content()).match(/edition switch|data-edition-switch/i) && (await page.locator('a[href*="../"]').count()) === 0, `${ed} library: no way to switch edition`);
    ok((await page.textContent('#lead')).startsWith(`${cat.length} stor`), `${ed} library: the story count in the header matches the catalog`);
    await dom('library');
    for (const [w, h] of [[1280, 720]]) { await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(100); await dom(`library ${w}x${h}`); }
    await page.setViewportSize({ width: 1600, height: 900 });
    // search and filters
    await page.fill('#q', cat[1].short); ok((await page.locator('.card').count()) >= 1 && (await page.locator('.card').count()) < cat.length, `${ed} library: search narrows the list`);
    await page.fill('#q', 'zzzz no such story'); ok((await page.locator('.card').count()) === 0 && (await page.locator('.empty').count()) >= 1, `${ed} library: an empty search says so`);
    await page.fill('#q', '');
    for (const f of ['Flagship', 'Infrastructure', 'AI']) {
      await page.locator('#fCat button', { hasText: new RegExp('^' + f + '$') }).click();
      ok((await page.locator('.card').count()) === cat.filter((c) => c.category === f && !c.account).length, `${ed} library: category filter ${f}`);
    }
    await page.locator('#fCat button', { hasText: 'All' }).click();
    for (const f of ['Security', 'Facilities', 'AI']) {
      await page.locator('#fPillar button', { hasText: new RegExp('^' + f + '$') }).click();
      ok((await page.locator('.card').count()) === cat.filter((c) => c.pillars.includes(f)).length, `${ed} library: pillar filter ${f}`);
    }
    await page.locator('#fPillar button', { hasText: 'All' }).click();
    // queue: build, reorder, persist, play
    await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForSelector('.card');
    await page.click(`[data-q="${cat[2].id}"]`); await page.click(`[data-q="${cat[0].id}"]`);
    ok((await page.locator('#qList li').count()) === 2, `${ed} queue: two items after two clicks`);
    await page.locator('#qList li').nth(1).locator('[data-d="-1"]').click();
    ok((await page.evaluate(() => Queue.get().join(','))) === `${cat[0].id},${cat[2].id}`, `${ed} queue: move up reorders`);
    await page.reload(); await page.waitForSelector('.card');
    ok((await page.locator('#qList li').count()) === 2, `${ed} queue: survives a reload (localStorage)`);
    await dom('library with queue');
    await page.click('#qPlay'); await page.waitForFunction(() => window.__atlas);
    ok((await page.evaluate(() => __atlas.id)) === cat[0].id && (await page.textContent('#qpos')) === 'Queue 1 of 2', `${ed} queue: play starts with the first item`);
    await page.keyboard.press('End'); await page.keyboard.press('ArrowRight'); await page.waitForFunction((id) => window.__atlas && __atlas.id === id, cat[2].id);
    ok((await page.textContent('#qpos')) === 'Queue 2 of 2', `${ed} queue: Right on the summary goes to the next story`);
    await page.goto(`${base}/index.html`); await page.waitForSelector('.card'); await page.click('#qClear');
    ok((await page.locator('#qList li').count()) === 0, `${ed} queue: clear empties it`);
    // a card click opens the presenter
    await page.click(`.card[data-id="${cat[0].id}"] a.open`); await page.waitForFunction(() => window.__atlas);
    ok(page.url().includes(`play.html?uc=${cat[0].id}`), `${ed} library: a card click opens the presenter`);

    /* ---------- every use case, every step ---------- */
    const onlyUc = arg('uc', '');
    for (const [k, c] of cat.entries()) {
      if (onlyUc && !onlyUc.split(',').includes(c.id) && k !== 0) continue;
      await page.goto(`${base}/play.html?uc=${c.id}`); await page.waitForFunction(() => window.__atlas);
      const st = () => page.evaluate(() => __atlas.state());
      ok((await page.textContent('#edition')) === E.label, `${ed} ${c.id}: header label`);
      ok((await st()).auto === false, `${ed} ${c.id}: auto is off by default`);
      const scene = async (where, size1600) => {
        const a = await page.evaluate(() => __atlas.settle());
        ok(!a.overflow.length, `${ed} ${where}: canvas text overflows its box: ${a.overflow.slice(0, 3).join(' | ')}`);
        ok(!a.overlaps.length, `${ed} ${where}: labels collide: ${a.overlaps.slice(0, 3).join(' | ')}`);
        ok(!a.missing.length, `${ed} ${where}: ${a.missing.join(' | ')}`);
        ok(!a.card, `${ed} ${where}: ${a.card}`);
        if (size1600) ok(a.minText >= 12, `${ed} ${where}: canvas text renders at ${a.minText.toFixed(1)}px, under 12px`);
        const ratio = await page.evaluate(() => document.getElementById('stage').getBoundingClientRect().width / window.innerWidth);
        if (size1600) ok(ratio > 0.6 && ratio < 0.72, `${ed} ${where}: the floor plan takes ${(ratio * 100).toFixed(0)}% of the width, expected about two thirds`);
        const sizes = await page.evaluate(() => [parseFloat(getComputedStyle(document.getElementById('stepTitle')).fontSize), parseFloat(getComputedStyle(document.getElementById('say')).fontSize)]);
        ok(sizes[0] >= 30 && sizes[1] >= 20, `${ed} ${where}: step title ${sizes[0]}px (min 30) and narration ${sizes[1]}px (min 20)`);
      };
      for (let p = 0; p < c.steps; p++) {
        const s = await st(); ok(s.pos === p, `${ed} ${c.id}: expected step ${p + 1}, at ${s.pos + 1}`);
        await scene(`${c.id} step ${p + 1}`, true); await dom(`${c.id} step ${p + 1}`);
        if (s.modal) {
          await page.keyboard.press('ArrowRight'); await page.keyboard.press(' '); await page.keyboard.press('PageDown');
          ok((await st()).pos === p, `${ed} ${c.id} step ${p + 1}: the approval must hold the story until someone approves`);
          if (k % 2) await page.click('#bApprove'); else await page.keyboard.press('Enter');
          ok((await st()).approved.includes(p), `${ed} ${c.id} step ${p + 1}: Approve (click or Enter) records the approval`);
          await scene(`${c.id} step ${p + 1} approved`, true); await dom(`${c.id} step ${p + 1} approved`);
        }
        await page.keyboard.press(['ArrowRight', ' ', 'PageDown'][p % 3]);
      }
      ok((await st()).summary, `${ed} ${c.id}: the story ends on the summary`);
      await dom(`${c.id} summary`);
      const sum = await page.textContent('#summary');
      ok(/question to ask/i.test(sum) && /Stays with the hospital/i.test(sum) && /modeled/i.test(sum), `${ed} ${c.id}: summary shows outcomes, the question and what stays`);
      await page.keyboard.press('ArrowRight'); ok((await st()).summary, `${ed} ${c.id}: Right on the summary does not leave the story`);
      await page.keyboard.press('ArrowLeft'); ok((await st()).pos === c.steps - 1, `${ed} ${c.id}: Left goes back`);
      await page.keyboard.press('PageUp'); ok((await st()).pos === c.steps - 2, `${ed} ${c.id}: Page Up goes back`);
      // other audiences and the smaller screen: jump through the steps and audit
      for (const aud of ['2', '3']) {
        await page.keyboard.press(aud);
        for (let p = 0; p < c.steps; p++) { await page.evaluate((q) => __atlas.go(q), p); await scene(`${c.id} step ${p + 1} audience ${aud}`, true); }
      }
      await page.keyboard.press('1');
      await page.setViewportSize({ width: 1280, height: 720 }); await page.waitForTimeout(80);
      for (let p = 0; p < c.steps; p++) { await page.evaluate((q) => __atlas.go(q), p); await scene(`${c.id} step ${p + 1} at 1280x720`, false); await dom(`${c.id} step ${p + 1} at 1280x720`); }
      await page.evaluate(() => __atlas.go(__atlas.steps)); await dom(`${c.id} summary at 1280x720`);
      await page.setViewportSize({ width: 1600, height: 900 });
      // controls
      if (k === 0) {
        await page.evaluate(() => __atlas.go(0));
        const say1 = await page.textContent('#say'); await page.keyboard.press('3'); const say3 = await page.textContent('#say');
        ok(say1 !== say3 && (await st()).aud === 'eng', `${ed} ${c.id}: audience switch changes the narration`);
        await page.click('#aud [data-v="exec"]'); ok((await st()).aud === 'exec', `${ed} ${c.id}: audience buttons work`);
        await page.click('#bDetails'); await page.waitForTimeout(350);
        ok(await page.evaluate(() => document.getElementById('drawer').classList.contains('open') && document.getElementById('drawerBody').textContent.length > 400), `${ed} ${c.id}: Details opens the drawer`);
        await dom(`${c.id} details drawer`);
        await page.keyboard.press('Escape'); ok(await page.evaluate(() => !document.getElementById('drawer').classList.contains('open')), `${ed} ${c.id}: Esc closes the drawer`);
        await page.click('#bMore'); await page.waitForTimeout(300); await page.click('#bCloseDrawer');
        ok(await page.evaluate(() => !document.getElementById('drawer').classList.contains('open')), `${ed} ${c.id}: the card's Details link and the Close button work`);
        await page.click('#bTheme'); ok((await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark', `${ed} ${c.id}: theme toggle`);
        await page.evaluate(() => __atlas.settle()); await dom(`${c.id} dark theme`);
        await page.click('#bTheme');
        await page.click('#bNext'); ok((await st()).pos === 1, `${ed} ${c.id}: Next button`);
        await page.click('#bBack'); ok((await st()).pos === 0, `${ed} ${c.id}: Back button`);
        await page.click('#strip button[data-p="3"]'); ok((await st()).pos === 3, `${ed} ${c.id}: progress strip jumps to a step`);
        const hit = await page.evaluate(() => Array.from(document.querySelectorAll('#strip button, .bar .nav')).map((b) => b.getBoundingClientRect()).every((r) => r.width >= 40 && r.height >= 40));
        ok(hit, `${ed} ${c.id}: strip and nav hit targets are at least 40px`);
        await page.mouse.move(400, 400); await page.waitForTimeout(200);
        // hover: a device tooltip appears
        const pt = await page.evaluate(() => { const h = HOTS.list.find((q) => /^n_/.test(q.id)); const r = document.getElementById('cv').getBoundingClientRect(); return { x: r.left + h.x + h.w / 2, y: r.top + h.y + h.h / 3 }; });
        await page.mouse.move(pt.x, pt.y); await page.waitForTimeout(300);
        ok(await page.evaluate(() => document.getElementById('tip').classList.contains('show')), `${ed} ${c.id}: hovering a device shows its tooltip`);
        await dom(`${c.id} tooltip`); await page.mouse.move(5, 5);
        if (!fast) {
          await page.evaluate(() => __atlas.go(1)); const t0 = Date.now();
          await page.waitForTimeout(15500);
          ok((await st()).pos === 1, `${ed} ${c.id}: the step advanced by itself within ${(Date.now() - t0) / 1000} s`);
          await page.click('#bAuto'); ok((await st()).auto === true, `${ed} ${c.id}: Auto can be switched on`);
          await page.waitForTimeout(13000);
          ok((await st()).pos === 2, `${ed} ${c.id}: with Auto on, one step passes every 12 s (at step ${(await st()).pos + 1})`);
          await page.click('#bAuto'); ok((await st()).auto === false, `${ed} ${c.id}: Auto can be switched off`);
        }
        await page.goto(`${base}/play.html?uc=${c.id}#summary`); await page.waitForFunction(() => window.__atlas);
        await page.click('#bNext'); await page.waitForSelector('.card');
        ok(page.url().includes('index.html'), `${ed} ${c.id}: the summary's Library button returns to the library`);
      }
      process.stdout.write(`  ${c.id} ok so far (${fails.length} failures)\n`);
    }
    // a use case that is not in this edition must not load
    await page.goto(`${base}/play.html?uc=not-in-this-edition`); await page.waitForSelector('#fatal');
    ok(true, 'unknown use case shows a clear message');
    const real = errors.filter((e) => !/not-in-this-edition|ATLAS: This use case is not in this edition/.test(e));
    ok(!real.length, `${ed}: ${real.length} console or page error(s): ${real.slice(0, 3).join(' | ')}`);
    // nothing in the edition's files names the other account (belt and braces; the build checks this too)
    const walk = (d) => fs.readdirSync(d).flatMap((f) => { const p = path.join(d, f); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
    walk(path.join(root, ed)).forEach((p) => { const t = fs.readFileSync(p, 'utf8'); E.forbid.forEach((w) => ok(!t.includes(w), `${ed}: file ${path.relative(root, p)} contains "${w}"`)); });
    await context.close();
  }
  await browser.close();
  console.log(`\n${checks} checks, ${fails.length} failed.`);
  if (fails.length) { console.log(Array.from(new Set(fails)).slice(0, 80).map((f) => ' - ' + f).join('\n')); process.exit(1); }
  console.log('All editions pass.');
})().catch((e) => { console.error(e); process.exit(1); });
