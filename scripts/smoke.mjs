import assert from 'node:assert/strict'
const base = process.argv[2] ?? 'http://127.0.0.1:3000'
for (const path of [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/home-media/hero.mp4',
  '/home-media/features.png',
  '/home-media/footer.png',
  '/images/whale.png',
  '/icon.svg',
  '/notices.txt',
]) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 200, path)
}
// These routes were already retired on origin/main. Do not restore them.
for (const path of ['/copper', '/sim', '/releases', '/archive', '/nonexistent-verification-path']) {
  assert.equal((await fetch(new URL(path, base), { redirect: 'manual' })).status, 404, path)
}
const trailing = await fetch(new URL('/releases/', base), { redirect: 'manual' })
assert.equal(trailing.status, 308)
assert.equal(new URL(trailing.headers.get('location'), base).pathname, '/releases')
const home = await (await fetch(new URL('/', base))).text()
assert.ok(home.includes('<title>simtropolis</title>'))
assert.equal(
  new URL(home.match(/rel="canonical" href="([^"]+)"/)[1]).href,
  'https://simtropolis.ai/',
)
assert.ok(home.includes('content="https://simtropolis.ai/images/whale.png"'))
assert.ok(
  home.includes('Release pending') && home.includes('Opt-in') && home.includes('Planned work'),
)
assert.doesNotMatch(home, /Copper|Groovy|Forge|Made|GitHub|game-development|hebbkx1anhila5yf/)
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text()
assert.ok(sitemap.includes('<loc>https://simtropolis.ai</loc>'))
assert.doesNotMatch(sitemap, /copper|releases|\/sim<\/loc>/)
console.log(
  'Homepage, assets, legal notices, metadata and unchanged retired-route boundaries verified',
)
