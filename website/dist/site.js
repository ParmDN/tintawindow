const one=(s,root=document)=>root.querySelector(s), all=(s,root=document)=>[...root.querySelectorAll(s)];
const mobile=one('.mobile-toggle'),nav=one('#site-nav');
const closeGroups=()=>all('.nav-toggle').forEach(b=>{b.setAttribute('aria-expanded','false');one('#'+b.getAttribute('aria-controls')).hidden=true;});
function closeNav(){mobile.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open');closeGroups();}
mobile?.addEventListener('click',()=>{const open=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);if(!open)closeGroups();});
all('.nav-toggle').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';closeGroups();b.setAttribute('aria-expanded',String(open));one('#'+b.getAttribute('aria-controls')).hidden=!open;}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav-group'))closeGroups();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=one('.nav-toggle[aria-expanded="true"]');if(active){closeGroups();active.focus();}else if(nav?.classList.contains('open')){closeNav();mobile.focus();}}});
all('#site-nav a').forEach(a=>a.addEventListener('click',closeNav));
matchMedia('(min-width: 1101px)').addEventListener('change',e=>{if(e.matches)closeNav();});
all('[data-film]').forEach(b=>b.addEventListener('click',()=>{all('[data-film]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));one('.demo-window').dataset.finish=b.dataset.film;one('#film-description').textContent={clear:'A clear outlook, with the right specification for your glass.',solar:'A tinted impression. Real samples help you compare light, reflection and colour.',privacy:'An obscured outlook for spaces where privacy matters more than a clear view.'}[b.dataset.film];}));
all('[data-filter]').forEach(b=>b.addEventListener('click',()=>{all('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));let count=0;all('[data-category]').forEach(x=>{x.hidden=b.dataset.filter!=='All'&&x.dataset.category!==b.dataset.filter;if(!x.hidden)count++;});one('.gallery-count').textContent=`Showing ${count} photograph${count===1?'':'s'}`;}));
const dialog=one('.lightbox');let opener;
all('[data-photo]').forEach(b=>b.addEventListener('click',()=>{opener=b;one('img',dialog).src=b.dataset.src;one('img',dialog).alt=one('img',b).alt;one('img',dialog).width=one('img',b).width;one('img',dialog).height=one('img',b).height;one('p',dialog).textContent=b.dataset.title;dialog.showModal();}));
one('.lightbox-close')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog?.addEventListener('close',()=>opener?.focus());
one('#faq-search')?.addEventListener('input',e=>{const query=e.target.value.trim().toLocaleLowerCase();let count=0;all('.faq-group').forEach(g=>{let groupCount=0;all('details',g).forEach(d=>{d.hidden=!d.textContent.toLowerCase().includes(query);if(!d.hidden){count++;groupCount++;}d.open=Boolean(query)&&!d.hidden;});g.hidden=groupCount===0;});one('#faq-search-status').textContent=query?(count?`${count} matching question${count===1?'':'s'}`:'No matching questions. Try another phrase or call 0800 368 468.') : '';});


all('[data-light]').forEach(b=>b.addEventListener('click',()=>{const night=b.dataset.light==='night';all('[data-light]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const model=one('.privacy-model');model.dataset.lighting=b.dataset.light;model.setAttribute('aria-label',night?'Night-time illustration: brighter inside than outside':'Daylight illustration: brighter outside than inside');one('#privacy-answer').textContent=night?'With lights on inside after dark, reflective film does not provide reliable privacy. Consider a frosted or opaque finish, or other window coverings, when night-time privacy is essential.':'When it is brighter outside, a suitable reflective film can reduce the view into the room. The result depends on the product and conditions.';}));

document.addEventListener('focusin',e=>{if(nav?.classList.contains('open')&&!nav.contains(e.target)&&!mobile.contains(e.target))closeNav();});

// Respect device settings and suspend decorative motion off screen.
const calmMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionSync=new Set();
function syncPageMotion(){
 document.documentElement.classList.toggle('motion-disabled',calmMotion.matches);
 motionSync.forEach(sync=>sync());
}
calmMotion.addEventListener('change',syncPageMotion);
function watchMotion(root,onChange=()=>{},pauseForReading=false,pauseOnHover=true,horizontalReading=false){
 let visible=false,hover=false,focused=false,reading=false,holdTimer,running=false;
 function sync(){
  const next=visible&&!document.hidden&&!calmMotion.matches&&!hover&&!focused&&!reading;
  root.classList.toggle('motion-visible',visible&&!document.hidden);
  root.classList.toggle('motion-paused',!next);
  if(next!==running){running=next;onChange(running);}
 }
 motionSync.add(sync);
 if(pauseForReading){
  root.addEventListener('pointerenter',e=>{if(pauseOnHover&&e.pointerType==='mouse'){hover=true;sync();}});
  root.addEventListener('pointerleave',()=>{hover=false;sync();});
  root.addEventListener('focusin',e=>{focused=e.target.matches(':focus-visible');sync();});
  root.addEventListener('focusout',e=>{focused=root.contains(e.relatedTarget)&&e.relatedTarget.matches(':focus-visible');sync();});
  const hold=()=>{reading=true;clearTimeout(holdTimer);sync();holdTimer=setTimeout(()=>{reading=false;sync();},8000);};
  root.addEventListener('wheel',e=>{if(!horizontalReading||Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.shiftKey)hold();},{passive:true});
  root.addEventListener('pointerdown',hold,{passive:true});
  root.addEventListener('tint:carousel-interaction',hold);
 }
 document.addEventListener('visibilitychange',sync);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.12}).observe(root);
 else{visible=true;sync();}
 sync();
}
// Mouse dragging complements native touch and wheel scrolling. No library or hidden content.
function draggableScroll(track,axis='x'){
 const prop=axis==='y'?'scrollTop':'scrollLeft',point=axis==='y'?'clientY':'clientX';
 let origin=0,position=0,pointer=null,moved=false,suppressClick=false;
 track.classList.add('drag-scroll');
 track.addEventListener('dragstart',e=>e.preventDefault());
 track.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,input,textarea,select'))return;
  pointer=e.pointerId;origin=e[point];position=track[prop];moved=false;
 });
 track.addEventListener('pointermove',e=>{
  if(pointer!==e.pointerId)return;
  const distance=e[point]-origin;
  if(!moved&&Math.abs(distance)<6)return;
  if(!moved){moved=true;track.setPointerCapture(pointer);track.classList.add('is-dragging');}
  e.preventDefault();track[prop]=position-distance;
 });
 function release(e){
  if(pointer!==e.pointerId)return;
  if(moved){suppressClick=true;setTimeout(()=>{suppressClick=false;},0);}
  pointer=null;track.classList.remove('is-dragging');
  if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);
 }
 track.addEventListener('pointerup',release);track.addEventListener('pointercancel',release);
 track.addEventListener('pointerleave',e=>{if(!moved)pointer=null;});
 track.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();}},true);
 track.addEventListener('keydown',e=>{
  if(e.target!==track)return;
  const direction=axis==='y'?{ArrowUp:-1,ArrowDown:1}:{ArrowLeft:-1,ArrowRight:1};
  if(!direction[e.key])return;
  e.preventDefault();const item=track.firstElementChild;
  const amount=axis==='y'?item.offsetHeight+18:item.offsetWidth+20;
  track.scrollBy({[axis==='y'?'top':'left']:direction[e.key]*amount,behavior:calmMotion.matches?'instant':'smooth'});
 });
}
// Keep primary navigation, paragraphs, FAQs and real process steps in normal document flow.
const phoneRails=all('.home-outcome-grid,.home-reason-grid,.revision-details,.revision-choices,.application-grid,.revision-reasons,.related-service-cards').filter(track=>track.children.length>=3);
const phoneLayout=matchMedia('(max-width:800px)');
phoneRails.forEach(track=>{
 const section=track.closest('section'),title=one('h2',section)?.textContent.trim();
 track.setAttribute('role','region');
 track.setAttribute('aria-label',(one('h2',section)?.innerText.replace(/\s+/g,' ').trim()||title||'Options')+'; scroll to explore');
 draggableScroll(track);
});
function syncPhoneRails(){phoneRails.forEach(track=>{
 track.classList.toggle('mobile-card-rail',phoneLayout.matches);
 if(phoneLayout.matches)track.tabIndex=0;else track.removeAttribute('tabindex');
});}
syncPhoneRails();phoneLayout.addEventListener('change',syncPhoneRails);
// Dated original photographs tell the story in order; the team portrait has its own space.
all('.archive-timeline').forEach(track=>{
 draggableScroll(track);
 const section=track.closest('section'),buttons=all('[data-archive-index]',section);
 let timer;
 // Advance one moment at a time, then return to the beginning of the story.
 function advanceArchive(){
  const end=track.scrollWidth-track.clientWidth;
  if(end<=1)return;
  const stops=[...track.children].map(item=>item.offsetLeft-track.children[0].offsetLeft);
  const next=stops.find(left=>left>track.scrollLeft+3)??end;
  track.scrollTo({left:track.scrollLeft>=end-3?0:Math.min(next,end),behavior:'smooth'});
 }
 watchMotion(section,running=>{clearInterval(timer);if(running)timer=setInterval(advanceArchive,5000);},true,false,true);
 buttons.forEach((button,i)=>button.addEventListener('click',()=>track.scrollTo({left:track.children[i].offsetLeft-track.children[0].offsetLeft,behavior:calmMotion.matches?'instant':'smooth'})));
 let frame;
 track.addEventListener('scroll',()=>{
  cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const view=track.getBoundingClientRect();
   buttons.forEach((button,i)=>{
    const rect=track.children[i].getBoundingClientRect();
    button.toggleAttribute('data-in-view',Math.min(rect.right,view.right)-Math.max(rect.left,view.left)>rect.width*.5);
   });
  });
 },{passive:true});
});
// One shared timer per image rail. Interaction and device preferences take priority.
all('.home-gallery-pair,.project-slot-grid,.photo-carousel').forEach(track=>{
 if(track.children.length<2)return;
 track.classList.add('photo-carousel');track.setAttribute('role','region');track.tabIndex=0;
 track.setAttribute('aria-label','Project photographs; drag, swipe or use arrow keys to explore');
 const interval=1000;track.dataset.autoplayInterval=String(interval);
 draggableScroll(track);let timer;
 function advance(){
  const end=track.scrollWidth-track.clientWidth;if(end<=2)return;
  const next=[...track.children].map(item=>item.offsetLeft-track.children[0].offsetLeft).find(left=>left>track.scrollLeft+3)??end;
  track.scrollTo({left:track.scrollLeft>=end-3?0:Math.min(next,end),behavior:'smooth'});
 }
 watchMotion(track,running=>{clearInterval(timer);if(running)timer=setInterval(advance,interval);},true,true,true);
});
// One vertical column, advancing one review at a time with two visible cards.
all('[data-carousel="vertical"]').forEach(section=>{
 const track=one('[data-reel-track]',section),originals=all('[data-reel-item]',track);
 if(originals.length<2)return;
 originals.forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.setAttribute('inert','');clone.dataset.reelClone='';track.append(clone);});
 section.classList.add('reel-ready');draggableScroll(track,'y');let timer,resetTimer;
 const step=()=>track.children[1].offsetTop-track.children[0].offsetTop;
 function advance(){
  const distance=step();if(!distance)return;
  let current=Math.round(track.scrollTop/distance);
  if(current>=originals.length){current%=originals.length;track.scrollTo({top:current*distance,behavior:'instant'});}
  const next=current+1;
  track.scrollTo({top:next*distance,behavior:'smooth'});
  if(next>=originals.length)resetTimer=setTimeout(()=>{if(Math.abs(track.scrollTop-next*distance)<5)track.scrollTo({top:(next%originals.length)*distance,behavior:'instant'});},750);
 }
 watchMotion(track,running=>{clearInterval(timer);clearTimeout(resetTimer);if(running)timer=setInterval(advance,2000);},true);
});
// Original customer logos move continuously; the heading and copy stay still.
all('[data-carousel="horizontal"]').forEach(section=>{
 const track=one('[data-reel-track]',section),originals=all('[data-reel-item]',track);
 function fillTrack(){
  const first=originals[0],last=originals.at(-1),gap=parseFloat(getComputedStyle(track).columnGap)||0;
  const groupWidth=last.offsetLeft+last.offsetWidth+gap-first.offsetLeft;
  const copies=Math.max(1,Math.ceil(track.clientWidth/groupWidth));
  for(let count=(track.children.length-originals.length)/originals.length;count<copies;count++)originals.forEach(item=>{
   const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.setAttribute('inert','');clone.dataset.reelClone='';track.append(clone);
  });
 }
 fillTrack();if('ResizeObserver' in window)new ResizeObserver(fillTrack).observe(track);
 section.classList.add('logo-ready');let frame,lastTime,position=0;
 function travel(time){
  const first=originals[0],repeat=track.children[originals.length],distance=repeat.offsetLeft-first.offsetLeft;
  if(lastTime&&distance>0){position=(position+Math.min(time-lastTime,60)*.038)%distance;track.scrollLeft=position;}
  lastTime=time;frame=requestAnimationFrame(travel);
 }
 watchMotion(section,running=>{cancelAnimationFrame(frame);lastTime=0;position=track.scrollLeft;if(running)frame=requestAnimationFrame(travel);},true);
});
// Measure the actual process dots, including unequal-height mobile steps.
all('.revision-steps').forEach(track=>{
 const steps=all('article',track);
 function measure(){
  const vertical=matchMedia('(max-width:1100px)').matches,rect=track.getBoundingClientRect();
  const stops=steps.map(article=>{const a=article.getBoundingClientRect();return vertical?a.top-rect.top+35:a.left-rect.left;});
  stops.forEach((stop,i)=>track.style.setProperty('--stop-'+i,stop+'px'));
  track.style.setProperty('--track-start',stops[0]+'px');
  track.style.setProperty('--track-length',(stops.at(-1)-stops[0])+'px');
 }
 measure();if('ResizeObserver' in window)new ResizeObserver(measure).observe(track);
 document.fonts?.ready.then(measure);
});
all('main .section').filter(section=>one('.detail-icon,.film-icon,.revision-steps,.film-explainer,.simple-film-drawing,.decision-line',section)).forEach(section=>watchMotion(section));
syncPageMotion();
// Motion is decoration: no content starts hidden and no dependency is required.
const arrivalTargets=all(`main .revision-heading, main .chapter-heading, main .project-slots-heading,
 main .application-heading, main .home-chapter-heading, main .archive-heading,
 main .revision-section>figure, main .benefit-photo, main .problem-photo,
 main .material-study`);
