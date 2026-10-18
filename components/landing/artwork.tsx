import Image from 'next/image'
import type { CSSProperties } from 'react'

const dimensions: Record<string, [number, number]> = {
  '/images/whale.png': [1951, 1257],
  '/images/shield.png': [1118, 1645],
  '/images/bridge.png': [2496, 1664],
  '/images/permissions.jpg': [840, 840],
  '/images/audit.jpg': [840, 840],
  '/images/encrypted.jpg': [840, 840],
  '/images/isolated.jpg': [840, 840],
  '/home-media/developers.png': [2720, 1536],
  '/home-media/features.png': [2720, 1536],
  '/home-media/how-it-works.png': [1554, 1664],
  '/home-media/footer.png': [2720, 811],
  '/home-media/metrics.png': [2492, 824],
  '/home-media/infrastructure.png': [1369, 1369],
  '/home-media/integrations.png': [2494, 1199],
}

export function Artwork({
  src,
  className,
  style,
}: {
  src: string
  alt?: string
  className?: string
  style?: CSSProperties
  'aria-hidden'?: string | boolean
}) {
  const [width, height] = dimensions[src] ?? [1600, 1000]
  return (
    <Image
      src={src}
      unoptimized
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      loading="lazy"
      sizes="(max-width: 1023px) 100vw, 70vw"
      className={className}
      style={style}
    />
  )
}
