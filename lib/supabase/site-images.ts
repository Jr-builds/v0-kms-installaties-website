import 'server-only'

import { getImage, type SiteImageData, type SiteImageKey } from '@/lib/images'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createClient } from '@/lib/supabase/server'

export type SiteImageOverride = {
  key: string
  public_url: string | null
  alt: string | null
}

export async function fetchSiteImageOverrides(): Promise<Map<string, SiteImageOverride>> {
  const map = new Map<string, SiteImageOverride>()
  if (!isSupabaseConfigured()) return map

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_images')
      .select('key, public_url, alt')
      .not('public_url', 'is', null)

    if (error || !data) return map

    for (const row of data) {
      map.set(row.key, row)
    }
  } catch {
    return map
  }

  return map
}

export async function resolveImage(key: SiteImageKey): Promise<SiteImageData> {
  const base = getImage(key)
  if (!isSupabaseConfigured()) return base

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_images')
      .select('public_url, alt')
      .eq('key', key)
      .maybeSingle()

    if (data?.public_url) {
      return {
        src: data.public_url,
        alt: data.alt || base.alt,
        label: base.label,
      }
    }
  } catch {
    // fall through to local asset
  }

  return base
}
