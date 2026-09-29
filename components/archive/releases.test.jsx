import { expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { ReleaseNotes } from './release-notes'
import { ReleaseList } from './release-list'

const platforms = [
  {
    target: 'macos-aarch64',
    name: 'macOS',
    architecture: 'Apple silicon · ARM64',
    extension: '.dmg',
  },
]
const release = {
  tag: 'rust-v1.0.0',
  version: '1.0.0',
  publishedAt: '2026-09-05T12:00:00Z',
  date: '05 September 2026',
  prerelease: false,
  url: 'https://github.com/simtropolis/made/releases/tag/rust-v1.0.0',
  body: '## Changes\n- A real change',
  assets: [],
}

test('renders empty release list with useful source guidance', () => {
  const html = renderToStaticMarkup(<ReleaseList releases={[]} platforms={platforms} />)
  expect(html).toContain('No stable Copper release yet.')
  expect(html).toContain('No published Copper releases yet.')
  expect(html).toContain('Build from source')
})
test('keeps prereleases in history without featuring them as stable', () => {
  const html = renderToStaticMarkup(
    <ReleaseList releases={[{ ...release, prerelease: true }]} platforms={platforms} />,
  )
  expect(html).toContain('No stable Copper release yet.')
  expect(html).toContain('Prerelease')
  expect(html).toContain('<details>')
})
test('shows missing assets and real release notes instead of invented links', () => {
  const html = renderToStaticMarkup(<ReleaseList releases={[release]} platforms={platforms} />)
  expect(html).toContain('No download attached for this platform.')
  expect(html).toContain('No downloads attached to this release yet.')
  expect(html).toContain('A real change')
  expect(html).not.toContain('/releases/download/')
})
test('renders exact download URLs and architecture labels', () => {
  const url =
    'https://github.com/simtropolis/made/releases/download/rust-v1.0.0/unusual-filename.dmg'
  const html = renderToStaticMarkup(
    <ReleaseList
      releases={[
        {
          ...release,
          assets: [
            { name: 'original-macos-aarch64.dmg', size: 1024, target: 'macos-aarch64', url },
          ],
        },
      ]}
      platforms={platforms}
    />,
  )
  expect(html).toContain('href="' + url + '"')
  expect(html).toContain('Apple silicon · ARM64')
})
test('escapes raw HTML and malicious links while supporting safe Markdown', () => {
  const html = renderToStaticMarkup(
    <ReleaseNotes
      text={
        '<script>alert(1)</script>\n[x](javascript:alert(1))\n[safe](https://example.com/?a="onmouseover)\n**Bold** and `code`\n```rust\n<script>\n```'
      }
    />,
  )
  expect(html).not.toContain('<script>')
  expect(html).not.toContain('href="javascript:')
  expect(html).not.toContain(' onmouseover=')
  expect(html).toContain('&lt;script&gt;')
  expect(html).toContain('<strong>Bold</strong>')
  expect(html).toContain('<code>code</code>')
})
