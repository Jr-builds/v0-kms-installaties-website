import Link from 'next/link'
import EditableImage from '@/components/cms/editable-image'
import { Button } from '@/components/ui/button'
import HeroPhoneButton from '@/components/hero-phone-button'
import { resolveImage } from '@/lib/supabase/site-images'
import type { SiteImageKey } from '@/lib/images'
import { buildOfferteHref } from '@/lib/offerte'

interface ServiceHeroProps {
  title: string
  titleAccent?: string
  subtitle: string
  imageKey: SiteImageKey
  primaryLabel?: string
  offerteDienst?: string
}

export default async function ServiceHero({
  title,
  subtitle,
  imageKey,
  primaryLabel = 'Vraag een offerte aan',
  offerteDienst,
}: ServiceHeroProps) {
  const image = await resolveImage(imageKey)
  const offerteHref = buildOfferteHref(offerteDienst)

  return (
    <section className="hero-navy py-16 sm:py-24">
      <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-hero text-white mb-4">{title}</h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href={offerteHref} />}
                nativeButton={false}
                variant="primary"
                size="cta-sm"
                className="text-center"
              >
                {primaryLabel}
              </Button>
              <HeroPhoneButton className="text-center" />
            </div>
          </div>
          <div className="hero-photo">
            <EditableImage
              imageKey={imageKey}
              label={image.label}
              src={image.src}
              alt={image.alt}
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
