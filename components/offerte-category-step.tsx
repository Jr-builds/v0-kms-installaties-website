'use client'

import {
  offerteCategories,
  offerteCategoryIconStyles,
  type OfferteCategoryId,
} from '@/lib/offerte-form'
import { cn } from '@/lib/utils'

interface OfferteCategoryStepProps {
  selectedId: OfferteCategoryId | null
  onSelect: (id: OfferteCategoryId) => void
}

export default function OfferteCategoryStep({ selectedId, onSelect }: OfferteCategoryStepProps) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-bold text-kms-navy sm:text-2xl">
        Wat wilt u laten installeren of oplossen?
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        Kies het type dat het beste bij uw situatie past.
      </p>
      <div
        role="radiogroup"
        aria-label="Categorie offerteaanvraag"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {offerteCategories.map((category) => {
          const isSelected = selectedId === category.id
          const Icon = category.icon
          const iconStyle = offerteCategoryIconStyles[category.iconTone]

          return (
            <button
              key={category.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(category.id)}
              className={cn(
                'flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2',
                isSelected
                  ? 'border-kms-yellow-dark bg-kms-yellow/10 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50',
              )}
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors',
                  isSelected ? iconStyle.circleSelected : iconStyle.circle,
                )}
                aria-hidden
              >
                <Icon
                  className={cn(
                    'size-5',
                    isSelected ? iconStyle.iconSelected : iconStyle.icon,
                  )}
                  strokeWidth={1.75}
                />
              </span>
              <span
                className={cn(
                  'text-sm font-semibold text-gray-800 sm:text-base',
                  isSelected && 'text-kms-yellow-dark',
                )}
              >
                {category.label}
              </span>
            </button>
          )
        })}
      </div>
      <p className="mt-6 text-center text-sm text-gray-400">
        Klik op een categorie om door te gaan
      </p>
    </div>
  )
}
