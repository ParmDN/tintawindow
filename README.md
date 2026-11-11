# Tint A Window — Next site

This is the working Next.js 15 App Router / React 19 / TypeScript static-export project. **`D:/Aditya Digital Neighbour/Tint-A-Window-backups/root-legacy-before-flatten-20261111/website/` stays as the reference until production launch.** Do not regenerate or edit that tree or `migration/baseline/`. This review build is noindex and has no live enquiry submission service.

## Requirements and commands

Use **Node 22.x** (`>=22 <23`) and npm. Dependencies are locked; do not upgrade them as cleanup. From this folder, with Node 22 active:

```powershell
node --version
npm ci
npm run build
npm run check
```

Install only when needed; installed dependencies were kept. Build runs `next build && node scripts/export-directories.mjs`, producing 33 directory-style documents plus `404.html` in `out/`. Check is plain `node scripts/check.mjs`; it reads the real export and retained baseline, verifies head/schema/h1/native structure/scripts/CSS provenance and internal references. Normal compiler/type/build errors remain enabled.

Preview the existing export locally (the helper exports a function; running its file alone does not start a server):

```powershell
node --input-type=module -e "const { startStatic } = await import('./migration/verify/local-server.mjs'); const server = await startStatic('./out'); console.log(server.origin);"
```

Open the printed loopback URL; Ctrl+C stops it. This server maps clean URLs to directory indexes and returns the 404 body/status for unknown paths. It does not reproduce host redirects/cache/header policy. It is not a deployment. Rebuild after source changes; preview does not watch files. `next start` is not the server for output:export.

## Windows: retained Node 22 and SWC/WASM

The system Node on the verification machine was 24, so use the retained Node **v22.23.4** explicitly. A global npm shim may select its sibling Node rather than the first node on PATH; invoke npm's CLI through the retained binary:

```powershell
$node22 = (Resolve-Path '.\migration\verify\runtime\node_modules\node\bin\node.exe').Path
$npmCli = Join-Path $env:ProgramFiles 'nodejs\node_modules\npm\bin\npm-cli.js'
$env:PATH = "$(Split-Path $node22);$env:PATH"
& $node22 --version
# If reinstalling is actually needed: & $node22 $npmCli ci
$env:NEXT_TEST_WASM = '1'
$env:NEXT_TEST_WASM_DIR = (Resolve-Path '.\node_modules\next\wasm\@next\swc-wasm-nodejs').Path
$env:NEXT_TELEMETRY_DISABLED = '1'
& $node22 $npmCli run build
& $node22 scripts/check.mjs
```

Application Control blocks native Windows SWC here. The above uses the existing cached WASM binding without modifying dependencies; the NEXT_TEST_WASM variables are internal Next switches tied to this installed version, not permanent app configuration. Verify the cached wasm.js exists before using the directory override. A fresh install elsewhere may need Next's ordinary supported fallback download/cache; do not manufacture a replacement binding or suppress build errors. If worker spawning is sandbox-blocked, run the authorized build outside that sandbox. Existing WASI/workspace-root warnings do not mean checks are disabled. Clear these shell-only overrides when no longer needed (`$env:NEXT_TEST_WASM = $null`; likewise NEXT_TEST_WASM_DIR).

For preview with the retained binary, replace `node` in the preview command with `& $node22`. No package preview script or UI library is required.

## Structure and editing

Filesystem snapshot: **11 November 2026**. Every current file and directory outside the four collapsed root trees is listed below, including static assets, the 34 baseline HTML documents, verification evidence and the retained Node runtime. `.git/` internals are omitted; `node_modules/`, `.next/` and `out/` are generated or reinstallable and show their current file counts instead of thousands of internal filenames. Counts and build artifacts can change after install/build/dev commands. Empty directories are marked explicitly. This inventory reflects the approved cleanup: 79 historical report, screenshot and log files plus the sitemap draft were removed from the working tree (21.831 MB total). Runtime and comparison snapshots were retained. Ignored local build/check logs are included because this is a filesystem inventory, not a tracked-files-only list.

