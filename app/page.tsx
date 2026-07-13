import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import SiteImage from '@/components/site-image'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import ClosingCTA from '@/components/closing-cta'
import Werkgebied from '@/components/werkgebied'
import StatsBar from '@/components/stats-bar'
import Werkwijze from '@/components/werkwijze'
import Reviews from '@/components/reviews'
import AvailabilityPill, { OpeningHoursPill } from '@/components/availability-pill'
import TrustHighlightGrid from '@/components/trust-highlight-grid'
import { Button } from '@/components/ui/button'
import { getImage, type SiteImageKey } from '@/lib/images'
import { pageReviews } from '@/lib/reviews'
import { pageMetadata } from '@/lib/metadata'
import { DEFAULT_HERO_SUBTITLE } from '@/lib/seasonal'
import HeroPhoneButton from '@/components/hero-phone-button'
import { serviceAreaInPhrase } from '@/lib/service-area'

export const metadata: Metadata = pageMetadata.home

const dienstenCards: { imageKey: SiteImageKey; title: string; description: string; href: string }[] = [
  { imageKey: 'dienst.elektra', title: 'Elektra', description: 'Complete elektrische installaties voor particulier en bedrijf', href: '/elektra' },
  { imageKey: 'dienst.laadpaal', title: 'Laadpaal Installeren', description: 'Thuis of op kantoor: vakkundige installatie van uw laadpaal, inclusief advies over meterkast en slim laden', href: '/laadpaal' },
  { imageKey: 'dienst.airconditioning', title: 'Airconditioning', description: 'Comfortabel binnenklimaat het hele jaar, STEK-gecertificeerd geïnstalleerd', href: '/airconditioning' },
  { imageKey: 'dienst.ventilatie', title: 'Ventilatie', description: 'Gezonde lucht in elke ruimte, inclusief advies over ISDE-subsidie', href: '/ventilatie' },
  { imageKey: 'dienst.vastgoedbeheer', title: 'Technisch Vastgoedbeheer', description: 'Zorgeloos technisch beheer van uw pand met vaste onderhoudscontracten', href: '/technisch-vastgoedbeheer' },
  { imageKey: 'dienst.cameras', title: "Camera's en Systemen", description: 'Altijd zicht op uw pand, AVG-compliant geïnstalleerd', href: '/cameras-systemen' },
]

const recenteProjecten: { imageKey: SiteImageKey; category: string; city: string; title: string; description: string; resultaat: string }[] = [
  { imageKey: 'project.elektra', category: 'Elektra', city: 'Zwijndrecht', title: 'Volledige herinstallatie meterkast', description: 'Groepenkast vervangen na waterschade, NEN-gecertificeerde keuring uitgevoerd.', resultaat: 'Veilige installatie die voldoet aan alle huidige NEN-normen.' },
  { imageKey: 'project.airconditioning', category: 'Airconditioning', city: 'Rotterdam', title: '3x Mitsubishi Heavy airco-units', description: 'Drie units geplaatst inclusief buitenunits op plat dak, samenwerking met dakdekker.', resultaat: 'Comfortabel binnenklimaat op alle verdiepingen, app-gestuurd.' },
  { imageKey: 'project.cameras', category: "Camera's", city: 'Almere', title: 'Camerabeveiliging woning', description: 'Volledig camerasysteem met app-koppeling en bewegingsdetectie geïnstalleerd.', resultaat: 'Klant heeft 24/7 live zicht op het pand via smartphone.' },
]

const reviews = pageReviews.home

const merken = ['ABB', 'Hager', 'Alfen', 'Gira', 'Jung', 'Zaptec', 'Mitsubishi Heavy', 'Daikin', 'LG', 'Mitsubishi Electric', 'Itho Daalderop', 'DUCO']

export default function HomePage() {
  const heroImage = getImage('hero.home')

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* HERO */}
        <section className="hero-navy pt-8 pb-12 sm:py-24">
          <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-6">
                  <AvailabilityPill size="md" variant="hero" />
                  <OpeningHoursPill size="md" />
                </div>
                <h1 className="heading-hero-home text-white mb-5">
                  Elektra en Airco, vakkundig geïnstalleerd -{' '}
                  <span className="text-kms-yellow">altijd bereikbaar</span>
                </h1>
                <p className="text-blue-200 text-lg mb-8 leading-relaxed">{DEFAULT_HERO_SUBTITLE}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button render={<Link href="/offerte" />} nativeButton={false} variant="primary" size="cta-sm" className="text-center">
                    Vraag een offerte aan
                  </Button>
                  <HeroPhoneButton className="text-center" />
                </div>
              </div>
              <div className="hero-photo">
                <SiteImage
                  src={heroImage.src}
                  alt={heroImage.alt}
                  aspectRatio="aspect-[4/3]"
                  className="w-full"
                  priority
                  sizePreset="hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <TrustBar />

        {/* DIENSTEN GRID */}
        <section id="diensten" className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-4 text-kms-navy">
              Onze diensten
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              KMS Installaties levert gecertificeerd elektra- en airconditioningwerk {serviceAreaInPhrase}.
              Daarnaast verzorgen wij laadpalen, ventilatie, technisch vastgoedbeheer en camerabeveiliging.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dienstenCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex h-full flex-col bg-kms-light rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <SiteImageOrPlaceholder
                    imageKey={card.imageKey}
                    placeholderLabel=""
                    aspectRatio="aspect-video"
                    className="w-full shrink-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold text-base mb-1.5 text-kms-navy group-hover:text-kms-yellow-dark transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{card.description}</p>
                    <span className="text-sm font-semibold text-kms-yellow-dark mt-auto">Meer informatie &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Werkwijze />

        <StatsBar
          items={[
            { value: '200+', label: 'Afgeronde projecten' },
            { value: '10+', label: 'Jaar vakmanschap' },
            { value: '56', label: 'Vijfsterrenreviews' },
          ]}
        />

        {/* RECENTE PROJECTEN */}
        <section className="bg-kms-light py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Recente projecten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recenteProjecten.map((project, i) => (
                <article key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <SiteImageOrPlaceholder imageKey={project.imageKey} placeholderLabel="" aspectRatio="aspect-video" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-yellow px-2.5 py-0.5 text-xs font-bold">{project.category}</span>
                      <span className="text-xs text-gray-500">{project.city}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1.5 text-kms-navy">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                    <p className="text-sm font-semibold text-kms-yellow-dark">Resultaat: {project.resultaat}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button render={<Link href="/projecten" />} nativeButton={false} variant="secondary">
                Bekijk alle projecten
              </Button>
            </div>
          </div>
        </section>

        <Reviews reviews={reviews} />

        {/* CERTIFICERINGEN + MERKEN */}
        <section className="bg-kms-light py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-subsection text-center mb-8 text-kms-navy">
              Certificeringen
            </h2>
            <TrustHighlightGrid className="mb-10" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Waarmee wij werken</p>
            <div className="flex flex-wrap justify-center gap-3">
              {merken.map((merk) => (
                <div key={merk} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm">
                  {merk}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Werkgebied />

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
