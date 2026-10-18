# Sim homepage review

## Delivery and isolation

- Target: existing `/` homepage, canonical `https://simtropolis.ai/`. No `/sim` implementation was created or restored here.
- Managed worktree: `/Users/ahmad.vegah/.codex/worktrees/sim-homepage-content/website`.
- Branch: `codex/sim-homepage-content`.
- Website `origin/main` fetched baseline: **`13309b14c09deb6ce9fe2e566d2761543ea3971a`**. HEAD remains at this commit; changes are uncommitted and unpushed.
- Authoritative Sim repository: `git@github.com:simtropolis/sim.git`, local `/Users/ahmad.vegah/repos/projects/sim`.
- Sim `origin/sim-dev` fetched source: **`8efc2261ee9f1c00beff7d16908c4834ff9c34e3`**, “feat(graphics): Preserve original Artboard source serialization”. All Sim paths below refer to this exact committed snapshot, not dirty checkout files.
- Inspected attached managed worktrees before creating this one. The paused `sim-product-page/website` worktree, branch `codex/sim-product-page`, HEAD `9cc7ceb2fe31c94021fad9844d8e825f1d412a03`, remains intact. SHA-256 comparison of all 20 changed/untracked files against `/private/tmp/sim-old-worktree-preservation.json` found **zero changes** after implementation and checks. The original website checkouts were not edited.
- No wholesale copy from the old worktree. Existing main homepage components were adapted in place. Managed attachment is registered on this chat.

## Changes

The homepage now identifies Sim as a visual development workspace. Its wordmark, page title, Open Graph title/site name and social titles use exactly `simtropolis`. The hero heading now follows the October 18 request to restore “Worlds to imagine/build/explore.” Current tools, opt-in execution, planned authoring and public release availability are distinct. All homepage navigation and calls to action lead to factual page sections or local notices.

The original hero video, section artwork, Instrument Sans typography, heading sizes, colors/opacity, padding, borders, grids, mobile menu and normal animation treatment are restored from pinned main. No display-font correction or responsive visual override remains. Focus, invisible touch-target extensions and reduced motion remain scoped to the homepage. The hero rotates the user-requested imagine/build/explore phrases using the original letter-blur/gradient animation, while reduced motion shows a static phrase. No new dependency was added. See [design comparison report](SIM_DESIGN_REVIEW.md) for all remaining copy-driven differences.

Package configuration, Bun lockfile, Amplify configuration, root layout/global CSS, sitemap, release generation, credentials handling, archived pages and unrelated route implementations are untouched. Retired routes retain their main-baseline responses.

## Evidence ledger

Evidence classes: **E** executable application/runtime code; **M** manifest/feature/build configuration; **T** test source inspected (not executed here); **R** roadmap/design record; **A** authenticated release inventory. A test or roadmap entry is never used alone to establish an integrated or released feature. These are the factual drafting checks; `[FACT]` markers are absent from public copy.

