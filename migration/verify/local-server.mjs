import http from 'node:http';
import path from 'node:path';
import { promises as fs } from 'node:fs';

export async function startStatic(directory) {
  const root = await fs.realpath(directory);
  const within = file => file === root || file.startsWith(root + path.sep);
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.vtt': 'text/vtt' };
  const isFile = file => fs.stat(file).then(stat => stat.isFile(), () => false);
  const server = http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) return res.writeHead(405).end();
      let pathname;
      try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
      catch { return res.writeHead(400).end(); }
      let file = path.resolve(root, '.' + pathname);
      if (!within(file)) return res.writeHead(403).end();
      if ((await fs.stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
      if (!await isFile(file) && !path.extname(pathname)) file = path.join(file, 'index.html');
      const found = await isFile(file);
      if (!found) file = path.join(root, '404.html');
      if (!within(await fs.realpath(file))) return res.writeHead(403).end();
      const bytes = req.method === 'HEAD' ? null : await fs.readFile(file);
      res.writeHead(found ? 200 : 404, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(bytes);
    } catch (error) { res.writeHead(500).end(String(error)); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { origin: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }) };
}
