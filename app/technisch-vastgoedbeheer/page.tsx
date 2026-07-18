import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.vastgoedbeheer
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ServiceHero from '@/components/service-hero'
import DienstenGrid from '@/components/diensten-grid'
import WaaromKMS from '@/components/waarom-kms'
import Reviews from '@/components/reviews'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'
import { pageReviews } from '@/lib/reviews'
import { serviceAreaInPhrase } from '@/lib/service-area'

const dienstenCards = [
  { imageKey: 'vastgoed.onderhoud' as const, imageLabel: 'Foto: technisch onderhoud gebouw', title: 'Algemeen technisch onderhoud', description: 'Dagelijks klein onderhoud, vaste controlerondes' },
  { imageKey: 'vastgoed.renovatie' as const, imageLabel: 'Foto: renovatie elektra installatie', title: 'Renovatie & herstel', description: 'Herstel elektrische installaties, reparaties ventilatie' },
  { imageKey: 'vastgoed.storingen' as const, imageLabel: 'Foto: storingsmelding snelle respons', title: 'Storingen & spoed', description: 'Snelle respons, tijdelijke noodoplossingen' },
  { imageKey: 'vastgoed.inspectie' as const, imageLabel: 'Foto: technische inspectie rapport', title: 'Inspectie & rapportage', description: 'Technische inspecties, onderhoudsrapporten, actiepuntenlijst' },
  { imageKey: 'vastgoed.periodiek' as const, imageLabel: 'Foto: periodiek onderhoud installaties', title: 'Periodiek onderhoud', description: 'Terugkerende beurten, controle kritieke installaties' },
  { imageKey: 'vastgoed.projecten' as const, imageLabel: 'Foto: coördinatie kleine projecten', title: 'Coördinatie van kleine projecten', description: 'Aansturing werkzaamheden namens eigenaar, communicatie bewoners' },
]

const waaromItems = [
  { title: 'Storingen zelfde dag opgelost', description: 'Storingsmelding voor 14:00? Wij zijn dezelfde dag ter plaatse.' },
  { title: 'Vaste onderhoudscontracten', description: 'Maandelijkse abonnementen beschikbaar voor ontzorging op de lange termijn.' },
  { title: 'Een aanspreekpunt', description: 'Wij coördineren alle technische werkzaamheden aan uw pand, ook richting bewoners en huurders.' },
]

const reviews = pageReviews.vastgoedbeheer

const faqItems = [
  { question: 'Werken jullie op contractbasis?', answer: 'Ja, wij bieden vaste maandelijkse onderhoudsabonnementen aan. Dit biedt u zekerheid over kosten en beschikbaarheid.' },
  { question: 'Hoe snel reageren jullie op storingen?', answer: 'Bij melding voor 14:00 zijn wij dezelfde dag ter plaatse. Buiten kantooruren zijn wij bereikbaar via 078 203 28 58.' },
  { question: "Werken jullie ook voor VvE's?", answer: "Ja, wij beheren technische installaties voor VvE's en vastgoedbeheerders. Wij coördineren ook de communicatie richting bewoners." },
  { question: 'Wat valt onder technisch vastgoedbeheer?', answer: 'Elektra, ventilatie, airconditioning, camerasystemen en algemeen onderhoud. Wij zijn uw totaaloplosser voor technisch beheer.' },
]

export default function TechnischVastgoedbeheerPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServiceHero
          title="Zorgeloos technisch beheer van uw vastgoed, met vaste onderhoudscontracten"
          subtitle={`Voor gebouweigenaren en VvE-beheerders ${serviceAreaInPhrase}.`}
          imageKey="hero.vastgoedbeheer"
          textNamespace="vastgoed.hero"
          primaryLabel="Vraag een onderhoudscontract aan"
          offerteDienst="vastgoedbeheer"
        />
        <TrustBar variant="slim" />

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 border-l-kms-yellow pl-6">
              &ldquo;Voor gebouweigenaren is betrouwbaar technisch onderhoud essentieel. KMS ontzorgt in het dagelijks beheer, de storingen en de planning van werkzaamheden, zodat installaties veilig en bedrijfszeker blijven.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze vastgoedbeheer diensten" titleKey="vastgoed.diensten.title" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <Reviews reviews={reviews} title="Klanten over ons vastgoedbeheer" />
        <FAQ items={faqItems} namespace="vastgoed.faq" />
        <ClosingCTA
          primaryHref="/offerte?dienst=vastgoedbeheer"
          primaryLabel="Vraag een onderhoudscontract aan"
        />
      </main>
      <Footer />
    </>
  )
}