| Verified factual statement                                                                                                          | State and boundary                                                                                                                                  | Evidence at pinned Sim commit                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [FACT] Native visual UI is registered in the application                                                                            | Implemented development integration; not a release claim                                                                                            | M `crates/zed/Cargo.toml:134` graphics_ui dependency; E `crates/zed/src/main.rs:798` initialization; E `crates/graphics_ui/src/graphics_ui.rs:276` graph/PNG owners                                                                                                                                                                               |
| [FACT] Project PNG and saved composition opening have workspace actions                                                             | Implemented; linked project asset services are required                                                                                             | E `crates/graphics_ui/src/png_workflow.rs:13` action registration; E `crates/zed/src/zed.rs:1688` native asset binding behind `comfy`                                                                                                                                                                                                             |
| [FACT] Image editing includes invert and make opaque                                                                                | Implemented native action → session → CPU operation; focused image path                                                                             | E `crates/graphics_ui/src/graph.rs:818`, `:1755`, `:1774`; E `crates/graphics_ui/src/session.rs` GraphiteImageSession/CpuImageEdit                                                                                                                                                                                                                |
| [FACT] Two-image mixing exposes opacity                                                                                             | Implemented focused two-parent evaluation; not a claim of general composition parity                                                                | E `crates/graphics_ui/src/session.rs` GraphiteMixSession/CpuMixParameters; E `crates/graphics_ui/src/graph.rs` mix editor parameter/action handlers                                                                                                                                                                                               |
| [FACT] PNG-backed artboards expose position, dimensions, background, clipping, batch edits, apply/discard                           | Implemented linked image workflow; broader drawing/layer controls excluded                                                                          | E `crates/graphics_ui/src/graph.rs:3454` artboard rendering/controllers; E `crates/graphics_ui/src/session.rs:3641` preview preparation                                                                                                                                                                                                           |
| [FACT] Invalid fields show diagnostics; pending/previous preview is identifiable                                                    | Implemented validation and preview state                                                                                                            | E `crates/graphics_ui/src/graph.rs:3454–3500`; E `crates/graphics_ui/src/session.rs:4327` failure/retained pixel handling                                                                                                                                                                                                                         |
| [FACT] Accepted edits can be saved as linked `.sim`, reopened and separately exported to PNG                                        | Implemented action path; pending drafts, gestures and diagnostics block delivery; supported original graph admission, linked input version required | E `crates/graphics_ui/src/graph.rs:2590` save and adjacent delivery guard, PNG export through `:2861`; E `crates/graphics_ui/src/formats.rs` original graph serialization/roundtrip admission; E `crates/graphics_ui/src/png_workflow.rs` reopen; T `:1575`, `:2522`, `:3594`, `:4572` save/reopen/export, invalid placement and journal controls |
| [FACT] Native graph editing supports typed links, node properties, groups and undo/redo                                             | Implemented opt-in graph UI, not enabled by default                                                                                                 | E `crates/comfy_runtime/src/graph.rs:1509` graph history; E `crates/comfy_ui/src/comfy_ui.rs:358` project item registration; E `crates/comfy_ui/src/actions.rs:92`; T `crates/comfy_runtime/src/graph.rs:7653`, `:10019`; T `crates/comfy_ui/src/graph_tests.rs:2023`, `:2720`                                                                    |
| [FACT] Configured node execution queues workflows/selected outputs, cancels, reports progress/errors, exposes media and run history | Opt-in. Needs configured resources/backend; no broad model/device compatibility claim                                                               | E `crates/comfy_ui/src/actions.rs:9`; E `execution_model.rs`, `queue_panel.rs`, `history_panel.rs`, `output_view.rs` in `crates/comfy_ui/src/`; E `crates/zed/src/zed.rs` register_native_comfy_execution; T `crates/comfy_ui/src/execution_tests.rs:6943`, `:7411`, `:7499`                                                                      |
| [FACT] Runtime and asset services are opt-in, backend availability differs by build                                                 | Build configuration limitation stated beside capabilities                                                                                           | M `crates/zed/Cargo.toml:56–75` comfy/backend features, excluded from default; E `crates/zed/src/main.rs:810` gated registration; E `crates/zed/src/zed.rs:1688–1725` gated assets/services                                                                                                                                                       |
| [FACT] Native interaction and backend compatibility remain under validation                                                         | No whole-product parity/compatibility certification                                                                                                 | R `.agents/specs/graphite-native-migration/tasks.md` pending native/platform/end-to-end gates and constrained image milestones; M backend feature separation; T focused tests cover bounded behavior only                                                                                                                                         |
| [FACT] Public Sim release is pending                                                                                                | Development code exists; no verified Sim installer or release distribution                                                                          | A authenticated repository release API returned 0 releases on 2026-10-11; M `products/flavors.toml` lacks an enabled Sim target; M `.github/workflows/release.yml` rust release triggers and `--product rust` packaging; M root `Cargo.toml` dev/dbg/release/release-fast profiles are generic, not Sim packaging                                 |

### Capability separation

