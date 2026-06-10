'use client'

import { useEffect, useState } from 'react'
import { getAvailabilityStatus, type AvailabilityStatus } from '@/lib/availability'
import { openingHoursDisplay } from '@/lib/business'
import { cn } from '@/lib/utils'

type PillSize = 'sm' | 'md'

interface AvailabilityPillProps {
  className?: string
  size?: PillSize
  /** Light pills for navy hero — pairs with OpeningHoursPill */
  variant?: 'default' | 'hero'
}

function pillSizeClass(size: PillSize) {
  return size === 'sm' ? 'gap-1.5 px-3 py-1 text-xs' : 'gap-2 px-4 py-1.5 text-xs'
}

function dotSizeClass(size: PillSize) {
  return size === 'sm' ? 'size-1.5' : 'size-2'
}

const pillBase = 'inline-flex items-center rounded-full border font-bold'

export default function AvailabilityPill({
  className = '',
  size = 'md',
  variant = 'default',
}: AvailabilityPillProps) {
  const [status, setStatus] = useState<AvailabilityStatus>(() => getAvailabilityStatus())

  useEffect(() => {
    setStatus(getAvailabilityStatus())
    const interval = window.setInterval(() => setStatus(getAvailabilityStatus()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  const isHero = variant === 'hero'

  return (
    <span
      className={cn(
        pillBase,
        pillSizeClass(size),
        isHero
          ? status.isOpen
            ? 'border-kms-green/40 bg-white/90 text-kms-green shadow-sm'
            : 'border-gray-200 bg-white/90 text-gray-700 shadow-sm'
          : status.isOpen
            ? 'border-kms-green/30 bg-kms-green/10 text-kms-green'
            : 'border-gray-300 bg-white/80 text-gray-600',
        className,
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          'rounded-full',
          dotSizeClass(size),
          status.isOpen ? 'bg-kms-green' : 'bg-gray-400',
        )}
        aria-hidden="true"
      />
      {status.label}
    </span>
  )
}

export function OpeningHoursPill({ className = '', size = 'md' }: { className?: string; size?: PillSize }) {
  return (
    <span
      className={cn(
        pillBase,
        pillSizeClass(size),
        'border-gray-200 bg-white/90 text-gray-700 shadow-sm',
        className,
      )}
    >
      <span className={cn('rounded-full bg-gray-400', dotSizeClass(size))} aria-hidden="true" />
      {openingHoursDisplay}
    </span>
  )
}
