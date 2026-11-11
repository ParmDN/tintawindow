// Read-only logic port of website/src/film-guide.mjs. No filesystem effects.
// VLT numbers below are explicitly illustrative visible-light examples, not
// stock products, heat rejection, UV protection or installed performance.
const solarPages: any=new Set([1,2,4,5,8,9,10]);
const privacyPages: any=new Set([3,6,12]);
export function hasFilmGuide(index){return solarPages.has(index)||privacyPages.has(index);}
const scene: any=`<svg viewBox="0 0 180 220" aria-hidden="true"><path fill="#dcebef" d="M0 0h180v220H0z"/><circle cx="136" cy="40" r="20" fill="#fff4cb"/><path fill="#91ada0" d="M0 148 45 94 86 128 134 86 180 129v91H0z"/><path fill="#647e6e" d="m0 174 63-50 54 35 63-20v81H0z"/><path fill="#bbc7b2" d="M0 188q80-30 180-7v39H0z"/></svg>`;
export function filmGuide(index){
 if(!hasFilmGuide(index))return '';
 const privacy: any=privacyPages.has(index);
 const shades: any=privacy?[
  ['Clear view','clear','Keeps the outlook'],['Reflective','reflective','Daylight-dependent privacy'],['Frosted','frosted','Softens visible detail'],['Opaque','opaque','Obscures the view']
 ]:[['Very light','clear','70% visible light'],['Light','very-light','50% visible light'],['Medium','light-medium','35% visible light'],['Dark','medium','20% visible light'],['Very dark','dark','5% visible light']];
 return `<figure class="tint-reference-guide" aria-labelledby="tint-guide-title"><div class="tint-guide-heading"><h3 id="tint-guide-title">${privacy?'Privacy finish guide':'Tint reference guide'}</h3><p>${privacy?'Compare the view, not just the colour.':'Illustrative visible-light transmission (VLT)'}</p></div><div class="tint-samples ${privacy?'finish-samples':''}">${shades.map(([name,key,note])=>`<div class="tint-sample"><div class="sample-window sample-${key}" aria-hidden="true"><div class="sample-scene">${scene}</div><span class="sample-film"></span><span class="sample-frame"></span></div><strong>${name}</strong><span>${note}</span></div>`).join('')}</div><figcaption>${privacy?'Illustrated finishes, not product samples. Reflective film does not provide reliable privacy with lights on inside after dark. Frosted and opaque products vary; check a sample in your own lighting.':'Illustrated shades, not product samples. A 70% VLT example lets through more visible light than a 20% example. These numbers explain light transmission; they are not heat-rejection, UV-protection or power-saving figures, or a list of films we stock. Actual values depend on the film and glass. Check product information and a real sample.'}</figcaption>${privacy?'':`<dl class="film-performance-notes"><div><dt>Heat &amp; glare</dt><dd>Compare product data alongside daylight.</dd></div><div><dt>UV &amp; fading</dt><dd>Check UV protection; no film stops all fading.</dd></div><div><dt>Your glass</dt><dd>Confirm suitability and view a real sample.</dd></div></dl>`}</figure>`;
}
