import Link from 'next/link'
import { ISDE_INFO_URL } from '@/lib/business'

interface IsdeCalloutProps {
  /** Emphasize WTW/ventilatie or airco/warmtepomp context. */
  variant?: 'ventilatie' | 'airconditioning'
}

export default function IsdeCallout({ variant = 'ventilatie' }: IsdeCalloutProps) {
  const body =
    variant === 'ventilatie'
      ? 'Een WTW- of ventilatie-installatie kan in aanmerking komen voor ISDE-subsidie. Wij adviseren u gratis over de mogelijkheden voor uw situatie.'
      : 'Sommige airco- en warmtepompsystemen komen in aanmerking voor ISDE-subsidie. Wij helpen u bepalen wat voor uw situatie geldt.'

  return (
    <aside className="rounded-2xl border border-kms-yellow/40 bg-kms-yellow/10 px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-kms-yellow-dark mb-1">
            ISDE-subsidie
          </p>
          <p className="text-sm leading-relaxed text-gray-700">{body}</p>
        </div>
        <Link
          href={ISDE_INFO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border-2 border-kms-navy px-4 py-2 text-sm font-bold text-kms-navy transition-colors hover:bg-kms-navy hover:text-white"
        >
          Meer over ISDE &rarr;
        </Link>
      </div>
    </aside>
  )
}
