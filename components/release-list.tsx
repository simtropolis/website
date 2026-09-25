import type { Platform, Release, ReleaseAsset } from '@/lib/releases'
import { ReleaseNotes } from './release-notes'
import { repository, sourceGuide } from '@/lib/content'

function Download({
  asset,
  label,
  version,
}: {
  asset: ReleaseAsset
  label: string
  version: string
}) {
  return (
    <div>
      <a className="download-link" href={asset.url} aria-label={label + ' — Copper ' + version}>
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
      <span className="file-meta">
        {asset.name} ·{' '}
        {asset.size ? (asset.size / 1024 / 1024).toFixed(1) + ' MiB' : 'Size not provided'}
      </span>
    </div>
  )
}

function Downloads({
  release,
  platforms,
  featured = false,
}: {
  release: Release
  platforms: Platform[]
  featured?: boolean
}) {
  return (
    <div className={featured ? 'downloads' : 'history-downloads'}>
      {platforms.map((platform) => {
        const assets = release.assets.filter((asset) => asset.target === platform.target)
        if (!featured && assets.length === 0) return null
        return (
          <div className={featured ? 'download-card' : 'history-download'} key={platform.target}>
            {featured && (
              <>
                <p className="eyebrow">{platform.name}</p>
                <p className="architecture">{platform.architecture}</p>
              </>
            )}
            {assets.map((asset) => (
              <Download
                key={asset.url}
                asset={asset}
                version={release.version}
                label={
                  featured
                    ? 'Download ' + platform.name
                    : platform.name + ' · ' + platform.architecture
                }
              />
            ))}
            {!assets.length && (
              <p className="release-empty">No download attached for this platform.</p>
            )}
          </div>
        )
      })}
      {release.assets.some((asset) => !asset.target) && (
        <div className="extra-downloads">
          <p className="eyebrow">Additional assets</p>
          {release.assets
            .filter((asset) => !asset.target)
            .map((asset) => (
              <a key={asset.url} href={asset.url}>
                {asset.name}
              </a>
            ))}
        </div>
      )}
      {!featured && !release.assets.length && (
        <p className="release-empty">No downloads attached to this release yet.</p>
      )}
    </div>
  )
}

export function ReleaseList({
  releases,
  platforms,
}: {
  releases: Release[]
  platforms: Platform[]
}) {
  const stable = releases.find((release) => !release.prerelease)
  return (
    <>
      <section
        id="latest"
        className="release-latest wrap"
        aria-label="Latest stable Copper release"
      >
        {stable ? (
          <>
            <div className="latest-heading">
              <div>
                <span className="release-badge stable">Latest stable</span>
                <h2>Copper {stable.version}</h2>
                <p className="release-meta">
                  <time dateTime={stable.publishedAt}>{stable.date}</time>
                  <span>{stable.tag}</span>
                </p>
              </div>
              <a className="text-link" href={stable.url}>
                View on GitHub ↗
              </a>
            </div>
            <Downloads release={stable} platforms={platforms} featured />
            <details className="latest-notes">
              <summary>
                What’s changed in {stable.version}
                <span className="expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <ReleaseNotes text={stable.body} />
            </details>
          </>
        ) : (
          <div className="release-empty">
            <h2>No stable Copper release yet.</h2>
            <p>Published downloads will appear here when a stable release is available.</p>
            <a className="text-link" href={sourceGuide}>
              Build from source ↗
            </a>
          </div>
        )}
        <p className="install-note">
          Download links point to the exact assets stored in GitHub Releases. GitHub may require
          repository access while Made is private; this site never passes its build credential to a
          browser. Copper is under active development. Signing varies by build; macOS may use ad-hoc
          signing and Windows builds may be unsigned. Review the{' '}
          <a href={repository + '/blob/main/docs/src/development/product-flavors.md#signing'}>
            signing documentation
          </a>
          . Automatic updates require a configured update service.
        </p>
      </section>
      <section id="history" className="release-history wrap" aria-labelledby="history-title">
        <div className="release-section-heading">
          <p className="eyebrow">The changelog</p>
          <h2 id="history-title">
            Every step <em>forward.</em>
          </h2>
          <p>Published versions, changes, and downloads. Prereleases are labelled separately.</p>
        </div>
        {releases.length ? (
          releases.map((release) => (
            <article className="release-entry" id={release.tag} key={release.tag}>
              <details>
                <summary>
                  <span>
                    <span className="history-name">Copper {release.version}</span>
                    <time dateTime={release.publishedAt}>{release.date}</time>
                  </span>
                  <span className="history-summary-end">
                    <span className={'release-badge' + (release.prerelease ? '' : ' stable')}>
                      {release.prerelease ? 'Prerelease' : 'Stable'}
                    </span>
                    <span className="expand" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <div className="history-body">
                  <Downloads release={release} platforms={platforms} />
                  <ReleaseNotes text={release.body} />
                  <a className="text-link" href={release.url}>
                    Full release on GitHub ↗
                  </a>
                </div>
              </details>
            </article>
          ))
        ) : (
          <p className="release-empty">
            No published Copper releases yet. Check back after the first release.
          </p>
        )}
      </section>
    </>
  )
}
