// Host server for the three editions. Node 18 or later, no dependencies.
//   node atlas/build.mjs && node atlas/server.mjs
// Serves atlas/dist/general at /general/, atlas/dist/msk at /msk/, atlas/dist/nyulh at /nyulh/.
// The root path / never lists editions; it returns a neutral page, and so does every unknown path.
//
// Environment:
//   PORT                 port to listen on (default 8080)
//   HOST                 interface to bind (default 0.0.0.0)
//   ATLAS_CODE_GENERAL   access code for an edition. When set, that edition shows a sign-in page and sets a cookie.
//   ATLAS_CODE_MSK       When unset, that edition is open.
//   ATLAS_CODE_NYULH
//   ATLAS_SLUG_GENERAL   optional path name to use instead of the edition id, for example ATLAS_SLUG_MSK=harbor
//   ATLAS_SLUG_MSK       serves that edition at /harbor/ and /msk/ stops existing. Use this so one customer cannot
//   ATLAS_SLUG_NYULH     guess another customer's address.
//   ATLAS_SECRET         key that signs the cookies. Set it to keep people signed in across restarts.
//   ATLAS_SESSION_HOURS  cookie lifetime in hours (default 12)
//   ATLAS_DIST           folder that holds the built editions (default: dist next to this file)
import { createServer } from 'node:http';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const DIST = process.env.ATLAS_DIST || join(here, 'dist');
const PORT = +(process.env.PORT || 8080), HOST = process.env.HOST || '0.0.0.0';
const SECRET = process.env.ATLAS_SECRET || randomBytes(32).toString('hex');
const HOURS = +(process.env.ATLAS_SESSION_HOURS || 12);
const EDITIONS = ['general', 'msk', 'nyulh'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

/* slug in the URL -> edition */
const routes = new Map();
for (const ed of EDITIONS) {
  const slug = (process.env['ATLAS_SLUG_' + ed.toUpperCase()] || ed).toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(slug)) { console.error(`ATLAS_SLUG_${ed.toUpperCase()} must be lower case letters, digits and hyphens`); process.exit(1); }
  if (routes.has(slug)) { console.error(`Two editions use the path /${slug}/`); process.exit(1); }
  routes.set(slug, { ed, slug, code: process.env['ATLAS_CODE_' + ed.toUpperCase()] || '', dir: join(DIST, ed) });
}

const HEADERS = {
  'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'SAMEORIGIN', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; frame-ancestors 'self'; base-uri 'none'",
};
const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f6f8fa;color:#1d2327;font:18px/1.5 Inter,"Segoe UI",Roboto,Arial,sans-serif}main{background:#fff;border:1px solid #cfd6dc;border-radius:14px;padding:32px 36px;max-width:440px;width:calc(100% - 48px);box-sizing:border-box}h1{font-size:24px;margin:0 0 10px}p{margin:0 0 16px;color:#55616a}label{display:block;font-weight:700;margin-bottom:6px}input{width:100%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1.5px solid #cfd6dc;border-radius:9px;margin-bottom:14px}button{font:inherit;font-weight:700;min-height:46px;padding:0 22px;border:0;border-radius:9px;background:#1B4F8A;color:#fff;cursor:pointer}.err{color:#C62828;font-weight:600}</style></head><body><main>${body}</main></body></html>`;
const NEUTRAL = page('Nothing to show here', '<h1>Nothing to show here</h1><p>This address does not host a public page. If you were given a link, use the full link you received.</p>');
const signinPage = (slug, msg) => page('Sign in', `<h1>Sign in</h1><p>Enter the access code you were given.</p>${msg ? `<p class="err" role="alert">${msg}</p>` : ''}<form method="post" action="/${slug}/signin"><label for="code">Access code</label><input id="code" name="code" type="password" autocomplete="off" autofocus required><button type="submit">Continue</button></form>`);

