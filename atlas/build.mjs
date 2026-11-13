// Builds three separate static sites, one per edition:
//   node atlas/build.mjs            ->  atlas/dist/general/  atlas/dist/msk/  atlas/dist/nyulh/
//   node atlas/build.mjs --only=msk     build one edition
//   node atlas/build.mjs --usecases=<dir> --out=<dir>   other input and output folders (tools/selftest.mjs)
// Each site holds index.html (library), play.html (presenter), css/, js/ and data/ and contains only that
// edition's content. The build fails if a use case is incomplete, if a node has no position, if the text
// contains an em dash, an en dash or an emoji, or if an edition's output names another account.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
// --usecases=<dir> and --out=<dir> point the build at other folders (used by tools/selftest.mjs)
const flagValue = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : ''; };
const read = (...p) => readFileSync(join(here, ...p), 'utf8');

/* ------------------------------------------------------------------ editions */
const NAMES_MSK = ['MSK', /memorial\s+sloan/i, /sloan[\s-]*kettering/i, /\bMSKCC\b/];
const NAMES_NYU = ['NYU', /langone/i, /nyulh/i];
export const EDITIONS = {
  general: { label: 'General edition', forbid: [...NAMES_MSK, ...NAMES_NYU] },
  msk: { label: 'Prepared for Memorial Sloan Kettering Cancer Center', forbid: NAMES_NYU },
  nyulh: { label: 'Prepared for NYU Langone Health', forbid: NAMES_MSK },
};
const ALL = Object.keys(EDITIONS);
const CATEGORIES = ['Flagship', 'Infrastructure', 'AI', 'Account'];
const PILLARS = ['Security', 'Facilities', 'AI'];
const STATES = ['ok', 'warn', 'down', 'pending', 'unknown', 'idle', 'off'];

/* ------------------------------------------------------------------ sources */
const engineFiles = readdirSync(join(here, 'src/engine')).filter((f) => /^\d\d-.*\.js$/.test(f)).sort();
const engineSrc = engineFiles.map((f) => ({ f, src: read('src/engine', f) }));
/* A floor plan file may start with "// @editions msk" to keep it out of the other editions. */
const editionsOfFile = (src) => { const m = src.match(/^\/\/\s*@editions\s+([a-z ,]+)$/m); return m ? m[1].split(/[ ,]+/).filter(Boolean) : ALL; };
const decorIdsIn = (src) => Array.from(src.matchAll(/^DECOR\.([A-Za-z0-9_]+)\s*=/gm)).map((m) => m[1]);
const ICONS = new Set(Array.from(engineSrc.map((e) => e.src).join('\n').matchAll(/case '([a-z]+)':/g)).map((m) => m[1]));

/* What each floor plan offers to scene.labels and scene.hide. The engine is run once without a browser: every
   drawing call lands on a stub, and the plan's label and dressing hooks (LBL, HID in 00-core.js) record what they
   were asked for. So the list always matches the drawing code, and an override that matches nothing can be rejected. */
function decorRegistry() {
  const stub = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : stub), apply: () => stub, set: () => true });
  const box = vm.createContext({ document: { documentElement: { dataset: {} } }, console, Math, stub });
  vm.runInContext(engineSrc.map((e) => e.src).join('\n'), box, { filename: 'engine.js' });
  return vm.runInContext(`(() => {
    ctx = stub; TEXTSTAT.mute = true; const out = {};
    Object.keys(DECOR).forEach((id) => {
      const c = { id: 'registry-' + id, code: '', chips: [], legacy: { silos: [] }, scene: { decor: id, pos: {} }, N: { nodes: [], zones: [], links: [], steps: [{ phase: 'today' }, { phase: 'cisco' }] } };
      setDecorOverrides(c.scene); DECOR_OV.seen = { labels: new Set(), hide: new Set() };
      DECOR[id](makeScene(c, 'legacy', 0, 1, 0, { dt: 0, aud: 'exec' }));
      out[id] = { labels: Array.from(DECOR_OV.seen.labels), hide: Array.from(DECOR_OV.seen.hide) };
    });
    return out;
  })()`, box);
}
const ovKey = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase();

