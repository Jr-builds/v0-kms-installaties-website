import Link from 'next/link'
import ImagePlaceholder from './image-placeholder'

interface ServiceHeroProps {
  title: string
  titleAccent?: string
  subtitle: string
  imageLabel: string
  primaryLabel?: string
}

export default function ServiceHero({
  title,
  subtitle,
  imageLabel,
  primaryLabel = 'Vraag een offerte aan',
}: ServiceHeroProps) {
  return (
    <section style={{ background: '#1e52a0' }} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance mb-4">
              {title}
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/offerte"
                className="inline-block px-7 py-3.5 rounded-lg font-bold text-white text-base transition-opacity hover:opacity-90 text-center"
                style={{ background: '#F5A623' }}
              >
                {primaryLabel}
              </Link>
              <a
                href="tel:0782032858"
                className="inline-block px-7 py-3.5 rounded-lg font-bold text-base text-white border-2 border-white hover:bg-white hover:text-[#1e52a0] transition-colors text-center"
              >
                078 203 28 58
              </a>
            </div>
          </div>
          <div>
            <ImagePlaceholder label={imageLabel} aspectRatio="aspect-[4/3]" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
