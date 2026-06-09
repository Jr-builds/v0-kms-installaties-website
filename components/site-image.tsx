import Image from 'next/image'
import { cn } from '@/lib/utils'

const SIZE_PRESETS = {
  hero: '(max-width: 1024px) 100vw, 50vw',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  square: '(max-width: 640px) 80vw, 320px',
} as const

interface SiteImageProps {
  src: string
  alt: string
  aspectRatio?: string
  className?: string
  priority?: boolean
  sizes?: string
  sizePreset?: keyof typeof SIZE_PRESETS
}

export default function SiteImage({
  src,
  alt,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizes,
  sizePreset = 'card',
}: SiteImageProps) {
  return (
    <div className={cn('relative overflow-hidden', aspectRatio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes={sizes ?? SIZE_PRESETS[sizePreset]}
      />
    </div>
  )
}
