import Link from 'next/link'
import { repository, documentation, license } from '@/lib/content'

export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="site-footer footer-minimal wrap">
        <div className="footer-minimal-main">
          <Link className="wordmark" href="/">
            simtropolis
            <span className="brand-cross" aria-hidden="true">
              ✳
            </span>
          </Link>
          <nav aria-label="Footer navigation">
            <a href="/releases">Releases</a>
            <a href={documentation}>Documentation</a>
            <a href={repository}>Source</a>
            <a href={`${repository}/blob/main/CONTRIBUTING.md`}>Contribute</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Simtropolis, Inc.</p>
          <p>
            Made is derived from <a href="https://zed.dev">Zed</a>.{' '}
            <a href={license}>GPL-3.0-or-later</a> ·{' '}
            <a href={`${repository}/blob/main/LICENSE-APACHE`}>Apache-2.0 components</a>
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <div>
          <Link className="wordmark" href="/">
            simtropolis
            <span className="brand-cross" aria-hidden="true">
              ✳
            </span>
          </Link>
          <p>Made and Copper are developed by Simtropolis.</p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/copper">Copper</Link>
            <a href="/releases">Releases</a>
            <Link href="/#products">Products</Link>
          </div>
          <div>
            <span className="eyebrow">Project</span>
            <a href={documentation}>Documentation</a>
            <a href={repository}>Source</a>
            <a href={`${repository}/blob/main/CONTRIBUTING.md`}>Contribute</a>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Simtropolis, Inc.</p>
        <p>
          Made is derived from <a href="https://zed.dev">Zed</a>.{' '}
          <a href={license}>GPL-3.0-or-later</a> ·{' '}
          <a href={`${repository}/blob/main/LICENSE-APACHE`}>Apache-2.0 components</a>
        </p>
      </div>
    </footer>
  )
}
