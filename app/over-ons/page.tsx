import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import ClosingCTA from '@/components/closing-cta'
import StatsBar from '@/components/stats-bar'
import Reviews from '@/components/reviews'
import Werkgebied from '@/components/werkgebied'
import { pageReviews } from '@/lib/reviews'
import { pageMetadata } from '@/lib/metadata'
import { serviceAreaFromZwijndrecht } from '@/lib/service-area'

export const metadata: Metadata = pageMetadata.overOns

const reviews = pageReviews.overOns

export default function OverOnsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-hero-home text-white mb-5">
              Vakmanschap met een persoonlijk verhaal
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              KMS Installaties is opgericht door Kerem Sen en Mevlut Sumer, twee vakmannen met een gedeelde passie voor techniek en kwaliteit. {serviceAreaFromZwijndrecht}
            </p>
          </div>
        </section>

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
            { value: '4', label: 'Regio\'s', sub: 'Actief' },
          ]}
        />

        <Reviews reviews={reviews} title="Wat klanten zeggen" columns={4} />

        <Werkgebied />

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
