import { trustLinks } from '@/lib/trust-links'

interface TrustBarProps {
  /** @deprecated No longer affects layout; kept so existing pages compile unchanged. */
  variant?: 'full' | 'slim'
}

export default function TrustBar({ variant: _variant = 'full' }: TrustBarProps = {}) {
  return (
    <section className="bg-kms-light border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0 sm:divide-x sm:divide-gray-300">
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
        </div>
      </div>
    </section>
  )
}
