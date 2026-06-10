import { getReviewPlatformBadgeClass } from '@/lib/review-badge'

interface Review {
  quote: string
  name: string
  platform: string
}

interface ReviewsProps {
  reviews: Review[]
  title?: string
  columns?: 3 | 4
}

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 sterren">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-lg text-kms-yellow-dark">&#9733;</span>
      ))}
    </div>
  )
}

export default function Reviews({ reviews, title = 'Wat klanten zeggen', columns = 3 }: ReviewsProps) {
  const gridClass =
    columns === 4
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
      : 'grid grid-cols-1 md:grid-cols-3 gap-6'

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-section text-center mb-10 text-kms-navy">
          {title}
        </h2>
        <div className={gridClass}>
          {reviews.map((review, i) => (
            <article key={i} className="bg-kms-light rounded-xl p-6 border border-gray-100">
              <StarRating />
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getReviewPlatformBadgeClass(review.platform)}`}>
                  {review.platform}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
