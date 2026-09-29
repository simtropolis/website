import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'

// Run after the normal production build. No network or release fetch is needed.
const html = await readFile('.next/server/app/index.html', 'utf8')
const copperHtml = await readFile('.next/server/app/copper.html', 'utf8')
assert.ok(html.includes('Open guided demo'))
assert.ok(html.includes('Enable JavaScript to edit files'))
assert.ok(html.includes('pub fn parse_port'))
assert.ok(html.includes('Copper'))
assert.ok(html.includes('Orbit'))
assert.ok(html.includes('Forge'))
assert.ok(html.includes('Available'))
assert.ok(html.includes('Planned'))
assert.ok(html.indexOf('id="hero-title"') < html.indexOf('id="made"'))
assert.ok(html.indexOf('id="made"') < html.indexOf('id="products"'))
assert.ok(html.indexOf('id="products"') < html.indexOf('id="evidence-title"'))
assert.ok(html.indexOf('id="products"') < html.indexOf('id="demo"'))
assert.ok(html.includes('See the actions, output, and proposed diff.'))
assert.ok(html.includes('Multiplayer tools and native visual tooling are opt-in Made capabilities'))
assert.ok(html.includes('/social-card.png'))
const tags = html.match(/<(script|link)\b[^>]*>/g) || []
const manifest = JSON.parse(await readFile('.next/react-loadable-manifest.json', 'utf8'))
const chunks = manifest['components/copper-demo/index.tsx -> ./workspace'].files
let raw = 0
let gzip = 0
for (const file of chunks) {
  assert.ok(!tags.some((tag) => tag.includes(file)), 'Heavy editor must not preload in server HTML')
  const bytes = await readFile('.next/' + file)
  raw += bytes.length
  gzip += gzipSync(bytes).length
}
assert.ok(!/RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK/.test(html))
assert.ok(copperHtml.includes('Copper is a Rust'))
assert.ok(copperHtml.includes('Rust development with reviewable agent work'))
assert.ok(copperHtml.includes('Open guided demo'))
assert.ok(copperHtml.includes('https://simtropolis.ai/copper'))
assert.ok(copperHtml.includes('/copper/social-card.png'))
assert.ok(copperHtml.includes('application/ld+json'))
assert.ok(!/RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK/.test(copperHtml))
console.log(
  'Homepage hierarchy, platform diagram, Copper introduction, static preview, no-JS guidance, metadata, lazy asset boundary and credential checks passed.',
)
console.log(JSON.stringify({ lazyRawBytes: raw, lazyGzipBytes: gzip }))
