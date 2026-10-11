// Local test harness: serves dist/ and emulates Netlify Forms (POSTs carrying form-name are stored in
// the outbox, honeypot hits are dropped, and a no-JS POST to /thank-you/ returns that page).
// POST /api/quote still routes through the legacy function handler.
// FormSubmit (the production provider) is pointed at a local mock that records every lead it receives,
// so the full browser → function → email-payload path is verified without sending real email.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { handleQuote } from '../../netlify/lib/quote-core.mjs';

const DIST = path.resolve('dist');
const PORT = Number(process.env.PORT || 4321);
export const outbox = [];

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname.startsWith('/__mock-formsubmit/') && req.method === 'POST') {
    let b = ''; for await (const c of req) b += c;
    outbox.push({ to: decodeURIComponent(url.pathname.split('/').pop()), referer: req.headers.referer, body: JSON.parse(b) });
    res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"success":"true","message":"The form was submitted successfully."}');
    return;
  }
  if (req.method === 'POST' && url.pathname !== '/api/quote' && !url.pathname.startsWith('/__')) {
    let b = ''; for await (const c of req) b += c;
    const fields = Object.fromEntries(new URLSearchParams(b));
    if (!fields['form-name']) { res.writeHead(404).end('Not found'); return; }
    if (!fields.company) outbox.push({ path: url.pathname, fields });
    const page = path.join(DIST, url.pathname === '/' ? 'index.html' : path.join(url.pathname, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(fs.existsSync(page) ? fs.readFileSync(page) : '');
    return;
  }
  if (url.pathname === '/__outbox') { res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(outbox)); return; }
  if (url.pathname === '/api/quote') {
    let bodyText = ''; for await (const c of req) bodyText += c;
    const headers = Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k, String(v)]));
    const r = await handleQuote({ method: req.method, headers, bodyText }, {
      FORMSUBMIT_URL: `http://localhost:${PORT}/__mock-formsubmit/`,
    });
    res.writeHead(r.status, r.headers).end(r.body);
    return;
  }
  let file = path.join(DIST, decodeURIComponent(url.pathname));
  if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404, { 'Content-Type': 'text/html' }).end(fs.readFileSync(path.join(DIST, '404.html'))); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(fs.readFileSync(file));
});
server.listen(PORT, () => console.log(`test server on http://localhost:${PORT}`));
