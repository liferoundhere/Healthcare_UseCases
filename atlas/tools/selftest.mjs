// Proves the authoring path and the build guards, without touching atlas/usecases or atlas/dist.
//   node atlas/tools/selftest.mjs
// 1. The template (inline narrative, reused floor plan) builds as a shared use case and as an account use case.
// 2. An account use case lands only in its own edition.
// 3. The build fails when a node has no position, when an account use case names the other account,
//    when the text holds an em dash, when the floor plan does not exist, and when a scene.labels or scene.hide
//    override matches nothing in the floor plan.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url)), atlas = join(here, '..');
const template = readFileSync(join(atlas, 'usecases/_template.mjs'), 'utf8');
let failed = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) failed++; };
function build(mutate) {
  const dir = mkdtempSync(join(tmpdir(), 'atlas-selftest-')), uc = join(dir, 'usecases'), out = join(dir, 'dist');
  cpSync(join(atlas, 'usecases'), uc, { recursive: true });
  writeFileSync(join(uc, '900-template-test.mjs'), mutate(template));
  let res;
  try { res = { ok: true, log: execFileSync('node', [join(atlas, 'build.mjs'), `--usecases=${uc}`, `--out=${out}`], { encoding: 'utf8', stdio: 'pipe' }), out, dir }; }
  catch (e) { res = { ok: false, log: String(e.stderr || '') + String(e.stdout || ''), out, dir }; }
  return res;
}
const has = (r, ed) => existsSync(join(r.out, ed, 'data/uc-template-nurse-call.js'));
const done = (r) => rmSync(r.dir, { recursive: true, force: true });

let r = build((s) => s);
ok(r.ok && has(r, 'general') && has(r, 'msk') && has(r, 'nyulh'), 'shared template builds into all three editions'); done(r);

r = build((s) => s.replace("editions: ['general', 'msk', 'nyulh']", "editions: ['msk']").replace("category: 'Infrastructure'", "category: 'Account'"));
ok(r.ok && has(r, 'msk') && !has(r, 'general') && !has(r, 'nyulh'), 'an account use case lands only in its own edition');
if (r.ok) ok(!readFileSync(join(r.out, 'general/data/catalog.js'), 'utf8').includes('template-nurse-call') && !readFileSync(join(r.out, 'nyulh/index.html'), 'utf8').includes('template-nurse-call'), 'the other editions do not mention it anywhere'); done(r);

r = build((s) => s.replace('idf: [120, 320], ', ''));
ok(!r.ok && /node "idf".*has no position/.test(r.log), 'a node without a position stops the build'); done(r);

r = build((s) => s.replace("editions: ['general', 'msk', 'nyulh']", "editions: ['msk']").replace('A medical floor, its access points', 'A medical floor like the one at NYU Langone, its access points'));
ok(!r.ok && /forbidden account name/.test(r.log), 'an MSK use case that names the other account stops the build'); done(r);

r = build((s) => s.replace("editions: ['general', 'msk', 'nyulh']", "editions: ['nyulh']").replace('A medical floor, its access points', 'A medical floor like Memorial Sloan Kettering, its access points'));
ok(!r.ok && /forbidden account name/.test(r.log), 'an NYULH use case that names the other account stops the build'); done(r);

r = build((s) => s.replace('A medical floor, its access points', 'A medical floor at MSK, its access points'));
ok(!r.ok && /forbidden account name/.test(r.log), 'a shared use case that names an account stops the build'); done(r);

r = build((s) => s.replace('The badge rings late.', 'The badge rings late — again.'));
ok(!r.ok && /em or en dash/.test(r.log), 'an em dash stops the build'); done(r);

r = build((s) => s.replace("decor: 'wifi',", "decor: 'no-such-plan',"));
ok(!r.ok && /is not a floor plan/.test(r.log), 'an unknown floor plan stops the build'); done(r);

r = build((s) => s.replace("callout: { node: 'canvas'", "callout: { node: 'nobody'"));
ok(!r.ok && /callout points at "nobody"/.test(r.log), 'a callout on an unknown node stops the build'); done(r);

// overrides of a reused floor plan: a label or dressing id that the plan does not draw is a typo, and stops the build
const LBLS = "zoneLabels: { floor: 'Medical floor', sys: 'Clinical systems' },";
r = build((s) => s.replace(LBLS, LBLS + " labels: { 'Room 411': 'Room 7', stairwell: null, sys: 'Nurse call systems' }, hide: ['cloud', 'wifi-waves'],"));
ok(r.ok && /"labels":\{"Room 411":"Room 7","stairwell":null/.test(readFileSync(join(r.out, 'general/data/uc-template-nurse-call.js'), 'utf8')), 'scene.labels and scene.hide that match the floor plan build'); done(r);

r = build((s) => s.replace(LBLS, LBLS + " labels: { 'Room 441': 'Room 7' },"));
ok(!r.ok && /scene\.labels "Room 441" matches no label of the floor plan "wifi"/.test(r.log), 'a scene.labels key that matches nothing stops the build'); done(r);

r = build((s) => s.replace(LBLS, LBLS + " hide: ['ambulance'],"));
ok(!r.ok && /scene\.hide "ambulance" matches no dressing of the floor plan "wifi"/.test(r.log), 'a scene.hide id that matches nothing stops the build'); done(r);

r = build((s) => s.replace(LBLS, LBLS + " labels: { 'Room 411': 7 },"));
ok(!r.ok && /must be a text, or null/.test(r.log), 'a scene.labels value that is not a text or null stops the build'); done(r);

// the narrative can also live in a narrative file instead of inline
{
  const dir = mkdtempSync(join(tmpdir(), 'atlas-selftest-')), uc = join(dir, 'usecases'), nar = join(dir, 'narratives'), out = join(dir, 'dist');
  cpSync(join(atlas, 'usecases'), uc, { recursive: true }); mkdirSync(nar);
  const t = structuredClone((await import(pathToFileURL(join(atlas, 'usecases/_template.mjs')).href)).default);
  writeFileSync(join(nar, 'template.json'), JSON.stringify(Object.assign({ id: t.id }, t.narr)));
  delete t.narr; writeFileSync(join(uc, '900-template-test.mjs'), 'export default ' + JSON.stringify(t) + ';\n');
  let good = true; try { execFileSync('node', [join(atlas, 'build.mjs'), `--usecases=${uc}`, `--narratives=${nar}`, `--out=${out}`], { stdio: 'pipe' }); } catch { good = false; }
  ok(good && existsSync(join(out, 'general/data/uc-template-nurse-call.js')), 'a narrative supplied as a file in narratives/ builds');
  rmSync(dir, { recursive: true, force: true });
}

console.log(failed ? `${failed} self-test(s) failed` : 'Self-test passed.');
process.exit(failed ? 1 : 0);
