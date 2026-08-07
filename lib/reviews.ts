export interface Review {
  quote: string
  name: string
  platform: string
}

/** Alleen echte publieke reviews (Google via Trustoo / Trustoo). Geen verzonnen teksten. */
const reviewCatalog = {
  johnOoijenAirco: {
    quote:
      'Geweldige service en ter zake kundig. Airco unit buiten en binnen netjes en goed schoongemaakt. Fijne communicatie en komt afspraken snel na. Gaan we volgende keer zeker weer bellen voor onderhoud!',
    name: 'John Ooijen',
    platform: 'Google',
  },
  joyceBolandAirco: {
    quote:
      'Snelle hulp bij het verhelpen van de problemen met mijn airco. Vriendelijke en professionele monteur plus goede klantenservice aan de telefoon en via WhatsApp. Zeer tevreden klant.',
    name: 'Joyce Boland',
    platform: 'Google',
  },
  aronGorlitzAirco: {
    quote:
      'Begin van de avond helaas plots een lekkende airco-unit. Via Werkspot een berichtje gepost, KMS Installaties was de eerste die reageerde. Binnen twee uur was er met spoed een monteur, heeft een klein uurtje eraan gewerkt voor een schappelijke prijs. Topservice!',
    name: 'Aron Gorlitz',
    platform: 'Google',
  },
  raymonVanDissel: {
    quote:
      'Wij hebben super snel reactie gekregen op onze aanvraag. Nette medewerkers. Goede service en denken met je mee. Zeker aan te bevelen, Raymon en Mirjam.',
    name: 'Raymon van Dissel',
    platform: 'Google',
  },
  sereeparpAirco: {
    quote:
      'They were willing to come late in the evening to fix the issue with our airco. The mechanic did the job thoroughly and professionally. He was also friendly and took the time to explain the issue to me. Overall I had a very positive experience and would recommend the company.',
    name: 'Sereeparp',
    platform: 'Google',
  },
  fransBinnenheiElektra: {
    quote:
      'Wij hebben een zeer goede ervaring. Op verzoek langs gekomen ondanks de afstand die wij wonen van KMS. Een ronde gemaakt en duidelijke uitleg gekregen van de benodigde werkzaamheden. In dit geval een meterkast vervangen en uitbreiden, plaatsen van extra stopcontacten en airco. Afgezien van heldere afspraken en verwachtingen waren zij op tijd en hebben de werkzaamheden op een goede wijze afgerond. Netjes alles schoon en opgeruimd opgeleverd. Een heldere uitleg van nieuwe apparatuur gekregen. Een van de weinige bedrijven die ook de nazorg belangrijk vindt. Een aanrader!',
    name: 'Frans Binnenhei',
    platform: 'Trustoo',
  },
  anneMarieBrok: {
    quote:
      'Heel erg tevreden over het uitgevoerde werk. Communicatie is snel en efficiënt. Ze zijn kundig, werken netjes en doen wat er afgesproken is. Bij ons hebben ze meterkast vernieuwd, laadpunt voor EV aangelegd, stroomvoorziening naar garage aangelegd en 8 zonnepanelen geplaatst. En tot slot, het zijn erg vriendelijke mensen.',
    name: 'Anne-Marie Brok',
    platform: 'Trustoo',
  },
  jrRondhuisLaadpaal: {
    quote:
      'Korte tijd tussen aanvraag en installatie laadpaal. Kwamen afspraken keurig na. Gingen pas weg nadat alles was uitgelegd en vastgesteld was dat alles werkt. Alle rommel werd ook opgeruimd. Kortom een aanrader.',
    name: 'JR Rondhuis',
    platform: 'Trustoo',
  },
  bertEvertseLaadpaal: {
    quote:
      'De mannen van KMS hebben goed werk afgeleverd. Ze hebben bij mij een laadpaal geïnstalleerd. En die doet het prima. Bedankt mannen.',
    name: 'Bert Evertse',
    platform: 'Trustoo',
  },
  enesTrustoo: {
    quote:
      'Heel tevreden over het resultaat. Werken strak, denken mee en laten alles netjes achter. Echte vakmannen!',
    name: 'Enes',
    platform: 'Trustoo',
  },
  jacquelineTrustoo: {
    quote: 'Reageren erg snel, goede communicatie en werken netjes. Zijn erg tevreden.',
    name: 'Jacqueline',
    platform: 'Trustoo',
  },
  danielVanKampenAirco: {
    quote:
      'Topservice van begin tot eind! De airco is vakkundig en snel geïnstalleerd en werkt perfect. Alles werd schoon en netjes achtergelaten. Erg blij met het resultaat!',
    name: 'Daniel van Kampen',
    platform: 'Trustoo',
  },
  raymonTrustooShort: {
    quote: 'Komen afspraken na, werken netjes.',
    name: 'Raymon',
    platform: 'Trustoo',
  },
} as const satisfies Record<string, Review>

type ReviewKey = keyof typeof reviewCatalog

function pickReviews(...keys: ReviewKey[]): Review[] {
  return keys.map((key) => reviewCatalog[key])
}

/**
 * Per-page review sets.
 * Let op: publiek zijn er (nog) geen specifieke reviews over alleen ventilatie,
 * camera's of vastgoed. Op die pagina's staan daarom andere echte algemene reviews.
 */
export const pageReviews = {
  home: pickReviews('johnOoijenAirco', 'jrRondhuisLaadpaal', 'raymonVanDissel'),
  elektra: pickReviews('fransBinnenheiElektra', 'anneMarieBrok', 'enesTrustoo'),
  laadpaal: pickReviews('jrRondhuisLaadpaal', 'anneMarieBrok', 'bertEvertseLaadpaal'),
  airconditioning: pickReviews('johnOoijenAirco', 'joyceBolandAirco', 'aronGorlitzAirco'),
  ventilatie: pickReviews('jacquelineTrustoo', 'enesTrustoo', 'raymonTrustooShort'),
  cameras: pickReviews('jacquelineTrustoo', 'raymonTrustooShort', 'raymonVanDissel'),
  vastgoedbeheer: pickReviews('enesTrustoo', 'jacquelineTrustoo', 'anneMarieBrok'),
  overOns: pickReviews('joyceBolandAirco', 'aronGorlitzAirco', 'danielVanKampenAirco', 'sereeparpAirco'),
} as const
