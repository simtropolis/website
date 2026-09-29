# Sim product page review

- Worktree: `/Users/ahmad.vegah/.codex/worktrees/sim-product-page/website`
- Branch: `codex/sim-product-page`
- Website base: `origin/main` at `25c61383ab638f36a4195b04aca679e3ba214f7a`
- Status: review branch; not merged or deployed.

## Source and status record

The Made evidence was read through Git refs without changing the Made checkout. At inspection:

- `origin/main`: `5c824980796c0896c6f5cf3067fbcb206af1d835`.
- `origin/dev`: `d2c855f475539656852526dee8b0f60bccb02c00`.
- The local `dev` checkout was at `7c19425ff56e4816dabb5fa851c666a248d18a14`, behind `origin/dev`. Runtime internals below were inspected there; product status was checked against `origin/dev` and `origin/main` directly.
- `origin/sim-dev`: `d41ad2b582bceb6b1b49eb68f877ebed7d68eeb2`; it has no `products/flavors.toml` at that ref, so it cannot establish a current Sim release state.

| Draft fact marker                                     | Evidence class and exact source                                                                                                                                                                                                                                                           | Public wording                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [FACT: Copper enabled; game and JVM entries planned]  | Manifest: Made `origin/dev:products/flavors.toml` lines 4–75; same enabled/planned boundary on `origin/main`                                                                                                                                                                              | Copper Available; Groovy and Sim Planned                              |
| [FACT: game product has no release targets]           | Manifest: Made `origin/dev:products/flavors.toml` lines 54–75, `targets = []`; `docs/src/development/product-flavors.md` lines 7–13 says planned products cannot be built/released                                                                                                        | Sim has no enabled build or download                                  |
| [FACT: Copper standard build excludes Comfy]          | Manifest: Made `origin/dev:products/flavors.toml` lines 4–26 selects `agentic-tools,rust-tools`; `origin/dev:crates/zed/Cargo.toml` lines 56–75 defines `comfy` separately                                                                                                                | Native visual code is opt-in Made functionality, not standard Copper  |
| [FACT: Comfy-compatible layers exist]                 | Executable source/manifests: Made `origin/dev:crates/comfy_runtime/Cargo.toml`, `crates/comfy_ui/Cargo.toml`, `crates/comfy_api/Cargo.toml`; `origin/dev` tree contains `comfy_nodes`, `comfy_model`, `comfy_sampler`, `comfy_tensor`, `comfy_media`, `comfy_plugin_host`, `comfy_worker` | These are Made crates, not a released Sim application                 |
| [FACT: graph validation and output paths exist]       | Executable source: local Made `dev` `crates/comfy_runtime/src/graph.rs` (`GraphDocument::validate`), `prompt_compiler.rs` (`validate_integrity`), `output_committer.rs` (`OutputCommitReceipt`)                                                                                           | The process section describes a code path, labeled illustrative       |
| [FACT: backend feature names exist]                   | Manifest: Made `origin/dev:crates/zed/Cargo.toml` lines 68–75 and `crates/comfy_runtime/Cargo.toml` backend features                                                                                                                                                                      | Backend names are listed as code paths, without device support claims |
| [FACT: visual tests are not a Copper release gate]    | Workflow documentation: Made `origin/dev:.github/workflows/README.md` lines 89–100; UI test manifest `origin/dev:crates/comfy_ui/Cargo.toml`                                                                                                                                              | Experimental / under validation                                       |
| [FACT: Made derives from Zed and has mixed licensing] | Documentation and licenses: Made `origin/dev:README.md` lines 1–45 and `LICENSE-GPL`, `LICENSE-APACHE`; contribution file retains upstream wording                                                                                                                                        | Zed attribution and license links, with repository-access caution     |
| [FACT: source link is access restricted]              | Current public fetch of `https://github.com/simtropolis/made` returned 404; unauthenticated release API returned HTTP 404 during this build                                                                                                                                               | Links may require Made repository access                              |

A design record or test fixture was never used as proof of a shipped feature. The planned Sim composition follows this request; Made's game catalog establishes only a reserved product identity.

### Branch naming mismatch

`origin/main` still calls the planned JVM product **Orbit** and game product **Forge** in `products/flavors.toml`. `origin/dev` calls the JVM product **Groovy** but still calls the game product **Forge**. This website follows the requested public names **Groovy** and **Sim**. The game entry still has `display_name = "Forge"`, `executable_name = "forge"`, `status = "planned"`, and `targets = []` on `origin/dev` at `d2c855f475539656852526dee8b0f60bccb02c00`. No Made source was renamed in this website task.

## Capability boundary

