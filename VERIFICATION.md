# Verification — Amplify hosting, 7 September 2026

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
