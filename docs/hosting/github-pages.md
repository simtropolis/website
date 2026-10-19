# GitHub Pages hosting

The website uses a Next.js static export hosted by GitHub Pages from `simtropolis/website`. Its canonical domain remains `simtropolis.ai`. The user authorized proceeding with setup without a rollback requirement on 19 October 2026. The source repository is public following the authorized contents/history review. The old Amplify build configuration has been removed; no AWS resource deletion is part of the source change.

## Eligibility audit

- The initial repository API reported `private=true`, default branch `main`, `has_pages=false`, size 19,808 KiB; the organization plan was `free`. The user explicitly chose public source after review. GitHub confirms `visibility=public` and `private=false`, making this repository eligible for Pages on the existing Free plan. Actions is enabled and the current account has repository admin access. Billing was not changed. Recheck these settings before cutover.
- The current site is an informational project/product presentation, with no checkout, account creation, payment processing, or hosted SaaS runtime. That is the basis for treating it as compatible with Pages' usage policy; this is an engineering assessment, not a policy guarantee. Reassess if commercial transactions or hosted SaaS are added.
- Public source assets total about 6.1 MiB; no public file exceeds 20 MiB. `bun run test:static` measures the complete export and rejects artifacts at or over 1 GB or containing hard/symbolic links. GitHub's published-site limit is 1 GB; bandwidth has a soft limit of 100 GB/month, and Pages deployment has a 10-minute timeout. External image/video bytes are not part of the Pages artifact or its measured size.
- App Router routes are `/`, the generated 404, `/robots.txt`, and `/sitemap.xml`. There are no API routes, middleware, server actions, request cookies/headers, ISR, or runtime redirects in the active app. Historical release scripts are tested but never used by the production build; no release token is required.
- `output: 'export'` generates `out/`. Images already use `unoptimized: true`. Metadata handlers explicitly use `dynamic = 'force-static'`. Google fonts are fetched at build time and emitted into `out/_next/static/media/`. Existing external art/video URLs are preserved and still depend on their existing host.
- The domain serves from `/`, so `basePath` and `assetPrefix` remain unset. Do not introduce `/website` merely because this is a project repository. An unconfigured `https://simtropolis.github.io/website/` preview is not a valid root-domain asset test. Configure the custom domain before production deployment; use the local root preview for review.
- GitHub Actions publishes the artifact directly; Jekyll is not involved, so `.nojekyll` is unnecessary. A `CNAME` file is ignored for Actions publishing; configure the domain in repository Pages settings instead.

## Public-source review

Before the authorized visibility change, all remote branches and tags were fetched. Gitleaks 8.30.1 (official release checksum verified) found no leaks in Git patch history, all 411 reachable historical blobs across 36 commits, and 135 current tracked/new publication files. The GitHub metadata scan covered four closed PRs and zero issue/review comments; no releases, tags, wiki, or discussions were present. Manual review covered commit messages, file inventory, historical environment-file names, archived documentation, and demo fixture provenance. Only placeholder `.env.example` files were found in history; no real environment file, private key, credential dump, or customer payload was found. The website's historical product documentation and source references remain in its public history. This review does not guarantee that a detector can identify every possible secret.

## Build and deployment

Use Node 22.22.0 (`.nvmrc`) and Bun 1.3.6:

```sh
bun install --frozen-lockfile
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
bun run test:build
bun run test:static
bun run preview
# Separate terminal:
bun run test:smoke
```

The workflow runs on pull requests targeting `main`, pushes to `main`, and manual dispatch. Successful `main` builds deploy automatically; pull requests cannot deploy. No opt-in variable is required. Build jobs have only `contents: read`. The deployment job needs the build and gets only `pages: write` and `id-token: write`. Production deployments are serialized and never cancelled midway; superseded PR validation is cancelled. The `github-pages` environment is restricted to `main`.

GitHub settings: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**; **Custom domain: simtropolis.ai**. Claim the custom domain in Pages before pointing DNS at it. Once GitHub provisions its certificate, enable **Enforce HTTPS**. Actions publishing does not use a `CNAME` file. The workflow adds `deployment-sha.txt` to identify the exact deployed commit.

