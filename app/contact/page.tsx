'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactSidebar from '@/components/contact-sidebar'
import FormFieldError from '@/components/form-field-error'
import { Button } from '@/components/ui/button'
import { phoneDisplay, phoneTelHref } from '@/lib/business'
import { formInputClassName, validatePhone, validateRequired } from '@/lib/form-validation'

interface ContactFormErrors {
  naam?: string
  telefoon?: string
  vraag?: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [vraag, setVraag] = useState('')
  const [errors, setErrors] = useState<ContactFormErrors>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: ContactFormErrors = {
      naam: validateRequired(naam, 'Naam') ?? undefined,
      telefoon: validatePhone(telefoon) ?? undefined,
      vraag: validateRequired(vraag, 'Vraag of storingsmelding') ?? undefined,
    }

    if (nextErrors.naam || nextErrors.telefoon || nextErrors.vraag) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="hero-navy py-14 sm:py-20">
          <div className="hero-navy-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-page text-white mb-3">
              Vragen, storing of spoed?
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Gebruik dit formulier voor vragen en storingsmeldingen. Bij spoed belt u ons direct — wij zijn 7 dagen per week bereikbaar.
            </p>
            <p className="text-sm text-blue-200 mt-5">
              Wilt u een offerte voor een nieuw project?{' '}
              <Link href="/offerte" className="font-semibold text-kms-yellow-dark hover:underline">
                Offerte aanvragen →
              </Link>
            </p>
          </div>
        </section>

        {/* Form + Contact */}
        <section className="bg-kms-light py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="heading-subsection mb-2 text-kms-navy">Vraag of storingsmelding</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Voor spoed liever bellen?{' '}
                    <a href={phoneTelHref} className="font-semibold text-kms-navy hover:underline">
                      {phoneDisplay}
                    </a>
                  </p>
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-50 text-kms-green">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Bericht ontvangen!</h3>
                      <p className="text-gray-600 text-sm">
                        Wij nemen dezelfde dag contact met u op. Voor spoed kunt u bellen via{' '}
                        <a href={phoneTelHref} className="font-semibold text-kms-navy">{phoneDisplay}</a>.
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
                          placeholder="Naam voor terugbelcontact"
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
                          placeholder="Telefoonnummer (ook bereikbaar bij spoed)"
                          autoComplete="tel"
                          aria-invalid={errors.telefoon ? true : undefined}
                          aria-describedby={errors.telefoon ? 'telefoon-error' : undefined}
                          className={formInputClassName(Boolean(errors.telefoon))}
                        />
                        {errors.telefoon ? (
                          <FormFieldError id="telefoon-error" message={errors.telefoon} />
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="vraag" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Vraag of storingsmelding <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="vraag"
                          rows={5}
                          value={vraag}
                          onChange={(event) => setVraag(event.target.value)}
                          placeholder="Beschrijf uw vraag, storing of situatie — bijv. geen stroom, defecte airco, kapotte schakelaar..."
                          aria-invalid={errors.vraag ? true : undefined}
                          aria-describedby={errors.vraag ? 'vraag-error' : undefined}
                          className={`${formInputClassName(Boolean(errors.vraag))} resize-none`}
                        />
                        {errors.vraag ? <FormFieldError id="vraag-error" message={errors.vraag} /> : null}
                      </div>
                      <Button type="submit" variant="primary" size="cta" className="w-full">
                        Verstuur melding
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <ContactSidebar showSpoedNote showMap showWhatsApp />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
