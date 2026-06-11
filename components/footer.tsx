import Link from 'next/link'
import SiteLogo from '@/components/site-logo'
import {
  businessInfo,
  btwId,
  kvkLookupUrl,
  kvkNumber,
  openingHoursDisplay,
  phoneDisplay,
  phoneTelHref,
} from '@/lib/business'
import { legalPageLinks } from '@/lib/legal'

export default function Footer() {
  return (
    <footer className="bg-kms-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Over ons */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SiteLogo size={52} />
              <div>
                <div className="font-bold text-base text-white">KMS Installaties</div>
                <div className="text-xs font-semibold tracking-widest text-kms-yellow-light">
                  ELEKTRA &amp; AIRCONDITIONING
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              10+ jaar vakmanschap in Zuid-Holland. Elektra, airco, ventilatie en beveiliging. Altijd bereikbaar, ook in het weekend.
            </p>
          </div>

          {/* Col 2: Diensten */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Diensten</h3>
            <ul className="space-y-2">
              {[
                { label: 'Elektra', href: '/elektra' },
                { label: 'Airconditioning', href: '/airconditioning' },
                { label: 'Ventilatie', href: '/ventilatie' },
                { label: 'Technisch Vastgoedbeheer', href: '/technisch-vastgoedbeheer' },
                { label: "Camera's & Systemen", href: '/cameras-systemen' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigatie */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Navigatie</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Over ons', href: '/over-ons' },
                { label: 'Projecten', href: '/projecten' },
                { label: 'Contact', href: '/contact' },
                { label: 'Offerte aanvragen', href: '/offerte' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Juridisch */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Juridisch</h3>
            <ul className="space-y-2">
              {legalPageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{businessInfo.address.streetAddress}</li>
              <li>
                {businessInfo.address.postalCode} {businessInfo.address.addressLocality}
              </li>
              <li>
                <a href={phoneTelHref} className="hover:text-white transition-colors">
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">
                  {businessInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={kvkLookupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  KvK {kvkNumber}
                </a>
              </li>
              <li>
                {btwId ? `BTW-id ${btwId}` : 'BTW-id: wordt aangevuld'}
              </li>
              <li className="mt-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-kms-navy">
                  {openingHoursDisplay}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-kms-navy-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-gray-400">
            &copy; 2026 KMS Installaties. Alle rechten voorbehouden.
          </p>
          <nav aria-label="Juridische links" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legalPageLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-gray-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
