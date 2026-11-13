// Tiny static file server for the built site, used by the check and screenshot tools.
const http = require("http"), fs = require("fs"), path = require("path");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
/** Returns the base URL to open. Set BASE=http://localhost:5173/ to test a running dev server instead. */
exports.serve = async function serve(dir = path.resolve(__dirname, "../dist")) {
  if (process.env.BASE) return { url: process.env.BASE.replace(/\/?$/, "/"), close() {} };
  const srv = http.createServer((req, res) => {
    let f = path.join(dir, decodeURIComponent(req.url.split("?")[0])); if (f.endsWith(path.sep) || !path.extname(f)) f = path.join(dir, "index.html");
    fs.readFile(f, (e, buf) => { if (e) { res.writeHead(404); res.end("not found"); } else { res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); res.end(buf); } });
  });
  await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close() };
};
