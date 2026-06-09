import type { SiteImageKey } from '@/lib/images'
import { getProjectImageKey } from '@/lib/images'

export interface Project {
  id: string
  category: 'Elektra' | 'Airconditioning' | 'Ventilatie' | "Camera's" | 'Vastgoed'
  city: string
  title: string
  description: string
  details: string
  resultaat: string
}

export const projectCategories = ['Alle', 'Elektra', 'Airconditioning', 'Ventilatie', "Camera's", 'Vastgoed'] as const
export type ProjectCategory = (typeof projectCategories)[number]

export const allProjects: Project[] = [
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
    description: 'Volledige elektrische aanleg inclusief laadpaal.',
    details:
      'Voor deze nieuwbouwwoning hebben wij de complete elektra-installatie verzorgd: groepenkast, bekabeling, stopcontacten, verlichtingspunten en een laadpaal-aansluiting. Alles afgestemd op het bouwplan en opgeleverd binnen de afgesproken opleverdatum.',
    resultaat: 'Gebruiksklare installatie opgeleverd binnen planning.',
  },
  {
    id: 'elektra-dordrecht-laadpalen',
    category: 'Elektra',
    city: 'Dordrecht',
    title: 'Laadpaal installatie bedrijfspand',
    description: 'Drie laadpalen geplaatst met dynamic loadbalancing.',
    details:
      'Drie laadpalen geïnstalleerd op het parkeerterrein van een bedrijfspand, gekoppeld via dynamic loadbalancing zodat het totale vermogen binnen de capaciteit van de aansluiting blijft. Inclusief bekabeling, groepenkast-uitbreiding en gebruikersinstructie voor medewerkers.',
    resultaat: 'Medewerkers kunnen elektrische auto\'s opladen tijdens werktijd.',
  },
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
  {
    id: 'ventilatie-dordrecht-nieuwbouw',
    category: 'Ventilatie',
    city: 'Dordrecht',
    title: 'Mechanische ventilatie nieuwbouw',
    description: 'Volledig ventilatiesysteem aangelegd.',
    details:
      'Compleet mechanisch ventilatiesysteem aangelegd in een nieuwbouwwoning, inclusief kanalen, roosters en afstelling per ruimte. Installatie voldoet aan het bouwbesluit en is afgestemd op de indeling van de woning.',
    resultaat: 'Frisse lucht in elke ruimte, voldoet aan bouwbesluit.',
  },
  {
    id: 'ventilatie-rotterdam-lbk',
    category: 'Ventilatie',
    city: 'Rotterdam',
    title: 'Jaarlijks onderhoud LBK utiliteit',
    description: 'Filters vervangen, GBS gecontroleerd.',
    details:
      'Jaarlijks onderhoud uitgevoerd aan een luchtbehandelingskast (LBK) in een utiliteitsgebouw. Filters vervangen, componenten gecontroleerd en rapportage opgeleverd voor de facility manager.',
    resultaat: 'Optimale luchtkwaliteit gegarandeerd voor komend jaar.',
  },
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
  {
    id: 'cameras-rotterdam-bedrijf',
    category: "Camera's",
    city: 'Rotterdam',
    title: 'Camerasysteem bedrijfspand',
    description: '8 cameras buiten, NVR-systeem, bewegingsdetectie.',
    details:
      'Acht buitencamera\'s geplaatst met nachtzicht, centraal NVR-systeem en zones ingesteld voor bewegingsdetectie. Bekabeling netjes weggewerkt en afgestemd op de beveiligingswensen van de eigenaar.',
    resultaat: 'Volledig beveiligd pand, AVG-conform geregistreerd.',
  },
  {
    id: 'cameras-zwijndrecht-parkeer',
    category: "Camera's",
    city: 'Zwijndrecht',
    title: 'Beveiliging parkeerterrein',
    description: '6 cameras met nachtzicht en app-bediening.',
    details:
      'Zes camera\'s geïnstalleerd op een parkeerterrein met nachtzicht en bediening via app. Strategische plaatsing voor volledige dekking van in- en uitgangen, met opname en meldingen bij ongewenst gedrag.',
    resultaat: 'Incidenten op parkeerterrein significant afgenomen.',
  },
  {
    id: 'vastgoed-rotterdam-onderhoudscontract',
    category: 'Vastgoed',
    city: 'Rotterdam',
    title: 'Onderhoudscontract kantoorpand',
    description: 'Vaste storingsdienst en periodiek technisch onderhoud.',
    details:
      'Voor een kantoorpand in Rotterdam hebben wij een onderhoudscontract opgesteld met vaste storingsdienst, periodieke inspecties van elektra en klimaatinstallaties en een duidelijke rapportage voor de facility manager. Storingen worden binnen afgesproken responstijden opgepakt.',
    resultaat: 'Pand technisch betrouwbaar, eigenaar volledig ontzorgd.',
  },
  {
    id: 'vastgoed-dordrecht-vve',
    category: 'Vastgoed',
    city: 'Dordrecht',
    title: 'Technisch beheer appartementencomplex',
    description: 'Onderhoud lift, ventilatie en gemeenschappelijke installaties.',
    details:
      'Technisch beheer voor een appartementencomplex: coördinatie van onderhoud aan liftinstallatie, mechanische ventilatie in trappenhuizen en periodieke keuringen van gemeenschappelijke elektra. VvE ontvangt overzichtelijke planning en rapportages.',
    resultaat: 'VvE heeft één aanspreekpunt voor alle technische zaken.',
  },
]

export function getProjectImageKeyForProject(project: Project): SiteImageKey {
  return getProjectImageKey(project.category)
}

export function filterProjects(category: ProjectCategory): Project[] {
  if (category === 'Alle') return allProjects
  return allProjects.filter((project) => project.category === category)
}
