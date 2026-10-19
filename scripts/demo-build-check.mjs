import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

// Validate the homepage artifact that GitHub Pages will actually serve.
const html = await readFile('out/index.html', 'utf8')
const socialCard = await readFile('public/social-card.svg', 'utf8')

for (const text of [
  'Sim / a game-development workspace',
  'world foundation models',
  'Zed-derived',
  'Sim brings scenes, assets, model inputs, code, and review into one place.',
  'Layers and nodes',
  'Nondestructive composition',
  'Procedural graphics',
  'Animation and VFX',
  'Long-term vision',
  'No Sim release target or download',
  'Native workflow graph editor and execution runtime',
  'Model catalog and image/video output previews',
  'Made is derived from Zed',
]) {
  assert.ok(html.includes(text), `Missing product or status copy: ${text}`)
}

for (const application of ['VFX', 'Animation', 'Creative arts', 'Advertising', 'eCommerce']) {
  assert.ok(html.includes(`>${application}</h3>`), `Missing intended application: ${application}`)
}
assert.doesNotMatch(
  html,
  /Sim is our planned workspace|The Sim direction|not a released application|Intended:/,
)

for (const anchor of [
  'features',
  'how-it-works',
  'infra',
  'integrations',
  'developers',
  'status',
]) {
  assert.ok(html.includes(`id="${anchor}"`), `Missing navigation target: ${anchor}`)
}

assert.match(html, /<title>Sim \| Game worlds and creative tools by Simtropolis<\/title>/)
assert.ok(html.includes('rel="canonical" href="https://simtropolis.ai"'))
assert.ok(html.includes('content="https://simtropolis.ai/images/whale.png"'))
assert.ok(html.includes('procedural, node-based creative tools'))
assert.ok(html.includes('native workflow graph, model and media tools'))
assert.ok(
  html.includes(
    'Glowing whale artwork for Sim, a game-development workspace with native visual workflows',
  ),
)
assert.ok(html.includes('Two glowing trees linked across a shared world scene'))
assert.ok(socialCard.includes('Native node graphs, model and media workflows, code, and review.'))
assert.doesNotMatch(html, /\bComfy(?:-compatible)?\b/i)
assert.doesNotMatch(socialCard, /\bComfy(?:-compatible)?\b/i)
assert.doesNotMatch(
  html,
  /Copper|Groovy|Forge|Featured companies|Download Sim|Sign up|SOC 2|HIPAA|ISO 27001/,
)
assert.doesNotMatch(html, /RELEASES_GITHUB_TOKEN|AMPLIFY_REBUILD_WEBHOOK/)

console.log(
  'Sim product copy, status, navigation, attribution, and metadata verified in production HTML',
)
