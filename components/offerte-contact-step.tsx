'use client'

import OfferteFormSecureNote from '@/components/offerte-form-secure-note'
import OfferteStepNav from '@/components/offerte-step-nav'
import FormFieldError from '@/components/form-field-error'
import { formInputClassName } from '@/lib/form-validation'
import { phoneDisplay, phoneTelHref } from '@/lib/business'

interface OfferteContactStepErrors {
  naam?: string
  telefoon?: string
  email?: string
  postcode?: string
}

interface OfferteContactStepProps {
  naam: string
  telefoon: string
  email: string
  postcode: string
  plaats: string
  errors: OfferteContactStepErrors
  onNaamChange: (value: string) => void
  onTelefoonChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPostcodeChange: (value: string) => void
  onPlaatsChange: (value: string) => void
  onPostcodeBlur: () => void
  onBack: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
  submitError?: string | null
}

export default function OfferteContactStep({
  naam,
  telefoon,
  email,
  postcode,
  plaats,
  errors,
  onNaamChange,
  onTelefoonChange,
  onEmailChange,
  onPostcodeChange,
  onPlaatsChange,
  onPostcodeBlur,
  onBack,
  onSubmit,
  isSubmitting = false,
  submitError = null,
}: OfferteContactStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">Uw contactgegevens</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          Vul uw gegevens in. Wij bellen u voor een prijsindicatie op maat, meestal dezelfde dag.
        </p>
      </div>

      <div>
        <label htmlFor="naam" className="mb-1.5 block text-sm font-semibold text-gray-700">
          Naam <span className="text-red-500">*</span>
        </label>
        <input
          id="naam"
          type="text"
          value={naam}
          onChange={(event) => onNaamChange(event.target.value)}
          placeholder="Uw naam"
          autoComplete="name"
          aria-invalid={errors.naam ? true : undefined}
          aria-describedby={errors.naam ? 'naam-error' : undefined}
          className={formInputClassName(Boolean(errors.naam))}
        />
        {errors.naam ? <FormFieldError id="naam-error" message={errors.naam} /> : null}
      </div>

      <div>
        <label htmlFor="telefoon" className="mb-1.5 block text-sm font-semibold text-gray-700">
          Telefoon <span className="text-red-500">*</span>
        </label>
        <input
          id="telefoon"
          type="tel"
          value={telefoon}
          onChange={(event) => onTelefoonChange(event.target.value)}
          placeholder="Bijv. 06 12345678"
          autoComplete="tel"
          aria-invalid={errors.telefoon ? true : undefined}
          aria-describedby={errors.telefoon ? 'telefoon-error' : 'telefoon-hint'}
          className={formInputClassName(Boolean(errors.telefoon))}
        />
        <p id="telefoon-hint" className="mt-1.5 text-xs text-gray-500">
          Wij bellen u terug. Geen spam, beloofd.
        </p>
        {errors.telefoon ? <FormFieldError id="telefoon-error" message={errors.telefoon} /> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
          E-mailadres <span className="font-normal text-gray-400">(optioneel)</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Bijv. jan@voorbeeld.nl"
          autoComplete="email"
          inputMode="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : 'email-hint'}
          className={formInputClassName(Boolean(errors.email))}
        />
        <p id="email-hint" className="mt-1.5 text-xs text-gray-500">
          Handig als u de offerte ook per e-mail wilt ontvangen.
        </p>
        {errors.email ? <FormFieldError id="email-error" message={errors.email} /> : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="postcode" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            id="postcode"
            name="postcode"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            placeholder="3335 KK"
            value={postcode}
            onChange={(event) => onPostcodeChange(event.target.value)}
            onBlur={onPostcodeBlur}
            aria-invalid={errors.postcode ? true : undefined}
            aria-describedby={errors.postcode ? 'postcode-error' : undefined}
            className={formInputClassName(Boolean(errors.postcode))}
          />
          {errors.postcode ? <FormFieldError id="postcode-error" message={errors.postcode} /> : null}
        </div>
        <div>
          <label htmlFor="plaats" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Plaats
          </label>
          <input
            id="plaats"
            type="text"
            placeholder="Bijv. Zwijndrecht"
            value={plaats}
            onChange={(event) => onPlaatsChange(event.target.value)}
            autoComplete="address-level2"
            className={formInputClassName()}
          />
        </div>
      </div>

      {submitError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {submitError}
        </div>
      ) : null}

      <OfferteStepNav
        onBack={onBack}
        primaryLabel={isSubmitting ? 'Bezig met versturen...' : 'Offerte aanvragen'}
        disabled={isSubmitting}
      />
      <p className="text-center text-xs text-gray-500">
        Reactie binnen 1 werkdag, meestal dezelfde dag. Spoed? Bel{' '}
        <a href={phoneTelHref} className="font-semibold text-kms-navy">
          {phoneDisplay}
        </a>
        .
      </p>
      <OfferteFormSecureNote />
    </form>
  )
}
