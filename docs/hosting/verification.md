# GitHub Pages migration verification

Verified locally on 19 October 2026 in the isolated `codex/website-github-pages` worktree, based on `main` at `13309b14c09deb6ce9fe2e566d2761543ea3971a`. This report verifies the prepared export; it does not claim GitHub Pages deployment or a completed DNS cutover.

## Automated checks

| Check                                                    | Result                                                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Frozen dependency installation, Node 22.22.0 / Bun 1.3.6 | Passed; no dependency or lockfile changes                                               |
| Prettier                                                 | Passed                                                                                  |
| ESLint                                                   | No errors; ten existing `no-img-element` warnings                                       |
| TypeScript                                               | Passed                                                                                  |
| Node tests                                               | 25 passed, zero skipped/failed; includes static file/HEAD/404/method/traversal behavior |
| Normal production build                                  | Passed without release snapshots or release credentials                                 |
| Exported homepage content/status/metadata checks         | Passed against `out/index.html`                                                         |
| Static artifact and route smoke                          | Passed: 42 files, 7,560,926 bytes; no hard/symbolic links                               |
| Workflow syntax                                          | Actionlint 1.7.12 passed                                                                |
| Whitespace                                               | `git diff --check` passed                                                               |
| Public-source review                                     | Gitleaks 8.30.1 found no leaks; review scope is recorded in the migration runbook       |

`/`, `/robots.txt`, `/sitemap.xml`, and the social image returned 200. Robots and sitemap had the expected MIME types. Former `/copper`, `/sim`, `/releases`, `/archive`, and both simple and nested missing URLs returned 404 with an actual 404 document. All local homepage script/style/font/image/icon references exist in the export. Canonical and social URLs remain on `https://simtropolis.ai`, and the sitemap still lists only `/`.

The pre-migration Next build reported 134 kB first-load JavaScript for `/`; the static export reported 135 kB. No application dependency, landing component, stylesheet, content, or public asset was changed. Only the robots/sitemap static-generation declarations changed under `app/`.

## Browser verification

Chromium checked the exported site through the local static server at 1920 × 1080, 1440 × 1080, 390 × 844, and 320 × 844. The same harness checked a temporary, untouched production build of the base commit served with `next start`.

- No horizontal document overflow at any width in either build.
- All 13 images loaded. No failed requests, HTTP asset failures, console warnings/errors, or page/hydration exceptions in the normal and reduced-motion runs.
- Every in-page link target exists. Keyboard Tab reaches the home link with a visible focus ring. On both mobile widths, Enter opens the menu, the Workflow link can be activated with the keyboard, and selecting it closes the menu and updates the fragment.
- Desktop/mobile screenshots were visually inspected; typography, imagery, navigation, hero layout, and narrow-screen menu match the existing design. The animated video/rotating word make captures time-dependent; no pixel-identical screenshot claim is made.
- **Existing accessibility limitations, reproduced on untouched main:** Escape does not close the mobile menu. With `prefers-reduced-motion: reduce`, the background video and page animations continue. The migration preserves that behavior; it does not establish reduced-motion compliance or complete keyboard accessibility.

Machine-readable observations are in [export-browser.json](export-browser.json) and [baseline-browser.json](baseline-browser.json). Full-page, reduced-motion, and 404 captures plus the local harness remain in the worktree's ignored `artifacts/github-pages/` directory. Selected screenshots are committed below so the PR can be reviewed without that local directory.

### Desktop

![1440px exported homepage with keyboard focus](screenshots/1440-hero.png)

### Mobile

![390px exported homepage](screenshots/390-hero.png)

### Narrow-screen menu

![320px keyboard-opened navigation menu](screenshots/320-menu.png)

## Initial external state and subsequent setup

At the end of the initial preparation, the user had authorized making the source public after review; the GitHub API confirmed `private=false` / `visibility=public`. At that point Pages was not enabled, no custom domain or deployment variable was configured, and no DNS or AWS mutation had been performed.

DNS was checked against the local resolver, Cloudflare, and an authoritative Route 53 nameserver. The apex had no A/AAAA/CNAME answers, and `www` was NXDOMAIN. These are the observed starting conditions, not an effect of this PR. The AWS default profile has no credentials and the existing named profile has no SSO token. The Amplify app, successful deployment/default URL, full Route 53 zone inventory, and exact working rollback alias therefore remain unverified.

The user subsequently authorized proceeding with setup without a rollback requirement. The [hosting guide](github-pages.md) now documents automatic deployment from `main`, Pages/custom-domain settings, exact DNS records, and HTTPS verification. The obsolete Amplify YAML files and deployment opt-in gate were removed. Current live deployment results are recorded in the PR and GitHub Actions history; the checks above remain the initial local/browser evidence, not a claim about subsequent DNS propagation.

## First production deployment

[Production workflow 39229839071](https://github.com/simtropolis/website/actions/runs/39229839071) built and deployed `e839d1f56a4fe724a348cb7fef2250d9c66e63dc` successfully. The Pages origin returned that exact revision, passed the homepage/metadata/legacy and nested-404 smoke checks, and served all 11 local script/style/font URLs. Origin verification used a validated TLS connection to the GitHub Pages server with the configured custom-domain Host header; it did not verify the custom domain's own DNS or certificate.

The user chose GoDaddy DNS instead of Route 53, so no AWS sign-in is required. GoDaddy access was available and the move to its default nameservers was submitted. The registrar marked the domain expired on 18 October when inspected on 19 October; renewal and public DNS/HTTPS readiness remain separate account/live checks. The [hosting guide](github-pages.md) now reflects GoDaddy DNS.
