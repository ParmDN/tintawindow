# Tint A Window · Design-email review 7.18

27 October 2026. Review website: https://tint-a-window-review.vercel.app

Both Aditya messages in thread `1a161c6d57afd3ff` were read: 22 October (seven original suggestions) and 23 October (slider/icon follow-up). This pass applies the shared changes and rechecks each original recommendation against the current 7.17 layouts. Saved source text is private in `qa-client-7.18/aditya-email-sources.json`.

## Requirement map

| Recommendation | Final result and coverage |
|---|---|
| Outcome photos 16:9 | Retained on all six Home outcome photographs and related-service card photographs. |
| Smooth photo navigation and bottom arrows | All 14 shared photo rails retain one pair of labelled 48px Previous/Next controls; smooth aligned movement, mouse dragging and keyboard support remain. |
| Maximum content width 1320px | Shared section/hero/footer padding retained; all 30 pages tested through 2560px, with content width at or below 1320px. |
| Hide review scrollbar | All 14 review panels hide standard and WebKit scrollbars while preserving scrolling. Vertical review autoplay remains two seconds. |
| Projects label/spacing/copy | Restored a concise yellow-on-dark Installation gallery label. 12px row gap, no extra heading border/padding, 18px description. Gallery filtering and lightbox retained. |
| Locations readability | All 11 location descriptions 18px, weight 650; region labels 14px bold. |
| Overlapping visit card | Desktop card spans the image bottom edge evenly: 111.36px inside / 111.36px outside in the sampled view. It stacks in normal flow on phones. |
| Image scrollbar/autoplay follow-up | All 14 photo rails hide both scrollbar implementations and advance every 1000ms. One shared timer per rail. Hover, keyboard focus, manual browsing, reduced-motion, hidden-page and offscreen guards remain. |
| Icon stroke follow-up | Shared semantic outline icons use 2.5px rather than 1.5px. Shapes, dimensions, positions and colours preserved. Logos, social icons and diagram artwork are unchanged. |

## Quality checks

The full build, content, site, design and final checks pass: 30 customer pages and 333 sections. Existing approved customer content and keyword counts remain unchanged, apart from the two-word gallery label. About's vertical family timeline and the static architectural Home hero remain intact.

180 browser samples cover every customer page at 320, 375, 768, 1024, 1440 and 2560px. Checks include page overflow, heading fit, hero loading, maximum width, icon strokes, all photo-rail intervals/scrollbars/controls and review scrollbar styles. No issues found. Desktop/mobile visual inspection and recorded autoplay/arrow/drag measurements are in `qa-client-7.18/verification-notes.md`, with screenshots and JSON evidence. The current-source Node motion fixture passes timing, wrap, user interruption and device-state cases. This is responsive in-app-browser QA; separate physical-device/Safari/Firefox certification is not claimed.

Local HTTP checks pass 35 responses, covering 2,718 internal link occurrences across 32 paths plus redirect/robots/404 cases. No enquiry delivery was enabled. Shared form/thank-you code is unchanged and remains client review only by instruction.

## Review boundary

This remains the isolated noindex review project. No client live domain, DNS, production indexing, external documents or original photographs changed. Enquiry delivery/privacy/tracking, official social links and final launch approval remain separate production tasks, as recorded in PRODUCTION-HANDOFF.md.

## Implementation and handover

- New shared scrollbar/gallery overrides:`public/team-ui-718.css`, loaded last.
- Shared photo timer:`public/site.js`; existing controls in `public/team-ui-715.js` retained.
- Icon source:`src/section-design.mjs` and matching responsive style.
- Gallery label:`build.mjs`; review guide updated to7.18.
- Independent source audit:`qa-client-7.18/first-email-audit.md`.
- Motion notes/fixture:`qa-client-7.18/motion-notes.md` and `motion-fixture.cjs`.

Hosted verification and completion-email evidence are recorded below after successful publishing.

## Published and notified

All 238 hosted requests pass, including 34 HTML documents, 193 packaged file hashes, response/meta noindex checks, private-file exclusions and redirect destinations. Deployment dpl_5XFPoXqufRkYuWYg89sJ8tLLGcL7 is READY and aliased to the existing review hostname. Browser spot checks confirm published 1000ms autoplay, hidden scrollbar styles, 2.5px icon strokes and the compact gallery label.

Completion reply sent to aditya@digitalneighbour.co.nz, CC manish@digitalneighbour.co.nz and support@digitalneighbour.co.nz. Message 1a17b0a8e1c8cc74 is verified SENT in the original thread 1a161c6d57afd3ff, replying to the 23 October follow-up. Approved completion text, signature and URL match exactly; Gmail appends the previous email as a quote. Evidence: qa-client-7.18/completion-email.json.
