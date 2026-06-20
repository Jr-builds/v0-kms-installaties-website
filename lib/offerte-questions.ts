import type { OfferteCategoryId } from '@/lib/offerte-form'

export type OfferteQuestionType = 'select' | 'text' | 'textarea'

export interface OfferteQuestionOption {
  value: string
  label: string
}

export interface OfferteQuestion {
  id: string
  label: string
  type: OfferteQuestionType
  required: boolean
  placeholder?: string
  helpText?: string
  options?: OfferteQuestionOption[]
}

export const offerteQuestionsByCategory: Record<OfferteCategoryId, OfferteQuestion[]> = {
  meterkast: [
    {
      id: 'meterkast-werk',
      label: 'Wat wilt u laten doen?',
      type: 'select',
      required: true,
      options: [
        { value: 'uitbreiding', label: 'Uitbreiding groepen' },
        { value: 'vernieuwing', label: 'Vernieuwing meterkast' },
        { value: '3-fase', label: 'Aansluiting 3-fase' },
        { value: 'anders', label: 'Anders / weet ik nog niet' },
      ],
    },
    {
      id: 'meterkast-groepen',
      label: 'Hoeveel groepen heeft u nu ongeveer?',
      type: 'select',
      required: true,
      options: [
        { value: '1-4', label: '1–4 groepen' },
        { value: '5-8', label: '5–8 groepen' },
        { value: '9+', label: '9 of meer' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'meterkast-bijzonderheden',
      label: 'Bijzonderheden',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. zonnepanelen, warmtepomp of laadpaal gepland',
    },
  ],
  laadpaal: [
    {
      id: 'laadpaal-auto',
      label: 'Type auto',
      type: 'select',
      required: true,
      options: [
        { value: 'volledig-elektrisch', label: 'Volledig elektrisch' },
        { value: 'plug-in-hybrid', label: 'Plug-in hybrid' },
        { value: 'nog-geen-auto', label: 'Nog geen auto, wel voorbereiden' },
      ],
    },
    {
      id: 'laadpaal-locatie',
      label: 'Waar komt de laadpaal?',
      type: 'select',
      required: true,
      options: [
        { value: 'binnen', label: 'Binnen (garage/carport)' },
        { value: 'buiten', label: 'Buiten op eigen terrein' },
        { value: 'onbekend', label: 'Nog niet zeker' },
      ],
    },
    {
      id: 'laadpaal-meterkast',
      label: 'Is uw meterkast geschikt voor een laadpaal?',
      type: 'select',
      required: true,
      options: [
        { value: 'ja', label: 'Ja' },
        { value: 'nee', label: 'Nee' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
  ],
  'elektra-renovatie': [
    {
      id: 'elektra-pand',
      label: 'Soort object',
      type: 'select',
      required: true,
      options: [
        { value: 'eengezinswoning', label: 'Eengezinswoning' },
        { value: 'appartement', label: 'Appartement' },
        { value: 'utiliteit', label: 'Bedrijfs- of utiliteitspand' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'elektra-omvang',
      label: 'Omvang van de werkzaamheden',
      type: 'select',
      required: true,
      options: [
        { value: 'gedeeltelijk', label: 'Gedeeltelijk (enkele ruimtes)' },
        { value: 'volledig', label: 'Volledige renovatie' },
        { value: 'onduidelijk', label: 'Nog onduidelijk' },
      ],
    },
    {
      id: 'elektra-planning',
      label: 'Gewenste planning of bijzonderheden',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. startdatum, verbouwing loopt al, specifieke wensen',
    },
  ],
  storing: [
    {
      id: 'storing-probleem',
      label: 'Wat is het probleem?',
      type: 'textarea',
      required: true,
      placeholder: 'Beschrijf kort wat er mis is (bijv. stroomuitval, kortsluiting, defect stopcontact)',
    },
    {
      id: 'storing-nood',
      label: 'Is er sprake van een noodsituatie?',
      type: 'select',
      required: true,
      options: [
        { value: 'ja', label: 'Ja, direct hulp nodig' },
        { value: 'nee', label: 'Nee, kan wachten op afspraak' },
      ],
    },
    {
      id: 'storing-locatie',
      label: 'Waar in het pand?',
      type: 'text',
      required: false,
      placeholder: 'Bijv. keuken, meterkast, hele woning',
    },
  ],
  'airco-installatie': [
    {
      id: 'airco-ruimtes',
      label: 'Hoeveel ruimtes wilt u koelen?',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '1 ruimte' },
        { value: '2-3', label: '2–3 ruimtes' },
        { value: '4+', label: '4 of meer' },
      ],
    },
    {
      id: 'airco-type-ruimte',
      label: 'Type ruimte',
      type: 'select',
      required: true,
      options: [
        { value: 'woon-slaap', label: 'Woon- of slaapkamer' },
        { value: 'kantoor', label: 'Kantoor / thuiswerkplek' },
        { value: 'horeca-retail', label: 'Winkel of horeca' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'airco-buitenunit',
      label: 'Weet u al waar de buitenunit kan komen?',
      type: 'select',
      required: true,
      options: [
        { value: 'ja', label: 'Ja' },
        { value: 'nee', label: 'Nee, advies gewenst' },
        { value: 'onbekend', label: 'Nog niet nagedacht' },
      ],
    },
  ],
  'airco-onderhoud': [
    {
      id: 'airco-onderhoud-type',
      label: 'Waarvoor wilt u een afspraak?',
      type: 'select',
      required: true,
      options: [
        { value: 'periodiek', label: 'Periodiek onderhoud' },
        { value: 'storing', label: 'Storing of reparatie' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'airco-onderhoud-merk',
      label: 'Merk of type airco',
      type: 'text',
      required: false,
      placeholder: 'Bijv. Daikin, Mitsubishi, onbekend',
    },
    {
      id: 'airco-onderhoud-laatste',
      label: 'Wanneer was het laatste onderhoud?',
      type: 'select',
      required: true,
      options: [
        { value: '<1jaar', label: 'Minder dan 1 jaar geleden' },
        { value: '1-2jaar', label: '1–2 jaar geleden' },
        { value: '>2jaar', label: 'Langer dan 2 jaar geleden' },
        { value: 'onbekend', label: 'Weet ik niet / nooit' },
      ],
    },
    {
      id: 'airco-onderhoud-klacht',
      label: 'Klachten of opmerkingen',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. minder koeling, vreemd geluid, lekkage',
    },
  ],
  ventilatie: [
    {
      id: 'ventilatie-systeem',
      label: 'Type ventilatiesysteem',
      type: 'select',
      required: true,
      options: [
        { value: 'wtw', label: 'WTW (warmteterugwinning)' },
        { value: 'mechanisch', label: 'Mechanische ventilatie' },
        { value: 'decentraal', label: 'Decentraal (bijv. badkamer)' },
        { value: 'lbk', label: 'LBK / utiliteit' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'ventilatie-aanvraag',
      label: 'Wat heeft u nodig?',
      type: 'select',
      required: true,
      options: [
        { value: 'nieuw', label: 'Nieuwe installatie' },
        { value: 'onderhoud', label: 'Onderhoud of reparatie' },
        { value: 'vervanging', label: 'Vervanging bestaand systeem' },
      ],
    },
    {
      id: 'ventilatie-bijzonderheden',
      label: 'Bijzonderheden',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. type woning, bouwjaar, klachten',
    },
  ],
  camerabeveiliging: [
    {
      id: 'camera-situatie',
      label: 'Wat is de situatie?',
      type: 'select',
      required: true,
      options: [
        { value: 'nieuw', label: 'Nieuw camerasysteem' },
        { value: 'uitbreiding', label: 'Uitbreiding bestaand systeem' },
        { value: 'vervanging', label: 'Vervanging bestaand systeem' },
      ],
    },
    {
      id: 'camera-aantal',
      label: 'Hoeveel camera\'s heeft u nodig?',
      type: 'select',
      required: true,
      options: [
        { value: '1-2', label: '1–2 camera\'s' },
        { value: '3-4', label: '3–4 camera\'s' },
        { value: '5+', label: '5 of meer' },
        { value: 'onbekend', label: 'Advies gewenst' },
      ],
    },
    {
      id: 'camera-locatie',
      label: 'Waar komen de camera\'s?',
      type: 'select',
      required: true,
      options: [
        { value: 'binnen', label: 'Alleen binnen' },
        { value: 'buiten', label: 'Alleen buiten' },
        { value: 'beide', label: 'Binnen én buiten' },
      ],
    },
    {
      id: 'camera-doel',
      label: 'Wat wilt u bewaken?',
      type: 'text',
      required: true,
      placeholder: 'Bijv. voordeur, parkeerplaats, magazijn',
    },
  ],
  'technisch-vastgoedbeheer': [
    {
      id: 'vastgoed-eenheden',
      label: 'Aantal panden of eenheden',
      type: 'text',
      required: true,
      placeholder: 'Bijv. 12 appartementen, 3 bedrijfspanden',
    },
    {
      id: 'vastgoed-type',
      label: 'Soort vastgoed',
      type: 'select',
      required: true,
      options: [
        { value: 'wooncomplex', label: 'Wooncomplex / appartementen' },
        { value: 'kantoor-retail', label: 'Kantoor of retail' },
        { value: 'gemengd', label: 'Gemengd portfolio' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'vastgoed-dienst',
      label: 'Welke diensten zoekt u?',
      type: 'textarea',
      required: true,
      placeholder: 'Bijv. periodieke inspecties, storingsdienst, onderhoudsplanning',
    },
  ],
}

export function getOfferteQuestions(categoryId: OfferteCategoryId): OfferteQuestion[] {
  return offerteQuestionsByCategory[categoryId] ?? []
}

export const OFFERTE_STORING_EMERGENCY_QUESTION_ID = 'storing-nood'
export const OFFERTE_STORING_EMERGENCY_VALUE = 'ja'

export function isOfferteStoringEmergency(answers: Record<string, string>): boolean {
  return answers[OFFERTE_STORING_EMERGENCY_QUESTION_ID] === OFFERTE_STORING_EMERGENCY_VALUE
}

export function validateOfferteQuestionAnswers(
  questions: OfferteQuestion[],
  answers: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const question of questions) {
    if (!question.required) continue
    const value = answers[question.id]?.trim() ?? ''
    if (!value) {
      errors[question.id] = `${question.label} is verplicht`
    }
  }

  return errors
}

export function getOfferteAnswerLabel(question: OfferteQuestion, value: string): string {
  if (question.type === 'select' && question.options) {
    return question.options.find((option) => option.value === value)?.label ?? value
  }
  return value
}
