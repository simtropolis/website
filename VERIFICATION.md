# Verification — Amplify hosting, 7 September 2026

## Company homepage and product catalog — 26 September 2026

The homepage now introduces Simtropolis, explains Made once, renders the Made product catalog, and then presents the guided Copper demo. Copper is labelled Available and links to `/copper` and `/releases`. Orbit and Forge are labelled Planned and have no action links. This status model was checked against the current Made `products/flavors.toml`, README, build profiles, workflows, and authenticated release metadata. Copper remains the only enabled product and `rust-v1.16.6` remains the latest stable release with Linux x86_64, macOS ARM64, and Windows x86_64 assets.

The demo now has Collaborative and Editor views over one Rust fixture and one parent-owned file state. The Editor view provides file navigation, tabs, editable CodeMirror content with syntax and line gutters, proposal review, recorded output, and mobile Files/Code/Review tabs. Browser checks confirmed cross-file and cross-view edit retention, explicit conflict handling, reset confirmation, expanded-view Escape and focus restoration, keyboard tab switching, mobile pane switching, and the recorded/local disclosure.

Local validation passed:

- ESLint, TypeScript, 24 Node release/build tests, 17 release/demo rendering tests, and both Rust fixture suites.
- A production Next.js build using the existing, explicitly identified release snapshot. The normal fresh-snapshot wrapper failed closed because the local shell has no valid `RELEASES_GITHUB_TOKEN`; Amplify's configured token was not read or exposed.
- The production smoke check returned 200 for `/`, `/copper`, `/releases`, `/robots.txt`, and `/sitemap.xml`; `/releases/` returned the expected internal 308 before 200. It verified canonical and social metadata, structured data, all five history entries, and every current asset URL.
- Desktop browser checks at 1440 and 1920 CSS pixels and mobile checks at 390 and 320 CSS pixels. The product grid and both demo views had no horizontal document overflow, console error, or hydration warning. Screenshots of those states were captured in the browser session.
- Homepage first-load JavaScript remains 138 kB. The lazy demo is 444,103 raw bytes and 145,150 gzip bytes, 2,541 gzip bytes above the preceding single-view measurement. The editor remains behind the existing lazy boundary and is absent from server HTML.

The public copy passed the Simtropolis `brand-writer` rubric after the `humanizer` pass: technical grounding 5/5, natural syntax 5/5, quiet confidence 5/5, developer respect 5/5, information priority 5/5, specificity and status 5/5, voice and product consistency 5/5, and earned claims 5/5. The taboo-language scan was clear. The root `bun run format:check` still reports the pre-existing, untracked `.agents/skills/humanizer/SKILL.md`; every file changed for this homepage work passes the repository formatter.

No commit, push, Amplify build, or production-site change was made.

## Content audit — 25 September 2026

The homepage, `/copper`, the browser demo, `/releases`, shared navigation and footer, loading/error/no-JavaScript text, route metadata, structured data, and public-messaging sections of the README were reviewed with the repository `brand-writer` skill and then the `humanizer` skill. The resulting inventory, factual sources, scorecard, and intentional repetition are recorded in [CONTENT_AUDIT.md](CONTENT_AUDIT.md).

The rewrite assigns one job to each surface. The homepage introduces Simtropolis, Made, Copper, and developer control. `/copper` documents current capabilities, agent controls, release scope, and practical FAQs. The browser demo supplies a concrete Rust example. `/releases` handles downloads, history, repository access, signing, and updates. Duplicate homepage capability, FAQ, and closing sections were removed, as was the alternate demo mode with unrelated fixtures.

Product claims were checked against Made default-branch commit `5c824980796c0896c6f5cf3067fbcb206af1d835`, local development commit `7c19425ff56e4816dabb5fa851c666a248d18a14`, the product manifest, README, build-profile documentation, agent and Cargo code, and authenticated GitHub metadata. GitHub reported the Made repository as private with `main` as its default branch. The latest release remained stable `rust-v1.16.6`, published 5 September 2026, with the three Linux x86_64, macOS ARM64, and Windows x86_64 assets rendered by the site’s fresh build snapshot.

Local validation passed:

