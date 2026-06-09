import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.cameras
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ServiceHero from '@/components/service-hero'
import DienstenGrid from '@/components/diensten-grid'
import WaaromKMS from '@/components/waarom-kms'
import Reviews from '@/components/reviews'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'

const dienstenCards = [
  { imageKey: 'camera.buiten' as const, imageLabel: 'Foto: camera bekabeling installatie', title: 'Installatie & montage', description: 'Bekabeling via Wifi/PoE/NVR, optimale zichtlijnen, recorders en monitoren' },
  { imageKey: 'camera.buiten' as const, imageLabel: 'Foto: camera configuratie systeem', title: 'Inbedrijfstelling', description: 'Configuratie, bewegingsdetectie, privacy-masking, beeldkwaliteit testen' },
  { imageKey: 'camera.buiten' as const, imageLabel: 'Foto: camera assortiment buiten', title: 'Cameralevering', description: 'Binnen en buiten, diverse resoluties, complete beveiligingsoplossingen' },
  { imageKey: 'camera.buiten' as const, imageLabel: 'Foto: smartphone app camera live', title: 'App-koppeling', description: 'Live meekijken op smartphone, gebruikersaccounts, uitleg gebruik' },
  { imageKey: 'camera.buiten' as const, imageLabel: 'Foto: camera onderhoud reparatie', title: 'Storingen, reparaties & onderhoud', description: 'Diagnose beeldproblemen, jaarlijks onderhoud, systeemupdates' },
]

const waaromItems = [
  { title: 'AVG-compliant installatie', description: 'Wij installeren conform AVG-richtlijnen, inclusief advies over meldplicht en cameraregistratie.' },
  { title: 'Lokale NVR-opslag', description: 'Beelden worden lokaal opgeslagen, geen cloud-afhankelijkheid. Standaard 30 dagen bewaard.' },
  { title: 'Woning en bedrijf', description: "Van 2 camera's bij een voordeur tot een volledig beveiligingssysteem voor een bedrijfspand." },
]

const reviews = [
  { quote: 'Camerasysteem netjes geinstalleerd met app-koppeling. Kan nu altijd live meekijken. Aanrader!', name: 'Familie W.', platform: 'Google' },
  { quote: 'Acht buitencameras geplaatst voor ons bedrijfspand. AVG-conform, professioneel en vlot uitgevoerd.', name: 'Bedrijf Rotterdam', platform: 'Werkspot' },
]

const faqItems = [
  { question: 'Installeren jullie AVG-conform?', answer: 'Ja, inclusief advies over meldplicht en cameraregistratie. Wij zorgen dat uw camerasysteem volledig voldoet aan de AVG-wetgeving.' },
  { question: 'Hoelang worden beelden bewaard?', answer: 'Standaard 30 dagen op lokale NVR, uitbreidbaar afhankelijk van de opslagcapaciteit. Er is geen cloud-afhankelijkheid.' },
  { question: 'Kan ik live meekijken via mijn telefoon?', answer: 'Ja, wij koppelen het systeem aan een app naar keuze. U kunt op elk moment en overal live meekijken op uw smartphone of tablet.' },
  { question: 'Werken jullie ook voor bedrijven?', answer: 'Ja, van kleine woning tot groot bedrijfspand. Wij leveren, installeren en onderhouden camerasystemen voor zowel particulieren als zakelijke klanten.' },
]

export default function CamerasSystemenPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServiceHero
          title="Altijd zicht op uw pand, AVG-compliant geinstalleerd"
          subtitle="Camerasystemen voor woning en bedrijf, inclusief app-koppeling en jaarlijks onderhoud."
          imageKey="hero.cameras"
        />
        <TrustBar />

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 pl-6" style={{ borderColor: '#F5A623' }}>
              &ldquo;Met een goed camerasysteem heeft u altijd zicht op wat er gebeurt. Van bedrijfspand tot woning, KMS levert, monteert en beheert camerasystemen die passen bij uw beveiligingsvraag.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze camera diensten" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <Reviews reviews={reviews} title="Klanten over onze camerasystemen" />
        <FAQ items={faqItems} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
