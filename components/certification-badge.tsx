'use client'

import { useState } from 'react'
import Image from 'next/image'
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

  if (!isCompact) {
    const { displayScale = 1 } = certification.logo

    return (
      <div
        className={cn(
          'flex h-32 w-44 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm',
          className,
        )}
      >
        <div className="relative h-16 w-[9.5rem]">
          <Image
            src={certification.logo.src}
            alt={certification.logo.alt}
            fill
            sizes="152px"
            className="object-contain"
            style={
              displayScale !== 1
                ? { transform: `scale(${displayScale})`, transformOrigin: 'center' }
                : undefined
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`cert-info-${certification.id}`}
        aria-label={`Meer informatie over ${certification.name}`}
        className="group inline-flex items-center gap-1.5 rounded-lg border-transparent bg-transparent px-0 py-0 transition-colors hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2"
      >
        <span className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-left">
          <span className="text-sm font-semibold text-gray-800">{certification.name}</span>
          <span className="text-xs font-normal text-gray-500">gecertificeerd</span>
        </span>
        <Info
          className="size-3.5 shrink-0 text-kms-navy/60 group-hover:text-kms-navy"
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={`cert-info-${certification.id}`}
          role="region"
          aria-label={`Uitleg ${certification.name}`}
          className="absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-sm leading-relaxed text-gray-600 shadow-sm"
        >
          {certification.description}
        </div>
      )}
    </div>
  )
}
