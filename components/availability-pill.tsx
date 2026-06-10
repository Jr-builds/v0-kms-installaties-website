'use client'

import { useEffect, useState } from 'react'
import { getAvailabilityStatus, type AvailabilityStatus } from '@/lib/availability'
import { cn } from '@/lib/utils'

interface AvailabilityPillProps {
  className?: string
  size?: 'sm' | 'md'
}

export default function AvailabilityPill({ className = '', size = 'md' }: AvailabilityPillProps) {
  const [status, setStatus] = useState<AvailabilityStatus>(() => getAvailabilityStatus())

  useEffect(() => {
    setStatus(getAvailabilityStatus())
    const interval = window.setInterval(() => setStatus(getAvailabilityStatus()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  const sizeClass =
    size === 'sm'
      ? 'gap-1.5 px-3 py-1 text-xs'
      : 'gap-2 px-4 py-1.5 text-xs'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-bold',
        sizeClass,
        status.isOpen
          ? 'border-kms-green/30 bg-kms-green/10 text-kms-green'
          : 'border-gray-300 bg-white/80 text-gray-600',
        className,
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          'rounded-full',
          size === 'sm' ? 'size-1.5' : 'size-2',
          status.isOpen ? 'bg-kms-green' : 'bg-gray-400',
        )}
        aria-hidden="true"
      />
      {status.label}
    </span>
  )
}
