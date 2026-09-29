'use client'

import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Braces } from 'lucide-react'
import { Button } from '@/components/archive/ui/button'
import './demo.css'

const Workspace = lazy(() => import('./workspace'))

function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="demo-preview">
      <div className="demo-preview-title">
        <Braces size={18} aria-hidden="true" /> Copper <span>port-parser / src/lib.rs</span>
      </div>
      <div className="demo-preview-body">
        <p className="eyebrow">Local Rust example</p>
        <pre>
          {'pub fn parse_port(input: &str) -> u16 {\n    input.trim().parse::<u16>().unwrap()\n}'}
        </pre>
        <p>
          Replace a panic with a Result, inspect the proposed patch, and edit the files in memory.
        </p>
        {children}
      </div>
    </div>
  )
}

class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <Preview>
        <p role="status">
          The browser demo couldn&apos;t load. Copper releases are still available below.
        </p>
        <a className="text-link" href="/releases">
          Download Copper <ArrowUpRight size={16} />
        </a>
      </Preview>
    ) : (
      this.props.children
    )
  }
}

export function CopperDemo({ sectionLabel = 'Guided local demo' }: { sectionLabel?: string }) {
  const [ready, setReady] = useState(false)
  const anchor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!anchor.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '160px' },
    )
    observer.observe(anchor.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="demo" className="demo-section wrap" aria-labelledby="demo-title">
      <div className="demo-intro">
        <div>
          <p className="eyebrow">
            <span className="rule" /> {sectionLabel}
          </p>
          <h2 id="demo-title">Edit the fixture and inspect the result.</h2>
        </div>
        <a href="/releases" className="text-link">
          Download Copper <ArrowUpRight size={16} />
        </a>
      </div>
      <p className="demo-description">
        Open the Rust files, keep edits between tabs, inspect diagnostics and the proposed diff,
        then apply or reject the recorded sample change.
      </p>
      <div ref={anchor} className="demo-reserved">
        <DemoBoundary>
          {ready ? (
            <Suspense
              fallback={
                <Preview>
                  <p role="status">Loading the guided task…</p>
                </Preview>
              }
            >
              <Workspace />
            </Suspense>
          ) : (
            <Preview>
              <Button className="pill" onClick={() => setReady(true)}>
                Open guided demo <ArrowUpRight size={16} />
              </Button>
              <noscript>
                <p>Enable JavaScript to edit files and use the demo controls.</p>
              </noscript>
            </Preview>
          )}
        </DemoBoundary>
      </div>
      <p className="demo-disclaimer">
        Guided local interface. Edits stay in browser memory. Diagnostics and test output are
        recorded fixtures; no live agent, compiler, backend, or multiplayer session is connected.{' '}
        <a href="https://github.com/simtropolis/made">Source ↗</a>
      </p>
    </section>
  )
}
