# Sim website verification

## Product evidence checked on 29 September 2026

Made `origin/dev` was checked at `bf2f4b4607999e805a257450b6125c13e0c03a38`. Sim is the website's sole product focus. The Made product catalog still marks its game flavor `planned` with no targets, so there is no verified Sim installer or download.

| State                                   | Evidence                                                                                                                                                                                       | Page treatment                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Implemented in Made                     | Zed-derived editor, project and code tools, agent workflows, and change review in Made source.                                                                                                 | The foundation behind Sim.                                                         |
| Available through optional Made builds  | Made's native workflow graph editor, execution runtime, model catalog, and image/video output surfaces use the `comfy` feature flag; `multiplayer-tools` enables separate collaborative tools. | Building blocks, not a released unified Sim harness.                               |
| Sim product scope requiring integration | Scenes, assets, world-model inputs, code, and review in one game-development workspace; procedural graphics, layers and nodes, nondestructive composition, animation, and VFX workflows.       | Direct product language in the main copy, with the status boundary in one section. |

[Made's product catalog](https://github.com/simtropolis/made/blob/dev/products/flavors.toml), [feature flags](https://github.com/simtropolis/made/blob/dev/crates/zed/Cargo.toml), [visual graph model](https://github.com/simtropolis/made/blob/dev/crates/comfy_ui/src/graph.rs), and [Graphite's feature descriptions](https://graphite.art/features/) were used for this comparison. The Made source search found no Graphite integration or implemented Sim equivalents of Graphite's procedural graphics, nondestructive layer/node composition, or animation authoring. Graphite's features define creative scope here; its code and roadmap are not presented as part of Sim.

No verified Sim world-model integration, multiplayer game harness, supported platforms, performance measurements, installers, or downloads were found. VFX, animation, creative arts, advertising, eCommerce, and other application-area examples describe intended workflows, not production-ready field integrations. Reduced reliance on traditional engines is presented as a long-term vision.

## Website checks

The following checks passed locally on 29 September 2026:

- `bun run format:check`, `bun run typecheck`, `bun run test` (24 tests), `bun run build`, and `bun run test:build`.
- `bun run lint` passed with 12 warnings for existing `<img>` use and unused toast code; there were no lint errors. The production build passed with the same class of warnings.
- `bun run test:smoke` against `next start` passed: the homepage, metadata, sitemap, assets, and former-route boundaries were served as expected.
- The production page was inspected at 1280 × 720 and 390 × 844. The hero and creative section retained the existing dark visual design. The mobile menu opened and reached status; the status cards remained readable. `document.documentElement.scrollWidth` stayed within the viewport, and the browser reported no console warnings or errors.
- After the terminology update, the served page and its metadata were checked again at 1280 × 720 and 390 × 844. No public Comfy branding appeared in rendered HTML or visible copy; the native workflow wording fit both viewports without horizontal overflow.

The local build and production server checks do not verify an Amplify deployment. The existing decorative imagery includes remote assets, which remain dependent on that asset host at runtime.