| State                           | Evidence and boundary                                                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implemented in Made             | Editor/language and agent code, plus Comfy-compatible node, runtime, UI, model, sampler, tensor, media, plugin, worker, and API crates are present in source. |
| Opt-in                          | The `comfy` feature composes visual code. Copper's standard manifest selects only `agentic-tools,rust-tools`.                                                 |
| Experimental / under validation | Backend manifests and focused tests exist. The runtime/evidence suite is outside the Copper product gate. No broad hardware claim is made.                    |
| Planned for Sim                 | Game-oriented product composition under the requested public name; no integrated runnable Sim build is established.                                           |
| Unavailable                     | Sim installer/download/release target and engine-specific integrations are not established by the checked catalog and code.                                   |

## Archive-to-Sim section map

| Supplied archive section | New purpose                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Navigation               | Shared Simtropolis navigation with an accessible Products menu and explicit product statuses.                              |
| Hero                     | Sim identity, planned status, Made foundation, and a local archive illustration instead of the external video and metrics. |
| Features                 | Intended Sim composition: source, visual work, project context, and inspectable agent activity.                            |
| How it works             | Source-grounded illustrative visual task sequence, with the terminal/ASCII composition retained.                           |
| Infrastructure           | Made foundation and backend-code boundaries, without regions, latency, or uptime claims.                                   |
| Metrics                  | Capability status and release boundary, without numerical claims.                                                          |
| Integrations             | Intended composition of Made parts, without external service integrations.                                                 |
| Security                 | Status and evidence boundary; archive lock/shield artwork is explicitly decorative.                                        |
| Developers               | Made source, README, licensing, and access-restricted contribution guidance.                                               |
| Testimonials             | Game-development direction, without customers or endorsements.                                                             |
| Pricing                  | Five-state capability presentation, without plans, trials, or price.                                                       |
| CTA                      | Follow Sim development through current status, without signup or download.                                                 |
| Footer                   | Simtropolis, Made, Copper, Groovy, Sim, docs, source, contribution, and releases.                                          |
| ASCII scene              | Local CSS/HTML diagram of the illustrative graph path.                                                                     |

## Supplied assets and optimization

Archive: `/Users/ahmad.vegah/repos/projects/compute-the-platform-to-build-and-ship-ai-agents.zip`, SHA-256 `d9c3946c709733b08a9b4bbf12f935f0f1faa74cc32d3e3db8d8a9b89bf0ab61`. All seven supplied `/public/images/` illustrations were converted locally to WebP at quality 81 and bounded to 2000 × 1700. They are decorative with empty alt text. The social preview is an original composition made from the supplied bridge image and local text.

| Archive original  | Original bytes | Local file                      | Optimized bytes |
| ----------------- | -------------: | ------------------------------- | --------------: |
| `audit.jpg`       |        443,523 | `public/sim/audit.webp`         |          48,672 |
| `bridge.png`      |      1,171,359 | `public/sim/bridge.webp`        |         154,172 |
| `encrypted.jpg`   |        502,944 | `public/sim/encrypted.webp`     |          58,630 |
| `isolated.jpg`    |        487,862 | `public/sim/isolated.webp`      |          64,862 |
| `permissions.jpg` |        648,059 | `public/sim/permissions.webp`   |          84,212 |
| `shield.png`      |        706,073 | `public/sim/shield.webp`        |         166,168 |
| `whale.png`       |      2,363,316 | `public/sim/whale.webp`         |         195,516 |
| New social card   |              — | `public/sim/social-preview.jpg` |          90,531 |

The seven optimized illustrations total 772,232 bytes, down from 6,323,136 bytes (87.8% smaller). The social preview is 1200 × 630 and 90,531 bytes. No external archive image or video is requested by the route.

### External archive URL inventory

These original hotlinks were reviewed as reference only. The page substitutes local archive illustrations and CSS/ASCII compositions; none was downloaded or retained:

- Hero video: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4` → local whale artwork.
- Features image: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png` → local bridge artwork.
- Process tree: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png` → local ASCII graph.
- Infrastructure world: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png` → local permissions artwork.
- Metrics graph: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png` → status grid.
- Integrations connection: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png` → Made component grid.
- Developers image: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png` → local decorative gallery.
- Footer landscape: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png` → local bridge artwork.

## Public naming changes

- Homepage product catalog: Orbit → Groovy; Forge → Sim, with `/sim` link.
- Homepage FAQ and repository README: planned product names updated.
- Shared desktop/mobile Products navigation: Copper Available, Groovy Planned, Sim Planned.
- Shared footer: the same product names/statuses and Made/source/contribution links.
- New `/sim` route title, canonical, Open Graph, social card, structured WebPage data, and sitemap entry.
- New `/copper` route because the website base had no `/copper` route to satisfy the requested Copper navigation link.
- Homepage source-access copy now acknowledges access requirements.

