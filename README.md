# Made by Simtropolis

The main website and Copper releases page are served by the **existing AWS Amplify application** at **https://simtropolis.ai/** and **https://simtropolis.ai/releases**. Its source is `simtropolis/website`, production branch `main`. Binaries remain attached to [simtropolis/made GitHub Releases](https://github.com/simtropolis/made/releases).

## Local development and verification

```sh
nvm install
nvm use
npm install --global bun@1.3.6
bun install --frozen-lockfile
bun run dev
```

Node 22.22.0 and Bun 1.3.6 match `amplify.yml`. Public GitHub release metadata supports unauthenticated requests with a smaller shared rate limit. For reliable Amplify builds, configure the build-only `RELEASES_GITHUB_TOKEN` as described below; never prefix it with `NEXT_PUBLIC_`. The wrapper uses Next.js's matching `@next/env` package to load local `.env` files before generation. No Python runtime is required for the website generator.

```sh
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
bun run start
```

## Release-page architecture

`bun run build` invokes `scripts/run-next.mjs build`. The wrapper loads the appropriate Next.js environment files, generates **one fresh snapshot**, then launches Next.js with a new snapshot run ID. `bun run dev` does the same for a development session; restart it to refresh release data. Do not call `next build` or `next dev` directly: configuration and the page reader reject a missing, malformed, or mismatched snapshot instead of silently reusing one from a previous run.

`scripts/github-releases.mjs` fetches GitHub release metadata serially, bypassing caches. `scripts/generate-releases.mjs` validates Copper tags and actual asset URLs and atomically writes an allowlisted public snapshot to ignored `.generated/releases.json`. The wrapper passes only the run ID to Next, removing the release token and rebuild webhook variables from the child process environment. The snapshot contains public release metadata, its generation time, and its run ID; it contains no credentials. Failed generation stops the build and retains the existing deployment. Only a successful API response containing an actual empty list produces the empty state.

`next.config.mjs` performs read-only validation. Repeated configuration evaluations cannot trigger another GitHub request or generation. `amplify.yml` continues to invoke `bun run build` once and does not export environment variables into a file.

`app/releases/page.tsx` prerenders a real static Next.js page from that snapshot, sharing navigation, typography, footer, focus styles, and reduced-motion behavior with the main site. It features the latest stable version independently of prereleases, renders history and publication dates, labels actual platform downloads, and identifies missing assets. Release notes support a small Markdown subset rendered through React's escaping, with the original notes linked on GitHub. There is no browser GitHub API request or client credential.

`/releases` returns 200. `/releases/` uses Next.js's normal server-side 308 normalization to `/releases`, then returns the same page. Its canonical URL and sitemap entry are `https://simtropolis.ai/releases`. No external release redirect or separate hosting configuration remains. Remove the obsolete `RELEASES_URL` environment variable and any existing Amplify rule redirecting either release path.

## GitHub authentication and safe diagnostics

`RELEASES_GITHUB_TOKEN` authenticates **Amplify → GitHub** release metadata requests. It is unrelated to `AMPLIFY_REBUILD_WEBHOOK`, which authenticates **Made → Amplify** rebuild requests. Do not substitute one for the other.

To configure least-privilege authentication, create an expiring fine-grained GitHub personal access token with resource owner **simtropolis**, repository access limited to **made**, and **Contents: read-only** (Metadata read access is automatic). Obtain organization approval if its policy requires it. No write, workflow, administration, or access to the website repository is needed. A GitHub App installation token with the same repository scope and Contents read permission is also supported if existing automation supplies a fresh token for each build. Do not copy a broad developer CLI token into Amplify.

In the **existing app → Hosting → Environment variables**, add `RELEASES_GITHUB_TOKEN` using a **main-branch override**. Enter it in the account console, not in a chat, commit, command argument, or generated file. Check that an empty branch override is not hiding an app-level value. Save and rebuild. The token is consumed directly from the build environment; no `.env.production` export or runtime secret is necessary. Rotate it before expiry.

Every GitHub response logs only status, a sanitized/classified message, request ID, `x-ratelimit-remaining`, `x-ratelimit-reset`, and `retry-after`. The message states `token supplied` or `no token configured`, which verifies the build's effective authentication mode without printing its value. A 200 with `token supplied` verifies the credential can read releases; token presence alone does not prove validity. Arbitrary response bodies, authorization headers, URL credentials, and exception details are never logged.

A 401, ordinary 403, inaccessible resource, permission denial, or SSO requirement fails immediately. Rate-limit responses (403/429 with supporting headers or a rate-limit message), transient 408/500/502/503/504 responses, and network failures have at most **3 attempts per page**. Retries respect the later of Retry-After and an exhausted primary limit's reset time. A secondary limit without timing headers waits at least 60 seconds. The total sleep budget is 120 seconds per snapshot, with a 30-second timeout per request. If GitHub requires a longer delay, the build fails without retrying early. Failed responses never become empty releases.

