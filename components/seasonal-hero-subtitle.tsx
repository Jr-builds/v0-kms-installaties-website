import { DEFAULT_HERO_SUBTITLE } from '@/lib/seasonal'

/** Vaste hero-subtekst; seizoenswissel uit tot klant expliciet andere copy wil. */
export default function SeasonalHeroSubtitle() {
  return <p className="text-blue-200 text-lg mb-8 leading-relaxed">{DEFAULT_HERO_SUBTITLE}</p>
}