async function loadNarratives() {
  const map = new Map();
  // 1. the shared narrative generated from app/src/scenes.ts (read only, never edited here)
  const base = join(here, '../stage/js/narrative.js');
  if (existsSync(base)) (await import(pathToFileURL(base).href)).NARR.forEach((n) => map.set(n.id, n));
  // 2. extra narrative files in atlas/narratives: .json or .mjs, one narrative or an array of them
  const dir = flagValue('narratives') || join(here, 'narratives');
  for (const f of existsSync(dir) ? readdirSync(dir).sort() : []) {
    let v = null;
    if (f.endsWith('.json')) v = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    else if (f.endsWith('.mjs')) { const m = await import(pathToFileURL(join(dir, f)).href); v = m.default || m.NARR; }
    else continue;
    (Array.isArray(v) ? v : [v]).forEach((n) => { if (!n || !n.id) throw new Error(`narratives/${f}: every narrative needs an id`); map.set(n.id, n); });
  }
  return map;
}

async function loadCases(narr) {
  const dir = flagValue('usecases') || join(here, 'usecases'), out = [];
  for (const f of readdirSync(dir).filter((x) => /\.mjs$/.test(x) && !x.startsWith('_')).sort()) {
    const c = structuredClone((await import(pathToFileURL(join(dir, f)).href)).default);
    c._file = 'usecases/' + f;
    // narrative: inline `narr` wins, then a narrative with the same id (or the id named in `narrId`)
    c.N = c.narr || narr.get(c.narrId || c.id) || null; delete c.narr;
    if (c.scene && !c.scene.decor) c.scene.decor = c.id;
    out.push(c);
  }
  return out;
}