- Prettier, ESLint, TypeScript, 24 Node release/build tests, 16 release/demo rendering tests, and both Rust fixture suites.
- A credentialed production build generated five Copper releases and prerendered `/`, `/copper`, `/releases`, `/robots.txt`, and `/sitemap.xml`.
- The production smoke script passed with `SMOKE_EXPECT_PRIVATE_ASSETS=1`: local routes returned 200 for `/`, `/copper`, and `/releases`; `/releases/` returned the expected internal 308 to `/releases`; an unknown route returned 404. It verified each exact asset URL and confirmed that GitHub returns 404 without repository authentication.
- Canonical, Open Graph, Twitter, sitemap, robots, structured data, exact GitHub asset URLs, no-JavaScript copy, and accessibility names were inspected.
- Browser checks found no console or hydration messages. Desktop captures at 1440 and 1920 pixels and exact mobile emulation at 390 and 320 CSS pixels showed no horizontal overflow or poor heading wraps.
- Current route output is 138 kB first-load JavaScript for `/` and 139 kB for `/copper`. The prior Copper report was 140 kB. The single lazy demo now totals 436,763 raw bytes and 142,609 gzip bytes, about 1.3 kB less gzip than the previous two-mode measurement. These are build sizes, not network performance claims.

All checks were local. No commit, push, Amplify build, or production-site change was made for this content audit.

## Copper product-page update — 25 September 2026

Work was performed on `codex/copper-integral-experience`, created from website `main` at `25c61383ab638f36a4195b04aca679e3ba214f7a`. The supplied `copper-website.zip` was inspected as reference material; only its mascot and social card were copied, byte-for-byte. The standalone HTML, deployment scripts, documentation, build output, and historical QA evidence are not part of the application.

Product claims were checked against the local Made checkout at `7c19425ff56e4816dabb5fa851c666a248d18a14`. The README and product manifest confirm Copper as the only enabled product, its `agentic-tools,rust-tools` release profile, supported Linux x86_64/macOS ARM64/Windows x86_64 targets, native agent and ACP support, Rust defaults, Cargo and Tests panels, and the opt-in status of multiplayer and native visual workflows. Orbit and Forge remain planned. Agent-panel documentation confirms visible tool activity, changed-file counts, checkpoints, hunk-level keep/reject review, provider configuration, and allow/deny/confirm tool permissions. The Rust guide confirms Cargo/test/Clippy/format/build/run/documentation workflows and explicitly excludes automatic network and dependency mutation.

The resulting `/copper` page uses the archive’s warm paper, orange, large editorial typography, fine rules, numbered sections, supplied mascot, and social card in scoped Next.js components. The ByteAsk reference informed the emphasis on visible commands, inspectable outputs, review, and explicit evidence; no ByteAsk wording, branding, C/C++ claims, gdb/sanitizer claims, retention/security promises, prices, model promises, or benchmarks were copied. The existing guided demo remains local and now opens in its conversation-first Rust parser workspace.

Local validation:

- Frozen Bun installation completed without dependency changes. Prettier, ESLint, TypeScript, 24 Node release/build tests, 16 release/demo rendering tests, and both before/after Rust fixture suites passed.
- A standard fresh-snapshot build failed closed before Next started because the local environment has no `RELEASES_GITHUB_TOKEN`; the safe diagnostic was HTTP 404, resource inaccessible, no token configured. This is the expected private-repository failure and did not silently reuse old data.
- An explicitly labelled offline compilation reused the checked-in `rust-v1.16.6` snapshot, which matches the currently deployed release page. Next’s production build passed, statically prerendering `/`, `/copper`, `/releases`, `/robots.txt`, and `/sitemap.xml`. The Copper route adds 1.22 kB route code and reports 140 kB first-load JS. The existing lazy workspace chunk remains 436,633 raw bytes / 143,937 gzip and is not preloaded in server HTML.
- Local HTTP checks passed for `/`, `/copper`, `/releases`, `/robots.txt`, `/sitemap.xml`, the `/releases/` internal 308 normalization, Copper canonical/Open Graph/JSON-LD metadata, sitemap entries, archive image delivery, all five release-history entries, and credential exclusion.
- Browser checks passed at 1440, 1920, 390, and 320 CSS pixels with no horizontal overflow or console/hydration warnings. They covered the homepage and Copper navigation, mobile menu/Escape/focus return, default conversation workspace, mobile pane switching, recorded-output disclosure, thread context menu, pin and rename, editing and cross-file retention, explicit patch-conflict keep/replace paths, reset, expanded view/Escape/focus return, and exact release asset hrefs. Reduced-motion rules disable site, mascot, ticker, and workspace animation/transition behavior.
- Review screenshots were captured in the browser session for the 1440 and 1920 Copper hero, 390 and 320 Copper hero, homepage, releases page, desktop guided workspace, and mobile guided workspace.

