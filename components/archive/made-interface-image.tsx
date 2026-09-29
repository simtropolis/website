import Image from 'next/image'

export function MadeInterfaceImage() {
  return (
    <figure className="made-interface-image">
      <div className="made-interface-frame">
        <div className="made-interface-chrome" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>Copper / Review changes</p>
          <small>Native capture</small>
        </div>
        <Image
          src="/copper-native-workspace.webp"
          alt="Copper desktop editor showing a Rust change with line numbers and a review diff"
          width={1600}
          height={1000}
          priority
          sizes="(max-width: 800px) 92vw, (max-width: 1280px) 86vw, 1120px"
        />
      </div>
      <figcaption>
        <span>Native Copper editor capture</span>
        <span>Recorded visual-test fixture</span>
      </figcaption>
    </figure>
  )
}
