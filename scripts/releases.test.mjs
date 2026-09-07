import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  fetchReleases,
  normalizeReleases,
  latestStable,
  generateReleases,
} from './generate-releases.mjs'

function release(version = '1.2.0', options = {}) {
  return {
    tag_name: 'rust-v' + version,
    published_at: '2026-09-05T12:00:00Z',
    html_url: 'https://github.com/simtropolis/made/releases/tag/rust-v' + version,
    draft: false,
    prerelease: false,
    body: '## Changes\nReal notes',
    assets: [],
    ...options,
  }
}
function asset(name = 'actual-1.2.0-macos-aarch64.dmg', options = {}) {
  return {
    name,
    browser_download_url:
      'https://github.com/simtropolis/made/releases/download/rust-v1.2.0/actual-download.dmg',
    size: 1024,
    state: 'uploaded',
    ...options,
  }
}

test('sorts numeric versions and selects stable independently of prereleases', () => {
  const releases = normalizeReleases([
    release('1.9.0'),
    release('1.10.0'),
    release('2.0.0-beta.1'),
    release('1.10.1', { prerelease: true }),
  ])
  assert.equal(releases[0].version, '2.0.0-beta.1')
  assert.equal(latestStable(releases).version, '1.10.0')
})
test('filters drafts, unrelated tags and incomplete assets', () => {
  const releases = normalizeReleases([
    release('1.2.0', { draft: true }),
    release('1.2.0', { tag_name: 'orbit-v1.2.0' }),
    release('1.2.0', { assets: [asset(), asset('pending', { state: 'new' })] }),
  ])
  assert.equal(releases.length, 1)
  assert.equal(releases[0].assets.length, 1)
})
test('preserves actual URLs, labels targets, retains unknown assets, and does not invent downloads', () => {
  const [result] = normalizeReleases([
    release('1.2.0', { assets: [asset(), asset('checksums.txt')] }),
  ])
  assert.equal(result.assets[0].url, asset().browser_download_url)
  assert.equal(result.assets[0].target, 'macos-aarch64')
  assert.equal(result.assets[1].target, null)
  assert.equal(result.assets.length, 2)
})
test('handles empty, prerelease-only and missing notes lists', () => {
  assert.deepEqual(normalizeReleases([]), [])
  assert.equal(latestStable(normalizeReleases([release('1.0.0-rc.1')])), undefined)
  assert.match(normalizeReleases([release('1.0.0', { body: null })])[0].body, /No release notes/)
})
test('rejects malformed lists, dates, asset metadata and unsafe URLs', () => {
  assert.throws(() => normalizeReleases({}))
  assert.throws(() => normalizeReleases([release('1.0.0', { published_at: null })]))
  assert.throws(() =>
    normalizeReleases([release('1.0.0', { assets: [asset('bad', { size: -1 })] })]),
  )
  for (const url of [
    'javascript:alert(1)',
    'https://evil.test/file',
    'https://github.com/other/repo/releases/download/file',
    'https://token@github.com/simtropolis/made/releases/download/file',
  ]) {
    assert.throws(() =>
      normalizeReleases([
        release('1.0.0', { assets: [asset('bad', { browser_download_url: url })] }),
      ]),
    )
  }
})
test('paginates with build-only authentication and bypasses fetch caches', async () => {
  const calls = []
  const result = await fetchReleases({
    token: 'test-secret',
    fetcher: async (url, options) => {
      calls.push({ url, options })
      return Response.json(calls.length === 1 ? Array(100).fill(release()) : [release('1.3.0')])
    },
  })
  assert.equal(result.length, 101)
  assert.match(calls[1].url, /page=2$/)
  assert.equal(calls[0].options.headers.Authorization, 'Bearer test-secret')
  assert.equal(calls[0].options.cache, 'no-store')
  assert.equal(calls[0].options.redirect, 'error')
})
test('API failure cannot become an empty success or expose secrets', async () => {
  await assert.rejects(
    fetchReleases({ fetcher: async () => new Response('', { status: 403 }) }),
    /HTTP 403/,
  )
  await assert.rejects(
    fetchReleases({ fetcher: async () => Response.json({ message: 'error' }) }),
    /release list/,
  )
  await assert.rejects(
    fetchReleases({
      fetcher: async () => {
        throw new Error('test-secret')
      },
    }),
    (error) => !error.message.includes('test-secret'),
  )
})
test('writes a public allowlist atomically; failed refresh preserves last generated data', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'made-releases-'))
  const output = join(directory, 'releases.json')
  try {
    await writeFile(output, 'previous')
    await assert.rejects(
      generateReleases({ output, fetcher: async () => new Response('', { status: 500 }) }),
    )
    assert.equal(await readFile(output, 'utf8'), 'previous')
    await generateReleases({
      output,
      token: 'test-secret',
      fetcher: async () =>
        Response.json([release('1.2.0', { author: { private: 'not-for-output' } })]),
    })
    const text = await readFile(output, 'utf8')
    assert.ok(!text.includes('test-secret') && !text.includes('not-for-output'))
    assert.equal(JSON.parse(text).releases[0].version, '1.2.0')
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
test('production config generates metadata and has no external redirect', async () => {
  const source = await readFile(new URL('../next.config.mjs', import.meta.url), 'utf8')
  assert.match(source, /PHASE_PRODUCTION_BUILD/)
  assert.match(source, /await generateReleases\(\)/)
  assert.doesNotMatch(source, /redirects|RELEASES_URL|verifyReleases/)
})
