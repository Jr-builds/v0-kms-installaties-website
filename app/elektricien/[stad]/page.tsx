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

interface ElektricienStadPageProps {
  params: Promise<{ stad: string }>
}

export function generateStaticParams() {
  return getAllStadSlugs().map((stad) => ({ stad }))
}

export async function generateMetadata({ params }: ElektricienStadPageProps): Promise<Metadata> {
  const { stad: slug } = await params
  const stad = getStadBySlug(slug)
  if (!stad) return {}

  return createPageMetadata({
    title: `Elektricien in ${stad.name} | NEN 3140 Gecertificeerd`,
    description: `Zoekt u een elektricien in ${stad.name}? KMS Installaties verzorgt elektra-installaties, groepenkasten, laadpalen en storingen. NEN 3140 gecertificeerd. Bereikbaar ${openingHoursDisplay}.`,
    path: `/elektricien/${stad.slug}`,
    imageKey: 'hero.elektra',
  })
}

const waaromItems = [
  {
    title: 'NEN 3140 gecertificeerd',
    description: 'Elke installatie wordt gekeurd en geleverd met een groepenverklaring.',
  },
  {
    title: 'Lokaal bereikbaar',
    description: 'Vanuit Zwijndrecht snel ter plaatse in uw regio, ook bij spoed.',
  },
  {
    title: 'Vrijblijvend advies',
    description: 'Wij komen langs om de mogelijkheden voor uw woning of pand te bekijken.',
  },
]

export default async function ElektricienStadPage({ params }: ElektricienStadPageProps) {
  const { stad: slug } = await params
  const stad = getStadBySlug(slug)
  if (!stad) notFound()

  const heroImage = getImage('hero.elektra')
  const offerteHref = buildOfferteHref('elektra', stad.name)

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-kms-yellow-light mb-3">
                  Elektra in {stad.name}
                </p>
                <h1 className="heading-hero text-white mb-4">
                  Elektricien in {stad.name}
                </h1>
                <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                  KMS Installaties helpt particulieren en bedrijven in {stad.name} met elektra-installaties,
                  groepenkasten, laadpalen en storingen. NEN 3140 gecertificeerd en bereikbaar{' '}
                  {openingHoursDisplay}.
                </p>
                <StadDienstKeuze stadName={stad.name} activeDienst="elektra" className="mb-8 max-w-sm" />
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
              Elektra in {stad.name} en omgeving
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Wij komen vrijblijvend langs om te kijken naar alle mogelijkheden voor uw woning of pand in{' '}
              {stad.name}. Van meterkastvervanging tot complete renovaties: onze gecertificeerde elektriciens
              denken mee en leveren werk dat voldoet aan de NEN-normen.
            </p>
          </div>
        </section>

        <WaaromKMS items={waaromItems} />

        <section className="bg-kms-light py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="heading-section text-kms-navy mb-3">Ook actief in uw buurt</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Selecteer een plaats voor elektra-advies en een vrijblijvende offerte in uw omgeving.
              </p>
            </div>
            <StadChips activeSlug={stad.slug} dienst="elektra" variant="soft" />
          </div>
        </section>

        <Reviews reviews={pageReviews.elektra} title={`Klanten over ons elektrawerk`} />

        <ClosingCTA
          title={`Elektricien nodig in ${stad.name}?`}
          subtitle="Wij reageren dezelfde dag, ook in het weekend."
          primaryHref={offerteHref}
        />
      </main>
      <Footer />
    </>
  )
}