External availability finding: `simtropolis/made`, its release page, and each `rust-v1.16.6` asset URL returned HTTP 404 to an unauthenticated GET on 25 September 2026. The website preserves the exact GitHub URLs and now explains that private-repository access is enforced by GitHub. `RELEASES_GITHUB_TOKEN` lets Amplify generate the page but cannot make browser downloads public and must never be sent to visitors. Public downloads require Made and its release assets to be publicly readable, or an explicitly selected public GitHub Releases repository.

Live state before this branch is deployed: `/` and `/releases` return 200, `/releases/` resolves to `/releases`, and the deployed build marker is `25c61383ab638f36a4195b04aca679e3ba214f7a`. `/copper` returns 404 because this branch has not been merged into Amplify’s connected `main` branch. A successful branch push is therefore not evidence of a production deployment; deployment and the new live-route checks remain pending until this branch is merged or an Amplify preview branch is configured.

Both the main website and releases are implemented in the website repository for the existing AWS Amplify app. This report distinguishes local verification from deployment and account checks.

## GitHub 403 build fix

The original exception discarded GitHub's response message and headers, so the historical 403 cannot be classified from that exception. The fixed client records only the status, classified/sanitized message (including whether a token was supplied), request ID, remaining/reset rate-limit headers, and Retry-After. No raw response bodies, headers, URLs, credentials, or network exception details are logged.

The final local production build made exactly one GitHub request and generated one fresh snapshot containing five Copper releases. Its safe response was HTTP 200, no token configured, request ID `CE05:116740:3D457:42946:6A9ED0D2`, remaining `57`, reset `1788796238`, Retry-After absent. This is evidence from the local network, not the failed Amplify build.

`bun run build` now generates before launching Next.js. Repeated Next configuration evaluations only validate the snapshot. A unique run ID prevents reuse across builds; generation failures stop before Next launches. Local development uses the same wrapper with one fresh snapshot per session. The token and webhook variables are removed from the Next child process environment.

Validation for this fix:

- 23 Node tests and five rendering tests passed. New cases cover safe diagnostics and credential exclusion, primary and secondary limits, Retry-After seconds and dates, exhausted retry budgets, transient/network errors, authentication and permission failures without retries, pagination retry without duplication, invalid JSON, one generation across repeated real Next configuration evaluations, development arguments/exit status, and rejection of missing or stale snapshots.
- Formatting, ESLint, TypeScript, and frozen Bun installation passed.
- The production build passed using Node 22.22.0 and Bun 1.3.6, with `/releases` statically prerendered.
- The local production HTTP smoke check passed for both release paths, the canonical/social metadata, sitemap, all five history entries, and the three actual latest download URLs (each returned HTTP 200 to HEAD). A browser keyboard check expanded Copper 1.16.5 and exposed its release notes and all three historical download links.
- The only dependency addition is explicit `@next/env` 15.5.25, already present transitively and matching Next.js.

Before pushing this fix, the public `https://simtropolis.ai/releases` returned HTTP 404 with no build revision marker. The fix adds a public `simtropolis-build` meta tag sourced from Amplify's `AWS_COMMIT_ID`, allowing the exact deployed revision to be checked independently of AWS login.

AWS account access was deferred at the user's request. The Amplify main-branch token, automatic-build setting, and historical failure response remain unverified. See the authentication section in README for the main-branch variable and least-privilege setup if the new build diagnostics show authentication is needed. Pushing the fix requests the existing main-branch automatic deployment; a push alone is not proof of a successful deployment.

## Implementation checked

- `/releases` is a real prerendered Next.js page with shared navigation and footer. `/releases/` normalizes internally to it. The external redirect and its verification/configuration code are removed.
- The release generator and rendering tests live in the website repository. Every build fetches current public GitHub metadata outside Next's cache, validates it, and writes a public snapshot before prerendering. Binaries stay in GitHub Releases; their actual asset URLs are preserved.
- The previously added Pages site, workflow, generator registration, serialization special case, and associated configuration have been removed. Made's workflow registry has no diff from its original state. Only the active `release_promotion.yml` workflow receives a new post-publication `refresh_website` job; unrelated workflows are unchanged.
- The refresh job directly posts to an Amplify incoming webhook after successful publication, avoiding GitHub token event restrictions and additional workflow chains. It requires the branch-scoped `AMPLIFY_REBUILD_WEBHOOK` Actions secret.

