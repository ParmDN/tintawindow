import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, 'dist');
const port = Number(process.env.PORT || 4325);
const types = {'.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.txt':'text/plain','.xml':'application/xml'};
http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
 let pathname; try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400);res.end();return;}
 let file = path.resolve(root, '.' + pathname);
 if(!file.startsWith(root + path.sep) && file !== root){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file) && fs.statSync(file).isDirectory())file = path.join(file,'index.html');
 if(!fs.existsSync(file) && !path.extname(file))file += '/index.html';
 if(pathname!=='/' && pathname.endsWith('/') && fs.existsSync(path.join(root,pathname,'index.html'))){res.writeHead(308,{'Location':pathname.replace(/\/$/,'')+new URL(req.url,'http://localhost').search,'X-Robots-Tag':'noindex, nofollow'});res.end();return;}
 const found=fs.existsSync(file) && fs.statSync(file).isFile();
 if(!found)file=path.join(root,'404.html');
 res.writeHead(found?200:404,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`Tint A Window preview: http://localhost:${port}`));
