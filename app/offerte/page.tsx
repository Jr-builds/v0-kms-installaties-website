'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import {
  formatDutchPostcode,
  getOfferteDienstLabel,
  isValidDutchPostcode,
  offerteDiensten,
} from '@/lib/offerte'

const inputClassName =
  'w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-kms-navy focus:border-transparent bg-kms-light'

function OfferteForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [dienst, setDienst] = useState('')
  const [plaats, setPlaats] = useState('')
  const [postcode, setPostcode] = useState('')
  const [postcodeError, setPostcodeError] = useState('')

  useEffect(() => {
    const dienstParam = searchParams.get('dienst')
    if (dienstParam) {
      const label = getOfferteDienstLabel(dienstParam)
      if (label) setDienst(label)
    }

    const plaatsParam = searchParams.get('plaats')
    if (plaatsParam) setPlaats(plaatsParam)
  }, [searchParams])

  function validatePostcode(value: string): boolean {
    if (!value.trim()) {
      setPostcodeError('')
      return true
    }

    if (!isValidDutchPostcode(value)) {
      setPostcodeError('Voer een geldige postcode in (bijv. 3335 KK)')
      return false
    }

    setPostcodeError('')
    return true
  }

  function handlePostcodeBlur() {
    if (postcode.trim()) {
      setPostcode(formatDutchPostcode(postcode))
    }
    validatePostcode(postcode)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validatePostcode(postcode)) return
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h2 className="heading-subsection mb-2 text-kms-navy">Prijsindicatie aanvragen</h2>
      <p className="text-sm text-gray-500 mb-6">
        Vertel ons over uw project — wij sturen een offerte op maat.
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="naam" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Naam <span className="text-red-500">*</span>
            </label>
            <input
              id="naam"
              type="text"
              required
              placeholder="Naam contactpersoon"
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="telefoon" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Telefoon <span className="text-red-500">*</span>
            </label>
            <input
              id="telefoon"
              type="tel"
              required
              placeholder="Telefoonnummer voor terugbelafspraak"
              className={inputClassName}
            />
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
                aria-invalid={postcodeError ? true : undefined}
                aria-describedby={postcodeError ? 'postcode-error' : undefined}
                className={`${inputClassName}${postcodeError ? ' border-red-400 focus:ring-red-400' : ''}`}
              />
              {postcodeError ? (
                <p id="postcode-error" className="mt-1.5 text-xs text-red-600">
                  {postcodeError}
                </p>
              ) : null}
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
                className={inputClassName}
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
              className={`${inputClassName} text-gray-700`}
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
              className={`${inputClassName} resize-none`}
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
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-bold text-white text-base bg-kms-yellow transition-opacity hover:opacity-90"
            >
              Offerte aanvragen
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Wij reageren binnen 1 werkdag, meestal dezelfde dag. Ook bereikbaar via{' '}
              <a href="tel:0782032858" className="font-semibold text-kms-navy">
                078 203 28 58
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
      <main>
        <section className="hero-navy py-14 sm:py-20">
          <div className="hero-navy-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-page text-white mb-3">Offerte voor uw nieuwe project</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Beschrijf uw situatie en ontvang een vrijblijvende prijsindicatie. Reactie binnen 1 werkdag,
              meestal dezelfde dag.
            </p>
            <p className="text-sm text-blue-200 mt-5">
              Spoed of storing?{' '}
              <Link href="/contact" className="font-semibold text-kms-yellow hover:underline">
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
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                  <h2 className="heading-subsection mb-6 text-kms-navy">Direct contact</h2>
                  <ul className="space-y-5">
                    <li className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-50 text-kms-navy">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Adres</div>
                        <div className="text-sm text-gray-500">Voltastraat 6A, 3335 KK Zwijndrecht</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-50 text-kms-navy">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Telefoon</div>
                        <a href="tel:0782032858" className="text-sm text-kms-navy">078 203 28 58</a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-50 text-kms-navy">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">E-mail</div>
                        <a href="mailto:info@kmsinstallaties.nl" className="text-sm text-kms-navy">info@kmsinstallaties.nl</a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-50 text-kms-navy">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Bereikbaar</div>
                        <div className="text-sm text-gray-500">Maandag t/m zondag, 08:00-22:00</div>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 p-4 rounded-xl bg-kms-light">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Spoed?</p>
                    <p className="text-sm text-gray-600 mb-3">Bel ons direct, ook buiten kantooruren.</p>
                    <a
                      href="tel:0782032858"
                      className="block text-center py-2.5 rounded-lg text-sm font-bold text-white bg-kms-green transition-opacity hover:opacity-90"
                    >
                      078 203 28 58
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
