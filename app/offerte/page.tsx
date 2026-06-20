'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ContactSidebar from '@/components/contact-sidebar'
import OfferteAudienceStep from '@/components/offerte-audience-step'
import OfferteCategoryStep from '@/components/offerte-category-step'
import OfferteContactStep from '@/components/offerte-contact-step'
import OfferteFotosStep from '@/components/offerte-fotos-step'
import OfferteFormBackLink from '@/components/offerte-form-back-link'
import OfferteFormProgress from '@/components/offerte-form-progress'
import OfferteQuestionsStep from '@/components/offerte-questions-step'
import OfferteVerhaalStep from '@/components/offerte-verhaal-step'
import {
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
  getOfferteQuestions,
  isOfferteStoringEmergency,
  validateOfferteQuestionAnswers,
} from '@/lib/offerte-questions'
import { validateEmail, validatePhone, validateRequired } from '@/lib/form-validation'

interface OfferteFormErrors {
  naam?: string
  telefoon?: string
  email?: string
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
  const [omschrijving, setOmschrijving] = useState('')
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [email, setEmail] = useState('')
  const [plaats, setPlaats] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState<OfferteFormErrors>({})
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({})
  const [questionErrors, setQuestionErrors] = useState<Record<string, string>>({})
  const [fotoFiles, setFotoFiles] = useState<File[]>([])

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
    const required = validateRequired(value, 'Postcode')
    if (required) return required
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
      email: validateEmail(email) ?? undefined,
      postcode: validatePostcode(postcode) ?? undefined,
    }

    if (nextErrors.naam || nextErrors.telefoon || nextErrors.email || nextErrors.postcode) {
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
    setFotoFiles([])
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
      ) : step === 4 ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteVerhaalStep
            value={omschrijving}
            onChange={setOmschrijving}
            onBack={() => setStep(3)}
            onContinue={() => setStep(5)}
          />
        </div>
      ) : step === 5 && categoryId ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteFotosStep
            categoryId={categoryId}
            files={fotoFiles}
            onFilesChange={setFotoFiles}
            onBack={() => setStep(4)}
            onContinue={() => setStep(6)}
          />
        </div>
      ) : step === 6 ? (
        <div>
          <OfferteFormProgress currentStep={progressStep} />
          <OfferteContactStep
            naam={naam}
            telefoon={telefoon}
            email={email}
            postcode={postcode}
            plaats={plaats}
            errors={errors}
            onNaamChange={setNaam}
            onTelefoonChange={setTelefoon}
            onEmailChange={setEmail}
            onPostcodeChange={setPostcode}
            onPlaatsChange={setPlaats}
            onPostcodeBlur={handlePostcodeBlur}
            onBack={() => setStep(5)}
            onSubmit={handleSubmit}
          />
        </div>
      ) : null}
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
