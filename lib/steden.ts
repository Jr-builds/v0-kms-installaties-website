export interface Stad {
  name: string
  slug: string
}

/** Plaatsnamen uit het KMS-werkgebied (bron: huidige kmsinstallaties.nl offertesectie). */
const STAD_NAMEN = [
  'Alblasserdam',
  'Alblasserwaard',
  'Barendrecht',
  'Breda',
  'Capelle aan den IJssel',
  'Delft',
  'Den Haag',
  'Dordrecht',
  'Gorinchem',
  'Gouda',
  'Hendrik-Ido-Ambacht',
  'Hoeksche Waard',
  'Hoogvliet',
  'Krimpen aan den IJssel',
  'Nieuwerkerk aan den IJssel',
  'Papendrecht',
  'Ridderkerk',
  'Rotterdam',
  'Roosendaal',
  'Schiedam',
  'Spijkenisse',
  'Utrecht',
  'Vlaardingen',
  'Zoetermeer',
  'Zwijndrecht',
] as const

export function stadToSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
}

export const steden: Stad[] = STAD_NAMEN.map((name) => ({
  name,
  slug: stadToSlug(name),
}))

const stedenBySlug = new Map(steden.map((stad) => [stad.slug, stad]))

export function getStadBySlug(slug: string): Stad | undefined {
  return stedenBySlug.get(slug)
}

export function getAllStadSlugs(): string[] {
  return steden.map((stad) => stad.slug)
}

export function getStadNames(): string[] {
  return steden.map((stad) => stad.name)
}

export type StadDienst = 'elektra' | 'airconditioning'

export function getStadLandingspad(dienst: StadDienst, slug: string): string {
  return dienst === 'elektra' ? `/elektricien/${slug}` : `/airconditioning/${slug}`
}
