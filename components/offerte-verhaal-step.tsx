'use client'

import { Button } from '@/components/ui/button'
import { formInputClassName } from '@/lib/form-validation'

interface OfferteVerhaalStepProps {
  value: string
  onChange: (value: string) => void
  onContinue: () => void
}

export default function OfferteVerhaalStep({ value, onChange, onContinue }: OfferteVerhaalStepProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">
          Vertel ons meer over uw project
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Hoe meer u deelt, hoe gerichter wij kunnen offreren. Dit veld is optioneel.
        </p>
      </div>

      <div>
        <label htmlFor="omschrijving" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Projectomschrijving{' '}
          <span className="font-normal text-gray-400">(optioneel)</span>
        </label>
        <textarea
          id="omschrijving"
          rows={6}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Beschrijf uw situatie: type pand, gewenste werkzaamheden, planning en eventuele bijzonderheden."
          className={`${formInputClassName()} resize-none`}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" size="cta" className="w-full sm:w-auto sm:min-w-[12rem]">
          Volgende
        </Button>
      </div>
    </form>
  )
}
