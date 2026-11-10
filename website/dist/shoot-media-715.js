// Silent homepage motion is optional: the picture stays useful without JS,
// under reduced-motion/save-data preferences or when autoplay is unavailable.
(() => {
 const frame=document.querySelector('[data-hero-loop]');
 if(!frame)return;
 const video=frame.querySelector('video');
 const toggle=frame.querySelector('[data-hero-loop-toggle]');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const phone=matchMedia('(max-width: 800px)');
 const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 let inView=false, userPaused=false, autoplayBlocked=false, failed=false, playPending=null;
 const allowed=()=>!motion.matches&&!connection?.saveData;
 const visible=()=>inView&&!document.hidden;
 const syncControl=()=>{
  const paused=video.paused;
  toggle.dataset.paused=String(paused);
  toggle.setAttribute('aria-label',paused?'Resume background video':'Pause background video');
  toggle.hidden=!allowed()||failed||(!frame.classList.contains('is-video-visible')&&!autoplayBlocked);
 };
 // Invalidate a pending play before pausing or changing source. Its eventual
 // AbortError must not block a newer request after a quick scroll or resize.
 const pauseVideo=()=>{playPending=null;video.pause();};
 const showPoster=()=>{pauseVideo();frame.classList.remove('is-video-visible');syncControl();};
 const setSource=()=>{
  const source=phone.matches?video.dataset.mobileSrc:video.dataset.desktopSrc;
  if(video.getAttribute('src')===source)return;
  playPending=null;
  frame.classList.remove('is-video-visible');
  video.src=source;
  video.muted=true;
  video.defaultMuted=true;
  video.load();
 };
 const update=()=>{
  if(!allowed()){showPoster();return;}
  if(!visible()||userPaused||autoplayBlocked||failed){pauseVideo();syncControl();return;}
  setSource();
  if(playPending||!video.paused)return;
  const token={};
  playPending=token;
  const onFailure=error=>{
   if(playPending!==token)return;
   playPending=null;
   // Intentional pauses/source swaps invalidate their token above. Any
   // current request that still fails falls back to a manual retry, without
   // an unbounded automatic retry loop on a broken browser/media response.
   autoplayBlocked=true;
   showPoster();
  };
  let attempt;
  try{attempt=video.play();}catch(error){onFailure(error);return;}
  if(!attempt?.then){playPending=null;return;}
  attempt.then(()=>{
   if(playPending!==token)return;
   playPending=null;
   if(!allowed()||!visible()||userPaused){pauseVideo();if(!allowed())showPoster();}
   syncControl();
  }).catch(onFailure);
 };
 video.addEventListener('playing',()=>{
  if(!allowed()||!visible()||userPaused){pauseVideo();return;}
  frame.classList.add('is-video-visible');
  syncControl();
 });
 video.addEventListener('pause',syncControl);
 video.addEventListener('error',()=>{failed=true;showPoster();});
 video.addEventListener('volumechange',()=>{if(!video.muted)video.muted=true;});
 toggle.addEventListener('click',()=>{
  if(!video.paused){userPaused=true;pauseVideo();syncControl();return;}
  userPaused=false;
  autoplayBlocked=false;
  update();
 });
 document.addEventListener('visibilitychange',update);
 motion.addEventListener?.('change',()=>{autoplayBlocked=false;update();});
 connection?.addEventListener?.('change',()=>{autoplayBlocked=false;update();});
 // Keep a deliberately cropped phone source rather than relying on the wide
 // movie's centre crop to keep people and their work in the frame.
 phone.addEventListener?.('change',()=>{
  if(!allowed()||!visible()||userPaused)return;
  autoplayBlocked=false;
  setSource();
  update();
 });
 if('IntersectionObserver' in window){
  new IntersectionObserver(entries=>{
   inView=entries.some(entry=>entry.isIntersecting);
   update();
  },{threshold:0.12}).observe(frame);
 }else{
  inView=true;
  update();
 }
 syncControl();
})();