| Capability                                                      | Classification                            | User-facing boundary                                                                     |
| --------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| Image operations, artboard controls, preview and diagnostics    | Implemented development functionality     | Project PNG input; visual runtime asset binding required for integrated project workflow |
| Linked `.sim` save/reopen and separate PNG export               | Implemented focused workflow              | Accept valid edits; retain input links; no claim of arbitrary graph/source compatibility |
| Native node editor, resources, queue/cancel, media/history      | Opt-in implementation                     | Enable runtime; configure resources and backend                                          |
| Whole native interaction parity and broad backend compatibility | Under validation                          | No universal engine/model/device/performance claim                                       |
| Richer layers, selection and drawing                            | Planned                                   | Future tense, separate roadmap section                                                   |
| Playback/frame/time authoring                                   | Planned                                   | Future tense; no current animation-suite claim                                           |
| JPEG/WebP/SVG output in the native image path                   | Planned                                   | Current described export is PNG                                                          |
| Public Sim installer/download                                   | Unavailable in verified release inventory | No download, trial, pricing or signup action                                             |

### Planned sources

All are unchecked roadmap work at the source commit, not implemented claims:

- Layers/selection: `.agents/specs/graphite-native-migration/tasks.md:10051`, `TASK-GRA-LAYER-001` and following layer operations.
- Drawing tools: same file `:13753`, `TASK-GRA-TOOL-002` (Pen tool), plus surrounding native vector/tool leaves.
- Playback/frame/time: same file `:8961–9037`, `TASK-GRA-ANIM-003` through `007`.
- JPEG/WebP/SVG: same file `:9100`, `:9119`, `:9214`, `TASK-GRA-IO-003/004/009`.

### Availability and remaining source inconsistencies

Sim is **in development** with application-registered native visual functionality and opt-in runtime services. This is stronger evidence than a product catalog entry, but it is not public release availability. Zero repository releases and no Sim release profile/target justify **public release pending**.

The pinned source still contains Made/Copper wording in README, Forge in the game catalog, inherited Zed contribution guidance, and Graphite names in native actions. Public copy follows the requested Sim identity; these source names were not rewritten. Main's older multi-product brand-writer guidance was applied for voice/evidence discipline; the user's current product identity and Sim branch override its stale identity examples.

Native Rust tests were inspected, not run. The Sim application was not built/launched during this website task. Complete original graphics parity, all supported backend/model combinations, source access policy, and a public distribution platform matrix are not proven. The website does not claim them.

## Section mapping from current website main

| Baseline section/component | New factual purpose                                 | Composition retained                                                       |
| -------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| Navigation                 | Sim section links and current status                | Floating desktop bar; full-screen mobile menu                              |
| Hero                       | Exact brand, category, development/release boundary | Original video, two-line Sans heading, grid, pill CTAs, three annotations  |
| Features                   | Image operations and PNG artboards                  | Wide bento card, numbered annotation, particles/artwork                    |
| How it works               | Define → evaluate → keep                            | Three numbered interactive steps and large image                           |
| Infrastructure             | Typed node graph and opt-in execution               | Dense graphic/grid, monospaced capability labels                           |
| Metrics                    | Linked input, editable `.sim`, PNG output           | Full-width composition, large headings, diagram cards                      |
| Integrations               | Configure, queue, inspect, change                   | Eight-tile grid and panoramic artwork                                      |
| Security                   | Current native image tools                          | Artwork carousel and selectable explanatory cards                          |
| Developers                 | Practical limits and prerequisites                  | Eight annotated text blocks and spacious artwork                           |
| Testimonials/vision        | Future layers, drawing, time and export             | Off-white editorial carousel, ASCII texture, large labels; no testimonials |
| Pricing/status             | Development, opt-in and release pending             | Three bordered status cards and oversized heading; no pricing              |
| CTA                        | Explore current status/planned tools                | Oversized boxed call to action and supplied image                          |
| Footer                     | Sim sections and local notices                      | Panoramic art, multi-column links, serif wordmark                          |

Retained internal historical filenames do not appear as visitor claims. No retired `/sim` components/assets were imported.

## Assets and provenance

The design correction restores all original imagery and the original hero video. The eight remote baseline assets were available and downloaded unchanged into `public/home-media/`. No original asset was unavailable, and no substitute is used. The current request authorizes restoration of the original live/pinned design. URL, dimensions, bytes and SHA-256 are recorded in [original-media.json](artifacts/design-restoration/original-media.json). Existing `public/images/` files remain byte-for-byte baseline assets in their original slots.

