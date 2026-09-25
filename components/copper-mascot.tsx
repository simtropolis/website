'use client'

import Image from 'next/image'
import { useState } from 'react'

export function CopperMascot() {
  const [greeting, setGreeting] = useState(false)

  return (
    <figure className="cp-mascot">
      <span className="cp-mascot-coordinate mono" aria-hidden="true">
        Rust, with character
      </span>
      <span className="cp-mascot-orbit" aria-hidden="true" />
      <button
        className="cp-mascot-button"
        type="button"
        aria-pressed={greeting}
        aria-label={greeting ? 'Hide Copper mascot greeting' : 'Say hello to the Copper mascot'}
        onClick={() => setGreeting((current) => !current)}
      >
        <Image
          src="/copper/rust-mascot.png"
          alt="A friendly orange Rust crab"
          width={460}
          height={307}
          priority
        />
      </button>
      <figcaption>
        <span>
          {greeting ? 'Hello. Let’s build something sturdy.' : 'A serious tool can still smile.'}
        </span>
        <small aria-hidden="true">Psst. Say hello ↗</small>
      </figcaption>
      <p className="sr-only" role="status" aria-live="polite">
        {greeting ? 'The Copper mascot says hello.' : ''}
      </p>
    </figure>
  )
}