## Editorial review

`brand-writer` was applied first. Draft factual statements were tracked with `[FACT]` markers in the ledger above, checked against the listed evidence classes, and removed from public copy. A `humanizer` pass then removed inherited archive hyperbole and false numerical/social proof, replaced vague source-access language, varied sentence rhythm, and made the last action direct. No factual status or attribution was weakened.

| Brand-writer criterion        | Score / 5 | Note                                                                                                |
| ----------------------------- | --------: | --------------------------------------------------------------------------------------------------- |
| Technical grounding           |         5 | Names the Made code layers and process.                                                             |
| Natural syntax                |         4 | Editorial headings balance explanatory prose.                                                       |
| Quiet confidence              |         5 | No performance, scale, customer, or security promises.                                              |
| Developer respect             |         5 | Review authority stays with the developer.                                                          |
| Information priority          |         5 | Planned status leads the hero and metadata.                                                         |
| Specificity and status        |         5 | Five states are visible.                                                                            |
| Voice and product consistency |         5 | Company, foundation, and product remain distinct.                                                   |
| Earned claims                 |         4 | Source-backed implementation claims are scoped to opt-in Made code; planned composition is labeled. |

Humanizer final scan: no autonomous-execution language, testimonial/pricing residue, inflated significance, rule-of-three promotional claims, or generic positive closing. The archive's decorative art does not imply a feature. Public copy has no `[FACT]` markers.

## Verification

- `bun install --frozen-lockfile`: passed; `package.json`, `bun.lock`, and `amplify.yml` unchanged.
- `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `git diff --check`: passed. Existing suite: 24 Node tests and 16 Bun rendering/demo tests.
- Normal `bun run build`: stopped by existing release snapshot generation. The unauthenticated GitHub release request returned HTTP 404 for `simtropolis/made`, so this cannot verify live release metadata.
- A separately labeled **route-validation build** used an ignored local empty-release fixture and `RELEASE_SNAPSHOT_ID=sim-route-validation` with `next build`: compiled and prerendered `/sim`, `/copper`, `/`, `/releases`, and metadata routes. This is not a substitute for an authenticated production release build.
- Route smoke: `/sim`, `/`, `/copper`, `/releases`, `/sitemap.xml`, and `/robots.txt` returned 200; `/releases/` redirected 308 to `/releases` and the target returned 200.
- Browser inspection at 1920, 1440, 390, and 320 CSS pixels: no horizontal overflow; 320 px headline clipping found and fixed. Desktop Products opened with keyboard semantics; Escape closed it and restored focus. Mobile Products group exposed the same names/statuses.
- Browser error/warning log for `/sim`: empty during inspection. Reduced-motion behavior is implemented with `prefers-reduced-motion: no-preference` for Sim motion and the existing global reduction rule; runtime emulation was not available in this browser check.
- Source, documentation, and contribution URLs point to the intended Made paths. Public access returned 404, so unauthenticated link availability remains blocked by repository visibility.
- The browser page makes no external image requests. No `RELEASES_GITHUB_TOKEN` or `AMPLIFY_REBUILD_WEBHOOK` value was used in the fixture or exposed to the client.

Next build output reports `/sim` route JS at 206 B and first-load JS at 138 kB, sharing the website's 103 kB common chunk. Incremental route assets are 862,763 bytes of local art/social files plus a 13,504-byte route CSS chunk; no archive dependency graph was added. A clean committed-baseline bundle comparison was not made because release access blocks the standard build.

## Screenshot set

`artifacts/sim/desktop-full.jpg` is the complete 1440 px desktop page. `desktop-1920-hero.png`, `desktop-products-open.png`, `homepage-products-open.png`, `mobile-390-hero.png`, `mobile-320-hero.png`, `mobile-navigation.png`, and `mobile-products-open.png` capture the responsive hero and menus. `section-*.jpg` covers every major content section, capability status, CTA, and footer. `social-preview.jpg` is the social card. The full desktop image is assembled from overlapping browser viewport captures because the browser tool's native full-page capture repeated sections during scroll movement. The repository ignores `artifacts/`, so these 2.9 MB review captures remain local to this worktree.

## Remaining limitations

- Made's own game catalog and README still say Forge. Website-only rename cannot resolve that source mismatch.
- Made `main` still says Orbit; `dev` says Groovy. The public site follows the requested Groovy name.
- Sim has no enabled product build or release target in the inspected Made catalog.
- Authenticated GitHub release metadata and source access could not be verified in this session; the normal production build failed closed.
- The site has not been merged or deployed.
