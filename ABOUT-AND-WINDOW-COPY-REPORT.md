# About timeline and capitalization audit

Date: 11 November 2026.

The About timeline is corrected in the actual local runtime source. Capitalization remains a dry run awaiting approval. No remote documents were accessed or changed; no deployment, dependency changes or Git commands were used.

## Actual content source

This is the flattened static-export migration, not the Sanity-based project described in the request. package.json has Next/React and the migration tooling, with no Sanity client or Vitest. There is no src/, content-archive/, tests/, docs/, or generated AboutSection component here, nor any Sanity connector available in this session. The About route uses app/about/page.tsx → PageMain → lib/pages.ts → lib/render-site.ts → content/revised-content.ts → storyArchive in content/client-media.ts. That function's hardcoded moments array determined the newest-first DOM order. No remote runtime/dataset identity is established for a different deployed site.

## Task 1 — source change completed

Changed **content/client-media.ts only** for page content:

- Reordered the six original array entries to 1987 → Late 1980s → 1992 → Mid-1990s → Mid to late 1990s → 2026.
- Changed the eyebrow to “From the beginning to today”. No remaining occurrence of the old eyebrow was found in active app/components/content/lib/public/scripts source.
- Corrected the ordered list's aria-label from “Tint A Window history, newest to oldest” to “Tint A Window history, oldest to newest” to keep accessibility text truthful. This is the one deliberate attribute wording change; IDs, keys and image alt text remain unchanged.
- Kept every card's entire rendered HTML byte-identical to its original, after reversing the list. About main content outside the archive section is byte-identical to the immutable baseline.
- No CSS reversal or stylesheet changes.

Caption check: **no mismatch in this checkout**. “Letting people see the finish” has date **Mid-1990s**, and its rendered caption is **Mid-1990s · Family archive**. No Mid-1980s caption was found in active content/public text sources. The original client-001 image was inspected; its signage does not establish an archive date. No historical date was inferred or changed. A different Sanity document/deployed version remains unverified.

## Focused verification

Added scripts/verify-about-timeline.mjs. It renders current TypeScript in memory, serves the source HTML locally with unchanged public CSS/assets/scripts, and compares its timeline against the immutable About baseline. It does not rebuild or overwrite out/.

| Check | 360px | 768px | 1440px |
| --- | --- | --- | --- |
| Chronological DOM and unchanged card markup | PASS | PASS | PASS |
| 1987 dark highlight first; 2026 dark highlight last | PASS | PASS | PASS |
| Line start/end offsets and dot geometry match baseline | PASS | PASS | PASS |
| No card overlap or horizontal page overflow | PASS | PASS | PASS |
| Browser page errors | 0 | 0 | 0 |

The baseline already has a 2px horizontal difference between the line center and dot center because of the pseudo-element border box dimensions; the same difference remains at all widths. It was compared against the baseline, not silently fixed or declared perfectly centered. The line starts within the first dot and reaches the final dot; existing line tail offsets remain 35px on mobile and 34px on larger widths. Screenshot review confirms chronological cards, unchanged highlights and intact line/dots. Fixed navigation/quote controls can overlay tall element screenshots; this is existing browser UI behavior, not reordered card markup.

Evidence: migration/verify/about-timeline-current.log and about-timeline-{360,768,1440}-current.png. The first local browser attempt could not find the default browser cache; the harness now uses the retained executable. Sandbox launch then returned EPERM; the browser checks completed outside the sandbox. A measurement assertion was corrected to compare actual border-box geometry with baseline; no CSS was adjusted.

These are source-render preview checks, **not a new Next export, hydration verification or production-site check**. Existing out/ still contains the pre-change build. npm run build and Vitest were not run in this approval-gated audit stage. Vitest is not installed/configured here.

## Task 2 — read-only scan

Added scripts/audit-window-copy.mjs. The script writes only to stdout, makes no CMS/network calls and never patches files. It parses source string/template/JSX literals, not TypeScript identifiers or JSON field names, and renders all 34 routes in memory to inspect text, meta tags, JSON-LD and visible attributes. Root WINDOW-COPY-DRY-RUN.md contains each source/rendered occurrence, file or route, field/DOM path, before/proposed-after context, exceptions and doubtful cases. Source counts overlap runtime counts and must not be added as unique edits.

| Classification | Source occurrences | Rendered occurrences |
| --- | ---: | ---: |
| Protected brand | 581 | 458 |
| Lowercase proposals | 737 | 131 |
| Sentence/heading-start exceptions to confirm | 270 | 142 |
| Heading/label/alt cases needing a decision | 136 | 61 |
| Protected path/identifier needing manual review | 1 | 0 |
| Total capitalized Window/Windows occurrences | 1,725 | 792 |

Examples of exceptions: “Window film advice and practical trade experience.” remains capitalized at sentence start; “Window Tinting FAQs” begins with Window. Interior title-case cases such as “Commercial Anti-Glare Window Film Christchurch”, “Residential Window Tinting”, and metadata “Anti Graffiti Window Films Christchurch | Tint A Window” need a decision about natural sentence case. The dry-run table changes only the target word, so its previews may still show other title-case words; no unrequested whole-heading edits have been made. Full exceptions and their precise locations are in the dry-run report.

**Confirmed risk:** content/customer-polish.ts capitalizes service phrases wherever its regex matches, using m[0].toUpperCase()+m.slice(1).toLowerCase(), and contains phrase substitutions with capitalized service terms. Editing only underlying copy can therefore reintroduce uppercase Window during rendering. A targeted copy-formatting change needs explicit approval under the request's “content/string literals only, never code logic” restriction. It has not been applied. Heading processing in content/editorial-review.ts, typed baseline-derived metadata in content/routes.ts, frozen content/design-review-final.ts, quotations, replacement keys and template fragments require review too.

No title/SEO/alt/FAQ/nav/footer/testimonial content has been lowercased yet. Brand forms, URLs, slugs, files, schema keys, code identifiers, dependencies, hosting and the immutable baseline are unchanged.

## Files changed or created

- Changed: content/client-media.ts (Task 1 only).
- Created: scripts/audit-window-copy.mjs (reusable read-only scan).
- Created: scripts/verify-about-timeline.mjs (focused verification).
- Created: WINDOW-COPY-DRY-RUN.md and this report.
- Created verification evidence: migration/verify/about-timeline-current.log and three screenshots.
- Sanity documents changed: none. Offline archive JSON changed: none (directory absent).

## Pending approval / missing context

Approve the lowercase proposals, choose the heading exceptions in WINDOW-COPY-DRY-RUN.md, and explicitly decide whether the service-copy formatter may be adjusted. If the intended runtime is a separate Sanity project, provide its checkout/connection and project/dataset identity before any export or write; the local report cannot substitute for a remote dataset audit. A Sanity export must precede any approved CMS patch. No dataset export or write is attempted without a confirmed target.

This project has output: export and no /api/revalidate endpoint. Local content updates require a rebuild and publication rather than a CMS cache-tag call. Publication is not authorized here. After approved changes, rerun the scan, run the Node22 build, and check About plus 2–3 service pages from the fresh export. Existing scripts/check.mjs intentionally compares baseline copy and will flag approved copy differences; do not weaken it to hide those changes. Vitest cannot be executed without a separately approved test setup. No production behavior, hosted cache state or remote Sanity content has been verified.