The original 403 report did not include its body or rate-limit headers; that implementation discarded them. The exact historical cause cannot be recovered from that exception alone. Use the new safe diagnostic record from the Amplify build to distinguish rate limits from authentication or permissions. A successful local anonymous request does not establish the state of Amplify's shared egress IP or its configured token.

References: [GitHub release API permissions](https://docs.github.com/en/rest/releases/releases), [GitHub retry guidance](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api), and [Amplify branch environment overrides](https://docs.aws.amazon.com/amplify/latest/userguide/setting-env-vars.html).

## Verify the existing Amplify app

**Account access remains required:** the local `smart-dev-support` profile has no usable SSO token. The repository cannot prove or configure an Amplify branch's remote settings. As of 7 September 2026, the connected repository, `main` auto-build setting, and domain mapping have not been verified live.

An authorized operator should sign in and inspect the existing application. The local profile's configured region is `eu-west-2`; select the app's actual region if it differs. Do not create a replacement app.

```sh
aws sso login --profile smart-dev-support
aws amplify list-apps --profile smart-dev-support --region eu-west-2 \
  --query 'apps[].{id:appId,name:name,repository:repository,platform:platform}'
```

Set `amplify_app_id` to the ID of the existing app serving `simtropolis.ai`, and `amplify_region` to its region, then inspect only non-secret settings:

```sh
aws amplify get-app --app-id "$amplify_app_id" --profile smart-dev-support --region "$amplify_region" \
  --query 'app.{id:appId,repository:repository,platform:platform,productionBranch:productionBranch,customRules:customRules}'
aws amplify get-branch --app-id "$amplify_app_id" --branch-name main --profile smart-dev-support --region "$amplify_region" \
  --query 'branch.{name:branchName,enableAutoBuild:enableAutoBuild,stage:stage,framework:framework}'
aws amplify list-domain-associations --app-id "$amplify_app_id" --profile smart-dev-support --region "$amplify_region" \
  --query 'domainAssociations[].{domain:domainName,status:domainStatus,subdomains:subDomains}'
```

Confirm:

- The repository is `https://github.com/simtropolis/website` (or its equivalent Git remote URL), and branch `main` is connected with `enableAutoBuild: true`.
- The existing `simtropolis.ai` domain maps to `main`; keep its current DNS and certificates.
- Hosting uses Next.js compute (`WEB_COMPUTE`), with repository `amplify.yml` controlling the build and `.next` artifacts. The build installs pinned Node/Bun, uses the frozen lockfile, and runs formatting, lint, type checking, tests, and production compilation.
- No custom external `/releases` redirect or generic SPA rewrite intercepts Next.js routing. Preserve unrelated rules.

If `main` is connected but auto-build is disabled, enable it in **Hosting → Branch settings**, or run:

```sh
aws amplify update-branch --app-id "$amplify_app_id" --branch-name main --enable-auto-build \
  --profile smart-dev-support --region "$amplify_region" \
  --query 'branch.{name:branchName,enableAutoBuild:enableAutoBuild}'
```

If the repository connection or production domain maps elsewhere, correct that connection in the **existing app** before merging. Merging website changes into `main` should then automatically build and deploy using `amplify.yml`; observe a successful Amplify build for the merge commit to verify this behavior live.

## Automatic refresh after Copper publication

The existing Made release workflow now has a `refresh_website` job after successful `publish_product`. It sends an HTTPS POST to an Amplify incoming webhook scoped to the website's `main` branch. It runs directly in the publication workflow, so `GITHUB_TOKEN` event restrictions and chained `workflow_run` limits do not prevent updates. The original Copper packaging and publishing steps remain unchanged.

1. In the existing Amplify app, open **Hosting → Build settings → Incoming webhooks → Create webhook**. Name it **Copper release refresh**, selecting branch **main**. This operation does not replace the app or domain.
2. Copy the complete webhook URL, including `operation=startbuild`, into the **simtropolis/made Actions secret `AMPLIFY_REBUILD_WEBHOOK`**. For an interactive masked prompt, use `gh secret set AMPLIFY_REBUILD_WEBHOOK --repo simtropolis/made`. Do not paste the URL into a commit, issue, browser bundle, or environment-file export. The secret was not present when checked locally.
3. Merge the website changes into `simtropolis/website/main` and verify its automatic deployment first. Then merge Made's generator change and generated `.github/workflows/release_promotion.yml` into Made's `main`. The update reaches Copper publication through Made's normal `main` → `release` promotion process; keep its retired `release.yml` inert. Regenerate Made workflows with `cargo xtask workflows` and validate with `cargo xtask check-workflows`.
4. After the next normal Copper release, verify `publish_product` and `refresh_website` both succeed, and an Amplify `main` build starts **after** release publication. Confirm its successful deployment, then compare the newest version, publication date, notes, and asset URLs at `/releases` against GitHub.

The webhook is a branch-scoped bearer credential. The job validates the AWS HTTPS hostname, rejects redirects, disables shell tracing, and avoids printing URLs, exception details, or response bodies. It needs no AWS access key, website repository token, or client credential. Rotate it by replacing the incoming webhook and updating the Actions secret. Missing or failed webhook configuration fails the refresh job visibly while leaving the Copper release published. Fix configuration and rerun **failed jobs only** to retry. Request acceptance is not deployment completion.

Release-note edits or manual refreshes can be rebuilt in the Amplify console or using:

```sh
aws amplify start-job --app-id "$amplify_app_id" --branch-name main --job-type RELEASE \
  --profile smart-dev-support --region "$amplify_region" \
  --query 'jobSummary.{id:jobId,status:status,commit:commitId}'
```

[Amplify incoming webhook documentation](https://docs.aws.amazon.com/amplify/latest/userguide/create-incoming-webhook.html) describes branch-scoped rebuilds; [StartJob](https://docs.aws.amazon.com/amplify/latest/APIReference/API_StartJob.html) documents rebuilding the latest connected-branch commit.

## Production acceptance and rollback

Check `/` and `/releases` return 200, `/releases/` resolves internally to `/releases`, `/robots.txt` and `/sitemap.xml` return 200, and unknown routes return 404. Test main and release navigation at desktop/mobile widths, history disclosures with the keyboard, and all three latest GitHub download links. Inspect canonical and social metadata; confirm no external hosting URL or credentials appear in page source. Amplify builds include a public `simtropolis-build` meta tag containing `AWS_COMMIT_ID`; compare it to the pushed commit to verify the exact deployed revision without AWS account access.

Deployment checks still require hosting-account access. Local build and mocked webhook tests establish code behavior; they do not prove the remote branch connection, webhook delivery, or completed production deployment. See [VERIFICATION.md](VERIFICATION.md) for recorded results and screenshots.

To roll back, use the existing Amplify deployment history. Disable or rotate the incoming webhook if automated refreshes need to stop. Binaries remain available directly in GitHub Releases throughout.

## Dependency changes

- Next.js **16.0.10 → 15.5.25**. This is an intentional compatibility change to the latest patched 15.x release: [AWS documents managed Next.js support through version 15](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html). The existing `.next` deployment model is preserved.
- React and React DOM **19.2.8**; Tailwind **4.3.3**; TypeScript **5.9.3**; ESLint **9.39.5**; Prettier **3.9.6**. Versions are explicit and the Bun lockfile is regenerated from fresh registry metadata.
- Replaced `next lint` with the ESLint CLI, added a real type-check script, and removed `ignoreBuildErrors`.
- Added explicit `@next/env` **15.5.25**, matching Next.js, for environment loading in the release-build wrapper. This package was already present transitively; the frozen Bun lockfile now records it as a direct dependency.
- Retained the existing Button, Accordion, and Sheet primitives; their Radix dependencies are now explicit. Removed unused placeholder UI components and their libraries, including Expo/React Native, React Three Fiber/Three.js, charts, drag-and-drop, forms, toast systems, animation, and Vercel analytics. The rebuilt page's imports were checked before dependency removal.
- A **PostCSS 8.5.28 override** replaces Next.js's pinned older PostCSS dependency to address published advisories within the same major version. Keep this override until the upstream dependency is patched. The production build and lint validate compatibility.
- The refreshed dependency audit reports **zero known vulnerabilities** as of 7 September 2026. Bun blocks the optional `unrs-resolver` install script; the platform package works without running it, including lint and production compilation.

## Content and assets

Product content is centralized in `lib/content.ts` and `app/page.tsx`. Copper is the only enabled product. The full multiplayer workspace and native visual workflows are explicitly opt-in; Orbit and Forge are planned. Updater and signing limitations are described without promising unavailable services.

Source references, checked 7 September 2026:

- [Made README](https://github.com/simtropolis/made/blob/main/README.md)
- [Product catalog](https://github.com/simtropolis/made/blob/main/products/flavors.toml)
- [Multiplayer build profiles](https://github.com/simtropolis/made/blob/main/docs/src/development/multiplayer-tools.md)
- [Release workflow documentation](https://github.com/simtropolis/made/blob/main/.github/workflows/README.md)
- [Published Copper releases](https://github.com/simtropolis/made/releases)
- [Visual reference](https://v0-optimus-delta.vercel.app/)

`public/copper.svg` is the authentic icon copied from Made's `assets/product_flavors/rust/app-icon.svg`. Made is derived from Zed and primarily GPL-3.0-or-later, with Apache-2.0 components where marked. Public attribution links to both license files. The Simtropolis favicon uses the site's typographic mark. No customer imagery, testimonials, statistics, pricing, or compliance claims have been invented.
