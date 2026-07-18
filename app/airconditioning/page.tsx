import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.airconditioning
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ServiceHero from '@/components/service-hero'
import DienstenGrid from '@/components/diensten-grid'
import WaaromKMS from '@/components/waarom-kms'
import MerkLogos from '@/components/merklogos'
import Reviews from '@/components/reviews'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'
import IsdeCallout from '@/components/isde-callout'
import { pageReviews } from '@/lib/reviews'

const dienstenCards = [
  { imageKey: 'airco.klimaatbeheersing' as const, imageLabel: 'Foto: kantoor klimaatbeheersing', title: 'Klimaatbeheersing kantoor & bedrijven', description: 'Installatie klimaatbeheersingssystemen, preventief onderhoud' },
  { imageKey: 'airco.installatie' as const, imageLabel: 'Foto: wandunit airco installatie', title: 'Professionele installatie', description: 'Wandunits, plafondunits, multisplit-systemen' },
  { imageKey: 'airco.onderhoud' as const, imageLabel: 'Foto: airco onderhoud service', title: 'Service & onderhoud', description: 'Periodiek onderhoud, reiniging, bijvullen' },
  { imageKey: 'airco.storingen' as const, imageLabel: 'Foto: airco storing reparatie', title: 'Storingen & reparaties', description: 'Snelle diagnose, vervangen defecte onderdelen' },
  { imageKey: 'airco.levering' as const, imageLabel: 'Foto: airco unit showroom', title: 'Levering van airco-units', description: 'Complete A-merk systemen, een aanspreekpunt voor advies en plaatsing' },
  { imageKey: 'airco.wifi' as const, imageLabel: 'Foto: slimme app bediening airco', title: 'Wifi-modules & slimme bediening', description: 'App-koppeling, bediening op afstand' },
]

const waaromItems = [
  { title: 'STEK-gecertificeerd', description: 'Wettelijk verplicht voor werken met koelmiddelen. Niet elk installatiebedrijf heeft dit.' },
  { title: 'A-merk apparatuur', description: 'Wij werken uitsluitend met Mitsubishi, Daikin en LG voor betrouwbare systemen.' },
  { title: 'Zomer en winter klaar', description: 'Airco koelt in de zomer en verwarmt in de winter. Wij adviseren de juiste unit voor uw situatie.' },
]

const reviews = pageReviews.airconditioning

const faqItems = [
  { question: 'Zijn jullie STEK-gecertificeerd?', answer: 'Ja, wettelijk verplicht voor koelmiddelen en wij voldoen hieraan. Dit garandeert dat het werk veilig en conform de regelgeving wordt uitgevoerd.' },
  { question: 'Kan een airco ook verwarmen?', answer: 'Ja, moderne airco-systemen zijn ook warmtepompen en verwarmen efficiënt. In de winter kunt u uw airco gebruiken als verwarmingsbron.' },
  { question: 'Hoe lang duurt een airco installatie?', answer: 'Gemiddeld 1 werkdag voor een standaard wandunit. Bij grotere installaties of meerdere units kan dit langer duren.' },
  { question: 'Is een airco subsidiabel?', answer: 'In sommige gevallen via de ISDE-regeling, afhankelijk van het type systeem en uw situatie. Wij adviseren u hier graag gratis over.' },
]

export default function AirconditioningPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServiceHero
          title="Comfortabel binnenklimaat het hele jaar, STEK-gecertificeerd geïnstalleerd"
          subtitle="Levering, installatie en onderhoud van A-merk airconditioning."
          imageKey="hero.airconditioning"
          offerteDienst="airconditioning"
        />
        <TrustBar variant="slim" />

        <section className="bg-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <IsdeCallout variant="airconditioning" />
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 border-l-kms-yellow pl-6">
              &ldquo;Altijd een comfortabel binnenklimaat, vakkundig geregeld via A-merk airconditioning.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze airconditioning diensten" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <MerkLogos brands={['Mitsubishi Heavy', 'Daikin', 'LG', 'Mitsubishi Electric']} />
        <Reviews reviews={reviews} title="Klanten over onze airco installaties" />
        <FAQ items={faqItems} />
        <ClosingCTA primaryHref="/offerte?dienst=airconditioning" />
      </main>
      <Footer />
    </>
  )
}
