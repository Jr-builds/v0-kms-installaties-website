import CertificationBadge from '@/components/certification-badge'
import { getCertification } from '@/lib/certifications'
import { trustLinks } from '@/lib/trust-links'

const certNames = ['NEN 3140', 'STEK', 'VCA'] as const

interface TrustBarProps {
  /** Full bar on home/offerte; slim on service pages (reviews + certs only). */
  variant?: 'full' | 'slim'
}

export default function TrustBar({ variant = 'full' }: TrustBarProps) {
  const showAvailability = variant === 'full'

  return (
    <section className="bg-kms-light border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:divide-x sm:divide-gray-300">
          {[trustLinks.googleReviews, trustLinks.werkspot].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy sm:px-5"
            >
              <span className="text-base text-kms-yellow-dark" aria-hidden="true">
                &#9733;
              </span>
              <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            </a>
          ))}

          <div className="col-span-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-3 py-2 sm:col-span-1 sm:flex-nowrap sm:gap-x-0 sm:px-0">
            {certNames.map((name, index) => {
              const certification = getCertification(name)
              if (!certification) return null

              return (
                <div
                  key={name}
                  className={`px-3 py-2 sm:px-5${index > 0 ? ' sm:border-l sm:border-gray-300' : ''}`}
                >
                  <CertificationBadge certification={certification} variant="compact" />
                </div>
              )
            })}
          </div>

          {showAvailability && (
            <div className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 sm:col-span-1 sm:px-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="text-sm font-semibold text-gray-800">Ma-Zo</span>
                <span className="text-xs text-gray-500">08:00-22:00</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
