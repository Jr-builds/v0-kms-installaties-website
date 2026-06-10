export interface Certification {
  id: string
  name: string
  description: string
  logo: {
    src: string
    alt: string
    width: number
    height: number
    /** Compensates for extra whitespace in square logo assets */
    displayScale?: number
  }
}

export const certifications: Certification[] = [
  {
    id: 'nen-3140',
    name: 'NEN 3140',
    description:
      'Wettelijk vereist voor elektrische installaties. Elke installatie wordt gekeurd en geleverd met een groepenverklaring.',
    logo: {
      src: '/brands/nen-3140.png',
      alt: 'NEN 3140 certificering logo',
      width: 800,
      height: 800,
      displayScale: 1.85,
    },
  },
  {
    id: 'stek',
    name: 'STEK',
    description:
      'Verplichte certificering voor werken met koelmiddelen. Niet elk installatiebedrijf heeft dit certificaat.',
    logo: {
      src: '/brands/stek.png',
      alt: 'STEK certificering logo',
      width: 472,
      height: 230,
    },
  },
  {
    id: 'vca',
    name: 'VCA',
    description:
      'Veiligheidscertificering voor technische werkzaamheden. Garandeert veilig werken op locatie.',
    logo: {
      src: '/brands/vca.png',
      alt: 'VCA certificering logo',
      width: 1000,
      height: 451,
    },
  },
]

export function getCertification(name: string): Certification | undefined {
  return certifications.find((cert) => cert.name === name)
}
