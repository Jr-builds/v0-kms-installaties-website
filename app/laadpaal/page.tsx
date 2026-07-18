import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.laadpaal
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ServiceHero from '@/components/service-hero'
import DienstenGrid from '@/components/diensten-grid'
import WaaromKMS from '@/components/waarom-kms'
import MerkLogos from '@/components/merklogos'
import Reviews from '@/components/reviews'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'
import { pageReviews } from '@/lib/reviews'
import { serviceAreaInPhrase } from '@/lib/service-area'

const dienstenCards = [
  {
    imageKey: 'laadpaal.thuis' as const,
    imageLabel: 'Foto: thuislaadpaal installatie',
    title: 'Laadpaal thuis',
    description:
      'Installatie aan huis met veilige bekabeling, configuratie en uitleg bij oplevering. Ook met slim laden en koppeling aan zonnepanelen.',
  },
  {
    imageKey: 'laadpaal.zakelijk' as const,
    imageLabel: 'Foto: zakelijke laadpaal parkeerplaats',
    title: 'Laadpaal zakelijk',
    description:
      'Laadpalen voor bedrijf, VvE of parkeergarage, inclusief meerdere laadpunten en slimme stroomverdeling.',
  },
  {
    imageKey: 'laadpaal.meterkast' as const,
    imageLabel: 'Foto: meterkast aansluiting laadpaal',
    title: 'Meterkast en aansluiting',
    description:
      'Controle van uw meterkast, extra groep met aardlekbeveiliging of 3-fase upgrade, NEN-conform uitgevoerd.',
  },
  {
    imageKey: 'laadpaal.onderhoud' as const,
    imageLabel: 'Foto: laadpaal onderhoud en storing',
    title: 'Onderhoud en storingen',
    description: 'Hulp bij storingen, updates en periodieke controle van uw laadinstallatie.',
  },
]

const waaromItems = [
  {
    title: 'Zaptec Certified',
    description: 'Gecertificeerd laadpaalinstallateur. Uw installatie wordt veilig en conform de regelgeving uitgevoerd.',
  },
  {
    title: 'NEN 3140 gecertificeerd',
    description: 'Elke laadpaal krijgt een eigen groep met aardlekbeveiliging. Inclusief installatieverklaring bij oplevering.',
  },
  {
    title: 'Ma-zo 08:00-22:00 bereikbaar',
    description: `Snel advies en installatie ${serviceAreaInPhrase}, ook buiten kantooruren.`,
  },
]

const reviews = pageReviews.laadpaal

const faqItems = [
  {
    question: 'Is mijn meterkast geschikt voor een laadpaal?',
    answer:
      'Dat hangt af van de beschikbare groepen en uw gewenste laadvermogen. Wij inspecteren uw meterkast en adviseren of een extra groep of 3-fase aansluiting nodig is.',
  },
  {
    question: 'Heb ik altijd een aparte groep nodig?',
    answer:
      'Ja, een laadpaal moet op een eigen groep in de meterkast worden aangesloten, met aardlekbeveiliging. Dat is verplicht volgens de NEN-normen en voorkomt dat andere apparaten in uw woning worden belast. Wij controleren of er ruimte is in uw meterkast of dat een uitbreiding nodig is.',
  },
  {
    question: 'Wat is het verschil tussen 1-fase en 3-fase laden?',
    answer:
      'Bij 1-fase laden gebruikt de laadpaal één fase van uw netaansluiting. Thuis levert dat meestal tot ongeveer 7,4 kW (32A), voldoende voor de meeste particulieren die \'s nachts laden. Bij 3-fase laden worden drie fasen gebruikt, waardoor u sneller kunt laden (tot ongeveer 11 kW of meer, afhankelijk van uw aansluiting en auto). Dat vereist een 3-fase aansluiting en is vooral interessant als u sneller wilt laden of meerdere auto\'s laadt. Wij bekijken welke optie past bij uw meterkast, auto en situatie.',
  },
  {
    question: 'Hoe lang duurt een laadpaalinstallatie?',
    answer:
      'Een standaard thuisinstallatie duurt gemiddeld een halve tot hele werkdag. Bij een uitbreiding van de meterkast of langere kabelroute kan dit langer duren.',
  },
  {
    question: 'Welke merken installeren jullie?',
    answer: 'Wij werken met A-merken zoals Alfen en Zaptec. Samen kiezen we de laadpaal die past bij uw auto, woning en situatie.',
  },
  {
    question: 'Kan ik slim laden met zonnepanelen?',
    answer:
      'Ja, met een slimme laadpaal laadt u efficiënter en kunt u laden afstemmen op uw stroomverbruik of zonnepanelen. Wij adviseren u over de mogelijkheden voor uw situatie.',
  },
]

export default function LaadpaalPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServiceHero
          title="Laadpaal thuis of op kantoor, Zaptec Certified geïnstalleerd"
          subtitle={`Advies, meterkast en installatie van Alfen en Zaptec laadpalen. Particulier en zakelijk ${serviceAreaInPhrase}.`}
          imageKey="hero.laadpaal"
          textNamespace="laadpaal.hero"
          offerteDienst="laadpaal"
        />
        <TrustBar variant="slim" />

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 border-l-kms-yellow pl-6">
              &ldquo;Elektrisch rijden wordt pas echt makkelijk met een eigen laadpaal. Wij regelen het complete traject, van meterkast tot oplevering.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze laadpaal diensten" titleKey="laadpaal.diensten.title" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <MerkLogos brands={['Alfen', 'Zaptec', 'ABB', 'Hager']} />
        <Reviews reviews={reviews} title="Klanten over onze laadpaal installaties" />
        <FAQ items={faqItems} />
        <ClosingCTA primaryHref="/offerte?dienst=laadpaal" />
      </main>
      <Footer />
    </>
  )
}
