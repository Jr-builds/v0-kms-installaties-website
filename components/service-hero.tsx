import Link from 'next/link'
import SiteImage from './site-image'
import Breadcrumbs, { buildServiceBreadcrumbs } from './breadcrumbs'
import { getImage, type SiteImageKey } from '@/lib/images'

interface ServiceHeroProps {
  title: string
  titleAccent?: string
  subtitle: string
  imageKey: SiteImageKey
  primaryLabel?: string
  breadcrumbLabel?: string
  breadcrumbPath?: string
}

export default function ServiceHero({
  title,
  subtitle,
  imageKey,
  primaryLabel = 'Vraag een offerte aan',
  breadcrumbLabel,
  breadcrumbPath,
}: ServiceHeroProps) {
  const { src, alt } = getImage(imageKey)

  return (
    <section className="hero-navy py-16 sm:py-24">
      <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbLabel && breadcrumbPath && (
          <Breadcrumbs
            items={buildServiceBreadcrumbs(breadcrumbLabel, breadcrumbPath)}
            className="mb-8"
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-hero text-white mb-4">
              {title}
            </h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/offerte"
                className="inline-block px-7 py-3.5 rounded-lg font-bold text-white text-base bg-kms-yellow transition-opacity hover:opacity-90 text-center"
              >
                {primaryLabel}
              </Link>
              <a
                href="tel:0782032858"
                className="inline-block px-7 py-3.5 rounded-lg font-bold text-base text-white border-2 border-white hover:bg-white hover:text-kms-navy transition-colors text-center"
              >
                078 203 28 58
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <SiteImage
              src={src}
              alt={alt}
              aspectRatio="aspect-[4/3]"
              className="w-full"
              priority
              sizePreset="hero"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