```text
Tint-A-Window/
├── .git/  # Git metadata; internals omitted
├── .next/  # Generated Next build/dev cache; 275 files, contents collapsed
├── app/  # App Router routes and CSS
│   ├── about/
│   │   └── page.tsx
│   ├── commercial-window-tinting/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── commercial-window-tinting-services/
│   │   └── page.tsx
│   ├── contact-for-window-tinting/
│   │   └── page.tsx
│   ├── design-review/
│   │   ├── project-story/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── locations/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── residential-window-tinting/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── residential-window-tinting-services/
│   │   └── page.tsx
│   ├── thank-you/
│   │   └── page.tsx
│   ├── window-tinting-faq/
│   │   └── page.tsx
│   ├── window-tinting-gallery/
│   │   └── page.tsx
│   ├── globals.css  # Tailwind v4 theme/utilities; no Preflight
│   ├── layout.tsx
│   ├── legacy.css  # 22 original stylesheets concatenated in cascade order
│   ├── not-found.tsx
│   └── page.tsx
├── components/  # Shared UI and page mounting boundaries
│   ├── forms/
│   │   └── QuoteDialog.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MainRegion.tsx
│   │   ├── PageMain.tsx
│   │   ├── RouteHeadTags.tsx
│   │   └── SiteBody.tsx
│   ├── sections/  # Empty directory
│   └── ui/  # Empty directory
├── content/  # Typed local content, data and section renderers
│   ├── boutique.ts
│   ├── brand-pages.ts
│   ├── client-media.ts  # About timeline data and markup
│   ├── customer-evidence.ts
│   ├── customer-polish.ts  # Approved visible-copy formatter and capitalization policy
│   ├── design-review-final.ts  # Reviewed HTML snapshot; approved body-copy casing exception
│   ├── editorial-review.ts
│   ├── enhancements.ts
│   ├── enquiry-actions.ts
│   ├── film-guide.ts
│   ├── final-content.ts
│   ├── final-local-stories.ts
│   ├── final-proof.ts
│   ├── footer.ts
│   ├── fresh-design.ts
│   ├── gallery-alts.ts
│   ├── homepage-refinement.ts
│   ├── images.ts
│   ├── local-stories.ts
│   ├── media-map-717.ts
│   ├── national-copy.ts
│   ├── navigation.ts
│   ├── page-copy.ts
│   ├── proof-data.ts
│   ├── quote-form.ts
│   ├── revised-content.ts
│   ├── routes.ts
│   ├── search-terms.ts
│   ├── section-design.ts
│   ├── shoot-media.ts
│   ├── site-data.ts
│   ├── social-links.ts
│   ├── source-units.ts
│   ├── surfaces.ts
│   ├── team.ts
│   ├── thank-you.ts
│   └── types.ts
├── lib/  # Page composition, HTML, metadata and shared markup
│   ├── html.ts
│   ├── layout-markup.ts
│   ├── metadata.ts
│   ├── pages.ts  # getPage() and final mainHtml
│   └── render-site.ts  # Section composition and document assembly
├── migration/  # Immutable baseline, retained tools, snapshots and migration records
│   ├── baseline/  # Read-only reference archive
│   │   └── dist-html/  # All 34 reference HTML documents
│   │       ├── about/
│   │       │   └── index.html
│   │       ├── commercial-window-tinting/
│   │       │   ├── anti-glare-window-films/
│   │       │   │   └── index.html
│   │       │   ├── anti-graffiti-window-films/
│   │       │   │   └── index.html
│   │       │   ├── frosted-opaque-decorative-window-films/
│   │       │   │   └── index.html
│   │       │   ├── heat-rejection-solar-protection-window-films/
│   │       │   │   └── index.html
│   │       │   └── safety-security-window-films/
│   │       │       └── index.html
│   │       ├── commercial-window-tinting-services/
│   │       │   └── index.html
│   │       ├── contact-for-window-tinting/
│   │       │   └── index.html
│   │       ├── design-review/
│   │       │   ├── project-story/
│   │       │   │   └── index.html
│   │       │   └── index.html
│   │       ├── locations/
│   │       │   ├── arrowtown/
│   │       │   │   └── index.html
│   │       │   ├── ashburton/
│   │       │   │   └── index.html
│   │       │   ├── christchurch/
│   │       │   │   └── index.html
│   │       │   ├── cromwell/
│   │       │   │   └── index.html
│   │       │   ├── geraldine/
│   │       │   │   └── index.html
│   │       │   ├── lake-tekapo/
│   │       │   │   └── index.html
│   │       │   ├── oamaru/
│   │       │   │   └── index.html
│   │       │   ├── queenstown/
│   │       │   │   └── index.html
│   │       │   ├── temuka/
│   │       │   │   └── index.html
│   │       │   ├── timaru/
│   │       │   │   └── index.html
│   │       │   ├── wanaka/
│   │       │   │   └── index.html
│   │       │   └── index.html
│   │       ├── residential-window-tinting/
│   │       │   ├── anti-glare-window-films/
│   │       │   │   └── index.html
│   │       │   ├── fade-reduction-window-films/
│   │       │   │   └── index.html
│   │       │   ├── frosted-opaque-window-films/
│   │       │   │   └── index.html
│   │       │   ├── heat-control-window-films/
│   │       │   │   └── index.html
│   │       │   ├── privacy-window-films/
│   │       │   │   └── index.html
│   │       │   └── safety-security-window-films/
│   │       │       └── index.html
│   │       ├── residential-window-tinting-services/
│   │       │   └── index.html
│   │       ├── thank-you/
│   │       │   └── index.html
│   │       ├── window-tinting-faq/
│   │       │   └── index.html
│   │       ├── window-tinting-gallery/
│   │       │   └── index.html
│   │       ├── 404.html
│   │       └── index.html
│   ├── verify/  # Retained tools, snapshots, ignored local logs and runtime
│   │   ├── runtime/  # Retained Node 22 runtime; ignored locally, needed for Windows builds
│   │   │   └── node_modules/
│   │   │       ├── .bin/
│   │   │       │   ├── node
│   │   │       │   ├── node.cmd
│   │   │       │   └── node.ps1
│   │   │       ├── node/
│   │   │       │   ├── bin/
│   │   │       │   │   ├── node
│   │   │       │   │   └── node.exe
│   │   │       │   ├── node_modules/
│   │   │       │   │   ├── .bin/
│   │   │       │   │   │   ├── node
│   │   │       │   │   │   ├── node.cmd
│   │   │       │   │   │   └── node.ps1
│   │   │       │   │   ├── node-bin-setup/
│   │   │       │   │   │   ├── .github/
│   │   │       │   │   │   │   └── dependabot.yml
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── node-win-x64/
│   │   │       │   │   │   ├── bin/
│   │   │       │   │   │   │   └── node.exe
│   │   │       │   │   │   └── package.json
│   │   │       │   │   └── .package-lock.json
│   │   │       │   ├── installArchSpecificPackage.js
│   │   │       │   ├── package.json
│   │   │       │   └── README.md
│   │   │       ├── node-bin-setup/
│   │   │       │   ├── .github/
│   │   │       │   │   └── dependabot.yml
│   │   │       │   ├── index.js
│   │   │       │   └── package.json
│   │   │       └── .package-lock.json
│   │   ├── window-copy-before/  # Retained comparison inputs; existing tracked files remain tracked
│   │   │   ├── _404.html.html
│   │   │   ├── _about.html
│   │   │   ├── _commercial-window-tinting-services.html
│   │   │   ├── _commercial-window-tinting_anti-glare-window-films.html
│   │   │   ├── _commercial-window-tinting_anti-graffiti-window-films.html
│   │   │   ├── _commercial-window-tinting_frosted-opaque-decorative-window-films.html
│   │   │   ├── _commercial-window-tinting_heat-rejection-solar-protection-window-films.html
│   │   │   ├── _commercial-window-tinting_safety-security-window-films.html
│   │   │   ├── _contact-for-window-tinting.html
│   │   │   ├── _design-review.html
│   │   │   ├── _design-review_project-story.html
│   │   │   ├── _locations.html
│   │   │   ├── _locations_arrowtown.html
│   │   │   ├── _locations_ashburton.html
│   │   │   ├── _locations_christchurch.html
│   │   │   ├── _locations_cromwell.html
│   │   │   ├── _locations_geraldine.html
│   │   │   ├── _locations_lake-tekapo.html
│   │   │   ├── _locations_oamaru.html
│   │   │   ├── _locations_queenstown.html
│   │   │   ├── _locations_temuka.html
│   │   │   ├── _locations_timaru.html
│   │   │   ├── _locations_wanaka.html
│   │   │   ├── _residential-window-tinting-services.html
│   │   │   ├── _residential-window-tinting_anti-glare-window-films.html
│   │   │   ├── _residential-window-tinting_fade-reduction-window-films.html
│   │   │   ├── _residential-window-tinting_frosted-opaque-window-films.html
│   │   │   ├── _residential-window-tinting_heat-control-window-films.html
│   │   │   ├── _residential-window-tinting_privacy-window-films.html
│   │   │   ├── _residential-window-tinting_safety-security-window-films.html
│   │   │   ├── _thank-you.html
│   │   │   ├── _window-tinting-faq.html
│   │   │   ├── _window-tinting-gallery.html
│   │   │   ├── baseline.sha256
│   │   │   ├── content_design-review-final.ts.before
│   │   │   ├── customer-polish.ts.before
│   │   │   ├── home.html
│   │   │   ├── lib_layout-markup.ts.before
│   │   │   └── lib_render-site.ts.before
│   │   ├── browser-checks.mjs
│   │   ├── capture-painted-p6.mjs
│   │   ├── cleanup-phase2-build.log
│   │   ├── cleanup-phase2-check.log
│   │   ├── cleanup-phase2-protected.log
│   │   ├── computed-style-p6.mjs
│   │   ├── local-server.mjs
│   │   ├── pixel-diff.mjs
│   │   └── window-copy-compare.mjs
│   ├── MIGRATION-SUMMARY.md
│   └── PHASE-7-REPORT.md
├── node_modules/  # Installed dependencies; generated by npm ci; 10,405 files, contents collapsed
├── out/  # Generated static export; 263 files, contents collapsed
├── public/  # Files copied unchanged into the static export
│   ├── assets/  # Images, fonts, video, captions and customer logos
│   │   ├── customer-logos/
│   │   │   ├── 2degrees.png
│   │   │   ├── corrections.png
│   │   │   ├── fire-service.png
│   │   │   ├── mccain.png
│   │   │   └── sanitarium.png
│   │   ├── architecture.webp
│   │   ├── client-001-1600.webp
│   │   ├── client-001-640.webp
│   │   ├── client-007-1600.webp
│   │   ├── client-007-640.webp
│   │   ├── client-009-1600.webp
│   │   ├── client-009-640.webp
│   │   ├── client-013-1600.webp
│   │   ├── client-013-640.webp
│   │   ├── client-015-640.webp
│   │   ├── client-016-1600.webp
│   │   ├── client-016-640.webp
│   │   ├── client-019-1600.webp
│   │   ├── client-019-640.webp
│   │   ├── client-020-1600.webp
│   │   ├── client-020-640.webp
│   │   ├── client-024-1600.webp
│   │   ├── client-024-640.webp
│   │   ├── client-026-1600.webp
│   │   ├── client-026-640.webp
│   │   ├── client-027-1600.webp
│   │   ├── client-027-640.webp
│   │   ├── client-031-1200.webp
│   │   ├── client-031-640.webp
│   │   ├── client-033-1200.webp
│   │   ├── client-033-640.webp
│   │   ├── client-035-1600.webp
│   │   ├── client-035-640.webp
│   │   ├── client-036-1600.webp
│   │   ├── client-036-640.webp
│   │   ├── client-037-1600.webp
│   │   ├── client-037-640.webp
│   │   ├── client-039-1600.webp
│   │   ├── client-039-640.webp
│   │   ├── client-040-1200.webp
│   │   ├── client-040-640.webp
│   │   ├── client-042-1200.webp
│   │   ├── client-042-640.webp
│   │   ├── client-044-1200.webp
│   │   ├── client-044-640.webp
│   │   ├── client-045-1600.webp
│   │   ├── client-045-640.webp
│   │   ├── client-048-1600.webp
│   │   ├── client-048-640.webp
│   │   ├── client-049-1600.webp
│   │   ├── client-049-640.webp
│   │   ├── client-051-1200.webp
│   │   ├── client-051-640.webp
│   │   ├── client-054-1200.webp
│   │   ├── client-054-640.webp
│   │   ├── client-056-1200.webp
│   │   ├── client-056-640.webp
│   │   ├── client-057-1600.webp
│   │   ├── client-057-640.webp
│   │   ├── client-062-1600.webp
│   │   ├── client-062-640.webp
│   │   ├── client-064-1600.webp
│   │   ├── client-064-640.webp
│   │   ├── client-065-1600.webp
│   │   ├── client-065-640.webp
│   │   ├── client-van-polished-1200.webp
│   │   ├── client-van-polished-480.webp
│   │   ├── client-van-polished-800.webp
│   │   ├── client-van-polished.webp
│   │   ├── client-van.webp
│   │   ├── commercial.webp
│   │   ├── craft-large.webp
│   │   ├── craft.webp
│   │   ├── font-0.ttf
│   │   ├── font-1.ttf
│   │   ├── font-2.ttf
│   │   ├── font-3.ttf
│   │   ├── font-4.ttf
│   │   ├── frost-concept.jpg
│   │   ├── frost.webp
│   │   ├── glazing-large.webp
│   │   ├── glazing.webp
│   │   ├── google-g.png
│   │   ├── home-hero-loop-mobile-poster.webp
│   │   ├── home-hero-loop-mobile.mp4
│   │   ├── home-hero-loop-poster.webp
│   │   ├── home-hero-loop.mp4
│   │   ├── interior.webp
│   │   ├── lake-large.webp
│   │   ├── lake.webp
│   │   ├── logo-large.webp
│   │   ├── logo.webp
│   │   ├── residential.webp
│   │   ├── restaurant-large.webp
│   │   ├── restaurant.webp
│   │   ├── room-large.webp
│   │   ├── shoot-bill-tools-1200.webp
│   │   ├── shoot-bill-tools-480.webp
│   │   ├── shoot-bill-tools-800.webp
│   │   ├── shoot-bill-tools.webp
│   │   ├── shoot-bill-working-1200.webp
│   │   ├── shoot-bill-working-480.webp
│   │   ├── shoot-bill-working-800.webp
│   │   ├── shoot-bill-working.webp
│   │   ├── shoot-roxana-portrait-1200.webp
│   │   ├── shoot-roxana-portrait-480.webp
│   │   ├── shoot-roxana-portrait-800.webp
│   │   ├── shoot-roxana-portrait.webp
│   │   ├── shoot-roxana-support-1200.webp
│   │   ├── shoot-roxana-support-480.webp
│   │   ├── shoot-roxana-support-800.webp
│   │   ├── shoot-roxana-support.webp
│   │   ├── shoot-team-conversation-1200.webp
│   │   ├── shoot-team-conversation-480.webp
│   │   ├── shoot-team-conversation-800.webp
│   │   ├── shoot-team-conversation-balanced-720-1200.webp
│   │   ├── shoot-team-conversation-balanced-720-480.webp
│   │   ├── shoot-team-conversation-balanced-720-800.webp
│   │   ├── shoot-team-conversation-balanced-720.webp
│   │   ├── shoot-team-conversation.webp
│   │   ├── shoot-team-landscape-1200.webp
│   │   ├── shoot-team-landscape-480.webp
│   │   ├── shoot-team-landscape-800.webp
│   │   ├── shoot-team-landscape.webp
│   │   ├── shoot-team-portrait-480.webp
│   │   ├── shoot-team-portrait-800.webp
│   │   ├── shoot-team-portrait.webp
│   │   ├── view.webp
│   │   ├── welcome-tint-a-window-poster.webp
│   │   ├── welcome-tint-a-window.mp4
│   │   ├── welcome-tint-a-window.vtt
│   │   ├── work-1-large.webp
│   │   ├── work-2-large.webp
│   │   ├── work-3-large.webp
│   │   ├── work-4-large.webp
│   │   ├── work-5-large.webp
│   │   └── work-6-large.webp
│   ├── atelier.css
│   ├── boutique.css
│   ├── brand.css
│   ├── client-polish.css
│   ├── enquiry-flow.js
│   ├── favicon.svg
│   ├── film-guide.css
│   ├── fonts.css
│   ├── fresh.css
│   ├── launch-polish-717.css
│   ├── photo-alignment-719.css
│   ├── placement-polish-720.css
│   ├── polish.css
│   ├── refinement.css
│   ├── responsive-sections.css
│   ├── revision.css
│   ├── robots.txt
│   ├── service-layout-717.css
│   ├── shoot-media-715.css
│   ├── shoot-media-715.js  # Retained intentionally; not loaded by pages
│   ├── signature.css
│   ├── site.js
│   ├── story-717.css
│   ├── style.css
│   ├── surfaces.css
│   ├── team-ui-715.css
│   ├── team-ui-715.js
│   └── team-ui-718.css
├── scripts/  # Build/export helpers, read-only checks and verification tools
│   ├── lib/
│   │   └── baseline.mjs
│   ├── parity/
│   │   ├── capture.mjs
│   │   └── normalize-html.mjs
│   ├── audit-window-copy.mjs
│   ├── check.mjs
│   ├── export-directories.mjs
│   ├── sitemap-draft.mjs
│   ├── verify-about-timeline.mjs
│   ├── verify-window-copy-browser.mjs
│   └── verify-window-copy.mjs
├── .gitignore
├── next-env.d.ts  # Next-generated TypeScript declarations
├── next.config.ts  # Static export configuration
├── package-lock.json  # Locked dependency graph
├── package.json  # Node requirement, scripts and dependencies
├── postcss.config.mjs
├── README.md  # This guide and filesystem inventory
├── tsconfig.json
└── vercel.json  # Review-host headers and routing configuration
```