## Automated validation

| Check                                                         | Result                                     |
| ------------------------------------------------------------- | ------------------------------------------ |
| Website Prettier, ESLint, TypeScript                          | Passed                                     |
| Website release metadata and generation tests                 | 9 passed                                   |
| Website release rendering tests                               | 5 passed                                   |
| Website production build, Node 22.22.0 / Bun 1.3.6            | Passed; `/releases` statically prerendered |
| Live metadata generation                                      | 5 Copper releases; latest stable 1.16.6    |
| Made workflow generator tests                                 | 8 passed                                   |
| Made generated workflow consistency                           | Passed                                     |
| Made Rust formatting and `./script/clippy -p xtask --offline` | Passed                                     |
| Webhook script with mocked network                            | 4 cases passed; no real webhook invoked    |
| Git whitespace checks                                         | Passed                                     |

Generator tests cover numeric version ordering, stable/prerelease selection, drafts, incomplete assets, empty lists, missing notes, exact asset URLs, platform labels, unknown assets, unsafe metadata, pagination, build-only authentication, cache bypass, API failures, credential exclusion, and atomic output replacement. Rendering tests cover missing downloads, empty/prerelease states, real links, and escaped release notes.

The webhook behavior checks execute the generated source script with mocked HTTP: missing and invalid secrets fail before any request, a valid endpoint sends POST, and network errors fail with a sanitized message. The job configuration test verifies its dependency on publication, no checkout or token permissions, a secret environment variable, and disabled shell tracing.

## HTTP and browser validation

`node scripts/smoke.mjs` against the local production server verifies:

- `/`, `/releases`, `/robots.txt`, and `/sitemap.xml` return 200; an unknown route returns 404.
- `/releases/` returns 308 to the same site's `/releases`, followed by 200.
- The releases canonical URL and Open Graph URL are `https://simtropolis.ai/releases`; the sitemap includes that URL.
- No external hosting destination or credential variable appears in the release HTML.
- Latest release asset URLs exactly match generated GitHub metadata; all three actual Linux, macOS, and Windows download URLs respond to HEAD with 200.

Browser checks cover the desktop production page, actual iframe document widths of 390 px and 320 px, shared navigation between releases and home, mobile menu Escape/focus restoration, and Enter toggling release history. Main and release pages at 390 px and releases at 320 px have no horizontal overflow. These are responsive browser checks, not physical-device tests. The main site retains its earlier FAQ, copy-command, and 320 px checks.

Screenshots are local review artifacts in ignored `artifacts/`:

- `amplify-releases-desktop.png`: internal release page and shared desktop navigation.
- `amplify-releases-downloads.png`: real platform download cards.
- `amplify-mobile-verification.png`: main site at 390 px, releases at 390 px and 320 px.

## Account settings and deployment not yet verified

GitHub confirms `simtropolis/website` has default branch `main`. This does not establish Amplify's connection or auto-build setting.

The AWS command `sts get-caller-identity --profile smart-dev-support` fails because the SSO token is missing. The profile region is `eu-west-2`, but the existing app's actual region and ID must be confirmed after login. Consequently, its repository connection, `main` branch, automatic-build setting, domain mapping, and routing rules remain **unverified**, not assumed correct.

The Made Actions secret list was inspected without reading secret values; `AMPLIFY_REBUILD_WEBHOOK` is not configured. An authorized operator must create a main-branch incoming webhook on the existing app and add its complete URL to that secret. No AWS app, domain, webhook, or deployment was created during local verification.

Follow [README.md](README.md#verify-the-existing-amplify-app) for exact read-only account checks, enabling automatic builds if necessary, webhook setup, merge order, and rollback. Then verify a website merge automatically deploys its commit and a normal Copper release causes a subsequent successful Amplify rebuild with updated `/releases` content. A local build or accepted webhook request does not prove that live deployment has completed.

## Integration with current main

Before merging, the latest Made main-branch history was integrated. It retires `release.yml` and moves publication to `release_promotion.yml`. The Amplify refresh job was adapted to the active workflow while preserving the retired placeholder and all newer build/publication steps. Its generator, tests, and Clippy checks were rerun on the combined changes. The change reaches a normal Copper release through the existing `main` to `release` promotion process.
