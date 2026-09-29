'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const made = 'https://github.com/simtropolis/made'
const footerLinks = {
  Sim: [
    { name: 'Workspace', href: '#features' },
    { name: 'Workflow', href: '#how-it-works' },
    { name: 'Model inputs', href: '#integrations' },
    { name: 'Current status', href: '#status' },
  ],
  Foundation: [
    { name: 'Made code and status', href: '#infra' },
    { name: 'Made repository', href: made },
    { name: 'Made README', href: `${made}/blob/main/README.md` },
  ],
  Creators: [
    { name: 'Application areas', href: '#developers' },
    { name: 'Creative tools', href: '#security' },
    { name: 'Current status', href: '#status' },
  ],
  Attribution: [
    { name: 'Zed', href: 'https://zed.dev' },
    { name: 'GPL-3.0-or-later', href: `${made}/blob/main/LICENSE-GPL` },
    { name: 'Apache-2.0 components', href: `${made}/blob/main/LICENSE-APACHE` },
  ],
}

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-6"
                aria-label="Simtropolis home"
              >
                <span className="text-2xl font-display text-white">simtropolis</span>
                <span className="text-xs text-white/40 font-mono">/ Sim</span>
              </Link>
              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Sim is a game-development workspace for world models, procedural creative tools,
                code, and review.
              </p>
              <a
                href={made}
                className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
              >
                Made source (access may be required)
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Simtropolis, Inc.</p>
          <p>
            Made is derived from Zed. Source is primarily GPL-3.0-or-later, with Apache-2.0
            components where marked.
          </p>
        </div>
      </div>
    </footer>
  )
}
