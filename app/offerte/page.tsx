'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import ContactSidebar from '@/components/contact-sidebar'
import FormFieldError from '@/components/form-field-error'
import { Button } from '@/components/ui/button'
import { phoneDisplay, phoneTelHref } from '@/lib/business'
import {
  formatDutchPostcode,
  getOfferteDienstLabel,
  isValidDutchPostcode,
  offerteDiensten,
} from '@/lib/offerte'
import { formInputClassName, validatePhone, validateRequired } from '@/lib/form-validation'

interface OfferteFormErrors {
  naam?: string
  telefoon?: string
  postcode?: string
}

function OfferteForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [dienst, setDienst] = useState('')
  const [plaats, setPlaats] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState<OfferteFormErrors>({})

  useEffect(() => {
    const dienstParam = searchParams.get('dienst')
    if (dienstParam) {
      const label = getOfferteDienstLabel(dienstParam)
      if (label) setDienst(label)
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

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h2 className="heading-subsection mb-2 text-kms-navy">Prijsindicatie aanvragen</h2>
      <p className="text-sm text-gray-500 mb-6">
        Vertel ons over uw project. Wij sturen een offerte op maat.
      </p>
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
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            <label htmlFor="dienst" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Gewenste dienst
            </label>
            <select
              id="dienst"
              value={dienst}
              onChange={(event) => setDienst(event.target.value)}
              className={`${formInputClassName()} text-gray-700`}
            >
              <option value="">Kies de dienst voor uw offerte</option>
              {offerteDiensten.map((option) => (
                <option key={option.slug} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
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
          <div>
            <Button type="submit" variant="primary" size="cta" className="w-full">
              Offerte aanvragen
            </Button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Wij reageren binnen 1 werkdag, meestal dezelfde dag. Ook bereikbaar via{' '}
              <a href={phoneTelHref} className="font-semibold text-kms-navy">
                {phoneDisplay}
              </a>
              .
            </p>
          </div>
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
