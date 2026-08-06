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
  /** Server-side opgehaalde URL; voorkomt flash van de lokale fallback */
  serverSrc?: string | null
  serverAlt?: string
}

export default function ClientEditableImage({
  imageKey,
  placeholderLabel,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizePreset = 'card',
  serverSrc,
  serverAlt,
}: ClientEditableImageProps) {
  const base = getImage(imageKey)
  const label = placeholderLabel || base.label
  const hasServerSrc = serverSrc !== undefined
  const [src, setSrc] = useState<string | null>(hasServerSrc ? serverSrc : base.src)
  const [alt, setAlt] = useState(serverAlt || base.alt)

  useEffect(() => {
    if (hasServerSrc) {
      setSrc(serverSrc)
      setAlt(serverAlt || base.alt)
      return
    }

    if (!isSupabaseConfigured()) {
      setSrc(base.src)
      setAlt(base.alt)
      return
    }

    let cancelled = false
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('site_images')
          .select('public_url, alt')
          .eq('key', imageKey)
          .maybeSingle()
        if (cancelled) return
        if (data?.public_url) {
          setSrc(data.public_url)
          if (data.alt) setAlt(data.alt)
        } else {
          setSrc(base.src)
        }
      } catch {
        if (!cancelled) setSrc(base.src)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [imageKey, hasServerSrc, serverSrc, serverAlt, base.src, base.alt])

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
