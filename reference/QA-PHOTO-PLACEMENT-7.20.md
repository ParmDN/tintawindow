# Photo placement and spacing release v7.20

27 October 2026. Published and verified on the isolated review site:
https://tint-a-window-review.vercel.app

Final deployment: `dpl_8jBQL4x7moRfMkKb5KHs2T6uhy8j`.
Immutable URL: https://tint-a-window-review-73g4mv2c3-sagar-5442s-projects.vercel.app
The first v7.20 deployment was superseded after a final Contact tablet centring correction.

## Changes

- Home and About now use a balanced 3:2 conversation photograph. Plain wall was extended beside Roxana, excess left-side wall reduced, and the right-hand trim removed with the built-in image editing tool. Both placements display the full selected composition, centred. Original masters are retained. This is an AI-assisted background/composition edit, not a promise of pixel-identical fine detail.
- About's joint portrait removes excess wall above the pair while retaining both faces and shirt logos. At 850px and below, its heading, portrait and text stack into one reading column.
- Contact's complete 3:4 office portrait keeps Roxana's face, shirt, hand and desk context. It no longer uses the independent height cap that produced side gutters. Narrow single-column tablet views use a centred 420px maximum width.
- The extra margin above Home installation steps is reduced. The measured desktop heading-to-steps gap is 22px. Photo rails have 4px bottom padding, bringing their controls closer without touching captions.
- Existing corrected framing of Bill's working photograph remains across 25 placements. Real installation boundaries and historic scan edges remain intact. The static architectural Home hero, service-to-image mapping and vertical About history are retained.

## All-page review and evidence

The independent source/media audit covers 46 distinct photographic assets and 263 photo placements, excluding logos and icons. Every customer page was included in the layout sweep. Source/photograph review and targeted visual browser inspection complement the measured checks; this is not a claim that 263 individual screenshot crops were manually examined at every size.

| Check | Result |
| --- | --- |
| Full build and content/site/design/final checks | Pass, zero reported issues |
| Customer pages / top-level sections in build | 30 / 333 |
| Local responsive geometry | 135 samples: every route at 375, 768, 1024, 1440px; Home/About/Contact also at 320, 601, 850, 1100, 2560px |
| Local section/image measurements | 1,463 sampled section boxes and 1,348 image boxes; no page or heading overflow, no excessive measured outer gap |
| Intentional hidden image | Projects retains a hidden architectural hero asset; its zero-size box is intentional, not a failed photograph |
| Published mobile sweep | All 30 routes at 375px after page rendering settled: zero overflow, all noindex |
| Final published Contact correction | Rechecked at 375, 601, 768, 850, 1024, 1100, 1440px; side gaps equal and full natural ratio retained |
| Internal links | 2,718 link occurrences, 32 unique paths, 35 local response checks; zero issues |
| Review package | 199 files, 34 HTML documents, 4,596 local references; zero missing files/anchors or private-source references |
| Final hosted checks | 244 requests, 34 HTML documents, zero issues; expected hashes match package |
| Copy regression | All customer word and keyword measurements match v7.19; no editorial changes |

The first immediate hosted DOM sweep measured transient overflow before all layout initialisation completed. The settled screenshot-backed sweep repeated all 30 routes and passed. Both raw and settled measurements are retained; the settled file is the release evidence.

Targeted visual inspection includes the Home family section at desktop/phone, About hero/team/tablet, Contact desktop/tablet, Privacy advice, portrait glass scenes in Residential Frosting, Commercial, Commercial Frosting and Commercial Heat, gallery lightbox and footer. Heads, logos, tool/hand context, photo edges and captions were checked. Wide project previews remain deliberate crops with full photographs in the gallery lightbox.

Functional spot checks confirm automatic photo movement (0px to 832.5px) and manual Next movement (to 1212.5px, with interaction pause), plus opening/closing of the quote popup and gallery lightbox. Shared 1,000ms photo autoplay, manual controls and motion/device guards are retained.

## Scope

No client live domain or DNS change. HTML meta and content responses remain `noindex, nofollow, noarchive`; robots permits reading those directives. Private working files are excluded. Forms remain client-review only and send/upload nothing, by the user's explicit choice. No new email or Drive edit was made in this task. Existing social-link confirmation and production enquiry delivery/launch tasks remain separate.

## Files and screenshots

- `public/placement-polish-720.css`: focused shared framing/spacing overrides.
- `src/image-manifest.json`: selected conversation asset and responsive variants.
- `qa-client-7.20/photo-placement-audit.md` and `spacing-audit.md`: independent source audits.
- `qa-client-7.20/content-regression.md`: unchanged copy and qualified keyword-count method.
- `qa-client-7.20/responsive-placement.json`, `breakpoint-placement.json`: local sweep.
- `qa-client-7.20/hosted-mobile-placement-settled.json`: final 30-page hosted mobile sweep.
- `qa-client-7.20/published-contact-breakpoints.json`: final Contact centring measurements.
- `qa-client-7.20/published-balanced-desktop.png`: final published Home composition.
- `qa-client-7.20/published-about-mobile.png` and `published-contact-tablet.png`: hosted photo evidence.
- `qa-client-7.20/qa-vercel-live.json`: final hosted response/hash checks.

Image master: `/Users/sags/Documents/Digital Neighbour Ops/Clients/Tint A Window/client-media/photo-balance-2026-10-27/team-conversation-balanced.png`.
Website master: `/Users/sags/Documents/Digital Neighbour Ops/Clients/Tint A Window/website-v7/public/assets/shoot-team-conversation-balanced-720.webp`.
Mode, exact prompt, source, output paths and export procedure: [asset record](../client-media/photo-balance-2026-10-27/README.md) and `provenance.json` alongside it.
