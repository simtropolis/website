# Simtropolis website

This repository contains the website for [simtropolis.ai](https://simtropolis.ai), with Sim as Simtropolis's sole product focus. The page presents Sim as a game-development workspace that brings scenes, assets, model inputs, code, and review together with procedural, node-based creative tools, nondestructive composition, animation, and VFX workflows.

The underlying [Made `dev` source](https://github.com/simtropolis/made/tree/dev) includes a Zed-derived editor and an opt-in native workflow graph, execution runtime, model catalog, media output tools, and multiplayer features. [Graphite's feature descriptions](https://graphite.art/features/) inform Sim's creative tool scope; they are not evidence of Graphite code or tools integrated into Sim. Made's product catalog has no enabled Sim target or release. The site offers no Sim installer or download and makes no platform, performance, or shipped model-integration claims. See [VERIFICATION.md](VERIFICATION.md) for the evidence boundary.

## Run locally

```sh
bun install --frozen-lockfile
bun run dev
```

For a production check:

```sh
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
bun run test:build
bun run start
# In another shell: bun run test:smoke
```

The production build fetches Google fonts, so it needs network access. The deployment configuration in `amplify.yml` runs the checks above through `test:build`. Only `/` is included in the sitemap. Former product and release routes are no longer served.

Earlier site documentation and assets are preserved in `archive/` for repository history; that directory is outside the Next.js app and public asset roots. The remaining release scripts are historical tooling and are not part of the Sim build.

See [VERIFICATION.md](VERIFICATION.md) for the current evidence and check results.
