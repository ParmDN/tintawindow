// Surfaces express a chapter's purpose. Neighbours always contrast.
const tones={
 'home-experience':'stone','home-introduction':'paper','audience-chapter':'ink','home-outcomes':'gold','home-reasons':'ink','home-people-717':'gold','home-real-work':'paper','home-installation':'gold',
 'benefit-composition':'linen','problem-composition':'glass','atelier-reasons':'ink',
 'enquiry-chapter-0':'ink','enquiry-chapter-1':'paper','enquiry-chapter-2':'gold','enquiry-chapter-3':'stone','enquiry-chapter-4':'paper','enquiry-chapter-5':'linen',
 'fresh-hero':'paper','brand-banner':'paper','revision-brief':'linen',
 'revision-details-section':'gold','revision-editorial-section':'gold','revision-choices-section':'ink',
 'application-section':'paper','revision-guide':'stone','project-slots':'paper','revision-reasons-section':'paper',
 'revision-steps-section':'gold','revision-feature-section':'stone','customer-notes':'paper','client-references':'linen',
 'revision-answers-section':'paper','revision-related':'stone','revision-next':'ink','material-study':'ink',
 'home-questions':'paper','home-enquiry':'paper','gallery-tools':'linen','gallery-grid':'paper','gallery-reading':'stone',
 'faq-tools':'stone','contact-layout':'paper','location-index':'linen','locations-photo':'paper','travel-note':'stone',
 'review-heading':'paper','review-notes':'linen','project-draft':'paper'
};
export function sectionSurfaces(body){let depth=0,previous=null;const voids=new Set(['img','br','input','hr','meta','link','source','area','base','embed','param','track','wbr']);return body.replace(/<\/?[a-z][^>]*>/gi,tag=>{const name=tag.match(/^<\/?([a-z][\w-]*)/i)[1].toLowerCase();if(tag.startsWith('</')){depth--;return tag;}let result=tag;if(depth===0&&(name==='section'||name==='div'&&/\bsection\b/.test(tag))){const cls=(tag.match(/class="([^"]*)"/)?.[1]||'').split(/\s+/);let tone=Object.entries(tones).find(([name])=>cls.includes(name))?.[1]||'paper';if(tone===previous)tone=tone==='paper'?'stone':'paper';previous=tone;result=tag.replace(/\sdata-surface="[^"]*"/g,'').replace(/>$/,` data-surface="${tone}">`);}if(!voids.has(name)&&!tag.endsWith('/>'))depth++;return result;});}
