import { serviceAreaActivePhrase } from '@/lib/service-area'

export const DEFAULT_HERO_SUBTITLE =
  `Ook 's avonds en in het weekend bereikbaar. ${serviceAreaActivePhrase}`

/** Hero gebruikt altijd de vaste subtekst (elektra én airco, alle regio's). */
export function getSeasonalHeroSubtitle(): string {
  return DEFAULT_HERO_SUBTITLE
}
