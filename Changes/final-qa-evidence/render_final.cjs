// Final QA renderer. No site source is changed and no form is submitted.
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require('C:/Users/Aditya/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const site = path.join(root, 'website');
const baseline = 'C:/Users/Aditya/AppData/Local/Temp/tint-window-readonly-7b3f54ed1d544b439cbc91ac23ada2e8/website';
const output = path.join(root, 'Changes/screenshots/final-qa-05-11-26');
for (const dir of [output, path.join(output, 'baseline'), path.join(output, 'regions'), path.join(output, 'baseline-regions')]) fs.mkdirSync(dir, {recursive:true});
const routes = JSON.parse(fs.readFileSync(path.join(site, 'route-manifest.json'), 'utf8')).slice(0,14);
const processes = [];

async function serve(cwd, port) {
  const child = spawn(process.execPath, ['server.mjs'], {cwd, env:{...process.env, PORT:String(port)}, windowsHide:true});
  processes.push(child);
  await new Promise((resolve,reject) => {
    child.stdout.once('data',resolve);
    child.stderr.on('data',data=>process.stderr.write(data));
    child.once('error',reject);
    child.once('exit',code=>reject(Error('Preview exited '+code)));
  });
}

(async()=>{
  let browser;
  const results=[];
  try {
    await serve(baseline,44326);
    await serve(site,44325);
    browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
    for (const width of [1440,768,375]) {
      const context=await browser.newContext({viewport:{width,height:1100},reducedMotion:'reduce',deviceScaleFactor:1});
      const pages=[await context.newPage(),await context.newPage()];
      for (const [index,route] of routes.entries()) for (const [version,port] of [['original',44326],['final',44325]]) {
        const page=pages[version==='original'?0:1];
        const errors=[];
        const onError=error=>errors.push({type:'pageerror',message:error.message});
        const onConsole=message=>{if(message.type()==='error')errors.push({type:'console',message:message.text()});};
        const onFailed=request=>errors.push({type:'requestfailed',url:request.url(),message:request.failure()?.errorText});
        page.on('pageerror',onError);page.on('console',onConsole);page.on('requestfailed',onFailed);
        await page.goto('http://127.0.0.1:'+port+route.path,{waitUntil:'domcontentloaded'});
        await page.evaluate(async()=>{
          for(const image of document.images)image.loading='eager';
          await Promise.all([document.fonts.ready,...[...document.images].map(image=>image.decode().catch(()=>{}))]);
          scrollTo(0,0);
        });
        await page.waitForLoadState('networkidle');
        const metrics=await page.evaluate(({index,version})=>{
          const rect=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,width:r.width,height:r.height,fontSize:s.fontSize,lineHeight:s.lineHeight,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,overflowX:s.overflowX,overflowY:s.overflowY};};
          const hero=document.querySelector('.fresh-hero');
          const eye=hero.querySelector('.hero-eyebrow')||hero.querySelector('.eyebrow');
          const headline=hero.querySelector('.hero-headline')||hero.querySelector('h1');
          const support=hero.querySelector('.hero-support');
          const relevant=index===0?['#possibilities','#choose-your-space','#home-enquiry']:['#possibilities','#content-3','.revision-next'];
          const changedSections=relevant.map(selector=>{const e=document.querySelector(selector);return {selector,...rect(e),paragraphs:[...e.querySelectorAll('p')].map(p=>({text:p.textContent.trim(),...rect(p)}))};});
          const film=document.querySelector('#content-3');
          const filmCards=index>0?[...film.querySelectorAll('.revision-choices>article')].map(e=>({text:e.textContent.trim(),...rect(e)})):[];
          const narrowArticles=[...document.querySelectorAll('main article')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.width<120&&e.textContent.trim().length>60;}).map(e=>({section:e.closest('section')?.id||e.closest('section')?.className,text:e.textContent.trim(),...rect(e)}));
          const heroOutside=[...hero.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width&&s.display!=='none'&&(r.left < -1 || r.right > innerWidth+1);}).map(e=>({tag:e.tagName,cls:typeof e.className==='string'?e.className:'',...rect(e)}));
          const heroText={eyebrow:rect(eye),headline:rect(headline),paragraph:rect(support.querySelector('p')),actions:rect(support.querySelector('.enquiry-actions'))};
          const sections=[...document.querySelectorAll('main>section')].map(e=>({id:e.id,cls:e.className,...rect(e)}));
          return {index,version,viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,hero:rect(hero),heroText,heroOutside,changedSections,filmCards,narrowArticles,sections};
        },{index,version});
        const stem=`page-${String(index).padStart(2,'0')}-${width}`;
        await page.screenshot({path:path.join(version==='original'?path.join(output,'baseline'):output,stem+'.png'),fullPage:true,animations:'disabled'});
        // Detailed region evidence complements full-page overview inspection.
        const regions=[['hero','.fresh-hero'],...(index===0?[['intro','#possibilities'],['audience','#choose-your-space'],['enquiry','#home-enquiry']]:[['film-options','#content-3']])];
        for(const [name,selector] of regions){
          if(version==='original'&&name!=='film-options')continue;
          const box=await page.locator(selector).boundingBox();
          await page.screenshot({path:path.join(output,version==='original'?'baseline-regions':'regions',stem+'-'+name+'.png'),fullPage:true,clip:box,animations:'disabled'});
        }
        results.push({...metrics,errors});
        fs.writeFileSync(path.join(output,'render-results.json'),JSON.stringify(results,null,2));
        page.off('pageerror',onError);page.off('console',onConsole);page.off('requestfailed',onFailed);
      }
      await context.close();
      console.log('Finished full-page baseline/final renders at',width);
    }
    console.log(JSON.stringify({output,renders:results.length,consoleOrNetworkErrors:results.filter(r=>r.errors.length).map(r=>({index:r.index,width:r.viewport,version:r.version,errors:r.errors})),documentOverflow:results.filter(r=>r.documentWidth>r.viewport).map(r=>({index:r.index,width:r.viewport,version:r.version,documentWidth:r.documentWidth})),narrowCardPages:[...new Set(results.filter(r=>r.version==='final'&&r.narrowArticles.length).map(r=>r.index))]},null,2));
  } finally {
    if(browser)await browser.close();
    for(const child of processes)child.kill();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
