import Link from 'next/link'
import { cn } from '@/lib/utils'
import { stadToSlug } from '@/lib/steden'

interface StadDienstKeuzeProps {
  stadName: string
  activeDienst: 'elektra' | 'airconditioning'
  className?: string
}

export default function StadDienstKeuze({
  stadName,
  activeDienst,
  className,
}: StadDienstKeuzeProps) {
  const stadSlug = stadToSlug(stadName)

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <Link
        href={`/elektricien/${stadSlug}`}
        aria-current={activeDienst === 'elektra' ? 'page' : undefined}
        className={cn(
          'inline-flex min-w-[8.5rem] flex-1 items-center justify-center rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-colors sm:flex-none',
          activeDienst === 'elektra'
            ? 'border-kms-yellow-dark bg-white text-kms-navy'
            : 'border-kms-navy/30 bg-kms-navy/20 text-white hover:border-white/40',
        )}
      >
        Elektra
      </Link>
      <Link
        href={`/airconditioning/${stadSlug}`}
        aria-current={activeDienst === 'airconditioning' ? 'page' : undefined}
        className={cn(
          'inline-flex min-w-[8.5rem] flex-1 items-center justify-center rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-colors sm:flex-none',
          activeDienst === 'airconditioning'
            ? 'border-kms-yellow-dark bg-white text-kms-navy'
            : 'border-kms-navy/30 bg-kms-navy/20 text-white hover:border-white/40',
        )}
      >
        Airco
      </Link>
    </div>
  )
}
