import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { latestStable } from './generate-releases.mjs'

const base = process.argv[2] ?? 'http://127.0.0.1:3000'
const expectPrivateAssets = process.env.SMOKE_EXPECT_PRIVATE_ASSETS === '1'
for (const path of ['/', '/copper', '/sim', '/releases', '/robots.txt', '/sitemap.xml']) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 200, path)
  console.log(path + ': HTTP 200')
}
const slash = await fetch(new URL('/releases/', base), { redirect: 'manual' })
assert.equal(slash.status, 308)
assert.equal(new URL(slash.headers.get('location'), base).href, new URL('/releases', base).href)
assert.equal((await fetch(new URL('/releases/', base))).status, 200)
console.log('/releases/: internal 308 → /releases → 200')
assert.equal((await fetch(new URL('/nonexistent-verification-path', base))).status, 404)
const html = await (await fetch(new URL('/releases', base))).text()
const homeHtml = await (await fetch(new URL('/', base))).text()
const copperHtml = await (await fetch(new URL('/copper', base))).text()
const simHtml = await (await fetch(new URL('/sim', base))).text()
assert.ok(homeHtml.includes('rel="canonical" href="https://simtropolis.ai"'))
assert.ok(html.includes('rel="canonical" href="https://simtropolis.ai/releases"'))
assert.ok(html.includes('property="og:url" content="https://simtropolis.ai/releases"'))
assert.ok(copperHtml.includes('rel="canonical" href="https://simtropolis.ai/copper"'))
assert.ok(copperHtml.includes('property="og:url" content="https://simtropolis.ai/copper"'))
assert.ok(copperHtml.includes('content="https://simtropolis.ai/copper/social-card.png"'))
assert.ok(simHtml.includes('rel="canonical" href="https://simtropolis.ai/sim"'))
assert.ok(simHtml.includes('content="https://simtropolis.ai/sim/social-preview.jpg"'))
assert.ok(simHtml.includes('No Sim download yet.'))
assert.ok(homeHtml.includes('Focused development tools'))
assert.ok(homeHtml.includes('Three focused products. One available today.'))
assert.ok(homeHtml.includes('Evidence stays close to the change.'))
assert.ok(homeHtml.includes('03 / Guided editor'))
assert.ok(homeHtml.includes('Native Copper editor capture'))
assert.ok(!homeHtml.includes('Made keeps the common parts in one codebase.'))
assert.ok(homeHtml.includes('content="https://simtropolis.ai/social-card.png"'))
assert.ok(homeHtml.includes('Copper'))
assert.ok(homeHtml.includes('Groovy'))
assert.ok(homeHtml.includes('Sim'))
assert.ok(copperHtml.includes('Copper is a Rust'))
assert.ok(homeHtml.includes('Enable JavaScript to edit files and use the demo controls.'))
assert.ok(copperHtml.includes('application/ld+json'))
assert.ok(
  !/simtropolis\.github\.io|made-release-site|RELEASES_URL|RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK/.test(
    homeHtml + html + copperHtml,
  ),
)
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text()
assert.ok(sitemap.includes('<loc>https://simtropolis.ai/copper</loc>'))
assert.ok(sitemap.includes('<loc>https://simtropolis.ai/releases</loc>'))
for (const asset of ['/copper/rust-mascot.png', '/copper/social-card.png']) {
  const response = await fetch(new URL(asset, base))
  assert.equal(response.status, 200, asset)
  assert.match(response.headers.get('content-type') ?? '', /^image\/png/)
}
console.log('Canonical, social metadata, structured data, sitemap and credential checks passed')
const { releases } = JSON.parse(
  await readFile(new URL('../.generated/releases.json', import.meta.url), 'utf8'),
)
const stable = latestStable(releases)
assert.ok(stable)
assert.ok(html.includes(stable.tag))
for (const release of releases)
  assert.ok(html.includes('id="' + release.tag + '"'), 'Missing history entry: ' + release.tag)
assert.ok(html.includes('<details'))
console.log('Latest stable release and all ' + releases.length + ' history entries verified')
for (const asset of stable.assets) {
  assert.ok(html.includes(asset.url), asset.name + ' must use its exact metadata URL')
  const response = await fetch(asset.url, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, expectPrivateAssets ? 404 : 200, asset.name)
  console.log(
    asset.name +
      (expectPrivateAssets
        ? ': HTTP 404 without repository authentication, as expected'
        : ': HTTP 200 (HEAD)'),
  )
}
