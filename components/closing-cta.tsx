import Link from 'next/link'

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
    <section style={{ background: '#1e52a0' }} className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance mb-3">{title}</h2>
        <p className="text-blue-200 mb-8 text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-block px-8 py-3.5 rounded-lg text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#F5A623' }}
          >
            {primaryLabel}
          </Link>
          <a
            href="tel:0782032858"
            className="inline-block px-8 py-3.5 rounded-lg text-base font-bold text-white border-2 border-white hover:bg-white hover:text-[#1e52a0] transition-colors"
          >
            078 203 28 58
          </a>
        </div>
      </div>
    </section>
  )
}
