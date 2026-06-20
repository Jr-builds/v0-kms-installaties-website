export type TrustHighlightIconKey =
  | 'nen-1010'
  | 'nen-3140'
  | 'stek'
  | 'vca'
  | 'zaptec'

export interface TrustHighlight {
  id: string
  title: string
  subtitle: string
  iconKey: TrustHighlightIconKey
}

/** Certificeringen voor homepage icon-grid (issue #4). */
export const trustHighlights: TrustHighlight[] = [
  {
    id: 'nen-1010',
    title: 'NEN 1010',
    subtitle: 'Elektrische installaties',
    iconKey: 'nen-1010',
  },
  {
    id: 'nen-3140-vp',
    title: 'NEN 3140 VP',
    subtitle: 'Veilig werken aan installaties',
    iconKey: 'nen-3140',
  },
  {
    id: 'stek',
    title: 'STEK',
    subtitle: 'Gecertificeerd koeltechniek',
    iconKey: 'stek',
  },
  {
    id: 'vca',
    title: 'VCA',
    subtitle: 'Veilig werken op locatie',
    iconKey: 'vca',
  },
  {
    id: 'zaptec',
    title: 'Zaptec Certified',
    subtitle: 'Gecertificeerd laadpaalinstallateur',
    iconKey: 'zaptec',
  },
]
