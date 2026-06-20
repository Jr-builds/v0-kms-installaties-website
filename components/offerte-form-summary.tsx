import {
  getOfferteAnswerLabel,
  getOfferteQuestions,
} from '@/lib/offerte-questions'
import {
  getOfferteAudienceLabel,
  getOfferteCategoryLabel,
  type OfferteAudienceId,
  type OfferteCategoryId,
} from '@/lib/offerte-form'

interface OfferteFormSummaryProps {
  categoryId: OfferteCategoryId | null
  audienceId: OfferteAudienceId | null
  questionAnswers: Record<string, string>
}

export default function OfferteFormSummary({
  categoryId,
  audienceId,
  questionAnswers,
}: OfferteFormSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-kms-light/60 px-4 py-3 text-sm space-y-1">
      <p>
        <span className="text-gray-500">Categorie: </span>
        <span className="font-semibold text-kms-navy">
          {categoryId ? getOfferteCategoryLabel(categoryId) : '-'}
        </span>
      </p>
      <p>
        <span className="text-gray-500">Aanvrager: </span>
        <span className="font-semibold text-kms-navy">
          {audienceId ? getOfferteAudienceLabel(audienceId) : '-'}
        </span>
      </p>
      {categoryId
        ? getOfferteQuestions(categoryId)
            .filter((question) => questionAnswers[question.id]?.trim())
            .map((question) => (
              <p key={question.id}>
                <span className="text-gray-500">{question.label}: </span>
                <span className="font-semibold text-kms-navy">
                  {getOfferteAnswerLabel(question, questionAnswers[question.id])}
                </span>
              </p>
            ))
        : null}
    </div>
  )
}
