import type { Metadata } from 'next'
import { getImage, type SiteImageKey } from '@/lib/images'

export const SITE_NAME = 'KMS Installaties'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kms-installaties.nl'

export const OG_IMAGE = '/og-image.jpg'
export const OG_IMAGE_ALT = 'KMS Installaties — Elektra & Airconditioning in Zuid-Holland'
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
  title: {
    default: 'KMS Installaties | Elektra & Airconditioning Zwijndrecht',
    template: '%s | KMS Installaties',
  },
  description:
    'KMS Installaties: vakkundige elektra, airconditioning, ventilatie, vastgoedbeheer en camerasystemen in Zuid-Holland. Bereikbaar ma-zo 08:00-22:00. NEN 3140, STEK en VCA gecertificeerd.',
  keywords: [
    'elektra installatie',
    'airconditioning',
    'ventilatie',
    'camerasystemen',
    'technisch vastgoedbeheer',
    'Zwijndrecht',
    'Rotterdam',
    'Zuid-Holland',
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
      'Vakkundige elektra, airconditioning, ventilatie, vastgoedbeheer en camerasystemen. Bereikbaar ma-zo 08:00-22:00. NEN 3140, STEK en VCA gecertificeerd.',
    path: '/',
    imageKey: 'hero.home',
  }),
  elektra: createPageMetadata({
    title: 'Elektra Installatie | NEN 3140 Gecertificeerd',
    description:
      'Complete elektrische installaties voor particulier en bedrijf in Zuid-Holland. Groepenkasten, laadpalen en storingen. NEN-gecertificeerd met groepenverklaring.',
    path: '/elektra',
    imageKey: 'hero.elektra',
  }),
  airconditioning: createPageMetadata({
    title: 'Airconditioning Installatie & Onderhoud | STEK-gecertificeerd',
    description:
      'STEK-gecertificeerde airco-installatie en onderhoud met A-merken zoals Mitsubishi, Daikin en LG. Particulier en zakelijk in Zuid-Holland.',
    path: '/airconditioning',
    imageKey: 'hero.airconditioning',
  }),
  ventilatie: createPageMetadata({
    title: 'Ventilatie & WTW-systemen | ISDE-advies',
    description:
      'WTW-systemen, mechanische ventilatie en onderhoud voor woning en utiliteit. Gratis advies over ISDE-subsidie in Zuid-Holland.',
    path: '/ventilatie',
    imageKey: 'hero.ventilatie',
  }),
  vastgoedbeheer: createPageMetadata({
    title: 'Technisch Vastgoedbeheer | Vaste Onderhoudscontracten',
    description:
      'Zorgeloos technisch beheer van uw pand. Storingen, onderhoud en inspectie voor gebouweigenaren en VvE-beheerders in Zuid-Holland.',
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
    title: 'Onze Projecten in Zuid-Holland',
    description:
      'Bekijk afgeronde projecten in elektra, airconditioning, ventilatie en camerabeveiliging. Van Zwijndrecht tot Rotterdam en omgeving.',
    path: '/projecten',
    imageKey: 'project.elektra',
  }),
  overOns: createPageMetadata({
    title: 'Over Ons | Vakmanschap uit Zwijndrecht',
    description:
      'KMS Installaties is opgericht door Kerem Sen en Mevlut Sumer. 10+ jaar ervaring, 200+ projecten en werkgebied heel Zuid-Holland.',
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
} as const
