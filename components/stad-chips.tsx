import Link from 'next/link'
import { cn } from '@/lib/utils'
import { steden, getStadLandingspad, type StadDienst } from '@/lib/steden'

function MapPinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

interface StadChipsProps {
  activeSlug?: string
  activePlaats?: string
  dienst?: StadDienst
  variant?: 'default' | 'soft'
  className?: string
  listClassName?: string
}

export default function StadChips({
  activeSlug,
  activePlaats,
  dienst = 'elektra',
  variant = 'default',
  className,
  listClassName,
}: StadChipsProps) {
  const normalizedPlaats = activePlaats?.trim().toLowerCase()

  return (
    <ul className={cn('flex flex-wrap gap-2', className, listClassName)}>
      {steden.map((stad) => {
        const isActive =
          (activeSlug !== undefined && stad.slug === activeSlug) ||
          (normalizedPlaats !== undefined && stad.name.toLowerCase() === normalizedPlaats)

        return (
          <li key={stad.slug}>
            <Link
              href={getStadLandingspad(dienst, stad.slug)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'inline-flex items-center text-sm font-medium transition-colors',
                variant === 'soft'
                  ? cn(
                      'rounded-full px-4 py-2',
                      isActive
                        ? 'bg-kms-yellow/30 text-kms-navy ring-1 ring-kms-yellow-dark/30'
                        : 'bg-kms-navy/8 text-kms-navy hover:bg-kms-navy/12 hover:ring-1 hover:ring-kms-navy/20',
                    )
                  : cn(
                      'gap-1.5 rounded-full border px-3.5 py-2 shadow-sm',
                      isActive
                        ? 'border-kms-yellow-dark bg-kms-yellow/15 text-kms-navy'
                        : 'border-gray-200 bg-white text-kms-navy hover:border-kms-navy',
                    ),
              )}
            >
              {variant === 'default' ? (
                <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0 text-kms-yellow-dark" />
              ) : null}
              {stad.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
