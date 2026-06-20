'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { openingHoursDisplay, phoneDisplay, phoneTelHref } from '@/lib/business'

export default function OfferteSpoedCallout() {
  return (
    <div
      role="alert"
      className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5 sm:p-6"
    >
      <div className="flex gap-3">
        <AlertTriangle className="size-6 shrink-0 text-amber-600" strokeWidth={2} aria-hidden />
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-kms-navy">Spoed? Bel ons direct</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
            Bij een noodsituatie bent u het snelst geholpen via telefoon. Wij zijn bereikbaar{' '}
            {openingHoursDisplay.toLowerCase()}.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="spoed" size="cta" render={<a href={phoneTelHref} />}>
              Bel {phoneDisplay}
            </Button>
            <Link
              href="/contact"
              className="text-center text-sm font-semibold text-kms-navy hover:underline sm:text-left"
            >
              Of ga naar contact →
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Geen spoed? Wijzig uw antwoord op de vraag hierboven om een offerte aan te vragen.
          </p>
        </div>
      </div>
    </div>
  )
}
