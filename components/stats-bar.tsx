'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface StatItem {
  value: string
  label: string
  sub?: string
}

interface StatsBarProps {
  items: StatItem[]
  columns?: 3 | 4
  size?: 'lg' | 'md'
  className?: string
}

interface ParsedStat {
  animate: boolean
  end: number
  suffix: string
  text: string
}

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) {
    return { animate: false, end: 0, suffix: '', text: value }
  }

  return {
    animate: true,
    end: Number.parseInt(match[1], 10),
    suffix: match[2],
    text: value,
  }
}

function easeOutQuart(progress: number): number {
  return 1 - (1 - progress) ** 4
}

function CountUpValue({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated.current) return

    const runAnimation = () => {
      hasAnimated.current = true
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReduced) {
        setDisplay(end)
        return
      }

      const duration = 1500
      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setDisplay(Math.round(end * easeOutQuart(progress)))

        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function StatValue({ value }: { value: string }) {
  const parsed = parseStatValue(value)

  if (!parsed.animate) {
    return <>{parsed.text}</>
  }

  return <CountUpValue end={parsed.end} suffix={parsed.suffix} />
}

export default function StatsBar({
  items,
  columns = 3,
  size = 'lg',
  className = '',
}: StatsBarProps) {
  const gridClass =
    columns === 4
      ? 'grid grid-cols-2 sm:grid-cols-4 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-3 gap-8'

  const valueClass = size === 'lg' ? 'text-5xl font-bold mb-1' : 'text-4xl font-bold'

  return (
    <section className={cn('bg-kms-navy py-14', className)}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', columns === 4 ? 'max-w-5xl' : 'max-w-4xl')}>
        <div className={cn(gridClass, 'text-center')}>
          {items.map((item) => (
            <div key={`${item.value}-${item.label}-${item.sub ?? ''}`}>
              <div className={cn(valueClass, 'text-kms-yellow')}>
                <StatValue value={item.value} />
              </div>
              {item.sub ? (
                <>
                  <div className="text-white font-medium text-sm mt-1">{item.label}</div>
                  <div className="text-blue-300 text-xs">{item.sub}</div>
                </>
              ) : (
                <div className="text-blue-200 font-medium">{item.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
