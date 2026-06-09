import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import SiteImage from '@/components/site-image'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import ClosingCTA from '@/components/closing-cta'
import StatsBar from '@/components/stats-bar'
import CertificationBadge from '@/components/certification-badge'
import { certifications } from '@/lib/certifications'
import { getImage, type SiteImageKey } from '@/lib/images'
import { getReviewPlatformBadgeClass } from '@/lib/review-badge'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.home

const dienstenCards: { imageKey: SiteImageKey; title: string; description: string; href: string }[] = [
  { imageKey: 'dienst.elektra', title: 'Elektra', description: 'Complete elektrische installaties voor particulier en bedrijf', href: '/elektra' },
  { imageKey: 'dienst.airconditioning', title: 'Airconditioning', description: 'Comfortabel binnenklimaat het hele jaar, STEK-gecertificeerd geinstalleerd', href: '/airconditioning' },
  { imageKey: 'dienst.ventilatie', title: 'Ventilatie', description: 'Gezonde lucht in elke ruimte, inclusief advies over ISDE-subsidie', href: '/ventilatie' },
  { imageKey: 'dienst.vastgoedbeheer', title: 'Technisch Vastgoedbeheer', description: 'Zorgeloos technisch beheer van uw pand met vaste onderhoudscontracten', href: '/technisch-vastgoedbeheer' },
  { imageKey: 'dienst.cameras', title: "Camera's en Systemen", description: 'Altijd zicht op uw pand, AVG-compliant geinstalleerd', href: '/cameras-systemen' },
]

const recenteProjecten: { imageKey: SiteImageKey; category: string; city: string; title: string; description: string; resultaat: string }[] = [
  { imageKey: 'project.elektra', category: 'Elektra', city: 'Zwijndrecht', title: 'Volledige herinstallatie meterkast', description: 'Groepenkast vervangen na waterschade, NEN-gecertificeerde keuring uitgevoerd.', resultaat: 'Veilige installatie die voldoet aan alle huidige NEN-normen.' },
  { imageKey: 'project.airconditioning', category: 'Airconditioning', city: 'Rotterdam', title: '3x Mitsubishi Heavy airco-units', description: 'Drie units geplaatst inclusief buitenunits op plat dak, samenwerking met dakdekker.', resultaat: 'Comfortabel binnenklimaat op alle verdiepingen, app-gestuurd.' },
  { imageKey: 'project.cameras', category: "Camera's", city: 'Almere', title: 'Camerabeveiliging woning', description: 'Volledig camerasysteem met app-koppeling en bewegingsdetectie geinstalleerd.', resultaat: 'Klant heeft 24/7 live zicht op het pand via smartphone.' },
]

const reviews = [
  { quote: 'Snel gereageerd en netjes geinstalleerd. Airco werkt perfect en de afwerking was keurig. Zeker een aanrader!', name: 'Mohammed A.', platform: 'Google' },
  { quote: 'Vakkundige monteurs, duidelijke communicatie en op tijd. Groepenkast is perfect vervangen.', name: 'Sandra V.', platform: 'Werkspot' },
  { quote: 'Ook op zaterdagavond nog bereikbaar voor een storingsmelding. Binnen 2 uur was het opgelost.', name: 'Peter K.', platform: 'Google' },
]

const merken = ['ABB', 'Hager', 'Alfen', 'Gira', 'Jung', 'Zaptec', 'Mitsubishi Heavy', 'Daikin', 'LG', 'Mitsubishi Electric', 'Itho Daalderop', 'DUCO']

export default function HomePage() {
  const heroImage = getImage('hero.home')

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 bg-kms-yellow/15 text-kms-yellow border border-kms-yellow/30">
                  <span className="w-2 h-2 rounded-full inline-block bg-kms-yellow" />
                  BEREIKBAAR MA-ZO 08:00-22:00
                </div>
                <h1 className="heading-hero-home text-white mb-5">
                  Vakkundige installaties in Zuid-Holland{' '}
                  <span className="text-kms-yellow">altijd bereikbaar</span>
                </h1>
                <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                  Elektra, airconditioning, ventilatie en camerasystemen. Bereikbaar van maandag tot zondag, 08:00 tot 22:00.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/offerte" className="inline-block px-7 py-3.5 rounded-lg font-bold text-white text-base text-center bg-kms-yellow transition-opacity hover:opacity-90">
                    Vraag een offerte aan
                  </Link>
                  <a href="tel:0782032858" className="inline-block px-7 py-3.5 rounded-lg font-bold text-base text-center text-white border-2 border-white hover:bg-white hover:text-kms-navy transition-colors">
                    078 203 28 58
                  </a>
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
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Onze diensten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dienstenCards.slice(0, 3).map((card, i) => (
                <Link key={i} href={card.href} className="group block bg-kms-light rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <SiteImageOrPlaceholder imageKey={card.imageKey} placeholderLabel="" aspectRatio="aspect-video" />
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1.5 text-kms-navy group-hover:text-kms-yellow transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{card.description}</p>
                    <span className="text-sm font-semibold text-kms-yellow">Meer informatie &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 sm:max-w-2xl sm:mx-auto">
              {dienstenCards.slice(3).map((card, i) => (
                <Link key={i} href={card.href} className="group block bg-kms-light rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <SiteImageOrPlaceholder imageKey={card.imageKey} placeholderLabel="" aspectRatio="aspect-video" />
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1.5 text-kms-navy group-hover:text-kms-yellow transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{card.description}</p>
                    <span className="text-sm font-semibold text-kms-yellow">Meer informatie &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

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
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-kms-yellow">{project.category}</span>
                      <span className="text-xs text-gray-500">{project.city}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1.5 text-kms-navy">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                    <p className="text-sm font-semibold text-kms-yellow">Resultaat: {project.resultaat}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/projecten" className="inline-block px-6 py-3 rounded-lg text-sm font-bold border-2 border-kms-navy text-kms-navy transition-colors hover:text-white hover:bg-kms-navy">
                Bekijk alle projecten
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Wat klanten zeggen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <article key={i} className="bg-kms-light rounded-xl p-6 border border-gray-100">
                  <div className="flex gap-0.5 mb-3" aria-label="5 sterren">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-xl text-kms-yellow">&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{review.quote}&rdquo;</blockquote>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getReviewPlatformBadgeClass(review.platform)}`}>
                      {review.platform}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICERINGEN + MERKEN */}
        <section className="bg-kms-light py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Onze certificeringen</p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {certifications.map((cert) => (
                <CertificationBadge key={cert.id} certification={cert} />
              ))}
            </div>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Waarmee wij werken</p>
            <div className="flex flex-wrap justify-center gap-3">
              {merken.map((merk) => (
                <div key={merk} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm">
                  {merk}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
