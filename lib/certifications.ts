export interface Certification {
  id: string
  name: string
  description: string
}

export const certifications: Certification[] = [
  {
    id: 'nen-3140',
    name: 'NEN 3140',
    description:
      'Wettelijk vereist voor elektrische installaties. Elke installatie wordt gekeurd en geleverd met een groepenverklaring.',
  },
  {
    id: 'stek',
    name: 'STEK',
    description:
      'Verplichte certificering voor werken met koelmiddelen. Niet elk installatiebedrijf heeft dit certificaat.',
  },
  {
    id: 'vca',
    name: 'VCA',
    description:
      'Veiligheidscertificering voor technische werkzaamheden. Garandeert veilig werken op locatie.',
  },
]

export function getCertification(name: string): Certification | undefined {
  return certifications.find((cert) => cert.name === name)
}
