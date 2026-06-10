import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import ClosingCTA from '@/components/closing-cta'
import StatsBar from '@/components/stats-bar'
import Werkgebied from '@/components/werkgebied'
import { certifications } from '@/lib/certifications'
import { getReviewPlatformBadgeClass } from '@/lib/review-badge'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.overOns

const reviews = [
  { quote: 'Snel gereageerd en netjes geinstalleerd. Airco werkt perfect en de afwerking was keurig. Zeker een aanrader!', name: 'Mohammed A.', platform: 'Google' },
  { quote: 'Vakkundige monteurs, duidelijke communicatie en op tijd. Groepenkast is perfect vervangen.', name: 'Sandra V.', platform: 'Werkspot' },
  { quote: 'Ook op zaterdagavond nog bereikbaar voor een storingsmelding. Binnen 2 uur was het opgelost.', name: 'Peter K.', platform: 'Google' },
  { quote: 'KMS verzorgt het technisch beheer van ons pand al twee jaar. Altijd professioneel en op tijd.', name: 'R. Bakker', platform: 'Google' },
]

export default function OverOnsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-hero-home text-white mb-5">
              Vakmanschap met een persoonlijk verhaal
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              KMS Installaties is opgericht door Kerem Sen en Mevlut Sumer, twee vakmannen met een gedeelde passie voor techniek en kwaliteit. Vanuit Zwijndrecht bedienen wij particulieren en bedrijven door heel Zuid-Holland.
            </p>
          </div>
        </section>

        {/* Team sectie */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Onze specialisten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                { imageLabel: 'Foto: Kerem Sen', name: 'Kerem Sen', role: 'Eigenaar & Elektrotechnicus' },
                { imageLabel: 'Foto: Mevlut Sumer', name: 'Mevlut Sumer', role: 'Eigenaar & Installatiespecialist' },
              ].map((person, i) => (
                <div key={i} className="text-center">
                  <ImagePlaceholder label={person.imageLabel} aspectRatio="aspect-square" className="w-full max-w-xs mx-auto rounded-2xl mb-4" />
                  <h3 className="font-bold text-lg text-kms-navy">{person.name}</h3>
                  <p className="text-gray-500 text-sm">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar
          columns={4}
          size="md"
          items={[
            { value: '10+', label: 'Jaar', sub: 'Vakmanschap' },
            { value: '200+', label: 'Afgeronde', sub: 'projecten' },
            { value: '56', label: 'Vijfsterren', sub: 'reviews' },
            { value: 'Zuid', label: '-Holland', sub: 'Werkgebied' },
          ]}
        />

        {/* Certificeringen */}
        <section className="bg-kms-light py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Onze certificeringen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white rounded-xl p-6 border-t-4 border border-gray-100 shadow-sm border-t-kms-yellow">
                  <div className="text-2xl font-black mb-3 text-kms-navy">{cert.name}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-center mb-10 text-kms-navy">
              Wat klanten zeggen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.map((review, i) => (
                <article key={i} className="bg-kms-light rounded-xl p-5 border border-gray-100">
                  <div className="flex gap-0.5 mb-3" aria-label="5 sterren">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-lg text-kms-yellow-dark">&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-3">&ldquo;{review.quote}&rdquo;</blockquote>
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

        <Werkgebied />

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
