import Link from 'next/link'
import { businessInfo } from '@/lib/business'
import { buildOfferteHref } from '@/lib/offerte'

function MapPinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function Werkgebied() {
  return (
    <section className="bg-kms-light py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="heading-section text-kms-navy mb-3">Ons werkgebied</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Vanuit Zwijndrecht bedienen wij particulieren en bedrijven door heel Zuid-Holland.
            Klik op een plaats voor een offerte in uw regio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div
            className="relative overflow-hidden rounded-2xl border border-kms-navy/10 bg-gradient-to-br from-kms-navy/5 to-kms-navy/10 aspect-[4/3] min-h-[220px]"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, #1e52a0 0, #1e52a0 1px, transparent 0, transparent 24px), repeating-linear-gradient(90deg, #1e52a0 0, #1e52a0 1px, transparent 0, transparent 24px)',
              }}
            />
            <div className="absolute inset-6 rounded-xl border-2 border-dashed border-kms-navy/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-kms-navy/60 mb-2">
                Regio
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-kms-navy">Zuid-Holland</span>
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100">
                <MapPinIcon className="h-4 w-4 text-kms-yellow-dark" />
                <span className="text-sm font-semibold text-kms-navy">
                  Vestiging: {businessInfo.address.addressLocality}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-kms-navy mb-4">Werkgebied per plaats</p>
            <ul className="flex flex-wrap gap-2">
              {businessInfo.areaServedCities.map((city) => (
                <li key={city}>
                  <Link
                    href={buildOfferteHref(undefined, city)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-kms-navy shadow-sm transition-colors hover:border-kms-navy hover:bg-white"
                  >
                    <MapPinIcon className="h-3.5 w-3.5 text-kms-yellow-dark flex-shrink-0" />
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-gray-500">
              Woont u net buiten deze plaatsen?{' '}
              <Link href="/offerte" className="font-semibold text-kms-navy hover:underline">
                Vraag toch een offerte aan
              </Link>{' '}
              , wij kijken graag wat mogelijk is.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
