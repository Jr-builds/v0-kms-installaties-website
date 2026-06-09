import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ServiceHero from '@/components/service-hero'
import DienstenGrid from '@/components/diensten-grid'
import WaaromKMS from '@/components/waarom-kms'
import MerkLogos from '@/components/merklogos'
import Reviews from '@/components/reviews'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'

const dienstenCards = [
  { imageKey: 'airco.binnenunit' as const, imageLabel: 'Foto: kantoor klimaatbeheersing', title: 'Klimaatbeheersing kantoor & bedrijven', description: 'Installatie klimaatbeheersingssystemen, preventief onderhoud' },
  { imageKey: 'airco.binnenunit' as const, imageLabel: 'Foto: wandunit airco installatie', title: 'Professionele installatie', description: 'Wandunits, plafondunits, multisplit-systemen' },
  { imageKey: 'airco.binnenunit' as const, imageLabel: 'Foto: airco onderhoud service', title: 'Service & onderhoud', description: 'Periodiek onderhoud, reiniging, bijvullen' },
  { imageKey: 'airco.buitenunit' as const, imageLabel: 'Foto: airco storing reparatie', title: 'Storingen & reparaties', description: 'Snelle diagnose, vervangen defecte onderdelen' },
  { imageKey: 'airco.binnenunit' as const, imageLabel: 'Foto: airco unit showroom', title: 'Levering van airco-units', description: 'Complete A-merk systemen, een aanspreekpunt voor advies en plaatsing' },
  { imageKey: 'airco.binnenunit' as const, imageLabel: 'Foto: slimme app bediening airco', title: 'Wifi-modules & slimme bediening', description: 'App-koppeling, bediening op afstand' },
]

const waaromItems = [
  { title: 'STEK-gecertificeerd', description: 'Wettelijk verplicht voor werken met koelmiddelen. Niet elk installatiebedrijf heeft dit.' },
  { title: 'A-merk apparatuur', description: 'Wij werken uitsluitend met Mitsubishi, Daikin en LG voor betrouwbare systemen.' },
  { title: 'Zomer en winter klaar', description: 'Airco koelt in de zomer en verwarmt in de winter. Wij adviseren de juiste unit voor uw situatie.' },
]

const reviews = [
  { quote: 'Snel gereageerd en netjes geinstalleerd. Airco werkt perfect en de afwerking was keurig. Zeker een aanrader!', name: 'Mohammed A.', platform: 'Google' },
  { quote: 'Drie airco-units geplaatst in ons kantoor. Vakkundig werk, nette afwerking en alles snel in bedrijf gesteld.', name: 'Rachid K.', platform: 'Werkspot' },
]

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
      <main>
        <ServiceHero
          title="Comfortabel binnenklimaat het hele jaar, STEK-gecertificeerd geinstalleerd"
          subtitle="Levering, installatie en onderhoud van A-merk airconditioning."
          imageKey="hero.airconditioning"
        />
        <TrustBar />

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-xl font-semibold italic text-gray-700 border-l-4 pl-6" style={{ borderColor: '#F5A623' }}>
              &ldquo;Altijd een comfortabel binnenklimaat, vakkundig geregeld via A-merk airconditioning.&rdquo;
            </blockquote>
          </div>
        </section>

        <DienstenGrid title="Onze airconditioning diensten" cards={dienstenCards} />
        <WaaromKMS items={waaromItems} />
        <MerkLogos brands={['Mitsubishi Heavy', 'Daikin', 'LG', 'Mitsubishi Electric']} />
        <Reviews reviews={reviews} title="Klanten over onze airco installaties" />
        <FAQ items={faqItems} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
