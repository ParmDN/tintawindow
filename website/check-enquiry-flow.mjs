import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const code=fs.readFileSync(new URL('./public/enquiry-flow.js',import.meta.url),'utf8');
const key='tint-enquiry-preview-completion';
function run({storage=new Map(),confirmation=false,blocked=false}={}){
 const heading={},message={},navigations=[];
 const context={window:{},document:{querySelector:()=>confirmation?{querySelector:s=>s==='h1'?heading:message}:null},location:{pathname:'/residential-window-tinting/privacy-window-films',assign:p=>navigations.push(p)},sessionStorage:{getItem:k=>{if(blocked)throw Error('Blocked');return storage.get(k)||null;},setItem:(k,v)=>{if(blocked)throw Error('Blocked');storage.set(k,v);},removeItem:k=>{if(blocked)throw Error('Blocked');storage.delete(k);}}};
 vm.runInNewContext(code,context);return{context,storage,navigations,heading};
}
for(const formId of ['homepage','quote-popup','contact']){
 const first=run();first.context.window.tintEnquiryPreview.complete(formId);
 assert.deepEqual(first.navigations,['/thank-you']);
 const stored=JSON.parse(first.storage.get(key));assert.deepEqual(Object.keys(stored).sort(),['createdAt','formId','sourcePath']);
 const thanks=run({storage:first.storage,confirmation:true});
 assert.equal(thanks.context.window.dataLayer.length,1);assert.equal(thanks.context.window.dataLayer[0].form_id,formId);assert.equal(thanks.context.window.dataLayer[0].event,'enquiry_preview_complete');
 assert.equal(thanks.storage.has(key),false);assert.equal(run({storage:thanks.storage,confirmation:true}).context.window.dataLayer,undefined);
}
assert.equal(run({confirmation:true}).context.window.dataLayer,undefined);
for(const receipt of ['broken-json',JSON.stringify({formId:'contact',sourcePath:'/',createdAt:Date.now()-31*60*1000}),JSON.stringify({formId:'bad',sourcePath:'/',createdAt:Date.now()}),JSON.stringify({formId:'contact',sourcePath:'/contact?email=private',createdAt:Date.now()})])assert.equal(run({storage:new Map([[key,receipt]]),confirmation:true}).context.window.dataLayer,undefined);
const blocked=run({blocked:true});blocked.context.window.tintEnquiryPreview.complete('contact');assert.deepEqual(blocked.navigations,['/thank-you']);assert.equal(run({blocked:true,confirmation:true}).context.window.dataLayer,undefined);
const unknown=run();unknown.context.window.tintEnquiryPreview.complete('unknown');assert.equal(unknown.navigations.length,0);
console.log('PASS: three form origins, one-time attribution, direct/refresh visits, expired/invalid receipts, no personal data and blocked storage.');
