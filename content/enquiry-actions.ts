// Read-only logic port of website/src/enquiry-actions.mjs. No filesystem effects.
// One consistent pair of actions, with a local form anchor on the enquiry page.
export function enquiryActions(quote='/contact-for-window-tinting'){
 return `<div class="enquiry-actions"><a class="button primary" href="${quote}">Get a Quote</a><a class="button call-button" href="tel:0800368468">Call Now</a></div>`;
}
