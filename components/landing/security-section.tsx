'use client'

import { useReducedMotion } from './use-reduced-motion'

import { Artwork } from './artwork'

import { useEffect, useState, useRef } from 'react'
import { Layers, Network, Eye, Compass } from 'lucide-react'

const creativeFeatures = [
  {
    icon: Layers,
    title: 'Artboard controls',
    description: 'Change position, dimensions, background and clipping for a linked PNG.',
    image: '/images/isolated.jpg',
  },
  {
    icon: Eye,
    title: 'Preview and diagnostics',
    description: 'Inspect evaluated pixels and field errors before applying an edit.',
    image: '/images/encrypted.jpg',
  },
  {
    icon: Network,
    title: 'Image operations',
    description: 'Invert an image, make it opaque, or mix inputs with an opacity parameter.',
    image: '/images/audit.jpg',
  },
  {
    icon: Compass,
    title: 'Editable persistence',
    description: 'Reopen a saved .sim composition; export a separate PNG output.',
    image: '/images/permissions.jpg',
  },
]

const capabilityStates = ['Development', 'Linked PNG', 'Preview', '.sim / PNG']

export function SecuritySection() {
  const reducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % creativeFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [reducedMotion])

  return (
    <section id="tools" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background accent removed */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="w-12 h-px bg-foreground/20" />
            Native image tools
          </span>

          {/* Title — full width */}
          <h2
            className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Edit the
            <br />
            <span className="text-muted-foreground">image.</span>
          </h2>

          {/* Description — below title */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              The current image path is focused on linked PNGs and artboard edits. Saving needs a
              linked input and accepted changes. Broader drawing, layer and animation controls
              remain planned.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large visual card */}
          <div
            className={`lg:col-span-7 relative p-8 lg:p-12 border border-foreground/10 min-h-[400px] overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Dynamic feature image with cross-fade — desktop only */}
            <div className="absolute inset-0 pointer-events-none items-center justify-end hidden lg:flex">
              {creativeFeatures.map((feature, index) => (
                <Artwork
                  key={feature.image}
                  src={feature.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute h-3/4 w-3/4 object-contain object-right transition-opacity duration-500"
                  style={{ opacity: activeFeature === index ? 0.85 : 0 }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">Current image path</span>
              <div className="mt-8">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-display">Compose</span>
                <span className="block text-muted-foreground mt-2">
                  Linked input, editable composition, separate output
                </span>
              </div>
            </div>

            {/* Capability labels */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {capabilityStates.map((state, index) => (
                <span
                  key={state}
                  className={`px-3 py-1 border border-foreground/10 text-xs font-mono text-muted-foreground transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  {state}
                </span>
              ))}
            </div>
          </div>

          {/* Feature cards stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {creativeFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border transition-all duration-500 cursor-default ${
                  activeFeature === index
                    ? 'border-foreground/30 bg-foreground/[0.04]'
                    : 'border-foreground/10'
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setActiveFeature(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveFeature(index)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={activeFeature === index}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                      activeFeature === index
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-foreground/20'
                    }`}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
