import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-kms-yellow text-kms-navy-dark hover:opacity-90',
        secondary:
          'border-2 border-kms-navy bg-transparent text-kms-navy hover:bg-kms-navy hover:text-white',
        'hero-outline':
          'border-2 border-white bg-transparent font-bold text-white hover:bg-white hover:text-kms-navy',
        spoed: 'bg-kms-green font-bold text-white hover:opacity-90',
        ghost: 'text-kms-navy hover:bg-kms-light',
        outline:
          'border-border bg-background text-foreground hover:bg-muted hover:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/40',
        link: 'text-kms-navy underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 gap-1.5 px-4 text-sm',
        sm: 'h-9 gap-1 px-3 text-sm',
        lg: 'h-11 gap-1.5 px-6 text-base',
        cta: 'h-auto px-8 py-3.5 text-base font-bold',
        'cta-sm': 'h-auto px-7 py-3.5 text-base font-bold',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
