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
        { value: 'uitbreiding', label: 'Extra stopcontacten of schakelingen' },
        { value: 'vernieuwing', label: 'Hele meterkast vervangen' },
        { value: '3-fase', label: 'Extra stroom voor laadpaal of warmtepomp' },
        { value: 'anders', label: 'Anders / weet ik nog niet' },
      ],
    },
    {
      id: 'meterkast-groepen',
      label: 'Hoeveel groepen heeft u in uw groepenkast?',
      type: 'select',
      required: true,
      options: [
        { value: '1-4', label: '1-4 groepen' },
        { value: '5-8', label: '5-8 groepen' },
        { value: '9+', label: '9 groepen of meer' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'meterkast-bijzonderheden',
      label: 'Nog iets wat we moeten weten?',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. zonnepanelen, warmtepomp of laadpaal gepland',
    },
  ],
  laadpaal: [
    {
      id: 'laadpaal-auto',
      label: 'Wat voor auto heeft u (of plant u)?',
      type: 'select',
      required: true,
      options: [
        { value: 'volledig-elektrisch', label: 'Volledig op stroom' },
        { value: 'plug-in-hybrid', label: 'Hybride (benzine en stroom)' },
        { value: 'nog-geen-auto', label: 'Nog geen auto, wel voorbereiden' },
      ],
    },
    {
      id: 'laadpaal-locatie',
      label: 'Waar moet de laadpaal komen?',
      type: 'select',
      required: true,
      options: [
        { value: 'binnen', label: 'Binnen (garage of carport)' },
        { value: 'buiten', label: 'Buiten op eigen terrein' },
        { value: 'onbekend', label: 'Nog niet zeker' },
      ],
    },
    {
      id: 'laadpaal-meterkast',
      label: 'Weet u of uw meterkast geschikt is voor een laadpaal?',
      type: 'select',
      required: true,
      helpText: 'Twijfelt u? Kies "Weet ik niet", wij kijken graag met u mee.',
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
      label: 'Waar gaat het om?',
      type: 'select',
      required: true,
      options: [
        { value: 'eengezinswoning', label: 'Eengezinswoning' },
        { value: 'appartement', label: 'Appartement' },
        { value: 'utiliteit', label: 'Bedrijf, winkel of kantoor' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'elektra-omvang',
      label: 'Hoeveel wilt u laten doen?',
      type: 'select',
      required: true,
      options: [
        { value: 'gedeeltelijk', label: 'Een deel van het huis of pand' },
        { value: 'volledig', label: 'Alles vernieuwen' },
        { value: 'onduidelijk', label: 'Nog niet zeker' },
      ],
    },
    {
      id: 'elektra-planning',
      label: 'Planning of andere wensen',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. wanneer u wilt starten, verbouwing is al begonnen',
    },
  ],
  storing: [
    {
      id: 'storing-probleem',
      label: 'Wat is er aan de hand?',
      type: 'textarea',
      required: true,
      placeholder: 'Bijv. stroom valt uit, stopcontact werkt niet, lamp doet het niet',
    },
    {
      id: 'storing-nood',
      label: 'Heeft u nu meteen hulp nodig?',
      type: 'select',
      required: true,
      options: [
        { value: 'ja', label: 'Ja, graag zo snel mogelijk' },
        { value: 'nee', label: 'Nee, een afspraak is prima' },
      ],
    },
    {
      id: 'storing-locatie',
      label: 'In welke ruimte?',
      type: 'text',
      required: false,
      placeholder: 'Bijv. keuken, meterkast, hele woning',
    },
  ],
  'airco-installatie': [
    {
      id: 'airco-ruimtes',
      label: 'Hoeveel kamers wilt u koelen?',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '1 kamer' },
        { value: '2-3', label: '2-3 kamers' },
        { value: '4+', label: '4 of meer' },
      ],
    },
    {
      id: 'airco-type-ruimte',
      label: 'Wat voor ruimte is het?',
      type: 'select',
      required: true,
      options: [
        { value: 'woon-slaap', label: 'Woon- of slaapkamer' },
        { value: 'kantoor', label: 'Kantoor of thuiswerkplek' },
        { value: 'horeca-retail', label: 'Winkel of horeca' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'airco-buitenunit',
      label: 'Weet u al waar het buitendeel kan hangen?',
      type: 'select',
      required: true,
      helpText: 'Het buitendeel is het kastje dat buiten aan de muur komt.',
      options: [
        { value: 'ja', label: 'Ja' },
        { value: 'nee', label: 'Nee, graag advies' },
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
        { value: 'periodiek', label: 'Regulier onderhoud' },
        { value: 'storing', label: 'Er is iets kapot of het werkt niet goed' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'airco-onderhoud-merk',
      label: 'Weet u wel merk airco u heeft?',
      type: 'text',
      required: false,
      placeholder: 'Staat vaak op een sticker op het apparaat',
      helpText: 'Geen probleem als u het niet weet.',
    },
    {
      id: 'airco-onderhoud-laatste',
      label: 'Wanneer is de airco voor het laatst onderhouden?',
      type: 'select',
      required: true,
      options: [
        { value: '<1jaar', label: 'Minder dan 1 jaar geleden' },
        { value: '1-2jaar', label: '1-2 jaar geleden' },
        { value: '>2jaar', label: 'Langer dan 2 jaar geleden' },
        { value: 'onbekend', label: 'Weet ik niet / nooit' },
      ],
    },
    {
      id: 'airco-onderhoud-klacht',
      label: 'Wat merkt u aan de airco?',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. koelt minder goed, maakt geluid, lekt water',
    },
  ],
  ventilatie: [
    {
      id: 'ventilatie-systeem',
      label: 'Welk ventilatiesysteem heeft u (of wilt u)?',
      type: 'select',
      required: true,
      options: [
        { value: 'wtw', label: 'WTW: ventilatie die warmte terugwint' },
        { value: 'mechanisch', label: 'Ventilatie via roosters in huis' },
        { value: 'decentraal', label: 'Alleen in één ruimte (bijv. badkamer)' },
        { value: 'lbk', label: 'Groot systeem in bedrijfspand' },
        { value: 'onbekend', label: 'Weet ik niet' },
      ],
    },
    {
      id: 'ventilatie-aanvraag',
      label: 'Wat zoekt u?',
      type: 'select',
      required: true,
      options: [
        { value: 'nieuw', label: 'Nieuw systeem laten plaatsen' },
        { value: 'onderhoud', label: 'Onderhoud of reparatie' },
        { value: 'vervanging', label: 'Oud systeem vervangen' },
      ],
    },
    {
      id: 'ventilatie-bijzonderheden',
      label: 'Nog iets wat we moeten weten?',
      type: 'textarea',
      required: false,
      placeholder: 'Bijv. type woning, bouwjaar, vieze lucht of vochtproblemen',
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
        { value: 'uitbreiding', label: 'Camera\'s toevoegen aan bestaande installatie' },
        { value: 'vervanging', label: 'Oud systeem vervangen' },
      ],
    },
    {
      id: 'camera-aantal',
      label: 'Hoeveel camera\'s heeft u nodig?',
      type: 'select',
      required: true,
      options: [
        { value: '1-2', label: '1-2 camera\'s' },
        { value: '3-4', label: '3-4 camera\'s' },
        { value: '5+', label: '5 of meer' },
        { value: 'onbekend', label: 'Graag advies' },
      ],
    },
    {
      id: 'camera-locatie',
      label: 'Waar moeten de camera\'s komen?',
      type: 'select',
      required: true,
      options: [
        { value: 'binnen', label: 'Alleen binnen' },
        { value: 'buiten', label: 'Alleen buiten' },
        { value: 'beide', label: 'Binnen en buiten' },
      ],
    },
    {
      id: 'camera-doel',
      label: 'Wat wilt u in de gaten houden?',
      type: 'text',
      required: true,
      placeholder: 'Bijv. voordeur, oprit, magazijn',
    },
  ],
  'technisch-vastgoedbeheer': [
    {
      id: 'vastgoed-eenheden',
      label: 'Hoeveel panden of woningen?',
      type: 'text',
      required: true,
      placeholder: 'Bijv. 12 appartementen of 3 winkels',
    },
    {
      id: 'vastgoed-type',
      label: 'Wat voor panden zijn het?',
      type: 'select',
      required: true,
      options: [
        { value: 'wooncomplex', label: 'Appartementen of woningen' },
        { value: 'kantoor-retail', label: 'Kantoor of winkel' },
        { value: 'gemengd', label: 'Mix van woningen en bedrijfspanden' },
        { value: 'anders', label: 'Anders' },
      ],
    },
    {
      id: 'vastgoed-dienst',
      label: 'Waar kunnen wij u mee helpen?',
      type: 'textarea',
      required: true,
      placeholder: 'Bijv. regelmatig onderhoud, snel hulp bij storingen, inspecties',
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
