'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Certification } from '@/lib/certifications'

interface CertificationBadgeProps {
  certification: Certification
  variant?: 'default' | 'compact'
  className?: string
}

export default function CertificationBadge({
  certification,
  variant = 'default',
  className = '',
}: CertificationBadgeProps) {
  const [open, setOpen] = useState(false)
  const isCompact = variant === 'compact'

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`cert-info-${certification.id}`}
        aria-label={`Meer informatie over ${certification.name}`}
        className={cn(
          'group inline-flex items-center gap-1.5 rounded-lg border-2 font-bold transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2',
          isCompact
            ? 'border-transparent bg-transparent px-0 py-0 hover:bg-transparent'
            : 'border-kms-navy bg-white px-7 py-3 text-base text-kms-navy',
        )}
      >
        {isCompact ? (
          <span className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-left">
            <span className="text-sm font-semibold text-gray-800">{certification.name}</span>
            <span className="text-xs font-normal text-gray-500">gecertificeerd</span>
          </span>
        ) : (
          <span>{certification.name}</span>
        )}
        <Info
          className={cn(
            'shrink-0 text-kms-navy/60 group-hover:text-kms-navy',
            isCompact ? 'size-3.5' : 'size-4',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={`cert-info-${certification.id}`}
          role="region"
          aria-label={`Uitleg ${certification.name}`}
          className={cn(
            'rounded-lg border border-gray-200 bg-white p-3 text-sm leading-relaxed text-gray-600 shadow-sm',
            isCompact
              ? 'absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2'
              : 'mt-2 max-w-xs',
          )}
        >
          {certification.description}
        </div>
      )}
    </div>
  )
}
