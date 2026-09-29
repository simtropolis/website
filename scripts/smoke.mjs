import assert from 'node:assert/strict'

const base = process.argv[2] ?? 'http://127.0.0.1:3000'

for (const path of ['/', '/robots.txt', '/sitemap.xml', '/images/whale.png']) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 200, path)
}

for (const path of ['/copper', '/sim', '/releases', '/archive', '/nonexistent-verification-path']) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 404, `${path} should not expose a legacy product page`)
}

const home = await (await fetch(new URL('/', base))).text()
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text()
assert.ok(home.includes('Sim / a game-development workspace'))
assert.ok(
  home.includes('Sim brings scenes, assets, model inputs, code, and review into one place.'),
)
assert.ok(home.includes('No Sim release target or download'))
assert.ok(home.includes('Native workflow graph editor and execution runtime'))
assert.ok(home.includes('native workflow graph, model and media tools'))
assert.ok(home.includes('Made is derived from Zed'))
assert.ok(home.includes('rel="canonical" href="https://simtropolis.ai"'))
assert.ok(home.includes('content="https://simtropolis.ai/images/whale.png"'))
assert.doesNotMatch(home, /Copper|Groovy|Forge|Featured companies|Download Sim/)
assert.doesNotMatch(home, /\bComfy(?:-compatible)?\b/i)
assert.ok(sitemap.includes('<loc>https://simtropolis.ai</loc>'))
assert.doesNotMatch(sitemap, /copper|releases|\/sim<\/loc>/)

console.log('Sim homepage, metadata, sitemap, assets, and legacy route boundaries verified')
