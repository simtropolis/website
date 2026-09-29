'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { documentation, repository } from '@/lib/content'
import { products } from '@/lib/product-catalog'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!productsOpen) return
    function onPointerDown(event: PointerEvent) {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProductsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [productsOpen])

  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/" aria-label="Simtropolis home">
        simtropolis
        <span className="brand-cross" aria-hidden="true">
          ✳
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="products-control" ref={productsRef}>
          <button
            type="button"
            className="products-trigger"
            ref={triggerRef}
            aria-expanded={productsOpen}
            aria-controls="desktop-products"
            onClick={() => setProductsOpen((value) => !value)}
          >
            Products <ChevronDown size={15} aria-hidden="true" />
          </button>
          {productsOpen && (
            <div id="desktop-products" className="products-menu" aria-label="Products">
              {products.map((product) =>
                'href' in product ? (
                  <Link
                    key={product.name}
                    href={product.href}
                    onClick={() => setProductsOpen(false)}
                  >
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.area}</small>
                    </span>
                    <span className="product-menu-status">{product.status}</span>
                  </Link>
                ) : (
                  <div className="product-menu-row" key={product.name}>
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.area}</small>
                    </span>
                    <span className="product-menu-status">{product.status}</span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
        <Link href="/#platform">Made</Link>
        <Link href="/sim#status">Current status</Link>
        <a href={documentation}>
          Documentation <ArrowUpRight size={13} />
        </a>
      </nav>
      <div className="header-actions">
        <a className="source-link" href={repository}>
          Source <ArrowUpRight size={14} />
        </a>
        <Button asChild className="pill header-cta">
          <Link href="/releases">
            Get Copper <ArrowUpRight size={16} />
          </Link>
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
            <SheetDescription>Made is the shared development foundation.</SheetDescription>
            <nav aria-label="Mobile navigation">
              <details className="mobile-products">
                <summary>
                  Products <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div>
                  {products.map((product) =>
                    'href' in product ? (
                      <Link
                        key={product.name}
                        href={product.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>
                          <strong>{product.name}</strong>
                          <small>{product.area}</small>
                        </span>
                        <span className="product-menu-status">{product.status}</span>
                      </Link>
                    ) : (
                      <div className="mobile-product-row" key={product.name}>
                        <span>
                          <strong>{product.name}</strong>
                          <small>{product.area}</small>
                        </span>
                        <span className="product-menu-status">{product.status}</span>
                      </div>
                    ),
                  )}
                </div>
              </details>
              <Link href="/#platform" onClick={() => setMobileOpen(false)}>
                Made
              </Link>
              <Link href="/sim#status" onClick={() => setMobileOpen(false)}>
                Current status
              </Link>
              <a href={documentation} onClick={() => setMobileOpen(false)}>
                Documentation
              </a>
              <a href={repository} onClick={() => setMobileOpen(false)}>
                Source
              </a>
              <Link href="/releases" onClick={() => setMobileOpen(false)}>
                Copper releases
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
