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

```text
app/                       App Router routes, layout, globals.css, legacy.css
components/{layout,forms,sections,ui}/
                           Shared native chrome and main/dialog boundary
content/*.ts               Typed copy, route/media/data modules and render helpers
lib/render-site.ts         Composition and final document assembly
lib/pages.ts               getPage(), final mainHtml extraction
lib/metadata.ts            Baseline head/SEO contract
public/                    Original assets, fonts, videos/VTT and browser scripts
scripts/                   Export rearrangement, checker, parity capture/normalizer,
                           baseline discovery, private sitemap-draft generator
migration/baseline/         Immutable 34-document HTML reference archive
migration/verify/           Retained final logs, reusable harnesses, Node22 and browser
migration/MIGRATION-SUMMARY.md  Route/layer/CSS contracts, evidence and pending checks
```

Edit typed content under `content/` and assembly under `lib/render-site.ts`; do not import the old generator or its revised-content module. Current styling is **app/legacy.css: 22 original sheets concatenated in original order**, with original public CSS retained for strict provenance checks. Tailwind v4 has no Preflight and no automatic source scan. **No section has been converted to utilities.** Do not remove legacy rules or change classes/ids/data/aria hooks without a separately approved conversion.

Pages mount immutable final `mainHtml` directly on **main#main**, with no extra wrapper/second main. Native anchors cause full-document navigation. The original scripts load as classic deferred scripts once, in order: enquiry-flow.js, site.js, team-ui-715.js. They own forms/dialog/carousels/visit-frame descendants. shoot-media-715.js remains intentionally unloaded; assets and optional media remain retained.

`content/design-review-final.ts` is a frozen baseline main snapshot for `/design-review` only (seven sections, exact inline colours). Do not re-polish it or conflate it with project-story. Keep Home document-title versus social/schema-title capitalization and 404/thank-you canonical exceptions. See [migration summary](migration/MIGRATION-SUMMARY.md) for the complete route list and cascade order.

## Verification status and boundaries

Retained Phase 5/6 logs show 102/102 exact pixels at 360/768/1440, 34/34 HTML regions, 20/20 hydration/control and 48/48 behavior cases. Phase 6's strict computed comparator still reports 935 pre-existing zero-offset background-position representations, with matching geometry. Gallery screenshots require paint/image-quality care. This cleanup's build/check result is in [Phase 7 report](migration/PHASE-7-REPORT.md); historical pixel tests were not silently rerun as part of cleanup.

Reusable verification tools remain under migration/verify/ (painted capture, pixel-diff, browser-checks, computed-style, local-server) plus scripts/parity/. Playwright uses the retained browser by setting PLAYWRIGHT_BROWSERS_PATH to this folder's migration/verify/browsers. Screenshot/diff/raw-normalization inputs are generated and may have been recycled; regenerate them before a corresponding comparison. Final numeric logs are retained. The computed-style tool intentionally fails on real strict property differences.

Forms are review-only; nothing is sent. The sitemap is a private 30-URL draft outside out/. Noindex, host headers, query-preserving slash redirects, cleanUrls/404 aliases and caching still need authorized real-host checks. Do not deploy as a side effect of build/check/preview.
