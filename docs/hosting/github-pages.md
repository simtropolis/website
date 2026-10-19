# GitHub Pages migration

## Status and scope

Prepared on 19 October 2026 from `main` at `13309b14c09deb6ce9fe2e566d2761543ea3971a`. This changes hosting, not the visual design or product copy. No production DNS, billing, GitHub Pages settings, or AWS resources have been changed. After the user explicitly chose public source, the repository was made public following the review documented below. Deployment is disabled until `PAGES_DEPLOY_ENABLED` is explicitly set to `true`. Do not merge this PR into Amplify's connected branch before its automatic builds have been held as part of the approved cutover: the retained Amplify specification expects the former `.next` server deployment.

The implementation targets Pages in `simtropolis/website`, with `simtropolis.ai` as the canonical domain. The user selected publishing this source repository publicly; this change has been completed. No separate publishing repository or cross-repository token is needed.

## Eligibility audit

- The initial repository API reported `private=true`, default branch `main`, `has_pages=false`, size 19,808 KiB; the organization plan was `free`. The user explicitly chose public source after review. GitHub now confirms `visibility=public`, `private=false`, and `has_pages=false`, making this repository eligible for Pages on the existing Free plan. Actions is enabled and the current account has repository admin access. Billing was not changed. Recheck these settings before cutover.
- The current site is an informational project/product presentation, with no checkout, account creation, payment processing, or hosted SaaS runtime. That is the basis for treating it as compatible with Pages' usage policy; this is an engineering assessment, not a policy guarantee. Reassess if commercial transactions or hosted SaaS are added.
- Public source assets total about 6.1 MiB; no public file exceeds 20 MiB. `bun run test:static` measures the complete export and rejects artifacts at or over 1 GB or containing hard/symbolic links. GitHub's published-site limit is 1 GB; bandwidth has a soft limit of 100 GB/month, and Pages deployment has a 10-minute timeout. External image/video bytes are not part of the Pages artifact or its measured size.
- App Router routes are `/`, the generated 404, `/robots.txt`, and `/sitemap.xml`. There are no API routes, middleware, server actions, request cookies/headers, ISR, or runtime redirects in the active app. Historical release scripts are tested but never used by the production build; no release token is required.
- `output: 'export'` generates `out/`. Images already use `unoptimized: true`. Metadata handlers explicitly use `dynamic = 'force-static'`. Google fonts are fetched at build time and emitted into `out/_next/static/media/`. Existing external art/video URLs are preserved and still depend on their existing host.
- The domain serves from `/`, so `basePath` and `assetPrefix` remain unset. Do not introduce `/website` merely because this is a project repository. An unconfigured `https://simtropolis.github.io/website/` preview is not a valid root-domain asset test. Configure the custom domain before production deployment; use the local root preview for review.
- GitHub Actions publishes the artifact directly; Jekyll is not involved, so `.nojekyll` is unnecessary. A `CNAME` file is ignored for Actions publishing; configure the domain in repository Pages settings instead.

## Public-source review

Before the authorized visibility change, all remote branches and tags were fetched. Gitleaks 8.30.1 (official release checksum verified) found no leaks in Git patch history, all 411 reachable historical blobs across 36 commits, and 135 current tracked/new publication files. The GitHub metadata scan covered four closed PRs and zero issue/review comments; no releases, tags, wiki, or discussions were present. Manual review covered commit messages, file inventory, historical environment-file names, archived documentation, and demo fixture provenance. Only placeholder `.env.example` files were found in history; no real environment file, private key, credential dump, or customer payload was found. The website's historical product documentation and source references remain in its public history. This review does not guarantee that a detector can identify every possible secret.

## Validation and workflow

Use Node 22.22.0 and Bun 1.3.6:

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

The workflow runs on PRs targeting `main`, pushes to `main`, and manual dispatch. Build jobs have only `contents: read`. Only the deployment job gets `pages: write` and `id-token: write`, and it needs a successful build. The `github-pages` environment should permit deployment only from `main`. PR jobs cannot deploy, including PRs that upload an artifact. Production deployments are serialized and are not cancelled mid-deployment; PR validation cancels superseded runs. `out/deployment-sha.txt` is added by CI to identify the exact deployed commit. No AWS or release credentials are needed.

## Observed DNS before migration

Read-only checks at approximately 10:05 BST on 19 October 2026 used the local resolver, Cloudflare `1.1.1.1`, and the authoritative `ns-366.awsdns-45.com`. Authoritative answers were:

| Name                 | Type           | Observation                                                                                         |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| `simtropolis.ai`     | NS             | `ns-1143.awsdns-14.org`, `ns-1020.awsdns-63.net`, `ns-366.awsdns-45.com`, `ns-1976.awsdns-55.co.uk` |
| `simtropolis.ai`     | A, AAAA, CNAME | NOERROR with no answers (NODATA)                                                                    |
| `www.simtropolis.ai` | CNAME          | NXDOMAIN                                                                                            |
| `simtropolis.ai`     | MX, TXT, CAA   | NOERROR with no answers (NODATA)                                                                    |

These observations do not prove that the Amplify deployment is absent: an Amplify default hostname can still exist. AWS CLI has no default credentials, and the existing `smart-dev-support` profile fails because its SSO token is missing, so the Route 53 zone inventory, Amplify app/default hostname, last successful deployment, domain mappings, redirects, and certificate validation records could not be read. DNS queries are not a full zone export. Capture those details before approving cutover; do not invent an Amplify alias from missing records. The starting production apex is not currently resolvable to a web address from the queried resolvers.

## Approval prerequisites

Complete implementation review and CI first. The following must be resolved before requesting or executing cutover:

