export const DEFAULT_HERO_SUBTITLE =
  'Elektra, airconditioning, ventilatie en camerasystemen. Bereikbaar van maandag tot zondag, 08:00 tot 22:00.'

const SUMMER_SUBTITLE =
  'Zomerse dagen? Wij installeren en onderhouden airconditioning voor een comfortabel binnenklimaat, bereikbaar ma-zo 08:00-22:00.'

const WINTER_SUBTITLE =
  'Storing of pech in de winter? Wij lossen elektra- en installatieproblemen snel op, ook in het weekend bereikbaar 08:00-22:00.'

/** Returns seasonal copy based on Europe/Amsterdam month (client-safe after mount). */
export function getSeasonalHeroSubtitle(now = new Date()): string {
  const month = Number(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Amsterdam', month: 'numeric' }).format(now),
  )

  if (month >= 6 && month <= 8) return SUMMER_SUBTITLE
  if (month === 12 || month <= 2) return WINTER_SUBTITLE
  return DEFAULT_HERO_SUBTITLE
}
