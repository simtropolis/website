import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { latestStable } from './generate-releases.mjs'

const base = process.argv[2] ?? 'http://127.0.0.1:3000'
for (const path of ['/', '/releases', '/robots.txt', '/sitemap.xml']) {
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
assert.ok(html.includes('rel="canonical" href="https://simtropolis.ai/releases"'))
assert.ok(html.includes('property="og:url" content="https://simtropolis.ai/releases"'))
assert.ok(
  !/simtropolis\.github\.io|made-release-site|RELEASES_URL|RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK/.test(
    html,
  ),
)
assert.ok(
  (await (await fetch(new URL('/sitemap.xml', base))).text()).includes(
    '<loc>https://simtropolis.ai/releases</loc>',
  ),
)
console.log('Canonical, social metadata, sitemap and credential checks passed')
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
  assert.equal(response.status, 200, asset.name)
  console.log(asset.name + ': HTTP 200 (HEAD)')
}
