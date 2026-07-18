import EditableImage from '@/components/cms/editable-image'
import { resolveImage } from '@/lib/supabase/site-images'
import type { SiteImageKey } from '@/lib/images'

interface SiteImageOrPlaceholderProps {
  imageKey: SiteImageKey
  placeholderLabel?: string
  aspectRatio?: string
  className?: string
  priority?: boolean
  sizePreset?: 'hero' | 'card' | 'square' | 'modal'
}

export default async function SiteImageOrPlaceholder({
  imageKey,
  placeholderLabel,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizePreset = 'card',
}: SiteImageOrPlaceholderProps) {
  const image = await resolveImage(imageKey)

  return (
    <EditableImage
      imageKey={imageKey}
      label={placeholderLabel || image.label}
      src={image.src}
      alt={image.alt}
      aspectRatio={aspectRatio}
      className={className}
      priority={priority}
      sizePreset={sizePreset}
    />
  )
}
