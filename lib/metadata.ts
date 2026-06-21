import type { Metadata } from 'next'
import { getImage, type SiteImageKey } from '@/lib/images'
import { serviceAreaDisplay, serviceAreaInPhrase } from '@/lib/service-area'

export const SITE_NAME = 'KMS Installaties'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kms-installaties.nl'
export const SITE_LOGO = '/KMS-Logo.png'

export const OG_IMAGE = '/og-image.jpg'
export const OG_IMAGE_ALT = `KMS Installaties, Elektra & Airconditioning ${serviceAreaInPhrase}`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  imageKey?: SiteImageKey
}

export function createPageMetadata({
  title,
  description,
  path,
  imageKey = 'hero.home',
}: PageMetadataOptions): Metadata {
  const image = getImage(imageKey)

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      locale: 'nl_NL',
      type: 'website',
      siteName: SITE_NAME,
      images: [
        {
          url: image.src,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.src],
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-32x32.png',
  },
  other: {
    'msapplication-TileImage': '/mstile-270x270.png',
  },
  title: {
    default: 'KMS Installaties | Elektra & Airconditioning Zwijndrecht',
    template: '%s | KMS Installaties',
  },
  description:
    `KMS Installaties: vakkundige elektra, airconditioning, ventilatie, vastgoedbeheer en camerasystemen ${serviceAreaInPhrase}. Bereikbaar ma-zo 08:00-22:00. NEN 3140, STEK en VCA gecertificeerd.`,
  keywords: [
    'elektra installatie',
    'airconditioning',
    'ventilatie',
    'camerasystemen',
    'technisch vastgoedbeheer',
    'Zwijndrecht',
    'Rotterdam',
    'Zuid-Holland',
    'Brabant',
    'Zeeland',
    'Utrecht',
    'NEN 3140',
    'STEK',
  ],
  openGraph: {
    locale: 'nl_NL',
    type: 'website',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
}

export const pageMetadata = {
  home: createPageMetadata({
    title: 'KMS Installaties | Elektra & Airconditioning in Zuid-Holland',
    description:
      `Vakkundige elektra, airconditioning, ventilatie, vastgoedbeheer en camerasystemen ${serviceAreaInPhrase}. Bereikbaar ma-zo 08:00-22:00. NEN 3140, STEK en VCA gecertificeerd.`,
    path: '/',
    imageKey: 'hero.home',
  }),
  elektra: createPageMetadata({
    title: 'Elektra Installatie | NEN 3140 Gecertificeerd',
    description:
      `Complete elektrische installaties voor particulier en bedrijf ${serviceAreaInPhrase}. Groepenkasten, laadpalen en storingen. NEN-gecertificeerd met groepenverklaring.`,
    path: '/elektra',
    imageKey: 'hero.elektra',
  }),
  airconditioning: createPageMetadata({
    title: 'Airconditioning Installatie & Onderhoud | STEK-gecertificeerd',
    description:
      `STEK-gecertificeerde airco-installatie en onderhoud met A-merken zoals Mitsubishi, Daikin en LG. Particulier en zakelijk ${serviceAreaInPhrase}.`,
    path: '/airconditioning',
    imageKey: 'hero.airconditioning',
  }),
  ventilatie: createPageMetadata({
    title: 'Ventilatie & WTW-systemen | ISDE-advies',
    description:
      `WTW-systemen, mechanische ventilatie en onderhoud voor woning en utiliteit. Gratis advies over ISDE-subsidie ${serviceAreaInPhrase}.`,
    path: '/ventilatie',
    imageKey: 'hero.ventilatie',
  }),
  vastgoedbeheer: createPageMetadata({
    title: 'Technisch Vastgoedbeheer | Vaste Onderhoudscontracten',
    description:
      `Zorgeloos technisch beheer van uw pand. Storingen, onderhoud en inspectie voor gebouweigenaren en VvE-beheerders ${serviceAreaInPhrase}.`,
    path: '/technisch-vastgoedbeheer',
    imageKey: 'hero.vastgoedbeheer',
  }),
  cameras: createPageMetadata({
    title: "Camera's & Beveiligingssystemen | AVG-compliant",
    description:
      "Camerasystemen voor woning en bedrijf. AVG-compliant geïnstalleerd met app-koppeling, NVR-opslag en jaarlijks onderhoud.",
    path: '/cameras-systemen',
    imageKey: 'hero.cameras',
  }),
  projecten: createPageMetadata({
    title: 'Onze Projecten',
    description:
      `Bekijk afgeronde projecten in elektra, airconditioning, ventilatie en camerabeveiliging ${serviceAreaInPhrase}. Van Zwijndrecht tot Rotterdam en omgeving.`,
    path: '/projecten',
    imageKey: 'project.elektra',
  }),
  overOns: createPageMetadata({
    title: 'Over Ons | Vakmanschap uit Zwijndrecht',
    description:
      `KMS Installaties is opgericht door Kerem Sen en Mevlut Sumer. 10+ jaar ervaring, 200+ projecten en werkgebied ${serviceAreaDisplay}.`,
    path: '/over-ons',
    imageKey: 'hero.home',
  }),
  contact: createPageMetadata({
    title: 'Contact & Storingsmelding | 078 203 28 58',
    description:
      'Storingsmelding, vragen of spoed? Bel 078 203 28 58. Bereikbaar ma-zo 08:00-22:00. Voltastraat 6A, Zwijndrecht.',
    path: '/contact',
    imageKey: 'hero.home',
  }),
  offerte: createPageMetadata({
    title: 'Offerte Aanvragen | Reactie binnen 1 Werkdag',
    description:
      'Vraag een vrijblijvende offerte aan voor elektra, airco, ventilatie of camerasystemen. Reactie binnen 1 werkdag.',
    path: '/offerte',
    imageKey: 'hero.home',
  }),
  privacy: createPageMetadata({
    title: 'Privacyverklaring',
    description:
      'Lees hoe KMS Installaties omgaat met uw persoonsgegevens bij contact, offertes en storingsmeldingen.',
    path: '/privacyverklaring',
    imageKey: 'hero.home',
  }),
  cookies: createPageMetadata({
    title: 'Cookiebeleid',
    description:
      'Welke cookies KMS Installaties gebruikt, waarom, en hoe u cookies kunt beheren of verwijderen.',
    path: '/cookies',
    imageKey: 'hero.home',
  }),
  terms: createPageMetadata({
    title: 'Algemene Voorwaarden',
    description:
      'Algemene voorwaarden voor offertes en opdrachten van KMS Installaties.',
    path: '/algemene-voorwaarden',
    imageKey: 'hero.home',
  }),
} as const
