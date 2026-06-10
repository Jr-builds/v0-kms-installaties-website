import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { phoneDisplay, phoneTelHref } from '@/lib/business'

interface ClosingCTAProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
}

export default function ClosingCTA({
  title = 'Klaar om uw project te starten?',
  subtitle = 'Wij reageren dezelfde dag, ook in het weekend.',
  primaryLabel = 'Vraag een offerte aan',
  primaryHref = '/offerte',
}: ClosingCTAProps) {
  return (
    <section className="hero-navy py-16 sm:py-20">
      <div className="hero-navy-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-section text-white mb-3">{title}</h2>
        <p className="text-blue-200 mb-8 text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button render={<Link href={primaryHref} />} nativeButton={false} variant="primary" size="cta">
            {primaryLabel}
          </Button>
          <Button render={<a href={phoneTelHref} />} nativeButton={false} variant="hero-outline" size="cta">
            {phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  )
}
