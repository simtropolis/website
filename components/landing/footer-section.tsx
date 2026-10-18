'use client'

import { Artwork } from './artwork'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  Sim: [
    { name: 'Current features', href: '#features' },
    { name: 'Image workflow', href: '#how-it-works' },
    { name: 'Planned work', href: '#planned' },
    { name: 'Current status', href: '#status' },
  ],
  Nodes: [
    { name: 'Graph editing', href: '#nodes' },
    { name: 'Execution', href: '#execution' },
    { name: 'Output documents', href: '#documents' },
  ],
  Development: [
    { name: 'Current tools', href: '#tools' },
    { name: 'Working boundaries', href: '#limits' },
    { name: 'Planned work', href: '#planned' },
  ],
  Notices: [{ name: 'License and attribution', href: '/notices.txt' }],
}

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <Artwork
          src="/home-media/footer.png"
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
                aria-label="simtropolis home"
              >
                <span className="text-2xl font-display text-white">simtropolis</span>
              </Link>
              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                A visual development workspace for native image editing, artboards and node
                workflows. In development.
              </p>
              <a
                href="#status"
                className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
              >
                Current status <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
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
          <p>Native tools in development. Public release pending.</p>
        </div>
      </div>
    </footer>
  )
}