/* ------------------------------------------------------------------ validation */
function validateCase(c, decorIds, errs, registry = {}) {
  const E = (m) => errs.push(`${c._file}: ${m}`);
  const str = (o, k, where = '') => { if (typeof o[k] !== 'string' || !o[k].trim()) E(`missing text field ${where}${k}`); };
  ['id', 'code', 'short', 'name', 'setting', 'vision', 'ask'].forEach((k) => str(c, k));
  if (!/^[a-z0-9-]+$/.test(c.id || '')) E('id must be lower case letters, digits and hyphens');
  if (!Array.isArray(c.editions) || !c.editions.length || c.editions.some((e) => !ALL.includes(e))) E(`editions must list one or more of ${ALL.join(', ')}`);
  else {
    const shared = c.editions.includes('general');
    if (shared && c.editions.length !== ALL.length) E('a shared use case lists all editions: ["general","msk","nyulh"]');
    if (!shared && c.editions.length !== 1) E('an account use case lists exactly one edition: ["msk"] or ["nyulh"]');
    if (c.category === 'Account' && shared) E('category "Account" cannot be in the general edition');
  }
  if (!CATEGORIES.includes(c.category)) E(`category must be one of ${CATEGORIES.join(', ')}`);
  if (!Array.isArray(c.pillars) || !c.pillars.length || c.pillars.some((p) => !PILLARS.includes(p))) E(`pillars must be a list drawn from ${PILLARS.join(', ')}`);
  if (!Array.isArray(c.personas) || !c.personas.length) E('personas must be a non-empty list');
  if (!Array.isArray(c.kpis) || !c.kpis.length) E('kpis must be a non-empty list');
  if (!c.legacy) E('missing legacy'); else {
    ['banner', 'strip'].forEach((k) => str(c.legacy, k, 'legacy.'));
    if (!Array.isArray(c.legacy.silos) || c.legacy.silos.length < 1 || c.legacy.silos.length > 6) E('legacy.silos needs 1 to 6 rows of [name, what it sees, "" or "p", icon]');
    else c.legacy.silos.forEach((s) => { if (s[3] && !ICONS.has(s[3])) E(`legacy.silos icon "${s[3]}" does not exist`); });
    if (!Array.isArray(c.legacy.gaps) || !c.legacy.gaps.length) E('legacy.gaps must be a non-empty list');
    if (!Array.isArray(c.legacy.big) || c.legacy.big.length !== 2) E('legacy.big must be [value, label]');
  }
  if (!c.tobe) E('missing tobe'); else {
    ['banner', 'strip', 'stays'].forEach((k) => str(c.tobe, k, 'tobe.'));
    const cs = c.tobe.console;
    if (!cs || !cs.title || !cs.body || !Array.isArray(cs.rows) || !cs.rows.length) E('tobe.console needs title, body and rows of [item, today, with Cloud Control, step, icon]');
  }
  ['hops', 'outcomes', 'pathNote'].forEach((k) => { if (!c[k] || !c[k].legacy || !c[k].tobe) E(`${k} needs both legacy and tobe`); });
  if (c.hops && c.hops.legacy && c.hops.tobe) ['legacy', 'tobe'].forEach((m) => { if (c.hops[m].length !== 4) E(`hops.${m} needs exactly 4 hops`); });
  if (c.outcomes && c.outcomes.legacy && c.outcomes.tobe) ['legacy', 'tobe'].forEach((m) => { if (c.outcomes[m].length !== 3) E(`outcomes.${m} needs exactly 3 rows`); c.outcomes[m].forEach((o) => { if (!['S', 'H', 'I'].includes(o[2])) E(`outcomes.${m}: "${o[0]}" needs a provenance tag S, H or I`); }); });
  if (!Array.isArray(c.tiles)) E('tiles must be a list'); else c.tiles.forEach((t) => { if (!['S', 'H', 'I'].includes(t.tag)) E(`tile "${t.l}" needs a provenance tag S, H or I`); });

  // scene and narrative
  if (!c.scene || !c.scene.pos) { E('missing scene.pos'); return; }
  if (!decorIds.includes(c.scene.decor)) E(`scene.decor "${c.scene.decor}" is not a floor plan. Available: ${decorIds.join(', ')}`);
  // overrides of a reused floor plan: every key must match something the plan draws
  const reg = registry[c.scene.decor];
  if (c.scene.labels != null) {
    if (typeof c.scene.labels !== 'object' || Array.isArray(c.scene.labels)) E('scene.labels must be an object: { "<label text or zone id>": "New label" or null }');
    else if (reg) Object.entries(c.scene.labels).forEach(([k, v]) => {
      if (v !== null && typeof v !== 'string') E(`scene.labels "${k}" must be a text, or null to hide the label`);
      if (!reg.labels.includes(ovKey(k))) E(`scene.labels "${k}" matches no label of the floor plan "${c.scene.decor}". It draws: ${reg.labels.join(', ')}`);
    });
  }
  if (c.scene.hide != null) {
    if (!Array.isArray(c.scene.hide)) E('scene.hide must be a list of dressing ids');
    else if (reg) c.scene.hide.forEach((k) => { if (!reg.hide.includes(k)) E(`scene.hide "${k}" matches no dressing of the floor plan "${c.scene.decor}". It offers: ${reg.hide.join(', ') || 'nothing'}`); });
  }
  if (c.scene.zoneLabels && reg) Object.keys(c.scene.zoneLabels).forEach((k) => { if (!reg.labels.includes(ovKey(k))) E(`scene.zoneLabels "${k}" is not a zone of the floor plan "${c.scene.decor}"`); });
  const N = c.N;
  if (!N) { E(`no narrative: add a "narr" field, or a file in atlas/narratives with id "${c.narrId || c.id}"`); return; }
  ['subtitle', 'caveat'].forEach((k) => { if (typeof N[k] !== 'string' || !N[k].trim()) E(`narrative is missing ${k}`); });
  if (!Array.isArray(N.nodes) || !Array.isArray(N.links) || !Array.isArray(N.zones) || !Array.isArray(N.steps)) { E('narrative needs nodes, zones, links and steps'); return; }
  const nodeIds = new Set(N.nodes.map((n) => n.id)), linkIds = new Set(N.links.map((l) => l.id)), zoneIds = new Set(N.zones.map((z) => z.id));
  N.nodes.forEach((n) => {
    const p = c.scene.pos[n.id];
    if (!p) E(`node "${n.id}" (${n.title}) has no position in scene.pos`);
    else if (!(p[0] >= 30 && p[0] <= 710 && p[1] >= 70 && p[1] <= 440)) E(`node "${n.id}" position [${p[0]}, ${p[1]}] is outside the scene (x 30 to 710, y 70 to 440)`);
    if (!ICONS.has(n.icon)) E(`node "${n.id}" uses icon "${n.icon}", which does not exist`);
    if (!n.title || !n.sub || ['exec', 'dir', 'eng'].some((a) => typeof n.sub[a] !== 'string')) E(`node "${n.id}" needs title and sub.exec, sub.dir, sub.eng`);
  });
  Object.keys(c.scene.pos).forEach((id) => { if (!nodeIds.has(id)) E(`scene.pos has "${id}", which is not a node in the narrative`); });
  N.links.forEach((l) => { if (!nodeIds.has(l.a) || !nodeIds.has(l.b)) E(`link "${l.id}" joins a node that does not exist`); });
  const today = N.steps.filter((s) => s.phase === 'today'), cisco = N.steps.filter((s) => s.phase === 'cisco');
  if (!today.length || !cisco.length) E('narrative needs at least one "today" step and one "cisco" step');
  if (N.steps.findIndex((s) => s.phase === 'cisco') < today.length) E('all "today" steps must come before the "cisco" steps');
  N.steps.forEach((s, k) => {
    const W = `step ${k + 1}`;
    if (!['today', 'cisco'].includes(s.phase)) E(`${W}: phase must be "today" or "cisco"`);
    if (!s.title || !s.say || ['exec', 'dir', 'eng'].some((a) => typeof s.say[a] !== 'string' || !s.say[a])) E(`${W}: needs title and say.exec, say.dir, say.eng`);
    Object.entries(s.n || {}).forEach(([id, v]) => { if (!nodeIds.has(id)) E(`${W}: n.${id} is not a node`); if (!STATES.includes(v)) E(`${W}: n.${id} has unknown state "${v}"`); });
    Object.entries(s.l || {}).forEach(([id, v]) => { if (!linkIds.has(id)) E(`${W}: l.${id} is not a link`); if (!STATES.includes(v)) E(`${W}: l.${id} has unknown state "${v}"`); });
    Object.keys(s.label || {}).forEach((id) => { if (!nodeIds.has(id)) E(`${W}: label.${id} is not a node`); });
    (s.show || []).concat(s.hide || []).forEach((id) => { if (!nodeIds.has(id) && !zoneIds.has(id)) E(`${W}: show/hide "${id}" is neither a node nor a zone`); });
    if (s.callout && !nodeIds.has(s.callout.node)) E(`${W}: callout points at "${s.callout.node}", which is not a node`);
    if (s.modal && (!s.modal.title || !Array.isArray(s.modal.lines) || !s.modal.lines.length)) E(`${W}: modal needs title and lines`);
    (s.facts || []).forEach((f) => { if (!f.v || !f.l || !f.s) E(`${W}: every fact needs v (value), l (label) and s (source)`); });
  });
}

