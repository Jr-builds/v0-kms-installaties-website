'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ContactSidebar from '@/components/contact-sidebar'
import FormFieldError from '@/components/form-field-error'
import OfferteAudienceStep from '@/components/offerte-audience-step'
import OfferteCategoryStep from '@/components/offerte-category-step'
import OfferteQuestionsStep from '@/components/offerte-questions-step'
import OfferteFormBackLink from '@/components/offerte-form-back-link'
import OfferteFormProgress from '@/components/offerte-form-progress'
import { Button } from '@/components/ui/button'
import { phoneDisplay, phoneTelHref } from '@/lib/business'
import {
  getOfferteAudienceLabel,
  getOfferteCategoryLabel,
  getOfferteProgressStep,
  type OfferteAudienceId,
  type OfferteCategoryId,
} from '@/lib/offerte-form'
import {
  formatDutchPostcode,
  isValidDutchPostcode,
  normalizeDienstSlug,
} from '@/lib/offerte'
import {
  getOfferteAnswerLabel,
  getOfferteQuestions,
  isOfferteStoringEmergency,
  validateOfferteQuestionAnswers,
} from '@/lib/offerte-questions'
import { formInputClassName, validatePhone, validateRequired } from '@/lib/form-validation'

interface OfferteFormErrors {
  naam?: string
  telefoon?: string
  postcode?: string
}

const dienstSlugToCategory: Partial<Record<string, OfferteCategoryId>> = {
  elektra: 'elektra-renovatie',
  airconditioning: 'airco-installatie',
  ventilatie: 'ventilatie',
  vastgoedbeheer: 'technisch-vastgoedbeheer',
  cameras: 'camerabeveiliging',
  anders: 'elektra-renovatie',
}

function OfferteForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [categoryId, setCategoryId] = useState<OfferteCategoryId | null>(null)
  const [audienceId, setAudienceId] = useState<OfferteAudienceId | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [plaats, setPlaats] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState<OfferteFormErrors>({})
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({})
  const [questionErrors, setQuestionErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const dienstParam = searchParams.get('dienst')
    if (dienstParam) {
      const category = dienstSlugToCategory[normalizeDienstSlug(dienstParam)]
      if (category) {
        setCategoryId(category)
        setStep(2)
        return
      }
    }

    const plaatsParam = searchParams.get('plaats')
    if (plaatsParam) setPlaats(plaatsParam)
  }, [searchParams])

  function validatePostcode(value: string): string | null {
    if (!value.trim()) return null
    if (!isValidDutchPostcode(value)) {
      return 'Voer een geldige postcode in (bijv. 3335 KK)'
    }
    return null
  }

  function handlePostcodeBlur() {
    if (postcode.trim()) {
      setPostcode(formatDutchPostcode(postcode))
    }
    const postcodeError = validatePostcode(postcode)
    setErrors((current) => ({ ...current, postcode: postcodeError ?? undefined }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: OfferteFormErrors = {
      naam: validateRequired(naam, 'Naam') ?? undefined,
      telefoon: validatePhone(telefoon) ?? undefined,
      postcode: validatePostcode(postcode) ?? undefined,
    }

    if (nextErrors.naam || nextErrors.telefoon || nextErrors.postcode) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  function handleCategorySelect(id: OfferteCategoryId) {
    setCategoryId(id)
    setQuestionAnswers({})
    setQuestionErrors({})
    if (id === 'technisch-vastgoedbeheer') {
      setAudienceId('zakelijk')
    }
    setStep(2)
  }

  function handleAudienceSelect(id: OfferteAudienceId) {
    setAudienceId(id)
    setStep(3)
  }

  function handleQuestionAnswerChange(questionId: string, value: string) {
    setQuestionAnswers((current) => ({ ...current, [questionId]: value }))
    if (questionErrors[questionId]) {
      setQuestionErrors((current) => {
        const next = { ...current }
        delete next[questionId]
        return next
      })
    }
  }

  function handleQuestionsContinue() {
    if (!categoryId) return
    if (categoryId === 'storing' && isOfferteStoringEmergency(questionAnswers)) return
    const questions = getOfferteQuestions(categoryId)
    const nextErrors = validateOfferteQuestionAnswers(questions, questionAnswers)
    if (Object.keys(nextErrors).length > 0) {
      setQuestionErrors(nextErrors)
      return
    }
    setQuestionErrors({})
    setStep(4)
  }

  const progressStep = getOfferteProgressStep(step)

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
      {step > 3 ? (
        <>
          <h2 className="heading-subsection mb-2 text-kms-navy">Prijsindicatie aanvragen</h2>
          <p className="text-sm text-gray-500 mb-6">
            Vertel ons over uw project. Wij sturen een offerte op maat.
          </p>
        </>
      ) : null}
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-50 text-kms-green">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Aanvraag ontvangen!</h3>
          <p className="text-gray-600 text-sm">
            Wij nemen zo snel mogelijk, uiterlijk binnen 1 werkdag, contact met u op.
          </p>
        </div>
      ) : step === 1 ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteCategoryStep selectedId={categoryId} onSelect={handleCategorySelect} />
        </div>
      ) : step === 2 ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteAudienceStep selectedId={audienceId} onSelect={handleAudienceSelect} />
          <div className="mt-8">
            <OfferteFormBackLink onClick={() => setStep(1)} />
          </div>
        </div>
      ) : step === 3 && categoryId ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteQuestionsStep
            categoryId={categoryId}
            answers={questionAnswers}
            errors={questionErrors}
            onAnswerChange={handleQuestionAnswerChange}
            onContinue={handleQuestionsContinue}
          />
          <div className="mt-8">
            <OfferteFormBackLink onClick={() => setStep(2)} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <OfferteFormProgress currentStep={progressStep} />
          <div className="rounded-lg border border-gray-200 bg-kms-light/60 px-4 py-3 text-sm space-y-1">
            <p>
              <span className="text-gray-500">Categorie: </span>
              <span className="font-semibold text-kms-navy">
                {categoryId ? getOfferteCategoryLabel(categoryId) : '—'}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Aanvrager: </span>
              <span className="font-semibold text-kms-navy">
                {audienceId ? getOfferteAudienceLabel(audienceId) : '—'}
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
          <div>
            <label htmlFor="naam" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Naam <span className="text-red-500">*</span>
            </label>
            <input
              id="naam"
              type="text"
              value={naam}
              onChange={(event) => setNaam(event.target.value)}
              placeholder="Naam contactpersoon"
              aria-invalid={errors.naam ? true : undefined}
              aria-describedby={errors.naam ? 'naam-error' : undefined}
              className={formInputClassName(Boolean(errors.naam))}
            />
            {errors.naam ? <FormFieldError id="naam-error" message={errors.naam} /> : null}
          </div>
          <div>
            <label htmlFor="telefoon" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Telefoon <span className="text-red-500">*</span>
            </label>
            <input
              id="telefoon"
              type="tel"
              value={telefoon}
              onChange={(event) => setTelefoon(event.target.value)}
              placeholder="Telefoonnummer voor terugbelafspraak"
              autoComplete="tel"
              aria-invalid={errors.telefoon ? true : undefined}
              aria-describedby={errors.telefoon ? 'telefoon-error' : undefined}
              className={formInputClassName(Boolean(errors.telefoon))}
            />
            {errors.telefoon ? <FormFieldError id="telefoon-error" message={errors.telefoon} /> : null}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="postcode" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                inputMode="text"
                autoComplete="postal-code"
                placeholder="3335 KK"
                value={postcode}
                onChange={(event) => setPostcode(event.target.value)}
                onBlur={handlePostcodeBlur}
                aria-invalid={errors.postcode ? true : undefined}
                aria-describedby={errors.postcode ? 'postcode-error' : undefined}
                className={formInputClassName(Boolean(errors.postcode))}
              />
              {errors.postcode ? <FormFieldError id="postcode-error" message={errors.postcode} /> : null}
            </div>
            <div>
              <label htmlFor="plaats" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Plaats
              </label>
              <input
                id="plaats"
                type="text"
                placeholder="Bijv. Zwijndrecht"
                value={plaats}
                onChange={(event) => setPlaats(event.target.value)}
                className={formInputClassName()}
              />
            </div>
          </div>
          <div>
            <label htmlFor="omschrijving" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Projectomschrijving
            </label>
            <textarea
              id="omschrijving"
              rows={5}
              placeholder="Beschrijf uw project: type pand, gewenste werkzaamheden, planning en eventuele bijzonderheden voor een gerichte offerte."
              className={`${formInputClassName()} resize-none`}
            />
          </div>
          <div>
            <label htmlFor="situatiefotos" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Situatiefoto&apos;s <span className="font-normal text-gray-400">(optioneel)</span>
            </label>
            <div className="rounded-lg border border-dashed border-gray-300 bg-kms-light px-4 py-6 text-center">
              <input id="situatiefotos" type="file" accept="image/*" multiple disabled className="sr-only" />
              <label
                htmlFor="situatiefotos"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Foto&apos;s uploaden
              </label>
              <p className="mt-2 text-xs text-gray-500">Binnenkort beschikbaar</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <OfferteFormBackLink onClick={() => setStep(3)} />
            <Button type="submit" variant="primary" size="cta" className="w-full sm:w-auto sm:min-w-[12rem]">
              Offerte aanvragen
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Wij reageren binnen 1 werkdag, meestal dezelfde dag. Ook bereikbaar via{' '}
            <a href={phoneTelHref} className="font-semibold text-kms-navy">
              {phoneDisplay}
            </a>
            .
          </p>
        </form>
      )}
    </div>
  )
}

function OfferteFormFallback() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
      <div className="space-y-4">
        <div className="h-12 bg-gray-100 rounded-lg" />
        <div className="h-12 bg-gray-100 rounded-lg" />
        <div className="h-12 bg-gray-100 rounded-lg" />
      </div>
    </div>
  )
}

export default function OffertePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-14 sm:py-20">
          <div className="hero-navy-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-page text-white mb-3">Offerte voor uw nieuwe project</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Beschrijf uw situatie en ontvang een vrijblijvende prijsindicatie. Reactie binnen 1 werkdag,
              meestal dezelfde dag.
            </p>
            <p className="text-sm text-blue-200 mt-5">
              Spoed of storing?{' '}
              <Link href="/contact" className="font-semibold text-kms-yellow-dark hover:underline">
                Neem contact op →
              </Link>
            </p>
          </div>
        </section>

        <TrustBar />

        <section className="bg-kms-light py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3">
                <Suspense fallback={<OfferteFormFallback />}>
                  <OfferteForm />
                </Suspense>
              </div>

              <div className="lg:col-span-2">
                <ContactSidebar
                  title="Direct contact"
                  hoursVariant="long"
                  showSpoedCta
                  showWhatsApp
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
