'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { repository } from '@/lib/content'
import { products } from '@/lib/product-catalog'

const primaryLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#demo', label: 'Demo' },
  { href: '/releases', label: 'Releases' },
] as const

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRootRef = useRef<HTMLDivElement>(null)
  const productsTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!productsOpen) return
    const closeForOutsidePointer = (event: PointerEvent) => {
      if (!productsRootRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    document.addEventListener('pointerdown', closeForOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeForOutsidePointer)
  }, [productsOpen])

  const getMenuItems = () =>
    Array.from(
      productsRootRef.current?.querySelectorAll<HTMLElement>('[data-product-menuitem]') ?? [],
    )

  const openMenuAndFocus = (position: 'first' | 'last') => {
    setProductsOpen(true)
    requestAnimationFrame(() => {
      const items = getMenuItems()
      items[position === 'first' ? 0 : items.length - 1]?.focus()
    })
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && productsOpen) {
      event.preventDefault()
      setProductsOpen(false)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openMenuAndFocus(event.key === 'ArrowDown' ? 'first' : 'last')
    }
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = getMenuItems()
    const currentIndex = items.indexOf(document.activeElement as HTMLElement)
    if (event.key === 'Escape') {
      event.preventDefault()
      setProductsOpen(false)
      productsTriggerRef.current?.focus()
      return
    }
    if (event.key === 'Tab') {
      setProductsOpen(false)
      return
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      items[event.key === 'Home' ? 0 : items.length - 1]?.focus()
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const movement = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (Math.max(currentIndex, 0) + movement + items.length) % items.length
      items[nextIndex]?.focus()
    }
  }

  return (
    <header className="site-header-shell">
      <div className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Simtropolis home">
          simtropolis
          <span className="brand-cross" aria-hidden="true">
            ✳
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href={primaryLinks[0].href}>{primaryLinks[0].label}</a>
          <div className="products-menu" ref={productsRootRef}>
            <button
              ref={productsTriggerRef}
              className="products-menu-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded={productsOpen}
              aria-controls="products-menu-panel"
              onClick={() => setProductsOpen((current) => !current)}
              onKeyDown={handleTriggerKeyDown}
            >
              Products <ChevronDown size={14} aria-hidden="true" />
            </button>
            {productsOpen ? (
              <div
                id="products-menu-panel"
                className="products-menu-panel"
                role="menu"
                aria-label="Products"
                onKeyDown={handleMenuKeyDown}
              >
                <div className="products-menu-heading">
                  <span>Products built on Made</span>
                  <span className="mono">03 entries</span>
                </div>
                {products.map((product) => (
                  <div className="products-menu-row" role="none" key={product.id}>
                    {product.productHref ? (
                      <a
                        href={product.productHref}
                        role="menuitem"
                        data-product-menuitem
                        onClick={() => setProductsOpen(false)}
                      >
                        <span>
                          <b>{product.name}</b>
                          <small>{product.area}</small>
                        </span>
                        <span className="product-menu-meta">
                          <em className="is-available">{product.status}</em>
                          <ArrowRight size={16} aria-hidden="true" />
                        </span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        role="menuitem"
                        aria-disabled="true"
                        data-product-menuitem
                        onClick={(event) => event.preventDefault()}
                      >
                        <span>
                          <b>{product.name}</b>
                          <small>{product.area}</small>
                        </span>
                        <em>{product.status}</em>
                      </button>
                    )}
                    {product.releasesHref ? (
                      <a
                        className="products-menu-download"
                        href={product.releasesHref}
                        role="menuitem"
                        data-product-menuitem
                        onClick={() => setProductsOpen(false)}
                      >
                        Download <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {primaryLinks.slice(1).map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="source-link" href={repository}>
            Source <ArrowUpRight size={14} />
          </a>
          <Button asChild className="pill header-cta">
            <a href="/releases">Download Copper</a>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
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
              <SheetDescription>Focused development tools built on Made.</SheetDescription>
              <nav aria-label="Mobile navigation">
                <Link href="/#features" onClick={() => setMobileOpen(false)}>
                  Features <ArrowUpRight size={20} />
                </Link>
                <button
                  className="mobile-products-trigger"
                  type="button"
                  aria-expanded={mobileProductsOpen}
                  aria-controls="mobile-products"
                  onClick={() => setMobileProductsOpen((current) => !current)}
                >
                  Products <ChevronDown size={20} aria-hidden="true" />
                </button>
                {mobileProductsOpen ? (
                  <div id="mobile-products" className="mobile-products-list">
                    {products.map((product) =>
                      product.productHref ? (
                        <div className="mobile-product-row" key={product.id}>
                          <a href={product.productHref} onClick={() => setMobileOpen(false)}>
                            <span>
                              <b>{product.name}</b>
                              <small>{product.area}</small>
                            </span>
                            <em>{product.status}</em>
                          </a>
                          <a
                            className="mobile-product-download"
                            href={product.releasesHref}
                            onClick={() => setMobileOpen(false)}
                          >
                            Download Copper
                          </a>
                        </div>
                      ) : (
                        <div className="mobile-product-row is-planned" key={product.id}>
                          <span>
                            <b>{product.name}</b>
                            <small>{product.area}</small>
                          </span>
                          <em>{product.status}</em>
                        </div>
                      ),
                    )}
                  </div>
                ) : null}
                <Link href="/#demo" onClick={() => setMobileOpen(false)}>
                  Demo <ArrowUpRight size={20} />
                </Link>
                <a href="/releases" onClick={() => setMobileOpen(false)}>
                  Releases <ArrowUpRight size={20} />
                </a>
                <a href={repository} onClick={() => setMobileOpen(false)}>
                  Source <ArrowUpRight size={20} />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
