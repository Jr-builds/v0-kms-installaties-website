export interface SiteImageData {
  src: string
  alt: string
}

export const siteImages = {
  'logo.kms': {
    src: '/KMS-Logo.png',
    alt: 'KMS Installaties logo',
  },

  // — Home & service heroes —
  'hero.home': {
    src: '/electrician-professional-work.jpg',
    alt: 'KMS Installaties monteur aan het werk aan een elektrische installatie',
  },
  'hero.elektra': {
    src: '/electrician-professional-work.jpg',
    alt: 'Professionele elektricien van KMS Installaties aan het werk',
  },
  'hero.airconditioning': {
    src: '/airco-binnenunit.jpg',
    alt: 'Airconditioning binnenunit geïnstalleerd in een woonkamer',
  },
  'hero.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-ventilatiesysteem geïnstalleerd in een woning',
  },
  'hero.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Modern bedrijfspand in Zuid-Holland voor technisch vastgoedbeheer',
  },
  'hero.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Beveiligingscamera gemonteerd aan de buitengevel van een pand',
  },
  'hero.laadpaal': {
    src: '/hero-laadpaal.png',
    alt: 'Zaptec laadpaal gemonteerd aan de buitenmuur van een woning',
  },

  // — Home diensten cards —
  'dienst.elektra': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Moderne groepenkast en meterkast installatie',
  },
  'dienst.airconditioning': {
    src: '/airco-binnenunit.jpg',
    alt: 'Airconditioning binnenunit voor comfortabel binnenklimaat',
  },
  'dienst.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-ventilatiesysteem voor gezonde lucht in huis',
  },
  'dienst.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Bedrijfspand onder technisch vastgoedbeheer',
  },
  'dienst.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Buitencamera voor beveiliging van een pand',
  },
  'dienst.laadpaal': {
    src: '/hero-laadpaal.png',
    alt: 'Zaptec laadpaal gemonteerd aan de buitenmuur van een woning',
  },

  // — Project images by category —
  'project.elektra': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Elektrische meterkast en groepenkast installatie',
  },
  'project.airconditioning': {
    src: '/airco-buitenunit.jpg',
    alt: 'Airconditioning buitenunit op een plat dak',
  },
  'project.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Ventilatie- en WTW-installatie',
  },
  'project.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Camerabeveiliging aan de buitengevel',
  },
  'project.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Technisch onderhoud aan een bedrijfspand',
  },

  // — Elektra sub-diensten (closest matching assets) —
  'elektra.huisinstallatie': {
    src: '/electrician-professional-work.jpg',
    alt: 'Elektrische huisinstallatie door een gecertificeerde monteur',
  },
  'elektra.groepenkast': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Vervanging en installatie van een groepenkast',
  },
  'elektra.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Camerasysteem als onderdeel van elektrische installaties',
  },

  // — Laadpaal sub-diensten (tijdelijk hergebruik groepenkast-asset; dedicated foto volgt) —
  'laadpaal.meterkast': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Inspectie en uitbreiding van de meterkast voor een laadpaal',
  },
  'laadpaal.thuis': {
    src: '/electrician-professional-work.jpg',
    alt: 'Thuislaadpaal geïnstalleerd door een gecertificeerde monteur',
  },
  'laadpaal.zakelijk': {
    src: '/vastgoed-pand.jpg',
    alt: 'Zakelijke laadpaal installatie bij een bedrijfspand',
  },
  'laadpaal.onderhoud': {
    src: '/laadpaal-onderhoud.png',
    alt: 'Laadpaal met aangesloten laadkabel voor onderhoud en storingen',
  },
  'laadpaal.slim': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Slimme laadpaal met stroomverdeling en energiemeting',
  },

  // — Airconditioning sub-diensten —
  'airco.binnenunit': {
    src: '/airco-binnenunit.jpg',
    alt: 'Airconditioning wandunit in een woon- of kantoorruimte',
  },
  'airco.buitenunit': {
    src: '/airco-buitenunit.jpg',
    alt: 'Airconditioning buitenunit op een dak',
  },

  // — Ventilatie sub-diensten —
  'ventilatie.wtw': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-unit voor warmteterugwinning en ventilatie',
  },

  // — Vastgoedbeheer sub-diensten —
  'vastgoed.pand': {
    src: '/vastgoed-pand.jpg',
    alt: 'Technisch onderhoud aan een bedrijfspand',
  },

  // — Camera sub-diensten —
  'camera.buiten': {
    src: '/cameras-buiten.jpg',
    alt: 'Buitencamera voor beveiliging en toezicht',
  },
} as const satisfies Record<string, SiteImageData>

export type SiteImageKey = keyof typeof siteImages

export function getImage(key: SiteImageKey): SiteImageData {
  return siteImages[key]
}

const projectCategoryMap: Record<string, SiteImageKey> = {
  Elektra: 'project.elektra',
  Airconditioning: 'project.airconditioning',
  Ventilatie: 'project.ventilatie',
  "Camera's": 'project.cameras',
  Vastgoed: 'project.vastgoedbeheer',
}

export function getProjectImageKey(category: string): SiteImageKey {
  return projectCategoryMap[category] ?? 'project.elektra'
}
