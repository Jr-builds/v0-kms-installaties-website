'use client'

import FormFieldError from '@/components/form-field-error'
import OfferteSpoedCallout from '@/components/offerte-spoed-callout'
import { Button } from '@/components/ui/button'
import { formInputClassName } from '@/lib/form-validation'
import {
  getOfferteQuestions,
  isOfferteStoringEmergency,
  type OfferteQuestion,
} from '@/lib/offerte-questions'
import type { OfferteCategoryId } from '@/lib/offerte-form'
import { getOfferteCategoryLabel } from '@/lib/offerte-form'

interface OfferteQuestionsStepProps {
  categoryId: OfferteCategoryId
  answers: Record<string, string>
  errors: Record<string, string>
  onAnswerChange: (questionId: string, value: string) => void
  onContinue: () => void
}

function QuestionField({
  question,
  value,
  error,
  onChange,
}: {
  question: OfferteQuestion
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${question.id}-error`
  const hasError = Boolean(error)

  if (question.type === 'textarea') {
    return (
      <div>
        <label htmlFor={question.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {question.label}
          {question.required ? <span className="text-red-500"> *</span> : null}
          {!question.required ? (
            <span className="font-normal text-gray-400"> (optioneel)</span>
          ) : null}
        </label>
        <textarea
          id={question.id}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`${formInputClassName(hasError)} resize-none`}
        />
        {question.helpText ? (
          <p className="mt-1.5 text-xs text-gray-500">{question.helpText}</p>
        ) : null}
        {error ? <FormFieldError id={errorId} message={error} /> : null}
      </div>
    )
  }

  if (question.type === 'text') {
    return (
      <div>
        <label htmlFor={question.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {question.label}
          {question.required ? <span className="text-red-500"> *</span> : null}
          {!question.required ? (
            <span className="font-normal text-gray-400"> (optioneel)</span>
          ) : null}
        </label>
        <input
          id={question.id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={formInputClassName(hasError)}
        />
        {question.helpText ? (
          <p className="mt-1.5 text-xs text-gray-500">{question.helpText}</p>
        ) : null}
        {error ? <FormFieldError id={errorId} message={error} /> : null}
      </div>
    )
  }

  return (
    <div>
      <label htmlFor={question.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {question.label}
        {question.required ? <span className="text-red-500"> *</span> : null}
      </label>
      <select
        id={question.id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={formInputClassName(hasError)}
      >
        <option value="">Maak een keuze</option>
        {question.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {question.helpText ? (
        <p className="mt-1.5 text-xs text-gray-500">{question.helpText}</p>
      ) : null}
      {error ? <FormFieldError id={errorId} message={error} /> : null}
    </div>
  )
}

export default function OfferteQuestionsStep({
  categoryId,
  answers,
  errors,
  onAnswerChange,
  onContinue,
}: OfferteQuestionsStepProps) {
  const questions = getOfferteQuestions(categoryId)
  const categoryLabel = getOfferteCategoryLabel(categoryId)
  const isStoringEmergency =
    categoryId === 'storing' && isOfferteStoringEmergency(answers)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isStoringEmergency) return
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">
          Een paar vragen over {categoryLabel.toLowerCase()}
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Zo kunnen wij een gerichte prijsindicatie opstellen.
        </p>
      </div>

      {questions.map((question) => (
        <QuestionField
          key={question.id}
          question={question}
          value={answers[question.id] ?? ''}
          error={errors[question.id]}
          onChange={(value) => onAnswerChange(question.id, value)}
        />
      ))}

      {isStoringEmergency ? <OfferteSpoedCallout /> : null}

      {!isStoringEmergency ? (
        <div className="pt-2">
          <Button type="submit" variant="primary" size="cta" className="w-full sm:w-auto sm:min-w-[12rem]">
            Volgende
          </Button>
        </div>
      ) : null}
    </form>
  )
}
