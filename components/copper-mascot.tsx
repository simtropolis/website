'use client'

import Image from 'next/image'
import { useState } from 'react'

export function CopperMascot() {
  const [details, setDetails] = useState(false)

  return (
    <figure className="cp-mascot">
      <span className="cp-mascot-coordinate mono" aria-hidden="true">
        Copper mascot
      </span>
      <span className="cp-mascot-orbit" aria-hidden="true" />
      <button
        className="cp-mascot-button"
        type="button"
        aria-pressed={details}
        aria-label={details ? 'Hide mascot note' : 'Show mascot note'}
        onClick={() => setDetails((current) => !current)}
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
        <span>{details ? 'Artwork supplied by Simtropolis.' : 'The Copper Rust mascot.'}</span>
        <small aria-hidden="true">{details ? 'Hide note ↗' : 'Artwork note ↗'}</small>
      </figcaption>
      <p className="sr-only" role="status" aria-live="polite">
        {details ? 'Mascot artwork supplied by Simtropolis.' : ''}
      </p>
    </figure>
  )
}
