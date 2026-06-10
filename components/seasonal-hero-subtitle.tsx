'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_HERO_SUBTITLE, getSeasonalHeroSubtitle } from '@/lib/seasonal'

export default function SeasonalHeroSubtitle() {
  const [subtitle, setSubtitle] = useState(DEFAULT_HERO_SUBTITLE)

  useEffect(() => {
    setSubtitle(getSeasonalHeroSubtitle())
  }, [])

  return <p className="text-blue-200 text-lg mb-8 leading-relaxed">{subtitle}</p>
}
