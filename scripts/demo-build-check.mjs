import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'

// Verify actual production HTML, not a fixture or a source-copy snapshot.
const html = await readFile('.next/server/app/index.html', 'utf8')
const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ')
for (const text of [
  'Sim / In development',
  'visual development workspace',
  'PNG-backed artboards',
  'Invert an image',
  'linked .sim document',
  'Queue a workflow',
  'Planned work',
  'Opt-in',
  'Release pending',
  'public release is still pending',
]) {
  assert.ok(visible.includes(text), `Missing feature or limitation: ${text}`)
}
assert.match(html, /<title>simtropolis<\/title>/)
assert.equal(
  html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g, ''),
  'Worlds toimagine.',
)
assert.match(html, /<h1[^>]*aria-label="Worlds to imagine, build and explore\."/)
assert.ok(html.includes('simtropolis'))
assert.equal(
  new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]).href,
  'https://simtropolis.ai/',
)
for (const tag of ['og:title', 'twitter:title'])
  assert.ok(html.includes(`"${tag}" content="simtropolis"`))
assert.ok(html.includes('https://simtropolis.ai/images/whale.png'))
assert.ok(html.includes('a visual development workspace in development.'))
assert.doesNotMatch(
  visible,
  /\bMade\b|GitHub|Copper|Groovy|Forge|game-development|world foundation|testimonials|pricing|Sign up|Download Sim/i,
)
assert.doesNotMatch(
  html,
  /RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK|SoftwareApplication|downloadUrl|<a[^>]+href="https?:|<img[^>]+src="https?:/,
)
for (const id of [
  'features',
  'how-it-works',
  'nodes',
  'documents',
  'execution',
  'tools',
  'limits',
  'planned',
  'status',
]) {
  assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`)
}
for (const anchor of html.matchAll(/href="#([^"]+)"/g))
  assert.ok(html.includes(`id="${anchor[1]}"`), `Broken anchor ${anchor[1]}`)
for (const file of await readdir('components/landing')) {
  const source = await readFile(`components/landing/${file}`, 'utf8')
  assert.doesNotMatch(source, /hebbkx1anhila5yf|src="https?:/)
}
assert.ok(html.includes('/home-media/hero.mp4'))
assert.match(html, /<video[^>]+object-cover object-center opacity-80/)
assert.ok(!html.includes('/home-art/'))
const notice = await readFile('public/notices.txt', 'utf8')
assert.ok(notice.includes('Zed Industries') && notice.includes('Graphite'))
const css = await readFile('app/homepage.css', 'utf8')
assert.match(css, /prefers-reduced-motion:\s*reduce/)
assert.doesNotMatch(css, /--muted-foreground|font-family|font-size|grid-template-columns/)
const social = await readFile('public/social-card.svg', 'utf8')
assert.ok(social.includes('simtropolis') && social.includes('Visual development workspace'))
assert.doesNotMatch(social, /Made|GitHub|game-development/)
console.log(
  'Homepage branding, mechanisms, capability states, metadata, anchors, local media and notices verified',
)
