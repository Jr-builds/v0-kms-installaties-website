import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.ventilatie
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
  { imageKey: 'ventilatie.lbk' as const, imageLabel: 'Foto: luchtbehandelingskast utiliteit', title: 'Luchtbehandelingskasten (LBK) voor utiliteit', description: 'Preventief onderhoud, filters vervangen, GBS-controle' },
  { imageKey: 'ventilatie.wtw' as const, imageLabel: 'Foto: WTW systeem woning', title: 'WTW-systemen', description: 'Ontwerp, aanleg en vervanging voor woning en utiliteit' },
  { imageKey: 'ventilatie.mechanisch' as const, imageLabel: 'Foto: mechanische ventilatie installatie', title: 'Mechanische ventilatie', description: 'Ontwerp, aanleg en vervanging' },
  { imageKey: 'ventilatie.dakventilator' as const, imageLabel: 'Foto: dakventilator plat dak', title: 'Dakventilatoren', description: 'Ontwerp, aanleg en vervanging' },
  { imageKey: 'ventilatie.onderhoud' as const, imageLabel: 'Foto: ventilatie onderhoud filter', title: 'Onderhoud & storingen', description: 'Snelle diagnose, regelmatig onderhoud, rapportage' },
]

const waaromItems = [
  { title: 'ISDE-subsidie mogelijk', description: 'Een WTW-installatie kan subsidiabel zijn. Wij adviseren u gratis over de mogelijkheden.' },
  { title: 'Energiezuinig advies', description: 'Wij adviseren altijd de meest energiezuinige oplossing voor uw situatie.' },
  { title: 'Particulier en zakelijk', description: 'Van woning tot utiliteitsgebouw, wij installeren en onderhouden alle typen systemen.' },
]

const reviews = pageReviews.ventilatie

const faqItems = [
  { question: 'Wat is een WTW-systeem?', answer: 'WTW staat voor warmteterugwinning. Het systeem ventileert verse lucht naar binnen terwijl het de warmte uit de afgevoerde lucht hergebruikt. Dit bespaart energie en verbetert de luchtkwaliteit.' },
  { question: 'Is een WTW-installatie subsidiabel?', answer: 'Ja, via de ISDE-regeling. De hoogte van de subsidie hangt af van uw situatie. Wij adviseren u hier graag gratis over.' },
  { question: 'Hoe vaak moet ventilatie onderhouden worden?', answer: 'Minimaal een keer per jaar voor optimale werking. Filters moeten regelmatig vervangen worden om luchtkwaliteit en energieverbruik op peil te houden.' },
  { question: 'Wat kost een WTW-installatie?', answer: 'Dit hangt af van uw woning en de gewenste oplossing. Vraag een vrijblijvende offerte aan via ons contactformulier.' },
  { question: 'Komen jullie ook voor kleine storingen?', answer: 'Ja, ook voor onderhoud en kleine reparaties zijn wij bereikbaar. Wij zijn beschikbaar van maandag tot zondag 08:00-22:00.' },
]

export default function VentilatiePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServiceHero
          title="Gezonde lucht in elke ruimte, inclusief advies over ISDE-subsidie"
          subtitle="WTW-systemen, mechanische ventilatie en onderhoud voor particulier en bedrijf."
          imageKey="hero.ventilatie"
          textNamespace="ventilatie.hero"
          offerteDienst="ventilatie"
        />
        <TrustBar variant="slim" />

        <section className="bg-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <IsdeCallout variant="ventilatie" />
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 border-l-kms-yellow pl-6">
              &ldquo;Slechte ventilatie zorgt voor vocht, schimmel en vermoeidheid. Een goed systeem lost dit op. Wij adviseren en installeren van A tot Z.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze ventilatiediensten" titleKey="ventilatie.diensten.title" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <MerkLogos brands={['Itho Daalderop', 'DUCO']} />
        <Reviews reviews={reviews} title="Klanten over onze ventilatie installaties" />
        <FAQ items={faqItems} />
        <ClosingCTA primaryHref="/offerte?dienst=ventilatie" />
      </main>
      <Footer />
    </>
  )
}
