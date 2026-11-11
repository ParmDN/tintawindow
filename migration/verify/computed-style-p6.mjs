// Phase 6 read-only computed-style comparison. Logs only; no source/output changes.
// node migration/verify/computed-style-p6.mjs [--routes=/,/about] [--widths=360,768,1440]
import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { projectRoot, exportRoot, readBaseline } from '../../scripts/lib/baseline.mjs';
import { startStatic } from './local-server.mjs';
const oldSiteRoot = path.resolve(
  process.env.TINT_REFERENCE_DIR ||
  path.join(projectRoot, '../Tint-A-Window-backups/root-legacy-before-flatten-20261111/website/dist')
);

const verify = path.join(projectRoot, 'migration/verify');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const i=a.indexOf('='); if(i<0) throw new Error('Expected --name=value'); return [a.slice(2,i),a.slice(i+1)]; }));
for (const key of Object.keys(args)) if (!['routes','widths','tag'].includes(key)) throw new Error(`Unknown option ${key}`);
const baseline = await readBaseline();
const requested = args.routes?.split(',');
if(requested?.some(route=>!baseline.some(p=>p.route===route)))throw new Error('Unknown requested route');
const routes = baseline.filter(p=>!requested||requested.includes(p.route)).map(p=>p.route);
const widths = args.widths ? args.widths.split(',').map(Number) : [360,768,1440];
if(widths.some(w=>!Number.isInteger(w)||w<1))throw new Error('Invalid width');
const properties = `display visibility opacity position top right bottom left float clear box-sizing width height min-width min-height max-width max-height margin-top margin-right margin-bottom margin-left padding-top padding-right padding-bottom padding-left overflow-x overflow-y overflow-wrap white-space text-overflow vertical-align z-index isolation order flex-direction flex-wrap flex-grow flex-shrink flex-basis align-items align-self align-content justify-content justify-items justify-self grid-template-columns grid-template-rows grid-auto-columns grid-auto-rows grid-auto-flow grid-column-start grid-column-end grid-row-start grid-row-end row-gap column-gap font-family font-size font-weight font-style font-stretch font-variant line-height letter-spacing word-spacing text-align text-transform text-indent text-decoration-line text-decoration-color text-decoration-style text-decoration-thickness text-underline-offset color background-color background-image background-position background-size background-repeat background-origin background-clip background-attachment border-top-width border-right-width border-bottom-width border-left-width border-top-style border-right-style border-bottom-style border-left-style border-top-color border-right-color border-bottom-color border-left-color border-top-left-radius border-top-right-radius border-bottom-right-radius border-bottom-left-radius border-collapse border-spacing box-shadow outline-width outline-style outline-color outline-offset list-style-type list-style-position list-style-image object-fit object-position aspect-ratio transform transform-origin clip-path filter fill stroke stroke-width content cursor pointer-events scroll-margin-top scroll-padding-top scroll-snap-align scroll-snap-type overscroll-behavior-x overscroll-behavior-y touch-action`.split(' ');
const tag = args.tag || 'p6';
if (!/^[a-z0-9-]*p6$/.test(tag)) throw new Error('Log tag must end in p6 and contain only letters, digits or hyphens');
// getComputedStyle resolves CSS URLs against different ephemeral loopback ports.
// Preserve raw values in snapshots, but compare the same local URL paths.
const comparable = (value, site) => value.replaceAll(servers[site].origin, '<SITE_ORIGIN>');
const logs = Object.fromEntries(['old','new','differences','summary'].map(k=>[k,path.join(verify,`computed-${k}-${tag}.log`)]));
for(const file of Object.values(logs))await fs.writeFile(file,'');
const servers={old:await startStatic(oldSiteRoot),new:await startStatic(exportRoot)};
const browser=await chromium.launch();
let differences=0,comparisons=0,elements=0;
try {
 console.log('Chromium',browser.version(),'properties',properties.length);
 for(const width of widths)for(const route of routes){
  const records={};
  for(const site of ['old','new']){
   const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:'light',locale:'en-NZ',timezoneId:'Pacific/Auckland',serviceWorkers:'block'});
   try{
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(servers[site].origin+route,{waitUntil:'networkidle'});
    await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}'});
    await page.evaluate(async()=>{
     await document.fonts.ready;
     for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));}
     await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));
     window.scrollTo(0,0);document.querySelectorAll('.photo-carousel,.mobile-card-rail,[data-reel-track]').forEach(e=>{e.scrollLeft=0;e.scrollTop=0;});
     await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    });
    if(errors.length)throw new Error(errors.join('\n'));
    records[site]=await page.evaluate(props=>{
     const roots=[document.querySelector('main#main'),document.querySelector('footer.site-footer')];
     const result=[];
     function walk(el,key){
      const values=Object.fromEntries(props.map(p=>[p,getComputedStyle(el).getPropertyValue(p)]));
      const rect=el.getBoundingClientRect();values['rect-x']=String(rect.x);values['rect-y']=String(rect.y+scrollY);values['rect-width']=String(rect.width);values['rect-height']=String(rect.height);
      result.push({key,tag:el.localName,id:el.id,classes:el.getAttribute('class'),values});
      [...el.children].forEach((child,i)=>walk(child,`${key}/${child.localName}[${i+1}]`));
     }
     roots.forEach((r,i)=>{if(!r)throw new Error('Missing comparison root');walk(r,i?'footer':'main');});
     return result;
    },properties);
    await fs.appendFile(logs[site],JSON.stringify({route,width,elements:records[site]})+'\n');
   }finally{await context.close();}
  }
  const a=new Map(records.old.map(e=>[e.key,e])), b=new Map(records.new.map(e=>[e.key,e]));let count=0;
  for(const key of new Set([...a.keys(),...b.keys()])){
   const old=a.get(key),now=b.get(key);
   if(!old||!now){await fs.appendFile(logs.differences,JSON.stringify({route,width,key,kind:'missing-element',old:!!old,new:!!now})+'\n');count++;continue;}
   for(const property of Object.keys(old.values))if(comparable(old.values[property],'old')!==comparable(now.values[property],'new')){
    await fs.appendFile(logs.differences,JSON.stringify({route,width,key,property,old:old.values[property],new:now.values[property]})+'\n');count++;
   }
  }
  const summary={route,width,elementsOld:a.size,elementsNew:b.size,differences:count};
  await fs.appendFile(logs.summary,JSON.stringify(summary)+'\n');console.log(width,route,a.size,'elements',count,'differences');differences+=count;elements+=a.size;comparisons++;
 }
 console.log(JSON.stringify({comparisons,elements,differences}));if(differences)process.exitCode=1;
}finally{await browser.close();await Promise.all(Object.values(servers).map(s=>s.close()));}
