import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import WaaromKMS from '@/components/waarom-kms'
import Reviews from '@/components/reviews'
import ClosingCTA from '@/components/closing-cta'
import StadChips from '@/components/stad-chips'
import StadDienstKeuze from '@/components/stad-dienst-keuze'
import SiteImage from '@/components/site-image'
import { Button } from '@/components/ui/button'
import HeroPhoneButton from '@/components/hero-phone-button'
import { pageReviews } from '@/lib/reviews'
import { getImage } from '@/lib/images'
import { createPageMetadata } from '@/lib/metadata'
import { buildOfferteHref } from '@/lib/offerte'
import { getAllStadSlugs, getStadBySlug } from '@/lib/steden'
import { openingHoursDisplay } from '@/lib/business'

interface AirconditioningStadPageProps {
  params: Promise<{ stad: string }>
}

export function generateStaticParams() {
  return getAllStadSlugs().map((stad) => ({ stad }))
}

export async function generateMetadata({ params }: AirconditioningStadPageProps): Promise<Metadata> {
  const { stad: slug } = await params
  const stad = getStadBySlug(slug)
  if (!stad) return {}

  return createPageMetadata({
    title: `Airco in ${stad.name} | STEK-gecertificeerd`,
    description: `Airco kopen en laten installeren in ${stad.name}? KMS Installaties levert en installeert A-merk airconditioning. STEK-gecertificeerd. Bereikbaar ${openingHoursDisplay}.`,
    path: `/airconditioning/${stad.slug}`,
    imageKey: 'hero.airconditioning',
  })
}

const waaromItems = [
  {
    title: 'STEK-gecertificeerd',
    description: 'Wettelijk verplicht voor werken met koelmiddelen. Veilig en conform de regelgeving.',
  },
  {
    title: 'A-merk apparatuur',
    description: 'Mitsubishi, Daikin en LG voor betrouwbare koeling en verwarming het hele jaar.',
  },
  {
    title: 'Vrijblijvend advies',
    description: 'Wij komen langs om de beste oplossing voor uw woning of pand te bepalen.',
  },
]

export default async function AirconditioningStadPage({ params }: AirconditioningStadPageProps) {
  const { stad: slug } = await params
  const stad = getStadBySlug(slug)
  if (!stad) notFound()

  const heroImage = getImage('hero.airconditioning')
  const offerteHref = buildOfferteHref('airconditioning', stad.name)

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-kms-yellow-light mb-3">
                  Airco in {stad.name}
                </p>
                <h1 className="heading-hero text-white mb-4">
                  Airco in {stad.name}
                </h1>
                <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                  KMS Installaties helpt particulieren en bedrijven in {stad.name} met airco-advies, levering en
                  installatie. STEK-gecertificeerd en bereikbaar {openingHoursDisplay}.
                </p>
                <StadDienstKeuze
                  stadName={stad.name}
                  activeDienst="airconditioning"
                  className="mb-8 max-w-sm"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    render={<Link href={offerteHref} />}
                    nativeButton={false}
                    variant="primary"
                    size="cta-sm"
                    className="text-center"
                  >
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

        <TrustBar variant="slim" />

        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-section text-kms-navy mb-4">
              Airco kopen en laten installeren in {stad.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Wij komen vrijblijvend langs om te kijken naar alle mogelijkheden voor uw woning of pand in{' '}
              {stad.name}. Van een enkele wandunit tot een compleet multisplit-systeem: wij adviseren, leveren en
              installeren energiezuinige A-merk airconditioning met nette afwerking.
            </p>
          </div>
        </section>

        <WaaromKMS items={waaromItems} />

        <section className="bg-kms-light py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="heading-section text-kms-navy mb-3">Ook actief in uw buurt</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Bekijk de mogelijkheden voor airco in uw omgeving en vraag vrijblijvend advies aan.
              </p>
            </div>
            <StadChips activeSlug={stad.slug} dienst="airconditioning" variant="soft" />
          </div>
        </section>

        <Reviews reviews={pageReviews.airconditioning} title="Klanten over onze airco-installaties" />

        <ClosingCTA
          title={`Airco nodig in ${stad.name}?`}
          subtitle="Wij reageren dezelfde dag, ook in het weekend."
          primaryHref={offerteHref}
        />
      </main>
      <Footer />
    </>
  )
}
