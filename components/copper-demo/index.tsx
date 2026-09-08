'use client'

import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Braces } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './demo.css'

const Workspace = lazy(() => import('./workspace'))

function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="demo-preview">
      <div className="demo-preview-title">
        <Braces size={18} aria-hidden="true" /> Copper <span>port-parser / src/lib.rs</span>
      </div>
      <div className="demo-preview-body">
        <p className="eyebrow">A small Rust workspace</p>
        <pre>
          {'pub fn parse_port(input: &str) -> u16 {\n    input.trim().parse::<u16>().unwrap()\n}'}
        </pre>
        <p>
          Turn a panic into a useful error. Explore the files, review a sample patch, and make an
          edit of your own.
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
          The interactive demo couldn’t load. You can still explore the full editor.
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
export function CopperDemo() {
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
            <span className="rule" /> A little room to experiment
          </p>
          <h2 id="demo-title">
            Small change. <em>Better Rust.</em>
          </h2>
        </div>
        <a href="/releases" className="text-link">
          Download Copper <ArrowUpRight size={16} />
        </a>
      </div>
      <p className="demo-description">
        Follow a guided conversation. Review a Rust fix, inspect the patch, and make it your own.
      </p>
      <div ref={anchor} className="demo-reserved">
        <DemoBoundary>
          {ready ? (
            <Suspense
              fallback={
                <Preview>
                  <p role="status">Loading the guided workspace…</p>
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
                <p>Enable JavaScript to edit files and explore the guided task.</p>
              </noscript>
            </Preview>
          )}
        </DemoBoundary>
      </div>
      <p className="demo-disclaimer">
        Guided browser demo · Editable code stays in memory. Agent activity and test output are
        recorded fixtures, not a live agent or compiler.{' '}
        <a href="https://github.com/simtropolis/made">Explore the native Copper editor ↗</a>
      </p>
    </section>
  )
}
