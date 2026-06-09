export interface BrandLogo {
  src: string
  alt: string
  width: number
  height: number
}

/** Paths must match filenames in /public/brands/ exactly (case-sensitive). */
const brandLogos: Record<string, BrandLogo> = {
  ABB: { src: '/brands/abb.png', alt: 'ABB logo', width: 174, height: 66 },
  Alfen: { src: '/brands/alfen-seeklogo.png', alt: 'Alfen logo', width: 2000, height: 486 },
  Daikin: { src: '/brands/Daikin.png', alt: 'Daikin logo', width: 800, height: 168 },
  DUCO: { src: '/brands/DUCO.png', alt: 'DUCO logo', width: 820, height: 148 },
  Gira: { src: '/brands/gira.png', alt: 'Gira logo', width: 2000, height: 506 },
  Hager: { src: '/brands/Hager.png', alt: 'Hager logo', width: 1831, height: 718 },
  'Itho Daalderop': {
    src: '/brands/Itho-Daalderop.png',
    alt: 'Itho Daalderop logo',
    width: 339,
    height: 63,
  },
  Jung: { src: '/brands/jung.png', alt: 'Jung logo', width: 2000, height: 487 },
  LG: { src: '/brands/LG_Electronics_Logo_1.png', alt: 'LG logo', width: 800, height: 352 },
  'Mitsubishi Electric': {
    src: '/brands/Mitsubishi_Electric.png',
    alt: 'Mitsubishi Electric logo',
    width: 820,
    height: 250,
  },
  'Mitsubishi Heavy': {
    src: '/brands/mitsubishi-heavy-industries.png',
    alt: 'Mitsubishi Heavy Industries logo',
    width: 320,
    height: 320,
  },
  Zaptec: { src: '/brands/Zaptec.png', alt: 'Zaptec logo', width: 180, height: 180 },
}

export function getBrandLogo(brand: string): BrandLogo | null {
  return brandLogos[brand] ?? null
}