/* ------------------------------------------------------------------ text guards */
const DASH = /[‒-―]/;
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
function guardText(name, text, forbid, errs) {
  const near = (i) => text.slice(Math.max(0, i - 50), i + 50).replace(/\s+/g, ' ');
  let m = text.match(DASH); if (m) errs.push(`${name}: em or en dash near "${near(m.index)}"`);
  m = text.match(EMOJI); if (m) errs.push(`${name}: emoji near "${near(m.index)}"`);
  forbid.forEach((w) => { const i = typeof w === 'string' ? text.indexOf(w) : text.search(w); if (i >= 0) errs.push(`${name}: forbidden account name (${w}) near "${near(i)}"`); });
}
function walk(dir) { return readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; }); }

/* ------------------------------------------------------------------ build */
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const narr = await loadNarratives();
const cases = await loadCases(narr);
const allDecor = engineSrc.flatMap((e) => decorIdsIn(e.src));
const errs = [];
const seen = new Set();
const registry = decorRegistry();
if (process.argv.includes('--plans')) { Object.entries(registry).forEach(([id, r]) => console.log(`${id}\n  labels: ${r.labels.join(' | ')}\n  hide:   ${r.hide.join(' | ') || '(nothing)'}`)); process.exit(0); }
cases.forEach((c) => { if (seen.has(c.id)) errs.push(`${c._file}: duplicate id "${c.id}"`); seen.add(c.id); validateCase(c, allDecor, errs, registry); });
if (errs.length) { console.error(`Build stopped: ${errs.length} problem(s) in the use case data.\n  ` + errs.join('\n  ')); process.exit(1); }

