'use client'

import Image from 'next/image'
import { trustHighlights, type TrustHighlightIconKey } from '@/lib/trust-highlights'
import { cn } from '@/lib/utils'

const brandLogos: Record<TrustHighlightIconKey, { src: string; scale?: number }> = {
  'nen-1010': { src: '/brands/nen-1010.png', scale: 1.35 },
  'nen-3140': { src: '/brands/nen-3140.png', scale: 1.35 },
  stek: { src: '/brands/stek.png', scale: 1.05 },
  vca: { src: '/brands/vca.png', scale: 1.05 },
  zaptec: { src: '/brands/Zaptec-new.png', scale: 1.35 },
}

function BrandLogoIcon({ src, scale = 1 }: { src: string; scale?: number }) {
  return (
    <div className="relative size-8">
      <Image
        src={src}
        alt=""
        fill
        sizes="32px"
        className="object-contain"
        style={
          scale !== 1
            ? { transform: `scale(${scale})`, transformOrigin: 'center' }
            : undefined
        }
        aria-hidden
      />
    </div>
  )
}

interface TrustHighlightGridProps {
  className?: string
}

/** Desktop: 3 certificeringen boven, 2 gecentreerd eronder (6-koloms grid). */
const DESKTOP_FIRST_ROW_COUNT = 3

export default function TrustHighlightGrid({ className }: TrustHighlightGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-5 lg:mx-auto lg:max-w-4xl lg:grid-cols-6 lg:gap-x-8 lg:gap-y-8',
        className,
      )}
    >
      {trustHighlights.map((item, index) => {
        const brand = brandLogos[item.iconKey]
        const isFirstInLastDesktopRow = index === DESKTOP_FIRST_ROW_COUNT

        return (
          <li
            key={item.id}
            className={cn(
              'flex min-w-0 items-center gap-2 lg:col-span-2 lg:items-start lg:gap-3',
              isFirstInLastDesktopRow && 'lg:col-start-2',
            )}
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC] lg:size-11 lg:border lg:border-gray-200/80 lg:bg-white lg:shadow-sm"
              aria-hidden
            >
              <BrandLogoIcon src={brand.src} scale={brand.scale} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold leading-tight text-kms-navy lg:text-sm lg:leading-snug">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-gray-500 lg:text-xs lg:leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