## DNS setup

Read-only checks at approximately 10:05 BST on 19 October 2026 used the local resolver, Cloudflare `1.1.1.1`, and authoritative `ns-366.awsdns-45.com`. The apex returned NOERROR without A/AAAA/CNAME answers; `www` returned NXDOMAIN. The apex NS records were `ns-1143.awsdns-14.org`, `ns-1020.awsdns-63.net`, `ns-366.awsdns-45.com`, and `ns-1976.awsdns-55.co.uk`. MX/TXT/CAA queries had no answers. These starting observations do not enumerate the whole zone.

The domain registrar and selected DNS provider are **GoDaddy**. In Domain Portfolio → `simtropolis.ai` → DNS → Nameservers, select **GoDaddy Nameservers**, save, and confirm. GoDaddy assigns its default nameservers; use those exact assigned values rather than guessing them. Once the change has processed, open **DNS Records** and add/update only the website records below (TTL 300 where available).

No AWS account or Route 53 access is needed for this setup. Keep any unrelated records visible in the GoDaddy zone. The initial AWS zone could not be exported because no authenticated AWS session was available; public apex queries found no A/AAAA/MX/TXT/CAA data, but that is not a complete subdomain inventory. Before relying on other domain services, confirm any service-specific records with their owners.

GoDaddy marked the registration expired on 18 October 2026 when inspected during setup on 19 October. Domain renewal is an account action separate from the website deployment; confirm the registration is active before treating the domain setup as complete.

| Name                 | Type  | Values                                                                                     |
| -------------------- | ----- | ------------------------------------------------------------------------------------------ |
| `simtropolis.ai`     | A     | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| `simtropolis.ai`     | AAAA  | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www.simtropolis.ai` | CNAME | `simtropolis.github.io.`                                                                   |

After selecting GoDaddy nameservers, preserve unrelated DNS records, including mail, TXT, CAA, or certificate-validation records. Replace conflicting website address/alias records where present. Do not add an apex CNAME or a wildcard. The `www` target has no repository path. With the apex configured as the Pages custom domain, GitHub redirects `www` to the apex once both DNS variants are correct.

Organization-level domain verification is optional but recommended: organization **Settings → Pages → Add a domain** generates a TXT record at `_github-pages-challenge-simtropolis.simtropolis.ai`. Use the exact generated value and keep it once verified; do not invent it. It is not a prerequisite for this setup.

GitHub Pages is already configured for Actions publishing and `simtropolis.ai`. The first production build and deployment passed in [run 39229839071](https://github.com/simtropolis/website/actions/runs/39229839071). Its exact revision, homepage/metadata/404 responses, and 11 local script/style/font URLs were verified directly at the GitHub Pages origin. That origin check does not establish public custom-domain DNS or HTTPS readiness.

## Verify the live site

After deployment, compare `https://simtropolis.ai/deployment-sha.txt` with the successful workflow's `head_sha`, then run:

```sh
bun run test:smoke -- https://simtropolis.ai
```

Check authoritative/public A, AAAA, and CNAME responses, apex and `www` HTTPS, `www` → apex and HTTP → HTTPS redirects, scripts/fonts/images/video, metadata, and simple/nested 404s. Certificate issuance and DNS propagation can take up to 24 hours. Enable Enforce HTTPS once GitHub reports its certificate ready.

See [verification and screenshots](verification.md) for the completed local/browser checks and existing accessibility limitations. Record GitHub deployment results separately from the custom-domain checks; a successful Pages artifact alone does not prove DNS or certificate readiness.

## References

- [Next.js 15 static exports](https://nextjs.org/docs/15/app/guides/static-exports)
- [GitHub Pages workflows and eligibility](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Pages limits and permitted use](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Custom domains and DNS targets](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

- [GoDaddy nameservers](https://www.godaddy.com/en/help/change-my-domain-nameservers-664)
- [GoDaddy A records](https://www.godaddy.com/en-uk/help/add-or-edit-an-a-record-42546)
