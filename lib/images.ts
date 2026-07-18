export interface SiteImageData {
  /** null = nog geen lokale fallback (grijze placeholder tot upload in Supabase) */
  src: string | null
  alt: string
  /** Nederlandse label in beheer */
  label: string
}

export const siteImages = {
  'logo.kms': {
    src: '/KMS-Logo.png',
    alt: 'KMS Installaties logo',
    label: 'Logo',
  },

  'hero.home': {
    src: '/hero-home-collage.png',
    alt: 'Collage van KMS-installaties: elektra, airconditioning, laadpaal, warmtepomp en zonnepanelen',
    label: 'Homepage hero',
  },
  'hero.elektra': {
    src: '/electrician-professional-work.jpg',
    alt: 'Professionele elektricien van KMS Installaties aan het werk',
    label: 'Hero Elektra',
  },
  'hero.airconditioning': {
    src: '/airco-binnenunit.jpg',
    alt: 'Airconditioning binnenunit geïnstalleerd in een woonkamer',
    label: 'Hero Airconditioning',
  },
  'hero.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-ventilatiesysteem geïnstalleerd in een woning',
    label: 'Hero Ventilatie',
  },
  'hero.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Modern bedrijfspand in Zuid-Holland voor technisch vastgoedbeheer',
    label: 'Hero Vastgoedbeheer',
  },
  'hero.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Beveiligingscamera gemonteerd aan de buitengevel van een pand',
    label: 'Hero Cameras',
  },
  'hero.laadpaal': {
    src: '/hero-laadpaal.png',
    alt: 'Zaptec laadpaal gemonteerd aan de buitenmuur van een woning',
    label: 'Hero Laadpaal',
  },

  'dienst.elektra': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Moderne groepenkast en meterkast installatie',
    label: 'Homepage dienst Elektra',
  },
  'dienst.airconditioning': {
    src: '/airco-binnenunit.jpg',
    alt: 'Airconditioning binnenunit voor comfortabel binnenklimaat',
    label: 'Homepage dienst Airconditioning',
  },
  'dienst.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-ventilatiesysteem voor gezonde lucht in huis',
    label: 'Homepage dienst Ventilatie',
  },
  'dienst.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Bedrijfspand onder technisch vastgoedbeheer',
    label: 'Homepage dienst Vastgoedbeheer',
  },
  'dienst.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Buitencamera voor beveiliging van een pand',
    label: 'Homepage dienst Cameras',
  },
  'dienst.laadpaal': {
    src: '/hero-laadpaal.png',
    alt: 'Zaptec laadpaal gemonteerd aan de buitenmuur van een woning',
    label: 'Homepage dienst Laadpaal',
  },

  'project.elektra': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Elektrische meterkast en groepenkast installatie',
    label: 'Project Elektra',
  },
  'project.airconditioning': {
    src: '/airco-buitenunit.jpg',
    alt: 'Airconditioning buitenunit op een plat dak',
    label: 'Project Airconditioning',
  },
  'project.ventilatie': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Ventilatie- en WTW-installatie',
    label: 'Project Ventilatie',
  },
  'project.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Camerabeveiliging aan de buitengevel',
    label: 'Project Cameras',
  },
  'project.vastgoedbeheer': {
    src: '/vastgoed-pand.jpg',
    alt: 'Technisch onderhoud aan een bedrijfspand',
    label: 'Project Vastgoed',
  },

  'elektra.huisinstallatie': {
    src: '/electrician-professional-work.jpg',
    alt: 'Elektrische huisinstallatie door een gecertificeerde monteur',
    label: 'Elektra: huisinstallatie',
  },
  'elektra.renovatie': {
    src: null,
    alt: 'Renovatie en verbouwing van elektrische installaties',
    label: 'Elektra: renovatie',
  },
  'elektra.groepenkast': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Vervanging en installatie van een groepenkast',
    label: 'Elektra: groepenkast',
  },
  'elektra.verlichting': {
    src: null,
    alt: 'Binnen- en buitenverlichting installatie',
    label: 'Elektra: verlichting',
  },
  'elektra.keukenBadkamer': {
    src: null,
    alt: 'Elektra in keuken en badkamer',
    label: 'Elektra: keuken en badkamer',
  },
  'elektra.cameras': {
    src: '/cameras-buiten.jpg',
    alt: 'Camerasysteem als onderdeel van elektrische installaties',
    label: 'Elektra: camerasystemen',
  },
  'elektra.storingen': {
    src: '/electrician-professional-work.jpg',
    alt: 'Storingsdienst en onderhoud elektra',
    label: 'Elektra: storingen',
  },

  'laadpaal.meterkast': {
    src: '/elektra-groepenkast.jpg',
    alt: 'Inspectie en uitbreiding van de meterkast voor een laadpaal',
    label: 'Laadpaal: meterkast',
  },
  'laadpaal.thuis': {
    src: '/electrician-professional-work.jpg',
    alt: 'Thuislaadpaal geïnstalleerd door een gecertificeerde monteur',
    label: 'Laadpaal: thuis',
  },
  'laadpaal.zakelijk': {
    src: '/vastgoed-pand.jpg',
    alt: 'Zakelijke laadpaal installatie bij een bedrijfspand',
    label: 'Laadpaal: zakelijk',
  },
  'laadpaal.onderhoud': {
    src: '/laadpaal-onderhoud.png',
    alt: 'Laadpaal met aangesloten laadkabel voor onderhoud en storingen',
    label: 'Laadpaal: onderhoud',
  },

  'airco.klimaatbeheersing': {
    src: '/airco-binnenunit.jpg',
    alt: 'Klimaatbeheersing voor kantoor en bedrijven',
    label: 'Airco: klimaatbeheersing',
  },
  'airco.installatie': {
    src: '/airco-binnenunit.jpg',
    alt: 'Professionele airco-installatie wandunit',
    label: 'Airco: installatie',
  },
  'airco.onderhoud': {
    src: '/airco-binnenunit.jpg',
    alt: 'Service en onderhoud van airconditioning',
    label: 'Airco: onderhoud',
  },
  'airco.storingen': {
    src: '/airco-buitenunit.jpg',
    alt: 'Airco storingen en reparaties',
    label: 'Airco: storingen',
  },
  'airco.levering': {
    src: '/airco-binnenunit.jpg',
    alt: 'Levering van airco-units',
    label: 'Airco: levering',
  },
  'airco.wifi': {
    src: '/airco-binnenunit.jpg',
    alt: 'Slimme app-bediening voor airconditioning',
    label: 'Airco: wifi bediening',
  },

  'ventilatie.lbk': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Luchtbehandelingskast voor utiliteit',
    label: 'Ventilatie: LBK',
  },
  'ventilatie.wtw': {
    src: '/ventilatie-wtw.jpg',
    alt: 'WTW-unit voor warmteterugwinning en ventilatie',
    label: 'Ventilatie: WTW',
  },
  'ventilatie.mechanisch': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Mechanische ventilatie installatie',
    label: 'Ventilatie: mechanisch',
  },
  'ventilatie.dakventilator': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Dakventilator op plat dak',
    label: 'Ventilatie: dakventilator',
  },
  'ventilatie.onderhoud': {
    src: '/ventilatie-wtw.jpg',
    alt: 'Onderhoud en storingen ventilatie',
    label: 'Ventilatie: onderhoud',
  },

  'vastgoed.onderhoud': {
    src: '/vastgoed-pand.jpg',
    alt: 'Algemeen technisch onderhoud gebouw',
    label: 'Vastgoed: onderhoud',
  },
  'vastgoed.renovatie': {
    src: '/vastgoed-pand.jpg',
    alt: 'Renovatie en herstel installaties',
    label: 'Vastgoed: renovatie',
  },
  'vastgoed.storingen': {
    src: '/vastgoed-pand.jpg',
    alt: 'Storingsmelding en snelle respons',
    label: 'Vastgoed: storingen',
  },
  'vastgoed.inspectie': {
    src: '/vastgoed-pand.jpg',
    alt: 'Technische inspectie en rapportage',
    label: 'Vastgoed: inspectie',
  },
  'vastgoed.periodiek': {
    src: '/vastgoed-pand.jpg',
    alt: 'Periodiek onderhoud installaties',
    label: 'Vastgoed: periodiek',
  },
  'vastgoed.projecten': {
    src: '/vastgoed-pand.jpg',
    alt: 'Coördinatie van kleine projecten',
    label: 'Vastgoed: projecten',
  },

  'camera.installatie': {
    src: '/cameras-buiten.jpg',
    alt: 'Camera bekabeling en installatie',
    label: 'Camera: installatie',
  },
  'camera.inbedrijfstelling': {
    src: '/cameras-buiten.jpg',
    alt: 'Camera configuratie en inbedrijfstelling',
    label: 'Camera: inbedrijfstelling',
  },
  'camera.levering': {
    src: '/cameras-buiten.jpg',
    alt: 'Cameralevering binnen en buiten',
    label: 'Camera: levering',
  },
  'camera.app': {
    src: '/cameras-buiten.jpg',
    alt: 'Smartphone app voor live camerabeeld',
    label: 'Camera: app',
  },
  'camera.onderhoud': {
    src: '/cameras-buiten.jpg',
    alt: 'Camera onderhoud en reparatie',
    label: 'Camera: onderhoud',
  },
} as const satisfies Record<string, SiteImageData>

export type SiteImageKey = keyof typeof siteImages

export function getImage(key: SiteImageKey): SiteImageData {
  const image = siteImages[key]
  return { src: image.src, alt: image.alt, label: image.label }
}

export function requireImageSrc(image: SiteImageData, fallback: string): string {
  return image.src ?? fallback
}

export function isSiteImageKey(key: string): key is SiteImageKey {
  return key in siteImages
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
