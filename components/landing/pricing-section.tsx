'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'

const states = [
  {
    name: 'Made core',
    description: 'The editor and review foundation.',
    status: 'Implemented',
    details: [
      'Zed-derived editor and project surfaces',
      'Terminal, source control, and agent workflows',
      'Code and change review in Made source',
    ],
    href: 'https://github.com/simtropolis/made/tree/dev',
    cta: 'See Made source',
    highlight: false,
  },
  {
    name: 'Optional modules',
    description: 'Features available in opt-in Made builds.',
    status: 'Opt-in',
    details: [
      'Native workflow graph editor and execution runtime',
      'Model catalog and image/video output previews',
      'Multiplayer workspace behind its own feature flag',
    ],
    href: '#infra',
    cta: 'See the foundation',
    highlight: false,
  },
  {
    name: 'Sim',
    description: 'The game-development workspace.',
    status: 'In development',
    details: [
      'Scenes, assets, model inputs, code, and review',
      'Procedural, nondestructive, animation, and VFX integration',
      'No Sim release target or download',
    ],
    href: '#features',
    cta: 'Explore Sim',
    highlight: true,
  },
]

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section id="status" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Product status
            </span>
            <h2
              className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Made today.
              <br />
              <span className="text-stroke">Sim ahead.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 relative p-0 h-96 lg:h-auto">
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src="/images/whale.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-0">
            {states.map((state, index) => (
              <div
                key={state.name}
                className={`relative bg-background border transition-all duration-700 ${state.highlight ? 'border-foreground lg:-mx-2 lg:z-10 lg:scale-105' : 'border-foreground/10 lg:first:-mr-2 lg:last:-ml-2'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {state.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest">
                      Product focus
                    </span>
                  </div>
                )}
                <div className="p-8 lg:p-10">
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display mt-2">{state.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{state.description}</p>
                  </div>
                  <div className="mb-8 text-4xl lg:text-5xl font-display">{state.status}</div>
                  <ul className="space-y-3 mb-10">
                    {state.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#eca8d6] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={state.href}
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${state.highlight ? 'bg-foreground text-background hover:bg-foreground/90' : 'border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5'}`}
                  >
                    {state.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-20 flex flex-wrap gap-6 pt-12 border-t border-foreground/10 text-sm text-muted-foreground transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0'}`}
        >
          <span>Editor and review in Made</span>
          <span>Visual graphs and multiplayer opt-in</span>
          <span>Sim integration in development</span>
        </div>
      </div>
      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}
