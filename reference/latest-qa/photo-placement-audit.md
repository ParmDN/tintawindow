# v7.20 photo placement audit

Read-only source and saved-screenshot review on 27 October 2026. Root owns edits, fresh browser checks and publication. This report does not claim fresh rendered inspection of every photograph on every route.

## Scope and evidence

- Checked the current built image references across 32 customer/error HTML files: 53 distinct image URLs and 346 image elements. After excluding the header/footer logo, five customer logos and Google icon, this is 46 distinct photo assets and 263 photo placements. These are placements, not 263 different photographs.
- Read the image manifest, service/problem mapping, shared photo rules, v7.19 photo audit and v7.20 placement overrides.
- Visually inspected the supplied 65-photo contact sheet, conversation/office masters, v7.19 Home family and tablet installation screenshots, and the new v7.20 `home-balanced-desktop.png`.
- Project borders, glass mullions, room edges and historic scan edges are part of genuine evidence. Do not remove these or apply a common crop to all project photos.

## Targeted findings

| Status | Route and placement | Finding and recommendation |
| --- | --- | --- |
| Corrected in saved v7.20 evidence | Home `.home-people-717` and About `.fresh-hero-media`, shared conversation photograph, 2 uses | v7.19 left-anchored 1.28 crop kept excess wall beside Bill and crowded Roxana. The new balanced 3:2 master has clear space around both people and no right trim. `home-balanced-desktop.png` shows both faces, shirt logos, image and caption aligned well. Use the complete 3:2 image with centred `contain`; do not apply a second tight crop. Root must confirm About and phone/tablet rendering. |
| Recommended and present in v7.20 source | About `.story-team-717 .shoot-team-portrait img`, 1 use | Original 1086×1448 portrait contains substantial wall above both people. A 9:10 frame at `object-position:50% 70%` removes about 169 px above and 72 px below while preserving the full width, both faces and chest logos. At 420 px wide its height becomes approximately 467 px plus caption, closer to the text column than the original 560 px plus caption. Fresh browser validation is still required. |
| Preserve photograph; optional local layout fix | About team at 601–850 px | CSS still places body and portrait in separate narrow columns, with the heading across both. Long body copy can leave a large empty area under the shorter right portrait. Check the narrowest tablet width; if visible, stack heading → portrait → body at 850 px. Keep the portrait capped at 420 px and centred rather than stretching it. |
| Recommended local correction | Contact `.contact-copy > img[src*="shoot-roxana-support"]`, 1 use | The 3:4 office portrait contains the face, workwear, desk and mouse hand. Width 100% combined with automatic height, `max-height:470px` and `contain` can create side gutters because the image box is capped independently of its natural ratio. At a 500 px column, actual image content is only about 352 px wide, leaving approximately 74 px on each side. Prefer natural 3:4 dimensions at full width with no height cap; if the full height is too long, use a 352 px natural-width cap aligned to the copy. Do not use 4:5 or 5:6 solely to fill the box: this would crop the hand/mouse context. |
| Retain current frame | Home reasons plus hubs, service and location reasons `.reasons-photo`, Bill working, 25 uses | v7.19 `left 30%` and desktop/tablet 5:6 framing retain Bill's head and installation tool. Saved 768 px evidence shows the photo and advice panel start together. Some gap below the shorter photo comes from the longer text column; stretching or recropping the photograph will not solve it. Keep it static and top-aligned. |
| Retain; confirm legibility in final browser pass | Home quote-support photograph and Contact hero, polished van, 2 uses | The van is genuine branding evidence. Existing Home crop uses 50% 68%; check the logo and contact lettering remain readable at phone width. Preserve the polished master and avoid another generic centre crop. |

## Remaining photo families

| Family | Source mapping / selectors | Assessment and final checks |
| --- | --- | --- |
| Home architectural hero | `architecture`, `.fresh-hero-media` | Keep the approved static architectural image. Use its focal view of glazing and interior, not a people-photo rule. Check desktop and phone preserve the principal window opening. |
| Home audience and outcome cards | `client-019`, `client-054`, `client-020`, `client-064`, `client-026`, `client-062`; `.audience-photo-link`, `.outcome-photo` | These are contextual photographs. Landscape frames intentionally preview the category; no face crop issue was identified from originals. Commercial portrait `client-054` needs a phone spot-check because a landscape preview shows only part of the tall building. |
| Service heroes, problem photos and project cards | `serviceMediaMap`, `problemMediaMap`; `.fresh-hero-media`, `.problem-photo`, `.gallery-context-card` | Mapping is consistent between each service heading and its relevant glass scene. Privacy uses client-064; fade uses client-062; Residential frosting uses client-040; Commercial frosting uses client-056; safety/security uses glazing/work-4 rather than Bill's portrait. Keep this mapping. |
| Portrait glass scenes | `client-031`, `033`, `040`, `042`, `044`, `051`, `054`, `056` | These are 3:4 originals. Wide hero/cards necessarily crop vertical context. Spot-check Residential Frosted/Opaque, Commercial hub, Commercial Frosted/Opaque and Commercial Heat Rejection to ensure the frosted band, roof glazing or tall window remains obvious. Do not infer a defect solely from the changed ratio. The full frame belongs in the gallery lightbox. |
| Wide panoramas | `client-026` (1600×753) and `client-045` (1600×757) | Tall cards crop their sides. Their central glazing/interior is still relevant. Keep distinct source focal points if browser inspection shows a principal feature is cut; do not use a global left anchor. |
| Related-service cards | `.related-service-cards img`, shared 16:9 | Uniform card frames are appropriate for comparison. Real subject imagery is mapped by service, and installation portraits remain only in advice/reasons. Confirm all card images retain the service feature and card captions/headings begin at a consistent baseline. |
| Project rails and gallery | `.photo-rail`, `.gallery-item` | Equal frame heights are suitable for a tidy premium grid. Preview crops are acceptable because the lightbox provides the full scene. Check the image edges, captions, arrow spacing and touch controls rather than removing the real window/building borders. |
| About archive timeline | `client-001`, `007`, `009`, `013`; `.history-photo` / timeline figures | Retain contained 4:3 scans and the vertical history. Historic text, original branding and people should remain visible. Do not generate cleaner details, replace logos or force full-bleed crops. |
| Unused shoot masters | team-landscape, Bill-tools, Roxana-portrait | No customer-page uses were found in the inspected build. Their framing does not affect this release. Avoid editing or adding them simply to resolve an issue elsewhere. |

## Release checks for root

1. Confirm the new shared conversation source and responsive variants load on Home and About, with no cached old trim/crop.
2. Inspect Home, About and Contact at phone, tablet and desktop widths. Check complete heads, logos, hands where relevant, equal body-edge space and captions aligned to the photograph.
3. Sample the portrait glass scenes and panoramas listed above in heroes, related cards and gallery. Adjust only a specific image/placement when the subject is demonstrably cut.
4. Keep natural image dimensions and local focal-point rules. Do not stretch photographs to match longer copy columns.
5. Verify the shared photo/CSS changes on the hosted noindex review deployment after publication, as local build success alone does not confirm hosted composition.

No broader photo replacement or artificial retouch of real installations is justified by this audit. The clear corrections are the conversation composition, About portrait headroom, and Contact image-box behaviour; tablet About spacing should be decided from the fresh browser rendering.
