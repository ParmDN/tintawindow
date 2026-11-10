Current UI follow-up: version 7.18, 27 October 2026. Both Aditya emails have been implemented and checked; see QA-CLIENT-REVIEW-7.18.md. The approved 7.17 content/media decisions below remain, with a restored two-word gallery label. All production launch gates remain unchanged.

# Tint A Window v7.17: review and launch handoff

Updated 23 October 2026. Current source: `website-v7`. Review URL: https://tint-a-window-review.vercel.app. This is an isolated **noindex client-review site**. The client's live website and domain are unchanged.

## Current content and design

- Bill's confirmed founding date is **1987**. The site uses **39+ years of industry experience**, with the About timeline showing 39 years in 2026.
- The static architectural homepage hero is restored. The original logo layout now uses the approved brighter yellow, `#FFD43B`, alongside the existing charcoal green and white.
- Service photographs are mapped by their supplied category. General glass photographs illustrate safety/security contexts; they do not prove a particular film or measured result.
- About is a concise family/team story with a vertical archive timeline. Projects opens directly into the filtered installation gallery. Neither page is padded to a service-page word target.
- Home, service and location detail pages retain the 1,000–1,500-word guide and at least three natural matches per assigned keyword. Grammatical variants are reported separately from literal exact phrases. About/Projects remain mapped for topic ownership but are exempt from repetition and word quotas; the Locations directory is navigation content.
- Energy copy explains that suitable solar film **may reduce electricity used for cooling**. Results depend on the glass, film, climate and building use, including useful winter sun. No percentage off a power bill is promised, and UV/fade protection alone is not described as an energy saving.
- Tint-guide percentages are clearly labelled **illustrative visible light transmission (VLT)** examples. They are not UV/heat-rejection figures, stocked products or measured results. Add actual film performance only with the named product, glass basis and supporting data.

Read `qa-client-7.17/content-notes.md`, `independent-proof.md`, `media-mapping.md` and `story-notes.md` for the change evidence and remaining limits. Original SEO sources and unedited media remain private.

## Review build and checks

Use Node.js 22+ and Python 3. No package installation is required.

1. Run `npm run build` to generate `dist` and run content, link/asset and design checks.
2. Run `npm run dev`, then `npm run check:links` against http://localhost:4325.
3. Inspect the final rendered desktop/mobile candidate, including menus, gallery, timeline, forms, keyboard focus and reduced-motion behaviour.
4. Regenerate review exports and the isolated Vercel package from that same checked build. Verify the deployed package, noindex directives and private-file exclusions before sharing.

Use the current generated audit and final QA report for measured results; a successful static build is not evidence of received enquiries or a completed production launch. The portable client ZIP is for offline review. Deploy the normal generated website through the agreed hosting process.

## Complete before a live-domain launch

**Forms:** They deliberately send nothing in this review. The Home, popup and Contact forms demonstrate service selection, local photo selection and a thank-you journey. Current limits are **up to five JPG, PNG or WebP photos, 5 MB each**. No photos are uploaded. Keep the button labelled Continue until live delivery works.

Connect the approved receiving inbox and a verified sending service. Add server-side validation, spam protection, appropriate private photo handling and a clear failure response. Test a consented dummy enquiry through to receipt in the correct inbox, a usable reply address and attachment access where enabled. Record evidence. A preview thank-you event is not a production lead.

**Privacy and tracking:** Approve privacy/retention wording for the actual form, photo and analytics providers. Link it beside the live form and in the footer. Keep personal details and photographs out of analytics; count accepted production enquiries separately from phone/email clicks and preview completions.

**Client facts and links:** Retain the confirmed 1987 founding date. Confirm remaining product data, business details and photo/customer-reference permissions. Facebook and Instagram URLs are still awaiting official links in `src/social-links.json`; connect confirmed profiles or remove pending labels for production. Do not invent accounts.

**Migration and indexing:** Back up the live website and capture its complete URL/redirect inventory. Validate retained routes and one-hop permanent redirects. Keep the review site noindex. Only after explicit launch approval should the production package enable indexing, publish a validated sitemap and production robots.txt, confirm canonical URLs, and change the live domain/DNS. Remove internal review pages and private QA/source files from the customer production package.

**Final release:** Verify HTTPS, real 404 responses, redirects, form delivery, phone/email links, keyboard use, representative iOS/Android layouts and hosted performance on the actual configuration. Record the release and rollback procedure. Sagar's approval of review design/content is separate from approval to replace the live website.