let arrivalObserver;
const seenArrivals=new WeakSet();
function startArrivals(){
 if(calmMotion.matches||!('IntersectionObserver' in window))return;
 arrivalObserver=new IntersectionObserver(entries=>{
  let sequence=0;
  entries.forEach(({target,isIntersecting})=>{
   if(!isIntersecting)return;
   target.style.setProperty('--arrival-delay',`${Math.min(sequence++*35,105)}ms`);
   target.classList.add('atelier-arrive');
   if(target.matches('.material-study'))target.classList.add('study-arrive');
   seenArrivals.add(target);arrivalObserver.unobserve(target);
  });
 },{threshold:.12});
 arrivalTargets.filter(el=>!seenArrivals.has(el)).forEach(el=>arrivalObserver.observe(el));
}
startArrivals();
calmMotion.addEventListener('change',()=>{
 arrivalObserver?.disconnect();
 if(calmMotion.matches)arrivalTargets.forEach(el=>el.classList.remove('atelier-arrive','study-arrive'));
 else startArrivals();
});

// Desktop hover menus retain click, keyboard and touch operation.
all('.nav-group').forEach(group=>{
 const toggle=one('.nav-toggle',group),panel=one('.nav-panel',group);let hideTimer;
 const desktop=()=>matchMedia('(min-width:1101px) and (hover:hover)').matches;
 function open(){clearTimeout(hideTimer);closeGroups();toggle.setAttribute('aria-expanded','true');panel.hidden=false;}
 group.addEventListener('pointerenter',e=>{if(desktop()&&e.pointerType==='mouse')open();});
 group.addEventListener('pointerleave',()=>{if(desktop())hideTimer=setTimeout(()=>{if(!group.contains(document.activeElement)){toggle.setAttribute('aria-expanded','false');panel.hidden=true;}},180);});
 group.addEventListener('focusout',e=>{if(!group.contains(e.relatedTarget)){toggle.setAttribute('aria-expanded','false');panel.hidden=true;}});
});
// A native modal keeps keyboard focus inside it and restores the opening button.
const quotePopup=one('.quote-dialog');let quoteOpener;
all('a').filter(a=>/get a quote/i.test(a.textContent)&&/contact-for-window-tinting|#start-enquiry/.test(a.getAttribute('href')||'')).forEach(a=>{
 a.setAttribute('aria-haspopup','dialog');
 a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();quoteOpener=a;if(nav?.classList.contains('open'))closeNav();quotePopup.showModal();document.body.classList.add('quote-open');});
});
one('.quote-dialog-close')?.addEventListener('click',()=>quotePopup.close());
quotePopup?.addEventListener('click',e=>{if(e.target!==quotePopup)return;const r=quotePopup.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)quotePopup.close();});
quotePopup?.addEventListener('close',()=>{document.body.classList.remove('quote-open');quoteOpener?.focus({preventScroll:true});});
// One field system for the homepage, quote dialog and contact page.
all('[data-enquiry-form]').forEach(form=>{
 const property=one('[data-property-select]',form),photos=one('[data-enquiry-photos]',form),status=one('[data-file-status]',form),clear=one('[data-clear-photos]',form);
 const checks=all('input[name="services"]',form),groups=all('[data-service-group]',form),summary=one('[data-service-summary]',form);
 function updateServices(){
  const selected=checks.filter(input=>input.checked);
  summary.textContent=selected.length?`${selected.length} service${selected.length===1?'':'s'} selected`:'Choose services (optional)';
 }
 function updateProperty(){
  groups.forEach(group=>{const hidden=['Residential','Commercial'].includes(property.value)&&property.value!==group.dataset.serviceGroup;group.hidden=hidden;if(hidden)all('input',group).forEach(input=>{input.checked=false;});});
  updateServices();
 }
 property.addEventListener('change',updateProperty);checks.forEach(input=>input.addEventListener('change',updateServices));
 const context=location.pathname.startsWith('/commercial-window-tinting')?'Commercial':location.pathname.startsWith('/residential-window-tinting')?'Residential':null;
 if(context)property.value=context;
 checks.forEach(input=>{if(input.dataset.servicePath===location.pathname)input.checked=true;});updateProperty();
 photos.addEventListener('change',()=>{
  const files=[...photos.files];let message='';
  if(files.length>5)message='Choose up to five photos. Clear this selection and choose fewer files.';
  else if(files.some(file=>file.size>5*1024*1024))message='Each photo must be 5 MB or smaller. Please choose a smaller version.';
  else if(files.some(file=>!['image/jpeg','image/png','image/webp'].includes(file.type)))message='Please choose JPG, PNG or WebP photos.';
  photos.setCustomValidity(message);photos.setAttribute('aria-invalid',String(Boolean(message)));
  status.textContent=message||(files.length?`${files.length} photo${files.length===1?'':'s'} selected: ${files.map(file=>file.name).join(', ')}`:'');
  status.classList.toggle('field-error',Boolean(message));clear.hidden=!files.length;
 });
 clear.addEventListener('click',()=>{photos.value='';photos.setCustomValidity('');photos.setAttribute('aria-invalid','false');status.textContent='';status.classList.remove('field-error');clear.hidden=true;photos.focus();});
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;window.tintEnquiryPreview.complete(form.dataset.enquiryForm);});
});
