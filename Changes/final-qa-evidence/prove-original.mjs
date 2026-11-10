import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const manifest=new Map(fs.readFileSync('MANIFEST.sha256','utf8').trim().split(/\r?\n/).map(l=>[path.normalize(l.slice(66)),l.slice(0,64)]));
const extras=new Set(['MANIFEST.sha256','package-lock.json',path.normalize('website/package-lock.json')]);const rows=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory()){if([...manifest.keys()].some(k=>k.startsWith(p+path.sep)))walk(p);}else if(manifest.has(p)||extras.has(p))rows.push([p,manifest.get(p)||hash(fs.readFileSync(p))]);}}
walk('.');const reconstructed=hash(JSON.stringify(rows));const expected='7dd79bf366602728605bd29f5645a84265b4bf00f0dde984df0b5380544e9c60';
const result={original_file_count:rows.length,expected_initial_tree_sha256:expected,reconstructed_original_tree_sha256:reconstructed,passed:reconstructed===expected,unmanifested_files:[...extras],original_rows:rows};fs.writeFileSync('Changes/final-qa-evidence/original-tree-proof.json',JSON.stringify(result,null,2));console.log(JSON.stringify({count:rows.length,reconstructed,passed:result.passed}));
