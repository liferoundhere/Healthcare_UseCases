// Builds one self-contained HTML file from src/*.js plus the shared narrative.
//   node build.mjs   ->  healthcare-2d-models.html   (open it directly, no server needed)
// The narrative (nodes, links, step states, narration, facts, caveats) is read from
// ../stage/js/narrative.js, which tools/gen_narrative.mjs generates from app/src/scenes.ts.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const narr = readFileSync(join(here, '../stage/js/narrative.js'), 'utf8').replace(/^export const NARR/m, 'const NARR');
const files = readdirSync(join(here, 'src')).filter((f) => /^\d\d-.*\.js$/.test(f)).sort();
const body = files.map((f) => `/* ---- ${f} ---- */\n${readFileSync(join(here, 'src', f), 'utf8')}`).join('\n');
const html = readFileSync(join(here, 'src/template.html'), 'utf8').replace('/*__NARR__*/', () => narr).replace('/*__BODY__*/', () => body);
if (/[\u2014\u2013]/.test(html)) {
  const i = html.search(/[\u2014\u2013]/);
  throw new Error('em or en dash found near: ' + html.slice(Math.max(0, i - 60), i + 60).replace(/\n/g, ' '));
}
const out = join(here, 'healthcare-2d-models.html');
writeFileSync(out, html);
console.log(`${files.length} source files -> ${out} (${(html.length / 1024).toFixed(0)} KB)`);
