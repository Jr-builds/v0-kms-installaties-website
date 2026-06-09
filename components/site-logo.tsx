import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImage } from '@/lib/images'

interface SiteLogoProps {
  size?: number
  className?: string
  priority?: boolean
}

export default function SiteLogo({ size = 48, className = '', priority = false }: SiteLogoProps) {
  const { src, alt } = getImage('logo.kms')

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('object-contain flex-shrink-0', className)}
      priority={priority}
    />
  )
}
