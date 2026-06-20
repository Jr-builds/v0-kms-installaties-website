'use client'

import { Button } from '@/components/ui/button'

interface OfferteFotosStepProps {
  onContinue: () => void
}

export default function OfferteFotosStep({ onContinue }: OfferteFotosStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">
          Situatiefoto&apos;s toevoegen
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Foto&apos;s helpen ons uw situatie beter in te schatten. Uploaden komt binnenkort beschikbaar.
        </p>
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

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="ghost"
          size="cta-sm"
          onClick={onContinue}
          className="w-full sm:w-auto text-gray-500"
        >
          Overslaan
        </Button>
        <Button
          type="button"
          variant="primary"
          size="cta"
          onClick={onContinue}
          className="w-full sm:w-auto sm:min-w-[12rem]"
        >
          Volgende
        </Button>
      </div>
    </div>
  )
}
