import Link from 'next/link'
import { repository, documentation, license } from '@/lib/content'

export function SiteFooter() {
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
          <p>Focused tools for people who build.</p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/copper">Copper</Link>
            <a href="/releases">Releases</a>
            <Link href="/#platform">The platform</Link>
          </div>
          <div>
            <span className="eyebrow">Build with us</span>
            <a href={documentation}>Documentation</a>
            <a href={repository}>Source on GitHub</a>
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
