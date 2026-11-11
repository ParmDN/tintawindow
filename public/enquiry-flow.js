// Review-only completion flow. Never use this event as a production lead.
(() => {
 const key='tint-enquiry-preview-completion';
 const formIds=new Set(['homepage','quote-popup','contact']);
 window.tintEnquiryPreview={
  complete(formId){
   if(!formIds.has(formId))return;
   // Store only attribution, never contact details, message text or photographs.
   try{sessionStorage.setItem(key,JSON.stringify({formId,sourcePath:location.pathname,createdAt:Date.now()}));}catch{}
   location.assign('/thank-you');
  }
 };
 const page=document.querySelector('[data-enquiry-confirmation]');
 if(!page)return;
 let receipt;
 try{const raw=sessionStorage.getItem(key);sessionStorage.removeItem(key);receipt=JSON.parse(raw);}catch{}
 if(!receipt||!formIds.has(receipt.formId)||typeof receipt.createdAt!=='number'||Date.now()-receipt.createdAt<0||Date.now()-receipt.createdAt>30*60*1000||typeof receipt.sourcePath!=='string'||!/^\/(?!\/)[a-z0-9\-/]*$/.test(receipt.sourcePath))return;
 page.querySelector('h1').textContent='Your next step: speak with our team.';
 page.querySelector('[data-confirmation-message]').textContent='Your details are ready to discuss. Please call or email our team to request your quote.';
 // Consumed once: refresh, back/forward and direct visits do not emit another event.
 window.dataLayer=window.dataLayer||[];
 window.dataLayer.push({event:'enquiry_preview_complete',form_id:receipt.formId,form_source_path:receipt.sourcePath,submission_mode:'preview'});
})();