function send(res, status, body, headers = {}) { res.writeHead(status, Object.assign({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }, HEADERS, headers)); res.end(body); }
const token = (r) => createHmac('sha256', SECRET).update(`${r.ed}|${r.slug}|${r.code}`).digest('hex');
const cookieName = (r) => `atlas_${r.slug.replace(/-/g, '_')}`;
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };
function signedIn(req, r) {
  const m = (req.headers.cookie || '').split(/;\s*/).map((c) => c.split('=')).find((c) => c[0] === cookieName(r));
  return !!m && same(m[1] || '', token(r));
}
/* at most 10 sign-in attempts per address every 10 minutes */
const attempts = new Map();
function tooMany(ip) {
  const now = Date.now(), list = (attempts.get(ip) || []).filter((t) => now - t < 600000);
  list.push(now); attempts.set(ip, list);
  if (attempts.size > 5000) attempts.clear();
  return list.length > 10;
}
function readBody(req) {
  return new Promise((resolve) => { let b = ''; req.on('data', (d) => { b += d; if (b.length > 4096) { b = ''; req.destroy(); } }); req.on('end', () => resolve(b)); req.on('error', () => resolve('')); });
}

const server = createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://x'); let path;
    try { path = decodeURIComponent(u.pathname); } catch { return send(res, 400, NEUTRAL); }
    if (path === '/healthz') return send(res, 200, 'ok', { 'Content-Type': 'text/plain; charset=utf-8' });
    if (path === '/robots.txt') return send(res, 200, 'User-agent: *\nDisallow: /\n', { 'Content-Type': 'text/plain; charset=utf-8' });
    const parts = path.split('/').filter(Boolean), r = routes.get((parts[0] || '').toLowerCase());
    if (!r || !existsSync(join(r.dir, 'index.html'))) return send(res, path === '/' ? 200 : 404, NEUTRAL);
    if (parts.length === 1 && !path.endsWith('/')) return send(res, 302, '', { Location: `/${r.slug}/${u.search}` });
    const rest = parts.slice(1).join('/');
    const secure = req.headers['x-forwarded-proto'] === 'https' || !!req.socket.encrypted;
    const cookie = (v, age) => `${cookieName(r)}=${v}; Path=/${r.slug}/; Max-Age=${age}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`;

    if (r.code) {
      if (rest === 'signin' && req.method === 'POST') {
        const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
        if (tooMany(ip)) return send(res, 429, signinPage(r.slug, 'Too many attempts. Wait ten minutes and try again.'));
        const code = new URLSearchParams(await readBody(req)).get('code') || '';
        if (!same(code, r.code)) return send(res, 401, signinPage(r.slug, 'That code is not correct.'));
        return send(res, 303, '', { Location: `/${r.slug}/`, 'Set-Cookie': cookie(token(r), HOURS * 3600) });
      }
      if (rest === 'signout') return send(res, 303, '', { Location: `/${r.slug}/`, 'Set-Cookie': cookie('', 0) });
      if (!signedIn(req, r)) return send(res, 401, signinPage(r.slug, ''));
    } else if (rest === 'signin' || rest === 'signout') return send(res, 303, '', { Location: `/${r.slug}/` });

    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, NEUTRAL, { Allow: 'GET, HEAD' });
    const file = normalize(join(r.dir, rest || 'index.html'));
    if (file !== r.dir && !file.startsWith(r.dir + sep)) return send(res, 404, NEUTRAL);
    if (!existsSync(file) || !statSync(file).isFile()) return send(res, 404, NEUTRAL);
    res.writeHead(200, Object.assign({ 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Content-Length': statSync(file).size, 'Cache-Control': 'no-cache' }, HEADERS));
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).pipe(res);
  } catch (e) { console.error(e); send(res, 500, NEUTRAL); }
});

server.listen(PORT, HOST, () => {
  console.log(`Atlas host on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  for (const r of routes.values()) console.log(`  /${r.slug}/`.padEnd(22) + `${r.ed.padEnd(8)} ${existsSync(join(r.dir, 'index.html')) ? (r.code ? 'access code required' : 'open (no access code set)') : 'NOT BUILT: run node atlas/build.mjs'}`);
  console.log('  /                     neutral page, no list of editions');
  for (const r of routes.values()) if (r.ed !== 'general' && r.slug === r.ed) console.log(`  Note: /${r.slug}/ is the default path and can be guessed. Set ATLAS_SLUG_${r.ed.toUpperCase()} to give this edition an address only its audience knows.`);
});
