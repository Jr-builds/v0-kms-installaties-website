'use client'

import OfferteFormSecureNote from '@/components/offerte-form-secure-note'
import OfferteStepNav from '@/components/offerte-step-nav'
import { formInputClassName } from '@/lib/form-validation'
import { OFFERTE_VERHAAL_MAX_LENGTH } from '@/lib/offerte-form'

interface OfferteVerhaalStepProps {
  value: string
  onChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function OfferteVerhaalStep({
  value,
  onChange,
  onBack,
  onContinue,
}: OfferteVerhaalStepProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">Vertel ons uw verhaal</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          Optioneel: beschrijf wat er aan de hand is of wat u wilt laten doen. Hoe meer context,
          hoe beter wij u kunnen helpen.
        </p>
      </div>

      <div>
        <label htmlFor="omschrijving" className="mb-1.5 block text-sm font-semibold text-gray-700">
          Situatiebeschrijving
        </label>
        <div className="relative">
          <textarea
            id="omschrijving"
            rows={6}
            maxLength={OFFERTE_VERHAAL_MAX_LENGTH}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={`Bijvoorbeeld: "Mijn groepenkast slaat 's avonds vaak af als de wasmachine en oven aan staan..." (mag leeg)`}
            className={`${formInputClassName()} resize-none pb-8`}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-gray-400">
            {value.length}/{OFFERTE_VERHAAL_MAX_LENGTH}
          </span>
        </div>
      </div>

      <OfferteStepNav onBack={onBack} primaryLabel="Volgende →" />
      <OfferteFormSecureNote />
    </form>
  )
}
