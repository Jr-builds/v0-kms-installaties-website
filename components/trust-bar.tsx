import Image from 'next/image'
import { trustLinks } from '@/lib/trust-links'

interface TrustBarProps {
  /** @deprecated No longer affects layout; kept so existing pages compile unchanged. */
  variant?: 'full' | 'slim'
}

export default function TrustBar({ variant: _variant = 'full' }: TrustBarProps = {}) {
  const items = [trustLinks.googleReviews, trustLinks.werkspot]

  return (
    <section className="bg-kms-light border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row items-center justify-center divide-x divide-gray-300">
          {items.map((item) => (
            <a
              key={item.platform}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy sm:flex-none sm:px-5"
            >
              <Image
                src={item.logo}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 rounded-full"
              />
              <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-1.5">
                <span className="text-sm font-semibold text-gray-800">
                  {item.label}{' '}
                  <span className="font-medium text-gray-700">{item.platform}</span>
                </span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
