import Link from 'next/link'
import { serviceAreaCoveragePhrase } from '@/lib/service-area'
import StadChips from '@/components/stad-chips'
import { Button } from '@/components/ui/button'

export default function Werkgebied() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-kms-yellow-dark mb-2">
          Werkgebied
        </p>
        <h2 className="heading-section text-kms-navy mb-3 max-w-2xl">
          Lokaal bereikbaar vanuit Zwijndrecht
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl mb-8">
          {serviceAreaCoveragePhrase}
        </p>

        <StadChips variant="soft" />

        <div className="mt-8 rounded-2xl border border-kms-yellow/25 bg-kms-yellow/10 p-6 sm:p-8">
          <p className="text-base font-semibold text-kms-navy mb-4 leading-relaxed">
            Staat uw plaats er niet bij? Neem contact op, wij kijken graag of we u toch kunnen helpen.
          </p>
          <Button
            render={<Link href="/contact#contactgegevens" />}
            nativeButton={false}
            variant="secondary"
            size="default"
            className="bg-white hover:bg-white"
          >
            Neem contact op &rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