Edit typed content under `content/` and assembly under `lib/render-site.ts`; do not import the old generator or its revised-content module. Current styling is **app/legacy.css: 22 original sheets concatenated in original order**, with original public CSS retained for strict provenance checks. Tailwind v4 has no Preflight and no automatic source scan. **No section has been converted to utilities.** Do not remove legacy rules or change classes/ids/data/aria hooks without a separately approved conversion.

Pages mount immutable final `mainHtml` directly on **main#main**, with no extra wrapper/second main. Native anchors cause full-document navigation. The original scripts load as classic deferred scripts once, in order: enquiry-flow.js, site.js, team-ui-715.js. They own forms/dialog/carousels/visit-frame descendants. shoot-media-715.js remains intentionally unloaded; assets and optional media remain retained.

`content/design-review-final.ts` is a frozen baseline main snapshot for `/design-review` only (seven sections, exact inline colours). Do not re-polish it or conflate it with project-story. Keep Home document-title versus social/schema-title capitalization and 404/thank-you canonical exceptions. See [migration summary](migration/MIGRATION-SUMMARY.md) for the complete route list and cascade order.

## Verification status and boundaries

Historical Phase 5/6 checks recorded 102/102 exact pixels at 360/768/1440, 34/34 HTML regions, 20/20 hydration/control and 48/48 behavior cases. Phase 6's strict computed comparator still reports 935 pre-existing zero-offset background-position representations, with matching geometry. Gallery screenshots require paint/image-quality care. Historical notes remain in [Phase 7 report](migration/PHASE-7-REPORT.md); historical pixel tests were not rerun for this cleanup. The approved lightweight-repository cleanup rebuilt successfully with Node 22 and passed scripts/check.mjs across 34 HTML documents and 4,262 internal references. No protected source, asset, baseline, dependency or configuration input changed. The 79 removed files are recoverable from the external full backup and the Recycle Bin; Git history has not been rewritten or pushed.

Reusable verification tools remain under migration/verify/ (painted capture, pixel-diff, browser-checks, computed-style, local-server) plus scripts/parity/. The browser harnesses expect a local Chromium cache. This filesystem snapshot does not contain migration/verify/browsers/; browser checks require restoring that cache or configuring the harness executable path to an installed browser. Screenshot/diff/raw-normalization inputs are generated and may have been recycled; regenerate them before a corresponding comparison. Historical PNGs and numeric logs were removed from the working tree; their backup remains outside the repository. The fresh cleanup build/check logs are local ignored files at migration/verify/cleanup-phase2-build.log and migration/verify/cleanup-phase2-check.log. The Node 22 runtime and window-copy-before comparison inputs remain available; adding ignore rules does not untrack existing snapshot files. The computed-style tool intentionally fails on real strict property differences.

Forms are review-only; nothing is sent. The sitemap command can regenerate a private 30-URL draft in migration/, outside out/; the existing draft was removed during cleanup. Noindex, host headers, query-preserving slash redirects, cleanUrls/404 aliases and caching still need authorized real-host checks. Do not deploy as a side effect of build/check/preview.