| Local original                   | Dimensions |     Bytes |
| -------------------------------- | ---------- | --------: |
| `/home-media/infrastructure.png` | 1369×1369  |   838,333 |
| `/home-media/developers.png`     | 2720×1536  | 1,074,727 |
| `/home-media/metrics.png`        | 2492×824   |   699,820 |
| `/home-media/how-it-works.png`   | 1554×1664  |   920,448 |
| `/home-media/features.png`       | 2720×1536  | 1,469,418 |
| `/home-media/integrations.png`   | 2494×1199  |   659,513 |
| `/home-media/footer.png`         | 2720×811   | 1,003,291 |
| `/home-media/hero.mp4`           | 1920×1080  | 3,313,698 |

No image/video production hotlinks remain. These originals intentionally retain their source encoding and character; there is no new lossy optimization. Below-fold images load lazily with intrinsic dimensions. The existing image positioning, object-fit, opacity and responsive classes are preserved. Images remain decorative (`alt=""`) and do not establish product capabilities.

The custom WebP substitutions and new raster social composition were removed. The original social image `/images/whale.png` is restored with exact `simtropolis` titles and descriptive social alt text. The unused existing `social-card.svg` keeps its original orange grid, borders and typography; only product text and accessible title/description are adapted. The pre-correction files are preserved in [before-correction.zip](artifacts/design-restoration/before-correction.zip), an ignored review backup.

### Legal notices

`public/notices.txt` contains Apache-2.0 editor licensing and Zed attribution plus GPL-3.0-or-later graphics licensing and Graphite attribution, with full license texts. Homepage visitors can reach it through the original footer composition. Required attribution is retained.

## Editorial review

Brand-writer was read first, material statements drafted/checked with `[FACT]`, then public markers removed. Humanizer was the final editorial pass. No unverifiable autonomy, model compatibility, world-model integration, customer proof, performance, security, prices or release claims survived.

| Brand-writer criterion        |   Score / 5 | Finding                                                                                 |
| ----------------------------- | ----------: | --------------------------------------------------------------------------------------- |
| Technical grounding           |           5 | Image operations, graph parameters, resources and output paths explained                |
| Natural syntax                |           4 | Complete prose; compact labels and numbered process rhythm retained for baseline layout |
| Quiet confidence              |           5 | Facts and prerequisites lead; no superlatives                                           |
| Developer respect             |           5 | Accept/edit/inspect controls and limitations stated                                     |
| Information priority          |           5 | Product category and development/release boundary in hero                               |
| Specificity and status        |           5 | Current, opt-in, under-validation, planned and release pending separated                |
| Voice and product consistency |           5 | Sim throughout; exact requested wordmark; attribution in notices                        |
| Earned claims                 |           4 | Code/manifests support copy; bounded tests inspected, native runtime not retested here  |
| Total                         | **38 / 40** | All criteria ≥4 after humanizer                                                         |

Humanizer findings: retained the explicitly requested hero phrase rotation while removing unsupported promotional claims elsewhere, audit/repository language from visitor copy, customer/testimonial claims (the original decorative quotation glyph is retained), vague world-building/integration promises and repeated generic benefits. Replaced them with linked input, preview state, accepted edits, configuration and output behavior. Kept accurate status and prerequisites. Short three-step process labels remain because they describe the real workflow and preserve the design, rather than fabricate benefits.

## Verification

