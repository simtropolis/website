'use client'

import { useReducedMotion } from './use-reduced-motion'

import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Planned layer work will add selection and layer operations to the native image interface.',
    author: 'Sim',
    role: 'Planned authoring',
    stage: 'Layers',
    metric: { value: 'Edit', label: 'Native selection and layer operations' },
  },
  {
    quote:
      'Planned drawing work will add pen and path-editing tools to the native image interface.',
    author: 'Sim',
    role: 'Planned authoring',
    stage: 'Drawing',
    metric: { value: 'Draw', label: 'Pen and path-editing tools' },
  },
  {
    quote:
      'Planned animation work will add playback, frame and time controls. These controls remain part of the roadmap.',
    author: 'Sim',
    role: 'Planned authoring',
    stage: 'Animation',
    metric: { value: 'Time', label: 'Playback, frame and time controls' },
  },
  {
    quote:
      'Planned export work will add JPEG, WebP and SVG output. The current image path exports PNG.',
    author: 'Sim',
    role: 'Planned output',
    stage: 'Formats',
    metric: { value: 'Files', label: 'JPEG, WebP and SVG output' },
  },
]

export function TestimonialsSection() {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
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

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [reducedMotion])

  const goTo = (index: number) => {
    setActiveIndex(index)
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section
      id="planned"
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden"
    >
      {/* ASCII background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 font-mono text-[10px] text-background/[0.02] leading-tight overflow-hidden whitespace-pre select-none"
      >
        {Array.from({ length: 60 }, (_, i) =>
          Array.from({ length: 100 }, (_, j) => ((i * 17 + j * 31) % 11 < 3 ? '"' : ' ')).join(''),
        ).join('\n')}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/40 mb-4">
              <span className="w-12 h-px bg-background/20" />
              Planned work
            </span>
            <h2
              className={`text-4xl lg:text-5xl font-display transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              More authoring tools
              <span className="text-background/40"> will follow.</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous planned feature"
              className="p-4 border border-background/20 hover:bg-background/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next planned feature"
              className="p-4 border border-background/20 hover:bg-background/10 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Quote side */}
          <div className="lg:col-span-7 relative">
            {/* Original decorative punctuation; roadmap text is attributed to Sim. */}
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-8 text-[200px] font-display text-background/5 leading-none select-none"
            >
              &ldquo;
            </span>

            <div className="relative">
              <p
                key={activeIndex}
                className="text-3xl lg:text-4xl xl:text-5xl font-display leading-[1.2] tracking-tight animate-fadeSlideIn"
              >
                {activeTestimonial.quote}
              </p>

              {/* Author */}
              <div className="mt-12 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-background/10 flex items-center justify-center">
                  <span className="font-display text-xl">{activeTestimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-lg font-medium">{activeTestimonial.author}</p>
                  <p className="text-background/60">
                    {activeTestimonial.role}, {activeTestimonial.stage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards side */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {/* Active metric - Large */}
            <div
              key={`metric-${activeIndex}`}
              className="p-10 border border-background/20 bg-background/5 animate-fadeSlideIn"
            >
              <span className="text-7xl lg:text-8xl font-display block mb-4">
                {activeTestimonial.metric.value}
              </span>
              <span className="text-lg text-background/60">{activeTestimonial.metric.label}</span>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Show planned feature ${idx + 1}`}
                  className="roadmap-indicator flex-1 h-1 bg-background/20 overflow-hidden"
                  aria-pressed={idx === activeIndex}
                >
                  <div
                    className={`h-full bg-background transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-full'
                        : idx < activeIndex
                          ? 'w-full opacity-50'
                          : 'w-0'
                    }`}
                    style={idx === activeIndex ? { animation: 'progress 8s linear forwards' } : {}}
                  />
                </button>
              ))}
            </div>

            {/* Direction tabs */}
            <div className="mt-4 pt-6 border-t border-background/10">
              <span className="text-xs font-mono text-background/30 uppercase tracking-widest block mb-4">
                Planned features
              </span>
              <div className="flex flex-wrap gap-3">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.stage}
                    onClick={() => goTo(idx)}
                    aria-pressed={idx === activeIndex}
                    className={`px-4 py-2 text-sm border transition-all ${
                      idx === activeIndex
                        ? 'border-background/40 text-background'
                        : 'border-background/10 text-background/40 hover:border-background/30'
                    }`}
                  >
                    {['Layers', 'Draw', 'Time', 'Export'][idx]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
