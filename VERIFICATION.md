# Verification — Pointer-informed presentation

Reviewed 29 September 2026 on branch `codex/pointer-inspired-design`. The work remains uncommitted and unpushed for review. No Amplify deployment or production-site change was made.

## Scope

The homepage, `/copper`, `/releases`, shared header, mobile navigation, footer, loading/error states, metadata, and social card now use one near-black Simtropolis system informed by the supplied Pointer archive. No Pointer asset, copy, brand element, interface screenshot, customer material, metric, testimonial, or dependency is shipped.

The homepage is product-led: a framed hero, Copper/Groovy/Forge cards, concrete Copper feature panels, the editor-only guided fixture, and project links. The separate Made foundation diagram was removed because it repeated the product hierarchy.

The Products menu and cards share `lib/product-catalog.ts`. Copper is Available. Groovy and Forge are Planned and expose no download or documentation action. The public editor demo has no Collaborative switch; dormant collaborative code remains internal.

## Source verification

Product claims were checked against Made `dev` at `d2c855f475539656852526dee8b0f60bccb02c00`, stable `main` at `5c824980796c0896c6f5cf3067fbcb206af1d835`, release at `734279e2f30c11bbbfd96f8dc8426abef6a7073b`, product manifests, README files, Rust/Cargo/task/debugger/agent code, workflows, and licences.

The `dev` catalog names Groovy, while stable `main` and the `dev` README still name Orbit. Public copy uses Groovy as requested and clearly marks it Planned.

GitHub metadata was checked directly. The latest stable release is Copper 1.16.6 (`rust-v1.16.6`), published 5 September 2026, with these exact assets:

- Linux x86_64: `https://github.com/simtropolis/made/releases/download/rust-v1.16.6/rust-1.16.6-linux-x86_64.tar.gz`
- macOS ARM64: `https://github.com/simtropolis/made/releases/download/rust-v1.16.6/rust-1.16.6-macos-aarch64.dmg`
- Windows x86_64: `https://github.com/simtropolis/made/releases/download/rust-v1.16.6/rust-1.16.6-windows-x86_64.exe`

The hero image is a cropped native Made/Copper visual-test capture. Full provenance and processing details are in [DESIGN_INVENTORY.md](DESIGN_INVENTORY.md).

## Local validation

- Targeted Prettier formatting: passed.
- ESLint: passed.
- TypeScript: passed.
- Node release/build tests: 24 passed.
- Bun rendering and demo tests: 17 passed.
- Rust fixture before/after tests: passed.
- Production Next.js build: passed using the explicitly identified authenticated snapshot `2beaa871-162f-4245-b860-23cfd6722964`.
- Release-generation behaviour remains fail-closed; no empty or stale fallback was added.
- Route smoke tests: passed for `/`, `/copper`, `/releases`, `/releases/`, `/robots.txt`, `/sitemap.xml`, and the unknown-route 404.
- Browser review: passed after the homepage diagram removal and final mobile/release layout fixes.

## Build impact

The production build reports:

| Route       | Route JS | First load |
| ----------- | -------: | ---------: |
| `/`         |  1.65 kB |     139 kB |
| `/copper`   |  2.31 kB |     140 kB |
| `/releases` |    203 B |     138 kB |

The lazy editor chunks total 443,585 raw bytes / 145,050 gzip, about 518 raw bytes and 100 gzip bytes smaller than the preceding branch. They remain absent from the server HTML until the demo approaches the viewport or is opened. The authentic WebP is 40,482 bytes. No dependency was added and the Bun lockfile is unchanged.

## Browser interaction coverage

Final local production-browser checks covered:

- pointer, keyboard, Escape, arrow-key, Home/End, focus restoration, and mobile use of the Products menu;
- editor file and tab switching, edit retention, Code and Review Changes modes;
- explicit sample-patch conflict handling;
- reset confirmation;
- expanded-dialog Escape and focus restoration;
- mobile Files/Code/Review switching at 390px and 320px;
- no horizontal overflow;
- `/copper` and `/releases` dark layouts;
- recorded/local disclosure and no visible Collaborative control.
- Products-menu Escape handling and focus restoration;
- the corrected 320px mobile product menu;
- exact release asset URLs and canonical metadata;
- no console errors, warnings, or hydration messages.

## Copy review

The Simtropolis `brand-writer` rubric scores 5/5 for technical grounding, natural syntax, quiet confidence, developer respect, information priority, specificity/status, product consistency, and earned claims. The `humanizer` pass removed repeated Made definitions, slogan fragments, template rhythms, and vague control/platform/workflow language. See [CONTENT_AUDIT.md](CONTENT_AUDIT.md).

## Deployment boundary

Everything above is local verification. The branch has not been pushed, so Amplify has not built it and no live route was checked. The existing Amplify configuration, Bun workflow, release snapshot generation, `RELEASES_GITHUB_TOKEN`, `AMPLIFY_REBUILD_WEBHOOK`, GitHub-hosted binaries, and release automation were preserved.
