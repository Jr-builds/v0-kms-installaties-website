'use client'

import EditableText from '@/components/cms/editable-text'
import {
  offerteAudienceOptions,
  type OfferteAudienceId,
} from '@/lib/offerte-form'
import { cn } from '@/lib/utils'

const audienceIconStyles: Record<
  OfferteAudienceId,
  { circle: string; icon: string; circleSelected: string; iconSelected: string }
> = {
  particulier: {
    circle: 'bg-sky-100',
    icon: 'text-sky-600',
    circleSelected: 'bg-sky-200/80',
    iconSelected: 'text-sky-700',
  },
  zakelijk: {
    circle: 'bg-kms-navy/10',
    icon: 'text-kms-navy',
    circleSelected: 'bg-kms-navy/15',
    iconSelected: 'text-kms-navy-dark',
  },
}

interface OfferteAudienceStepProps {
  selectedId: OfferteAudienceId | null
  onSelect: (id: OfferteAudienceId) => void
}

export default function OfferteAudienceStep({ selectedId, onSelect }: OfferteAudienceStepProps) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">
        <EditableText
          textKey="offerte.audience.title"
          label="Offerte stap 2 titel"
          defaultValue="Voor wie is deze aanvraag?"
          as="span"
        />
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        <EditableText
          textKey="offerte.audience.subtitle"
          label="Offerte stap 2 ondertitel"
          defaultValue="Hiermee stellen wij u de juiste vragen."
          as="span"
          multiline
        />
      </p>
      <div
        role="radiogroup"
        aria-label="Type aanvrager"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {offerteAudienceOptions.map((option) => {
          const isSelected = selectedId === option.id
          const Icon = option.icon
          const iconStyle = audienceIconStyles[option.id]

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.id)}
              className={cn(
                'flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all sm:p-6',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2',
                isSelected
                  ? 'border-kms-yellow-dark bg-kms-yellow/10 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50',
              )}
            >
              <span
                className={cn(
                  'mb-4 flex size-11 items-center justify-center rounded-full transition-colors',
                  isSelected ? iconStyle.circleSelected : iconStyle.circle,
                )}
                aria-hidden
              >
                <Icon
                  className={cn(
                    'size-6',
                    isSelected ? iconStyle.iconSelected : iconStyle.icon,
                  )}
                  strokeWidth={1.75}
                />
              </span>
              <span
                className={cn(
                  'text-base font-bold text-kms-navy',
                  isSelected && 'text-kms-yellow-dark',
                )}
              >
                <EditableText
                  textKey={`offerte.audience.${option.id}.label`}
                  label={`Type: ${option.label}`}
                  defaultValue={option.label}
                  as="span"
                />
              </span>
              <span className="mt-1.5 text-sm leading-relaxed text-gray-500">
                <EditableText
                  textKey={`offerte.audience.${option.id}.description`}
                  label={`Type: ${option.label} - beschrijving`}
                  defaultValue={option.description}
                  as="span"
                  multiline
                />
              </span>
            </button>
          )
        })}
      </div>
      <p className="mt-6 text-center text-sm text-gray-400">
        <EditableText
          textKey="offerte.audience.hint"
          label="Offerte stap 2 hint"
          defaultValue="Klik op een optie om door te gaan"
          as="span"
        />
      </p>
    </div>
  )
}
