'use client'

import { useEffect, useState } from 'react'
import EditableImage from '@/components/cms/editable-image'
import { getImage, type SiteImageKey } from '@/lib/images'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'

interface ClientEditableImageProps {
  imageKey: SiteImageKey
  placeholderLabel?: string
  aspectRatio?: string
  className?: string
  priority?: boolean
  sizePreset?: 'hero' | 'card' | 'square' | 'modal'
}

export default function ClientEditableImage({
  imageKey,
  placeholderLabel,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizePreset = 'card',
}: ClientEditableImageProps) {
  const base = getImage(imageKey)
  const label = placeholderLabel || base.label
  const [src, setSrc] = useState<string | null>(base.src)
  const [alt, setAlt] = useState(base.alt)

  useEffect(() => {
    if (!isSupabaseConfigured()) return

    let cancelled = false
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('site_images')
          .select('public_url, alt')
          .eq('key', imageKey)
          .maybeSingle()
        if (cancelled || !data) return
        if (data.public_url) setSrc(data.public_url)
        if (data.alt) setAlt(data.alt)
      } catch {
        // keep local fallback
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [imageKey])

  return (
    <EditableImage
      imageKey={imageKey}
      label={label}
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      className={className}
      priority={priority}
      sizePreset={sizePreset}
      onSaved={setSrc}
    />
  )
}
