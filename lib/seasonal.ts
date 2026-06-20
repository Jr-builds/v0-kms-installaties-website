export const DEFAULT_HERO_SUBTITLE =
  'Ook \'s avonds en in het weekend bereikbaar. Actief in Zuid-Holland, Brabant, Zeeland en regio Utrecht.'

/** Hero gebruikt altijd de vaste subtekst (elektra én airco, alle regio's). */
export function getSeasonalHeroSubtitle(): string {
  return DEFAULT_HERO_SUBTITLE
}
