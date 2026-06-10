export interface Review {
  quote: string
  name: string
  platform: string
}

const reviewCatalog = {
  mohammedAirco: {
    quote:
      'Snel gereageerd en netjes geïnstalleerd. Airco werkt perfect en de afwerking was keurig. Zeker een aanrader!',
    name: 'Mohammed A.',
    platform: 'Google',
  },
  sandraElektra: {
    quote: 'Vakkundige monteurs, duidelijke communicatie en op tijd. Groepenkast is perfect vervangen.',
    name: 'Sandra V.',
    platform: 'Werkspot',
  },
  peterSpoed: {
    quote: 'Ook op zaterdagavond nog bereikbaar voor een storingsmelding. Binnen 2 uur was het opgelost.',
    name: 'Peter K.',
    platform: 'Google',
  },
  janElektra: {
    quote: 'Snel geholpen bij een storing. Binnen een uur ter plaatse en het probleem was opgelost. Zeer tevreden!',
    name: 'Jan de B.',
    platform: 'Google',
  },
  rachidAirco: {
    quote:
      'Drie airco-units geplaatst in ons kantoor. Vakkundig werk, nette afwerking en alles snel in bedrijf gesteld.',
    name: 'Rachid K.',
    platform: 'Werkspot',
  },
  lisaAirco: {
    quote: 'Prachtige installatie van onze airco. Duidelijk advies vooraf en alles netjes afgewerkt.',
    name: 'Lisa H.',
    platform: 'Google',
  },
  karinVentilatie: {
    quote:
      'WTW-systeem perfect geïnstalleerd. Merkbaar betere luchtkwaliteit in huis en de energierekening is gedaald.',
    name: 'Karin M.',
    platform: 'Google',
  },
  thomasVentilatie: {
    quote: 'Professioneel advies over ventilatie in ons kantoor. Nette installatie en goede uitleg over gebruik.',
    name: 'Thomas V.',
    platform: 'Werkspot',
  },
  familieCameras: {
    quote:
      'Camerasysteem netjes geïnstalleerd met app-koppeling. Kan nu altijd live meekijken. Aanrader!',
    name: 'Familie W.',
    platform: 'Google',
  },
  bedrijfCameras: {
    quote: 'Acht buitencameras geplaatst voor ons bedrijfspand. AVG-conform, professioneel en vlot uitgevoerd.',
    name: 'Bedrijf Rotterdam',
    platform: 'Werkspot',
  },
  bakkerVastgoed: {
    quote:
      'KMS verzorgt het technisch beheer van ons pand al twee jaar. Altijd professioneel en op tijd.',
    name: 'R. Bakker',
    platform: 'Google',
  },
  vveVastgoed: {
    quote: 'Betrouwbare partner voor ons vastgoedbeheer. Vaste contactpersoon, duidelijke rapportage en altijd op tijd.',
    name: 'VvE De Hoek',
    platform: 'Werkspot',
  },
} as const satisfies Record<string, Review>

type ReviewKey = keyof typeof reviewCatalog

function pickReviews(...keys: ReviewKey[]): Review[] {
  return keys.map((key) => reviewCatalog[key])
}

/** Per-page review sets — no overlap between home, elektra, and over-ons. */
export const pageReviews = {
  home: pickReviews('mohammedAirco', 'sandraElektra', 'peterSpoed'),
  elektra: pickReviews('janElektra', 'thomasVentilatie'),
  airconditioning: pickReviews('rachidAirco', 'lisaAirco'),
  ventilatie: pickReviews('karinVentilatie', 'thomasVentilatie'),
  cameras: pickReviews('familieCameras', 'bedrijfCameras'),
  vastgoedbeheer: pickReviews('bakkerVastgoed', 'vveVastgoed'),
  overOns: pickReviews('bakkerVastgoed', 'karinVentilatie', 'janElektra', 'bedrijfCameras'),
} as const
