import type { SiteImageKey } from '@/lib/images'
import { getProjectImageKey, isSiteImageKey } from '@/lib/images'

export interface Project {
  id: string
  category: 'Elektra' | 'Laadpaal' | 'Airconditioning' | 'Ventilatie' | "Camera's" | 'Vastgoed'
  city: string
  title: string
  description: string
  details: string
  resultaat: string
}

export const projectCategories = [
  'Alle',
  'Elektra',
  'Laadpaal',
  'Airconditioning',
  'Ventilatie',
  "Camera's",
  'Vastgoed',
] as const
export type ProjectCategory = (typeof projectCategories)[number]

/** Doel aantallen per categorie: Elektra 4, Laadpaal 3, Airco 3, overige 1. */
export const allProjects: Project[] = [
  // Elektra (4)
  {
    id: 'elektra-zwijndrecht-meterkast',
    category: 'Elektra',
    city: 'Zwijndrecht',
    title: 'Volledige herinstallatie meterkast',
    description: 'Groepenkast vervangen na waterschade.',
    details:
      'Na waterschade in de meterkast hebben wij de volledige groepenkast vervangen, inclusief aardlekschakelaars en bekabeling waar nodig. Na afloop is een NEN-gecertificeerde keuring uitgevoerd zodat de installatie weer veilig en conform norm is.',
    resultaat: 'Veilige NEN-gecertificeerde installatie.',
  },
  {
    id: 'elektra-rotterdam-nieuwbouw',
    category: 'Elektra',
    city: 'Rotterdam',
    title: 'Complete elektra nieuwbouwwoning',
    description: 'Volledige elektrische aanleg inclusief laadpaal-aansluiting.',
    details:
      'Voor deze nieuwbouwwoning hebben wij de complete elektra-installatie verzorgd: groepenkast, bekabeling, stopcontacten, verlichtingspunten en een laadpaal-aansluiting. Alles afgestemd op het bouwplan en opgeleverd binnen de afgesproken opleverdatum.',
    resultaat: 'Gebruiksklare installatie opgeleverd binnen planning.',
  },
  {
    id: 'elektra-ridderkerk-groepenkast',
    category: 'Elektra',
    city: 'Ridderkerk',
    title: 'Groepenkast moderniseren',
    description: 'Oude groepenkast vervangen met aardlekbeveiliging en groepenverklaring.',
    details:
      'Verouderde groepenkast vervangen door een moderne installatie met voldoende groepen, aardlekbeveiliging en nette oplevering. Inclusief controle van de bestaande bedrading en oplevering met groepenverklaring.',
    resultaat: 'Veilige, overzichtelijke meterkast klaar voor de toekomst.',
  },
  {
    id: 'elektra-dordrecht-verlichting',
    category: 'Elektra',
    city: 'Zwijndrecht',
    title: 'Vervanging van een groepenkast na waterschade',
    description:
      'Na waterschade aan de meterkast hebben wij de beschadigde groepenkast veilig buiten bedrijf gesteld en volledig vervangen. De nieuwe groepenkast is voorzien van moderne beveiligingen, zorgvuldig aangesloten en uitgebreid getest, zodat de elektrische installatie weer veilig en betrouwbaar functioneert.',
    details:
      'Na waterschade aan de meterkast hebben wij de beschadigde groepenkast veilig buiten bedrijf gesteld en volledig vervangen. De nieuwe groepenkast is voorzien van moderne beveiligingen, zorgvuldig aangesloten en uitgebreid getest, zodat de elektrische installatie weer veilig en betrouwbaar functioneert.',
    resultaat:
      'De woning beschikt weer over een veilige en volledig bedrijfszekere groepenkast, waardoor de stroomvoorziening betrouwbaar is hersteld.',
  },

  // Laadpaal (3)
  {
    id: 'laadpaal-dordrecht-bedrijf',
    category: 'Laadpaal',
    city: 'Dordrecht',
    title: 'Laadpaal installatie bedrijfspand',
    description: 'Drie laadpalen geplaatst met dynamic loadbalancing.',
    details:
      'Drie laadpalen geïnstalleerd op het parkeerterrein van een bedrijfspand, gekoppeld via dynamic loadbalancing zodat het totale vermogen binnen de capaciteit van de aansluiting blijft. Inclusief bekabeling, groepenkast-uitbreiding en gebruikersinstructie voor medewerkers.',
    resultaat: "Medewerkers kunnen elektrische auto's opladen tijdens werktijd.",
  },
  {
    id: 'laadpaal-zwijndrecht-thuis',
    category: 'Laadpaal',
    city: 'Papendrecht',
    title: 'Installatie van een zakelijke Alfen-laadpaal met Siemens load balancing',
    description:
      'Voor een zakelijke klant hebben wij een Alfen-laadpaal geïnstalleerd voor dagelijks zakelijk gebruik. De installatie is voorzien van Siemens load balancing, waardoor het beschikbare vermogen automatisch wordt verdeeld en overbelasting van de elektrische installatie wordt voorkomen. De laadoplossing is volledig afgestemd op de bestaande elektrische installatie en voorbereid op toekomstig gebruik.',
    details:
      'Voor een zakelijke klant hebben wij een Alfen-laadpaal geïnstalleerd voor dagelijks zakelijk gebruik. De installatie is voorzien van Siemens load balancing, waardoor het beschikbare vermogen automatisch wordt verdeeld en overbelasting van de elektrische installatie wordt voorkomen. De laadoplossing is volledig afgestemd op de bestaande elektrische installatie en voorbereid op toekomstig gebruik.',
    resultaat:
      'De klant beschikt nu over een veilige, slimme en toekomstbestendige laadoplossing die betrouwbaar functioneert en het beschikbare vermogen optimaal benut.',
  },
  {
    id: 'laadpaal-barendrecht-zakelijk',
    category: 'Laadpaal',
    city: 'Barendrecht',
    title: 'Zakelijke laadpunten op kantoor',
    description: 'Twee laadpunten voor medewerkers en bezoekers.',
    details:
      'Twee laadpunten geïnstalleerd bij een kantoorlocatie, inclusief planning van kabelroutes en oplevering met korte instructie voor gebruikers.',
    resultaat: 'Laadvoorziening klaar voor dagelijks zakelijk gebruik.',
  },

  // Airconditioning (3)
  {
    id: 'airco-rotterdam-schilderij',
    category: 'Airconditioning',
    city: 'Rotterdam',
    title: 'LG Schilderij airco-unit woning',
    description: 'Nieuwe unit geplaatst op bestaande muur, creatieve oplossing voor beperkte ruimte.',
    details:
      'In een woning met beperkte muurruimte hebben wij een LG Schilderij-unit geplaatst als esthetische oplossing. Leidingwerk discreet weggewerkt en buitenunit op het platte dak gemonteerd in samenwerking met de dakdekker.',
    resultaat: 'Strakke afwerking, klant zeer tevreden.',
  },
  {
    id: 'airco-rotterdam-mitsubishi',
    category: 'Airconditioning',
    city: 'Rotterdam',
    title: '3x Mitsubishi Heavy airco-units',
    description: 'Drie units op plat dak, samenwerking met dakdekker.',
    details:
      'Drie binnenunits met bijbehorende buitenunits op een plat dak geplaatst. Koelleidingen netjes weggewerkt, condensafvoer aangesloten en systeem gekoppeld aan de app van de klant voor bediening per verdieping.',
    resultaat: 'Comfortabel binnenklimaat alle verdiepingen, app-gestuurd.',
  },
  {
    id: 'airco-zwijndrecht-kantoor',
    category: 'Airconditioning',
    city: 'Zwijndrecht',
    title: 'Klimaatbeheersing kantoorruimte',
    description: 'Multisplit-systeem voor open kantoor van 200m2.',
    details:
      'Multisplit airconditioningsysteem ontworpen en geïnstalleerd voor een open kantoorruimte van circa 200 m². Zones ingesteld voor efficiënt koelen en verwarmen, met aandacht voor geluidsniveau tijdens kantooruren.',
    resultaat: 'Stabiele temperatuur het hele jaar, lagere energiekosten.',
  },

  // Ventilatie (1)
  {
    id: 'ventilatie-ridderkerk-wtw',
    category: 'Ventilatie',
    city: 'Ridderkerk',
    title: 'Vervangen WTW-unit en leidingen',
    description: 'Oude WTW vervangen, leidingen vernieuwd.',
    details:
      'Verouderde WTW-unit vervangen door een modern systeem met hogere rendement. Ventilatiekanalen geïnspecteerd en waar nodig vernieuwd. Afstelling uitgevoerd voor optimale luchtwisseling en comfort.',
    resultaat: 'Betere luchtkwaliteit, lagere stookkosten.',
  },

  // Camera's (1)
  {
    id: 'cameras-almere-woning',
    category: "Camera's",
    city: 'Almere',
    title: 'Camerabeveiliging woning',
    description: 'Volledig systeem met app-koppeling.',
    details:
      'Camerasysteem geïnstalleerd rondom de woning met app-koppeling, pushmeldingen bij bewegingsdetectie en opname op lokaal NVR-systeem. Installatie AVG-conform uitgevoerd met duidelijke uitleg aan de bewoners.',
    resultaat: '24/7 live zicht via smartphone.',
  },

  // Vastgoed (1)
  {
    id: 'vastgoed-rotterdam-onderhoudscontract',
    category: 'Vastgoed',
    city: 'Rotterdam',
    title: 'Preventief technisch vastgoedonderhoud voor een bedrijfspand',
    description:
      'Voor een zakelijke opdrachtgever hebben wij het periodieke technische onderhoud uitgevoerd aan een bedrijfspand. De werkzaamheden bestonden uit het controleren en onderhouden van de elektrotechnische installaties, verlichting, ventilatie en algemene technische voorzieningen. Eventuele gebreken zijn direct verholpen om storingen te voorkomen en de bedrijfscontinuïteit te waarborgen.',
    details:
      'Voor een zakelijke opdrachtgever hebben wij het periodieke technische onderhoud uitgevoerd aan een bedrijfspand. De werkzaamheden bestonden uit het controleren en onderhouden van de elektrotechnische installaties, verlichting, ventilatie en algemene technische voorzieningen. Eventuele gebreken zijn direct verholpen om storingen te voorkomen en de bedrijfscontinuïteit te waarborgen.',
    resultaat:
      'Dankzij het preventieve onderhoud verkeren de technische installaties weer in optimale staat en is de kans op onverwachte storingen aanzienlijk verminderd.',
  },
]

export function getProjectImageKeyForProject(project: Project): SiteImageKey {
  const key = `project.${project.id}`
  return isSiteImageKey(key) ? key : getProjectImageKey(project.category)
}

export type ProjectImageSource = {
  src: string | null
  alt: string
}

export function filterProjects(category: ProjectCategory): Project[] {
  if (category === 'Alle') return allProjects
  return allProjects.filter((project) => project.category === category)
}
