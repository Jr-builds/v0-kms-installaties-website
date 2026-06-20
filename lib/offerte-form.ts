import {
  AirVent,
  AlertTriangle,
  BriefcaseBusiness,
  Building2,
  Cctv,
  HousePlug,
  PlugZap,
  UserRound,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export const offerteFormSteps = [
  { id: 'soort', label: 'Soort' },
  { id: 'wie', label: 'Wie' },
  { id: 'vragen', label: 'Vragen' },
  { id: 'verhaal', label: 'Verhaal' },
  { id: 'fotos', label: "Foto's" },
  { id: 'contact', label: 'Contact' },
] as const

/** Totaal aantal stappen in het offerteformulier (issue #6–#9). */
export const OFFERTE_FORM_STEP_COUNT = offerteFormSteps.length

export type OfferteAudienceId = 'particulier' | 'zakelijk'

export interface OfferteAudienceOption {
  id: OfferteAudienceId
  label: string
  description: string
  icon: LucideIcon
}

export const offerteAudienceOptions: OfferteAudienceOption[] = [
  {
    id: 'particulier',
    label: 'Particulier',
    description: 'Voor mijn eigen woning',
    icon: UserRound,
  },
  {
    id: 'zakelijk',
    label: 'Zakelijk',
    description: 'Voor bedrijf, pand of vastgoedbeheer',
    icon: BriefcaseBusiness,
  },
]

export type OfferteCategoryId =
  | 'meterkast'
  | 'laadpaal'
  | 'elektra-renovatie'
  | 'storing'
  | 'airco-installatie'
  | 'airco-onderhoud'
  | 'ventilatie'
  | 'camerabeveiliging'
  | 'technisch-vastgoedbeheer'

/** Semantische kleur per categorie (icon in zachte cirkel, KMS-palet). */
export type OfferteCategoryIconTone =
  | 'elektra'
  | 'ev'
  | 'renovatie'
  | 'warn'
  | 'airco'
  | 'service'
  | 'ventilatie'
  | 'security'
  | 'vastgoed'

export interface OfferteCategory {
  id: OfferteCategoryId
  label: string
  icon: LucideIcon
  iconTone: OfferteCategoryIconTone
}

/** Categorieën afgestemd op KMS-diensten (homepage + dienstenpagina's). */
export const offerteCategories: OfferteCategory[] = [
  { id: 'meterkast', label: 'Meterkast', icon: Zap, iconTone: 'elektra' },
  { id: 'laadpaal', label: 'Laadpaal', icon: PlugZap, iconTone: 'ev' },
  { id: 'elektra-renovatie', label: 'Elektra renovatie', icon: HousePlug, iconTone: 'renovatie' },
  { id: 'storing', label: 'Storing', icon: AlertTriangle, iconTone: 'warn' },
  { id: 'airco-installatie', label: 'Airco installatie', icon: AirVent, iconTone: 'airco' },
  { id: 'airco-onderhoud', label: 'Airco onderhoud', icon: Wrench, iconTone: 'service' },
  { id: 'ventilatie', label: 'Ventilatie', icon: Wind, iconTone: 'ventilatie' },
  { id: 'camerabeveiliging', label: 'Camerabeveiliging', icon: Cctv, iconTone: 'security' },
  {
    id: 'technisch-vastgoedbeheer',
    label: 'Technisch vastgoedbeheer',
    icon: Building2,
    iconTone: 'vastgoed',
  },
]

export const offerteCategoryIconStyles: Record<
  OfferteCategoryIconTone,
  { circle: string; icon: string; circleSelected: string; iconSelected: string }
> = {
  elektra: {
    circle: 'bg-kms-yellow/20',
    icon: 'text-kms-yellow-dark',
    circleSelected: 'bg-kms-yellow/30',
    iconSelected: 'text-kms-yellow-dark',
  },
  ev: {
    circle: 'bg-kms-green/15',
    icon: 'text-kms-green',
    circleSelected: 'bg-kms-green/25',
    iconSelected: 'text-kms-green',
  },
  renovatie: {
    circle: 'bg-kms-navy/10',
    icon: 'text-kms-navy',
    circleSelected: 'bg-kms-navy/15',
    iconSelected: 'text-kms-navy',
  },
  warn: {
    circle: 'bg-amber-100',
    icon: 'text-amber-600',
    circleSelected: 'bg-amber-200/80',
    iconSelected: 'text-amber-700',
  },
  airco: {
    circle: 'bg-sky-100',
    icon: 'text-sky-600',
    circleSelected: 'bg-sky-200/70',
    iconSelected: 'text-sky-700',
  },
  service: {
    circle: 'bg-slate-100',
    icon: 'text-slate-600',
    circleSelected: 'bg-slate-200/80',
    iconSelected: 'text-slate-700',
  },
  ventilatie: {
    circle: 'bg-teal-50',
    icon: 'text-teal-600',
    circleSelected: 'bg-teal-100',
    iconSelected: 'text-teal-700',
  },
  security: {
    circle: 'bg-kms-navy/10',
    icon: 'text-kms-navy',
    circleSelected: 'bg-kms-navy/15',
    iconSelected: 'text-kms-navy',
  },
  vastgoed: {
    circle: 'bg-indigo-50',
    icon: 'text-indigo-700',
    circleSelected: 'bg-indigo-100',
    iconSelected: 'text-indigo-800',
  },
}

export function getOfferteCategoryLabel(id: OfferteCategoryId): string {
  return offerteCategories.find((category) => category.id === id)?.label ?? id
}

export function getOfferteAudienceLabel(id: OfferteAudienceId): string {
  return offerteAudienceOptions.find((option) => option.id === id)?.label ?? id
}

/** Formstap (1–3) naar stepper-stap (1–6). Stappen 4–6 volgen in #8/#9. */
export function getOfferteProgressStep(formStep: number): number {
  if (formStep <= 1) return 1
  if (formStep === 2) return 2
  return 3
}