1. Public-source eligibility is resolved. Confirm repository visibility remains public and Settings → Pages is available.
2. Obtain read access to AWS. Export the full Route 53 record sets, hosted zone ID, Amplify app ID/default URL, branch/build settings, last successful commit/job, domain mappings and redirects, and ACM validation records. Save exact existing routing values for rollback. Reconcile the observed missing apex/`www` records with the intended live service. A rollback that simply restores NODATA/NXDOMAIN does not restore a working website.
3. Verify the domain at organization level: organization Settings → Pages → Add a domain → `simtropolis.ai`. GitHub generates a TXT value for `_github-pages-challenge-simtropolis.simtropolis.ai`. Record the exact generated value; publishing that TXT record is a DNS change and requires the cutover approval. Keep it after verification. Do not guess the challenge value.
4. Prepare a record-level DNS diff against the fresh zone export. Preserve NS/SOA delegation, MX, TXT, CAA, ACM validation CNAMEs, and all unrelated hosts. If CAA exists at cutover, confirm GitHub's certificate authority is allowed using the HTTPS documentation. Do not replace the zone or add wildcards.
5. Keep the Amplify deployment, custom domain association, certificate, and rollback build configuration available. Confirm that its default URL serves the expected website. Plan a bounded observation period after cutover before retiring it.

## Approved cutover sequence

Only perform these steps after explicit cutover approval. Domain verification and Pages settings are external changes; the current PR does not make them.

1. Verify the organization domain using GitHub's generated TXT record. Wait for GitHub verification.
2. Hold automatic Amplify builds on the connected branch so merging a static-export migration cannot trigger its old SSR build. Keep the current successful deployment running. Record the original auto-build setting for rollback.
3. Merge the reviewed PR normally. Confirm the resulting `main` SHA and green workflow build. In repository Settings → Pages, set Build and deployment → Source to **GitHub Actions**, set Custom domain to **simtropolis.ai**, and save it **before** pointing web DNS to Pages. Restrict the `github-pages` environment to `main`. Do not change the domain's nameservers.
4. Set repository Actions variable `PAGES_DEPLOY_ENABLED` to `true`; dispatch `pages.yml` on `main`. Confirm the artifact and deployment succeeded. Obtain the workflow SHA. The default project URL may redirect to the custom domain before its DNS is ready; that is not an asset-path failure.
5. Apply only the web-routing record changes in the following table, reconciling existing alias/address records from the saved zone export. Route 53 supports standard A/AAAA records at the apex; do not create an apex CNAME. Proposed TTL is 300 seconds.

| Name                   | Type  | Desired values                                                                             |
| ---------------------- | ----- | ------------------------------------------------------------------------------------------ |
| `simtropolis.ai` (`@`) | A     | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| `simtropolis.ai` (`@`) | AAAA  | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www.simtropolis.ai`   | CNAME | `simtropolis.github.io.`                                                                   |

Remove conflicting **web-routing** records only after saving their full original definitions. The `www` target has no repository path. Configure only `simtropolis.ai` as the Pages custom domain; GitHub then redirects `www` to the apex when both DNS variants are configured correctly.

6. Check authoritative and public DNS for all A/AAAA/CNAME values. Allow DNS and certificate propagation (GitHub documents up to 24 hours). In Settings → Pages, wait for the certificate and enable **Enforce HTTPS**. Verify HTTPS succeeds for apex and `www`, `www` redirects to the apex, HTTP redirects to HTTPS, and there is no mixed content.
7. Fetch `https://simtropolis.ai/deployment-sha.txt` and compare it exactly to the successful deployment workflow's `head_sha`. Run `bun run test:smoke -- https://simtropolis.ai`. Recheck desktop/mobile layout, images/video, scripts/fonts, keyboard interactions, canonical/social metadata, sitemap/robots, unknown-path and nested-path 404s, and console/hydration behavior against the reviewed preview.
8. Record the live URL, exact deployed SHA, workflow run, DNS/HTTPS evidence, and cutover time. Observe the site with Amplify still available. Do not call the migration live-verified before these checks pass.

## Rollback and eventual cleanup

If Pages validation fails, set `PAGES_DEPLOY_ENABLED=false` to stop later deployment jobs. Cancel queued deployments if necessary. Restore **only** web-routing records to the saved, confirmed working Amplify domain mappings. Keep domain-verification TXT and unrelated records intact. Restore Amplify automatic builds only after restoring the prior source/configuration or pointing its branch at the known good pre-migration commit. The former build specification is preserved verbatim at `docs/hosting/amplify.rollback.yml`; the existing root `amplify.yml` is intentionally retained in this PR for rollback. Do not run the current static-export source through that old SSR build specification.

Verify the restored Amplify hostname, apex/`www` HTTPS, assets, and expected commit. Leave Pages/domain verification in place until DNS is safely back at Amplify; do not leave DNS pointing at an unclaimed Pages site. Because the initial observed routing records were missing, restoring those empty observations alone is not a working-service rollback; the AWS inventory prerequisite must first establish the correct target.

After successful live verification and the agreed observation period, obtain confirmation to retire Amplify. Prepare a follow-up cleanup that removes root `amplify.yml`, keeps the rollback evidence in history, removes unused Amplify build hooks/secrets, and deletes only the identified Amplify resources. Retain Route 53 hosting/delegation and unrelated ACM/DNS records. This PR does not delete AWS resources or enable deployment.

## References

- [Next.js 15 static exports](https://nextjs.org/docs/15/app/guides/static-exports)
- [GitHub Pages custom workflows and eligibility](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Pages limits and permitted use](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Custom domains, exact DNS targets, and Actions CNAME behavior](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
