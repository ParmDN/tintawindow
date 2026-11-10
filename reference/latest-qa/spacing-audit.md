# v7.20 spacing and layout audit

Read-only review of the shared CSS, current built-page structure, and saved v7.17–v7.19 screenshots. This is a source and screenshot audit, not a claim of fresh browser verification of every route. Root agent owns current rendered QA and deployment.

## Focused changes

| Priority | Area and selector | Evidence and recommendation |
| --- | --- | --- |
| P2 | Home process: `.fresh .home-installation-steps` | `public/refinement.css:144` retains `margin-top:46px` at every width. The preceding shared `.home-chapter-heading` also has a 22px bottom margin. This is a local, avoidable gap before the steps. Root reports the new final override uses 6px; verify the actual heading-to-step gap on desktop and phone before publishing. Keep the step spacing and animation unchanged. |
| P3, optional polish | Photo rails: `.fresh main .section .photo-carousel` with `.fresh .photo-rail-controls` | Rail bottom padding was 14px while controls add another 12px above themselves. The scrollbar is hidden, so the former scrollbar breathing room can be reduced. Root reports 4px bottom padding in v7.20. This is a small tidy, not a functional defect. Verify the photo captions still have enough room and navigation remains clear. |
| P2, image framing | Conversation photograph in `.home-people-717` and About hero | The v7.19 `object-position:left center` anchors the left wall while cutting space on Roxana's side. The photo must be balanced within the image itself and then displayed without a second asymmetric crop. Root reports a new balanced 3:2 master, with the complete frame used for the shared conversation photograph. Check both people, logos and right wall on phone/tablet/desktop. |

## Shared spacing to retain

- Outer sections already use 42px top/bottom on desktop and 32px on smaller screens through `public/launch-polish-717.css:13`. Further global compression would make longer service copy and cards cramped.
- Hero text, buttons, credentials and image already have local compact gaps. Preserve the heading-left / supporting-text-right layout and the static architectural Home image.
- Residential and Commercial guidance and advice sections are deliberately top-aligned in `public/service-layout-717.css`. The image uses a natural ratio; the panel and advice use consecutive rows. Saved tablet evidence shows this arrangement is readable and aligned. Some space under a shorter photograph is a consequence of copy length, not a reason to stretch the image or reintroduce sticky behaviour.
- Four service choice cards are already arranged in a 2×2 desktop grid rather than leaving an orphan fourth card. Keep that arrangement and the single-column phone layout.
- The About page's vertical timeline is compact and intentional. Archive scans should remain contained so text and historic details are not clipped. Do not convert it back to a carousel.
- Footer headings are top-aligned; locations use a separate six-column desktop strip and two columns on phone. Keep these controls rather than returning locations to a long single column.
- Gallery introduction, category buttons and photograph grid already have local compact rules. The earlier yellow line above the gallery heading is overridden by v7.18; check the latest build rather than the older screenshot.

## Remaining rendered checks for root

1. Confirm the two v7.20 local spacing changes at 375px, 768px and desktop. Ensure rail arrows do not touch captions.
2. Confirm Home conversation, About hero/team portrait, all shared Bill-working photographs, van and project cards keep useful subject positioning at each breakpoint. Avoid a site-wide `object-position` that assumes every subject is centred.
3. For each route template, inspect section boundaries and top alignment: Home, Residential and Commercial hubs, individual services, location pages, locations overview, About, Projects, Contact and FAQ. Look for overflow, stretched blank grid rows, cut headings and mismatched caption positions.
4. About team has a two-column stage between 601px and 850px. Check its narrowest width before deciding whether it needs to stack sooner; no change is justified from source alone.
5. Keep forms in the approved review-only state, keep noindex controls, and retain the mobile fixed Get a Quote / Call Now bar. Final checks should avoid presenting a review form as a delivered enquiry.

No broader spacing redesign is recommended from this audit. The clear corrections are the image composition and the two small local gaps above; fresh browser evidence should determine any further adjustments.
