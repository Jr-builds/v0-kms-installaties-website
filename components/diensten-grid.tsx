import SiteImageOrPlaceholder from './site-image-or-placeholder'
import type { SiteImageKey } from '@/lib/images'

interface DienstCard {
  imageKey?: SiteImageKey
  imageLabel: string
  title: string
  description: string
}

interface DienstenGridProps {
  title?: string
  cards: DienstCard[]
}

export default function DienstenGrid({ title = 'Onze diensten', cards }: DienstenGridProps) {
  return (
    <section className="bg-[#F8F9FA] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-balance" style={{ color: '#1e52a0' }}>
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <article key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <SiteImageOrPlaceholder
                imageKey={card.imageKey}
                placeholderLabel={card.imageLabel}
                aspectRatio="aspect-video"
              />
              <div className="p-5">
                <h3 className="font-bold text-base mb-2" style={{ color: '#1e52a0' }}>{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
