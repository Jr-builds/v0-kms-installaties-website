export const offerteDiensten = [
  { slug: 'elektra', label: 'Elektra' },
  { slug: 'laadpaal', label: 'Laadpaal Installeren' },
  { slug: 'airconditioning', label: 'Airconditioning' },
  { slug: 'ventilatie', label: 'Ventilatie' },
  { slug: 'vastgoedbeheer', label: 'Technisch Vastgoedbeheer' },
  { slug: 'cameras', label: "Camera's & Systemen" },
  { slug: 'anders', label: 'Anders' },
] as const

const dienstSlugAliases: Record<string, (typeof offerteDiensten)[number]['slug']> = {
  'technisch-vastgoedbeheer': 'vastgoedbeheer',
  'cameras-systemen': 'cameras',
}

export function normalizeDienstSlug(slug: string): string {
  return dienstSlugAliases[slug] ?? slug
}

export function getOfferteDienstLabel(slug: string): string | null {
  const normalized = normalizeDienstSlug(slug)
  return offerteDiensten.find((dienst) => dienst.slug === normalized)?.label ?? null
}

export function buildOfferteHref(dienstSlug?: string, plaats?: string): string {
  const params = new URLSearchParams()
  if (dienstSlug) params.set('dienst', normalizeDienstSlug(dienstSlug))
  if (plaats) params.set('plaats', plaats)
  const query = params.toString()
  return query ? `/offerte?${query}` : '/offerte'
}

/** Dutch postcode: 1234 AB */
export function isValidDutchPostcode(value: string): boolean {
  return /^\d{4}\s?[A-Za-z]{2}$/.test(value.trim())
}

export function formatDutchPostcode(value: string): string {
  const cleaned = value.replace(/\s/g, '').toUpperCase().slice(0, 6)
  if (cleaned.length <= 4) return cleaned
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
}

/** `YYYY-MM-DD` from an HTML date input. */
export function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
