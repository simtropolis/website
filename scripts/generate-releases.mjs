import { randomUUID } from 'node:crypto'
import { mkdir, rename, writeFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export const repository = 'simtropolis/made'
export const platforms = [
  {
    target: 'macos-aarch64',
    name: 'macOS',
    architecture: 'Apple silicon · ARM64',
    extension: '.dmg',
  },
  {
    target: 'windows-x86_64',
    name: 'Windows',
    architecture: 'Intel / AMD · x86_64',
    extension: '.exe',
  },
  {
    target: 'linux-x86_64',
    name: 'Linux',
    architecture: 'Intel / AMD · x86_64',
    extension: '.tar.gz',
  },
]
const tagPattern = /^rust-v(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/

function repositoryUrl(value, path) {
  const url = new URL(value)
  if (
    url.origin !== 'https://github.com' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !url.pathname.startsWith('/' + repository + '/' + path)
  ) {
    throw new Error('Release and asset URLs must point to Made on GitHub')
  }
  return url.href
}

export async function fetchReleases({
  token = process.env.RELEASES_GITHUB_TOKEN,
  fetcher = fetch,
} = {}) {
  const releases = []
  for (let page = 1; ; page++) {
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'simtropolis-website',
    }
    if (token) headers.Authorization = 'Bearer ' + token
    let response
    try {
      response = await fetcher(
        'https://api.github.com/repos/' + repository + '/releases?per_page=100&page=' + page,
        { headers, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) },
      )
    } catch {
      throw new Error('GitHub release request failed; previous deployment must be retained')
    }
    if (!response.ok)
      throw new Error('GitHub release request failed (HTTP ' + response.status + ')')
    const batch = await response.json()
    if (!Array.isArray(batch)) throw new Error('GitHub did not return a release list')
    releases.push(...batch)
    if (batch.length < 100) return releases
  }
}

export function normalizeReleases(releases) {
  if (!Array.isArray(releases)) throw new Error('Expected a release list')
  return releases
    .flatMap((release) => {
      const match = tagPattern.exec(release.tag_name)
      if (release.draft || !match) return []
      const date = new Date(release.published_at)
      if (!release.published_at || Number.isNaN(date.valueOf()))
        throw new Error('Invalid release publication date')
      if (!Array.isArray(release.assets)) throw new Error('Invalid release assets')
      return [
        {
          tag: release.tag_name,
          version: release.tag_name.slice(6),
          versionParts: match.slice(1, 4).map(Number),
          prerelease: Boolean(release.prerelease || match[4]),
          publishedAt: date.toISOString(),
          date: new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(date),
          url: repositoryUrl(release.html_url, 'releases/tag/'),
          body:
            typeof release.body === 'string' && release.body.trim()
              ? release.body
              : 'No release notes were provided for this version.',
          assets: release.assets
            .filter((asset) => asset.state === 'uploaded')
            .map((asset) => {
              if (
                typeof asset.name !== 'string' ||
                !asset.name ||
                !Number.isFinite(asset.size) ||
                asset.size < 0
              ) {
                throw new Error('Invalid release asset metadata')
              }
              return {
                name: asset.name,
                url: repositoryUrl(asset.browser_download_url, 'releases/download/'),
                size: asset.size,
                target:
                  platforms.find((platform) =>
                    asset.name.endsWith('-' + platform.target + platform.extension),
                  )?.target ?? null,
              }
            }),
        },
      ]
    })
    .sort((a, b) => {
      for (let index = 0; index < 3; index++) {
        const difference = b.versionParts[index] - a.versionParts[index]
        if (difference) return difference
      }
      return (
        Number(a.prerelease) - Number(b.prerelease) || b.publishedAt.localeCompare(a.publishedAt)
      )
    })
}

export function latestStable(releases) {
  return releases.find((release) => !release.prerelease)
}

export async function generateReleases({
  fetcher = fetch,
  token = process.env.RELEASES_GITHUB_TOKEN,
  output = resolve('.generated/releases.json'),
} = {}) {
  const releases = normalizeReleases(await fetchReleases({ fetcher, token }))
  const data = { repository, releases, platforms }
  await mkdir(dirname(output), { recursive: true })
  const temporary = output + '.' + randomUUID() + '.tmp'
  try {
    // Only this public allowlist is persisted; tokens and API headers never leave the build process.
    await writeFile(temporary, JSON.stringify(data, null, 2) + '\n')
    await rename(temporary, output)
  } finally {
    await rm(temporary, { force: true })
  }
  console.log('Generated ' + releases.length + ' Copper releases for /releases')
  return data
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await generateReleases()
}
