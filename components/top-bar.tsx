'use client'

import { useEffect, useState } from 'react'
import { Check, Phone } from 'lucide-react'
import { getAvailabilityStatus, type AvailabilityStatus } from '@/lib/availability'
import { openingHoursDisplay, phoneDisplay, phoneTelHref } from '@/lib/business'
import { cn } from '@/lib/utils'

const certifications = ['STEK gecertificeerd', 'NEN 1010', 'NEN 3140 VP']

function AvailabilityStatusLine({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<AvailabilityStatus>(() => getAvailabilityStatus())

  useEffect(() => {
    setStatus(getAvailabilityStatus())
    const interval = window.setInterval(() => setStatus(getAvailabilityStatus()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-medium', className)} aria-live="polite">
      <span
        className={cn('size-1.5 shrink-0 rounded-full', status.isOpen ? 'bg-kms-green' : 'bg-gray-400')}
        aria-hidden="true"
      />
      {status.label}
    </span>
  )
}

export default function TopBar() {
  return (
    <div className="bg-kms-navy-dark text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
        <AvailabilityStatusLine className="lg:hidden" />

        <ul className="hidden items-center gap-5 lg:flex" aria-label="Certificeringen">
          {certifications.map((certification) => (
            <li key={certification} className="inline-flex items-center gap-1.5 font-medium text-white/90">
              <Check className="size-3.5 shrink-0 text-kms-yellow" strokeWidth={3} aria-hidden="true" />
              {certification}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <AvailabilityStatusLine className="hidden lg:inline-flex" />
          <span className="hidden text-white/60 md:inline" aria-hidden="true">
            |
          </span>
          <span className="hidden font-medium text-white/80 md:inline">{openingHoursDisplay}</span>
          <a
            href={phoneTelHref}
            className="inline-flex items-center gap-1.5 rounded-sm font-bold text-white transition-colors hover:text-kms-yellow-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-kms-navy-dark"
            aria-label={`Storingsdienst, bel ${phoneDisplay}`}
          >
            <Phone className="size-3.5 shrink-0 text-kms-yellow" aria-hidden="true" />
            <span className="hidden font-medium text-white/80 sm:inline">Storingsdienst</span>
            {phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  )
}
