'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface BeforeAfterProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Voor',
  afterLabel = 'Na',
  className = '',
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event.clientX)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    updatePosition(event.clientX)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      <div
        ref={containerRef}
        className="relative aspect-video cursor-ew-resize select-none overflow-hidden rounded-2xl border border-gray-200 shadow-sm touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="img"
        aria-label={`${beforeLabel} en ${afterLabel} vergelijking`}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          draggable={false}
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover grayscale contrast-75 brightness-90"
            sizes="(max-width: 768px) 100vw, 768px"
            draggable={false}
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        />

        <div
          className="absolute top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-kms-navy text-white shadow-lg"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
          </svg>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">
          {afterLabel}
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">Sleep de slider om voor en na te vergelijken</p>
    </div>
  )
}
