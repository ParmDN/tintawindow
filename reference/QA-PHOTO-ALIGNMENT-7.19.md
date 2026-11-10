# Tint A Window · Photo framing 7.19

27 October 2026. Scope: remove the narrow right-hand wall trim from the team conversation image and review other photo alignment throughout the website.

## Final implementation

- The original conversation photograph is retained. Home and About both use a slightly narrower 1.28:1 frame, anchored left. This displays approximately 1390 of 1448 source pixels, excluding the final 58px where the trim appears. Faces, hair, clothes, embroidered logos and the original photo pixels are preserved. The same frame applies regardless of responsive image size.
- Bill's installation photograph is used 25 times across Home, service/hub and location advice sections. Its focal position now favours the left and upper work area. Narrow advice columns use a 5:6 crop so both his head and squeegee remain visible. Home's narrow desktop crop is likewise corrected; phone layouts retain their established frame sizes.
- The joint portrait, office-support image and original architectural/project/archive photographs remain. Real window frames and building edges are part of those photographs' context. The unused landscape portrait with a wall switch was not added to the site.

## Review and verification

An independent review inspected all seven shoot masters, the 65-photo supplied contact sheet, built uses and their framing rules. Findings are in `qa-client-7.19/photo-audit.md`.

122 responsive photo/layout samples cover all 30 customer pages at 375, 768, 1024 and 1440px, plus Home 1101/1200px checks. The final samples have no page overflow, retain the conversation photograph's right-side subject margin, exclude the trim, and keep the required horizontal working area in Bill's photo. Desktop/mobile visual checks cover Home family, About hero, Home installation and tablet service advice. Supporting portrait and architectural pictures were also reviewed. Offscreen lazy images are not treated as failed loads by a measurement alone.

Full build/content/site/design/final checks pass. All mapped page word counts and keyword counts are identical to 7.18. No customer copy, navigation, forms, motion or enquiry delivery changed. The static Home architectural hero remains. Noindex review boundary is preserved.

## AI preview and source integrity

A built-in image_gen background-only preview was inspected but not selected because it changed fine face/text detail. The final website uses the original photo with CSS framing instead. Preview prompt, original path and generated preview path are recorded privately in `../client-media/photo-alignment-2026-10-27/preview-provenance.json`. No regenerated people were published and no source photo was overwritten.

The final implementation is `public/photo-alignment-719.css`, included throughout the shared page template. Screenshots and measurements are in `qa-client-7.19/`.

## Publishing

Published to the existing isolated noindex review hostname only. Client live domain, DNS, external documents and email are unchanged by this task. Forms remain review-only. Final deployment and hosted-verification details are recorded in vercel-deployment.json and the hosted report copied into the QA folder after completion.

Hosted verification: 239 requests, 34 HTML documents, 194 file hashes, zero issues. Browser verification confirmed the published Home and About crop at desktop and mobile. Deployment: dpl_8pgJs663zjVq6HZBwWgUipgntk44.