const dist = flagValue('out') || join(here, 'dist');
const report = [];
for (const ed of ALL.filter((e) => !only || e === only)) {
  const E = EDITIONS[ed], out = join(dist, ed);
  rmSync(out, { recursive: true, force: true });
  ['css', 'js', 'data'].forEach((d) => mkdirSync(join(out, d), { recursive: true }));
  const mine = cases.filter((c) => c.editions.includes(ed));

  // engine: every floor plan file allowed in this edition
  const eng = engineSrc.filter((e) => editionsOfFile(e.src).includes(ed));
  const decorHere = eng.flatMap((e) => decorIdsIn(e.src));
  mine.forEach((c) => { if (!decorHere.includes(c.scene.decor)) errs.push(`${c._file}: floor plan "${c.scene.decor}" is not part of the ${ed} edition`); });
  writeFileSync(join(out, 'js/engine.js'), eng.map((e) => `/* ---- ${e.f} ---- */\n${e.src}`).join('\n'));
  ['common.js', 'library.js', 'player.js'].forEach((f) => writeFileSync(join(out, 'js', f), read('src/web', f)));
  writeFileSync(join(out, 'css/atlas.css'), read('src/web/atlas.css'));

  // data: a light catalog for the library, one file per use case for the presenter
  const decorZones = {};
  const catalog = mine.map((c) => {
    const N = c.N, today = N.steps.filter((s) => s.phase === 'today').length;
    const chips = new Map(); N.steps.forEach((s) => (s.chips || []).forEach((q) => chips.set(q[0], q[1])));
    const full = Object.assign({}, c, { chips: Array.from(chips.entries()), account: !c.editions.includes('general') });
    delete full._file; delete full.editions; delete full.narrId;
    full.N = { id: c.id, subtitle: N.subtitle, caveat: N.caveat, nodes: N.nodes, zones: N.zones, links: N.links, steps: N.steps };
    writeFileSync(join(out, 'data', `uc-${c.id}.js`), `ATLAS.cases[${JSON.stringify(c.id)}] = ${JSON.stringify(full)};\n`);
    if (c.scene.decor === c.id || !decorZones[c.scene.decor]) decorZones[c.scene.decor] = Object.fromEntries(N.zones.map((z) => [z.id, z.label]));
    return { id: c.id, code: c.code, category: c.category, account: full.account, pillars: c.pillars, short: c.short, name: c.name, setting: c.setting, situation: c.situation || N.subtitle, keywords: c.personas, steps: N.steps.length, today, cisco: N.steps.length - today };
  });
  writeFileSync(join(out, 'data/catalog.js'), `window.ATLAS = ${JSON.stringify({ edition: { id: ed, label: E.label }, catalog, decorZones, cases: {} })};\n`);

  const page = (f) => read('src/web', f).replaceAll('{{EDITION_LABEL}}', E.label).replace('{{UC_SCRIPTS}}', mine.map((c) => `<script src="data/uc-${c.id}.js"></script>`).join('\n'));
  writeFileSync(join(out, 'index.html'), page('index.html'));
  writeFileSync(join(out, 'play.html'), page('play.html'));

  // guards over everything that was written
  const files = walk(out);
  files.forEach((p) => {
    const rel = relative(dist, p), text = readFileSync(p, 'utf8');
    guardText(rel, text + '\n' + rel.slice(ed.length), E.forbid, errs);
    if (/\.(html|css)$/.test(p) && /(src|href)\s*=\s*["']?(https?:)?\/\//.test(text)) errs.push(`${rel}: loads something from another host; an edition must be self-contained`);
  });
  const acct = catalog.filter((c) => c.account).length;
  report.push(`${ed.padEnd(8)} ${String(catalog.length).padStart(2)} use cases (${catalog.length - acct} shared, ${acct} account), ${files.length} files, ${(files.reduce((a, p) => a + statSync(p).size, 0) / 1024).toFixed(0)} KB  ->  ${relative(process.cwd(), out)}`);
}
if (errs.length) { console.error(`Build failed: ${errs.length} problem(s) in the output.\n  ` + errs.join('\n  ')); process.exit(1); }
console.log(report.join('\n'));
console.log('Checked: required fields, node positions, link and step references, no em or en dash, no emoji, no other account named in any edition.');