| Check                     | Result / scope                                                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frozen dependency install | `bun install --frozen-lockfile` passed; no package/lock changes                                                                                                                                                                                                                           |
| Formatting                | `bun run format:check` passed                                                                                                                                                                                                                                                             |
| Lint                      | `bun run lint` passed, no warnings                                                                                                                                                                                                                                                        |
| Type checking             | `bun run typecheck` passed                                                                                                                                                                                                                                                                |
| Unit tests                | `bun run test`: 24/24 passed; existing release/fixture infrastructure coverage, not native Sim tests                                                                                                                                                                                      |
| Production build          | `bun run build` passed, static `/` generated                                                                                                                                                                                                                                              |
| Metadata/route assertions | `bun run test:build` passed: exact titles/H1, canonical root, social alt/image, section anchors, states, forbidden copy, no hotlinks/credential patterns                                                                                                                                  |
| Route smoke               | `bun run test:smoke http://127.0.0.1:3212` passed; `/`, robots, sitemap, media, icon, notices 200                                                                                                                                                                                         |
| Retired baseline routes   | `/sim`, `/copper`, `/releases`, `/archive`, random path 404; `/releases/` redirects 308 to retired `/releases`; no routes recreated                                                                                                                                                       |
| Protected paths           | Diff against baseline empty for package, lockfile, Amplify, root layout/styles, sitemap/release owners/config                                                                                                                                                                             |
| Credentials               | No token/private-key patterns or credential environment identifiers in `.next/static`; no client credentials introduced                                                                                                                                                                   |
| Browser                   | Final production IAB console warning/error log empty; no hydration errors; all images loaded; no external media URLs                                                                                                                                                                      |
| Keyboard                  | Menu Enter, Escape/visible focus restoration, Tab/Shift-Tab wrapping, section activation, skip link focus to main, workflow/tool/planned selectors verified                                                                                                                               |
| Mobile control sizes      | Menu/links ≥44px; CTAs 56px; visible pink focus outline                                                                                                                                                                                                                                   |
| Reduced motion            | Chrome Rendering emulation `reduce`: matchMedia true, rendered animation names none, transitions 0s, scroll behavior auto, heading visible and original video paused; automatic selector states identical across separated observations; source RAF/timer owners stop; emulation restored |
| Responsive                | 1920/1440/390/320: document width does not exceed viewport, no heading/paragraph text clipping, desktop/mobile compositions inspected                                                                                                                                                     |
| Whitespace/preservation   | `git diff --check` passed; old 20 file hashes unchanged                                                                                                                                                                                                                                   |

Next serializes the root canonical as `https://simtropolis.ai` while source metadata specifies `https://simtropolis.ai/`; URL normalization confirms both identify exactly `/`. No global trailing-slash routing change was made.

### Bundle impact

Fresh pinned-main production build: **32.2 kB route / 135 kB first load**, shared 103 kB. Restored homepage build: **37.8 kB route / 140 kB first load**, shared 103 kB. Rounded delta: **+5.6 kB route / +5 kB first load**. No new dependency. The original remote imagery/video now lives locally with identical bytes. These are Next build estimates, not measured speed claims.

## Updated screenshots and comparison

The earlier `artifacts/sim-homepage` captures are superseded for visual review. Use [comparison gallery](artifacts/design-restoration/comparison/index.html) and [restoration report](SIM_DESIGN_REVIEW.md). They contain live, pinned and revised full pages/heroes at 1920×1080, 1440×1000, 390×844 and 320×740; 48 baseline/revised section pairs at matching absolute scroll positions; mobile menus; reduced-motion capture and the original social preview. Dynamic video/canvas/carousel frames vary with capture time.

## Review limits

Website behavior and rendering are verified locally against a production build. No deployment, merge, commit or push occurred. Sim source evidence is pinned inspection, not a new native application/runtime certification. Current integrated PNG/graph paths are bounded and opt-in; broad graphics parity and public packaging remain separate work. These limits are stated naturally on the page and precisely here.

## October 18 follow-up

Restored the user-requested “Worlds to imagine.” / “Worlds to build.” / “Worlds to explore.” hero rotation. The first phrase stays static for reduced motion, and the accessible heading stays constant. Wordmark, page title, social titles, visual-development description and capability boundaries remain intact. No new product claims. See the [design report addendum](SIM_DESIGN_REVIEW.md#october-18-hero-correction) for updated check results and the browser-verification limitation. Prior screenshots capture the earlier heading and are historical.

## Publication approval — October 18

The user authorized committing and pushing this homepage branch after review. Earlier “uncommitted and unpushed” statements describe the review-stage handoff. The current page title is `simtropolis`; the production HTML title assertion has been updated to match. Formatting, lint, type checking, 24 unit tests, production build and metadata/build checks pass. The previously documented automated visual-verification limitation remains.
