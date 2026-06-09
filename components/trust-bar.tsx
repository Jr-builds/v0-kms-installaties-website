import CertificationBadge from '@/components/certification-badge'
import { getCertification } from '@/lib/certifications'
import { trustLinks } from '@/lib/trust-links'

const certNames = ['NEN 3140', 'STEK', 'VCA'] as const

export default function TrustBar() {
  return (
    <section className="bg-[#F8F9FA] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-gray-300">
          {/* Review links */}
          {[trustLinks.googleReviews, trustLinks.werkspot].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 transition-colors hover:bg-white/80 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy"
            >
              <span className="text-yellow-400 text-base" aria-hidden>
                &#9733;
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            </a>
          ))}

          {/* Certification badges */}
          {certNames.map((name) => {
            const certification = getCertification(name)
            if (!certification) return null

            return (
              <div key={name} className="px-5 py-2">
                <CertificationBadge certification={certification} variant="compact" />
              </div>
            )
          })}

          {/* Availability */}
          <div className="flex items-center gap-2 px-5 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
              <span className="text-sm font-semibold text-gray-800">Ma-Zo</span>
              <span className="text-xs text-gray-500">08:00-22:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
