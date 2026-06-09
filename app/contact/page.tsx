'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-kms-navy py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-page text-white mb-3">
              Heeft u een vraag of storingsmelding?
            </h1>
            <p className="text-blue-200 text-lg">
              Wij reageren dezelfde dag, ook in het weekend. Voor spoed: bel direct.
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
                  <h2 className="heading-subsection mb-6 text-kms-navy">Stuur ons een bericht</h2>
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
                        <a href="tel:0782032858" className="font-semibold text-kms-navy">078 203 28 58</a>.
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
                          placeholder="Uw volledige naam"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-kms-navy focus:border-transparent bg-kms-light"
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
                          placeholder="Uw telefoonnummer"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-kms-navy focus:border-transparent bg-kms-light"
                        />
                      </div>
                      <div>
                        <label htmlFor="vraag" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Vraag of melding
                        </label>
                        <textarea
                          id="vraag"
                          rows={5}
                          placeholder="Stel uw vraag of omschrijf uw storing..."
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-kms-navy focus:border-transparent bg-kms-light resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-lg font-bold text-white text-base bg-kms-yellow transition-opacity hover:opacity-90"
                      >
                        Verstuur bericht
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact info + kaart */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="heading-subsection mb-6 text-kms-navy">Contactgegevens</h2>
                  <ul className="space-y-4">
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
                        <div className="text-sm text-gray-500">Ma-Zo 08:00-22:00</div>
                        <div className="text-xs text-gray-400 mt-0.5">Ook voor spoedmeldingen</div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Map placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-gray-100 h-48 flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, #9ca3af 0, #9ca3af 1px, transparent 0, transparent 20px), repeating-linear-gradient(90deg, #9ca3af 0, #9ca3af 1px, transparent 0, transparent 20px)`,
                    }} />
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-xs text-gray-500">Kaart: Voltastraat 6A, Zwijndrecht</span>
                  </div>
                  <div className="p-4">
                    <a
                      href="https://maps.google.com/?q=Voltastraat+6A+Zwijndrecht"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold hover:underline"
                      
                    >
                      Open in Google Maps &rarr;
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
