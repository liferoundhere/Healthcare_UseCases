// Publish one built edition to here.now as a static site.
//   node atlas/tools/publish-herenow.mjs <edition>        (general | msk | nyulh)
// Anonymous by default (the site expires after 24 hours). Set HERENOW_API_KEY for a permanent site.
// The response (site URL, claim URL) is saved to atlas/.herenow/<edition>.json, which is git-ignored.
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
const ed = process.argv[2]; if (!["general", "msk", "nyulh"].includes(ed)) { console.error("usage: publish-herenow.mjs general|msk|nyulh"); process.exit(1); }
const root = fileURLToPath(new URL(`../dist/${ed}/`, import.meta.url));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root).map((p) => ({ abs: p, path: relative(root, p).split("\\").join("/"), size: statSync(p).size, contentType: TYPES[extname(p)] || "application/octet-stream" }));
const H = { "X-HereNow-Client": "claude-code/direct-api", "content-type": "application/json", ...(process.env.HERENOW_API_KEY ? { Authorization: `Bearer ${process.env.HERENOW_API_KEY}` } : {}) };
const j = async (r) => { const t = await r.text(); if (!r.ok) throw new Error(`${r.status} ${t.slice(0, 300)}`); return JSON.parse(t); };
const created = await j(await fetch("https://here.now/api/v1/publish", { method: "POST", headers: H, body: JSON.stringify({ files: files.map(({ path, size, contentType }) => ({ path, size, contentType })) }) }));
const up = created.upload;
for (const u of up.uploads) { const f = files.find((x) => x.path === u.path); const r = await fetch(u.url, { method: u.method || "PUT", headers: { "content-type": f.contentType, ...(u.headers || {}) }, body: readFileSync(f.abs) }); if (!r.ok) throw new Error(`upload ${u.path}: ${r.status}`); }
const done = await j(await fetch(`https://here.now/api/v1/publish/${created.slug}/finalize`, { method: "POST", headers: H, body: JSON.stringify({ versionId: up.versionId }) }));
const out = fileURLToPath(new URL("../.herenow/", import.meta.url)); mkdirSync(out, { recursive: true });
writeFileSync(join(out, `${ed}.json`), JSON.stringify({ created: { ...created, upload: undefined }, done }, null, 1));
console.log(ed, files.length, "files ->", done.siteUrl, "\nclaim:", done.claimUrl ?? created.claimUrl ?? "(none)", "\nexpires:", done.expiresAt ?? created.expiresAt ?? "");
