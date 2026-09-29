import Link from 'next/link'
import { documentation, license, repository } from '@/lib/content'

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
          <p>Focused tools from a shared Made foundation.</p>
        </div>
        <nav aria-label="Footer navigation">
          <div>
            <span className="eyebrow">Products</span>
            <Link href="/copper">Copper · Available</Link>
            <span>Groovy · Planned</span>
            <Link href="/sim">Sim · Planned</Link>
            <Link href="/releases">Copper releases</Link>
          </div>
          <div>
            <span className="eyebrow">Made</span>
            <Link href="/#platform">The foundation</Link>
            <a href={documentation}>Documentation</a>
            <a href={repository}>Source</a>
            <a href={`${repository}/blob/main/CONTRIBUTING.md`}>Contribution</a>
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
