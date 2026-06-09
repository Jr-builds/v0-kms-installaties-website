import { getBrandLogo } from '@/lib/brands'
import { cn } from '@/lib/utils'

interface MerkLogosProps {
  brands: string[]
  title?: string
}

const pillClassName =
  'flex-shrink-0 rounded-lg bg-white border border-gray-200 shadow-sm'

function BrandTextPill({ brand }: { brand: string }) {
  return (
    <div
      className={cn(
        pillClassName,
        'flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-600',
      )}
    >
      {brand}
    </div>
  )
}

function BrandLogoImage({ brand }: { brand: string }) {
  const logo = getBrandLogo(brand)
  if (!logo) return <BrandTextPill brand={brand} />

  return (
    <div
      className={cn(
        pillClassName,
        'group flex h-14 w-32 items-center justify-center px-3',
      )}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        width={80}
        height={40}
        loading="eager"
        decoding="async"
        className="h-10 w-auto max-w-[6.5rem] object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0"
      />
    </div>
  )
}

export default function MerkLogos({ brands, title = 'Waarmee wij werken' }: MerkLogosProps) {
  return (
    <section className="bg-kms-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          {title}
        </p>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {brands.map((brand) => (
            <BrandLogoImage key={brand} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}
