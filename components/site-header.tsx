'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { repository } from '@/lib/content'

const links = [
  { href: '/#copper', label: 'Copper' },
  { href: '/#platform', label: 'The platform' },
  { href: '/#get-started', label: 'Get started' },
  { href: '/releases', label: 'Releases' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/" aria-label="Simtropolis home">
        simtropolis
        <span className="brand-cross" aria-hidden="true">
          ✳
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="source-link" href={repository}>
          GitHub <ArrowUpRight size={14} />
        </a>
        <Button asChild className="pill header-cta">
          <a href="/releases">
            Get Copper <ArrowUpRight size={16} />
          </a>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-toggle"
              aria-label="Open navigation"
            >
              <Menu size={23} />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetTitle className="wordmark">simtropolis✳</SheetTitle>
            <SheetDescription>Focused tools for people who build.</SheetDescription>
            <nav aria-label="Mobile navigation">
              {[...links, { href: repository, label: 'GitHub' }].map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
