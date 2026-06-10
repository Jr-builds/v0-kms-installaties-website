import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.elektra
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

const dienstenCards = [
  { imageKey: 'elektra.huisinstallatie' as const, imageLabel: 'Foto: huisinstallatie nieuwbouw', title: 'Huisinstallaties (Nieuwbouw & Bestaande Bouw)', description: 'Complete elektrische aanleg, stopcontacten, veiligheidscheck NEN' },
  { imageLabel: 'Foto: renovatie bedrading', title: 'Renovatie & Verbouwingen', description: 'Aanpassen bestaande installaties, leidingen frezen, oude bedrading vervangen' },
  { imageKey: 'elektra.groepenkast' as const, imageLabel: 'Foto: groepenkast modern', title: 'Groepen- & Meterkasten', description: 'Vervangen oude groepenkast, automaat en aardlekbeveiliging, groepenverklaring' },
  { imageLabel: 'Foto: LED verlichting interieur', title: 'Binnen- & Buitenverlichting', description: 'LED-verlichting, tuin- en gevelverlichting, slimme verlichting' },
  { imageLabel: 'Foto: laadpaal elektrisch voertuig', title: 'Laadpalen voor Elektrische Voertuigen', description: 'Advies, installatie thuis of bedrijf, dynamic loadbalancing' },
  { imageLabel: 'Foto: elektra keuken badkamer', title: 'Elektra in Keuken & Badkamer', description: 'Voorbereidend elektrawerk, aansluitpunten kookplaat en oven' },
  { imageKey: 'elektra.cameras' as const, imageLabel: 'Foto: camera bewaking systeem', title: 'Camerasystemen', description: 'Binnen- en buitencameras, Wifi/POE/NVR-systemen' },
  { imageKey: 'elektra.huisinstallatie' as const, imageLabel: 'Foto: storingsmelding elektricien', title: 'Storingen & Onderhoud', description: 'Spoedstoringen, kortsluitingen opsporen, preventief onderhoud' },
]

const waaromItems = [
  { title: 'NEN 3140 gecertificeerd', description: 'Wettelijk vereist voor elektrische installaties. Elke installatie wordt gekeurd en geleverd met een groepenverklaring.' },
  { title: 'Ma-Zo 08:00-22:00 bereikbaar', description: 'Ook voor spoedmeldingen en storingen buiten kantooruren.' },
  { title: '200+ afgeronde elektraprojecten', description: 'Van nieuwbouw tot renovatie, particulier en zakelijk in heel Zuid-Holland.' },
]

const reviews = pageReviews.elektra

const faqItems = [
  { question: 'Hebben jullie een NEN-certificering?', answer: 'Ja, wij zijn NEN 3140 gecertificeerd. Dit is wettelijk vereist voor elektrische installaties en biedt u de zekerheid dat het werk veilig en correct wordt uitgevoerd.' },
  { question: 'Hoe lang duurt een groepenkast vervanging?', answer: 'Gemiddeld een halve tot hele werkdag, afhankelijk van de omvang van de installatie en het aantal groepen.' },
  { question: "Komen jullie ook 's avonds of in het weekend?", answer: 'Ja, wij zijn bereikbaar van maandag tot zondag 08:00-22:00, ook voor spoedmeldingen en storingen buiten kantooruren.' },
  { question: 'Leveren jullie een groepenverklaring?', answer: 'Ja, standaard bij elke installatie. Een groepenverklaring is wettelijk verplicht en toont aan dat de installatie voldoet aan de NEN-norm.' },
]

export default function ElektraPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServiceHero
          title="Elektra die de eerste keer goed zit, voor particulier en bedrijf"
          subtitle="NEN 3140 gecertificeerd. Bereikbaar van maandag tot zondag."
          imageKey="hero.elektra"
          breadcrumbLabel="Elektra"
          breadcrumbPath="/elektra"
          offerteDienst="elektra"
        />
        <TrustBar variant="slim" />

        {/* Intro quote */}
        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 border-l-kms-yellow pl-6 text-left">
              &ldquo;Elektrotechnisch maatwerk, veilig geïnstalleerd door gecertificeerd vakmanschap.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze elektradiensten" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <MerkLogos brands={['ABB', 'Hager', 'Alfen', 'Gira', 'Jung', 'Zaptec']} />
        <Reviews reviews={reviews} title="Klanten over ons elektrawerk" />
        <FAQ items={faqItems} />
        <ClosingCTA primaryHref="/offerte?dienst=elektra" />
      </main>
      <Footer />
    </>
  )
}
