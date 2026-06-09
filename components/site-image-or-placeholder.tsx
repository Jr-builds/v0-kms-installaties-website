import ImagePlaceholder from './image-placeholder'
import SiteImage from './site-image'
import { getImage, type SiteImageKey } from '@/lib/images'

interface SiteImageOrPlaceholderProps {
  imageKey?: SiteImageKey
  placeholderLabel: string
  aspectRatio?: string
  className?: string
  priority?: boolean
  sizePreset?: 'hero' | 'card' | 'square'
}

export default function SiteImageOrPlaceholder({
  imageKey,
  placeholderLabel,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizePreset = 'card',
}: SiteImageOrPlaceholderProps) {
  if (imageKey) {
    const { src, alt } = getImage(imageKey)
    return (
      <SiteImage
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        className={className}
        priority={priority}
        sizePreset={sizePreset}
      />
    )
  }

  return (
    <ImagePlaceholder
      label={placeholderLabel}
      aspectRatio={aspectRatio}
      className={className}
    />
  )
}
