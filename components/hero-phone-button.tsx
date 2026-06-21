import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { phoneDisplay, phoneTelHref } from '@/lib/business'
import { cn } from '@/lib/utils'

interface HeroPhoneButtonProps {
  size?: 'cta' | 'cta-sm'
  className?: string
}

export default function HeroPhoneButton({ size = 'cta-sm', className }: HeroPhoneButtonProps) {
  return (
    <Button
      render={<a href={phoneTelHref} />}
      nativeButton={false}
      variant="hero-outline"
      size={size}
      className={cn('gap-2', className)}
    >
      <Phone className="size-5 shrink-0" aria-hidden />
      {phoneDisplay}
    </Button>
  )
}
