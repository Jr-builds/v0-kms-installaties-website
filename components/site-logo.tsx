import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImage, requireImageSrc } from '@/lib/images'

interface SiteLogoProps {
  size?: number
  className?: string
  priority?: boolean
}

export default function SiteLogo({ size = 48, className = '', priority = false }: SiteLogoProps) {
  const image = getImage('logo.kms')
  const src = requireImageSrc(image, '/KMS-Logo.png')

  return (
    <Image
      src={src}
      alt={image.alt}
      width={size}
      height={size}
      className={cn('object-contain flex-shrink-0', className)}
      priority={priority}
    />
  )
}
