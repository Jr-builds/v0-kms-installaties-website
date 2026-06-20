import OfferteFormBackLink from '@/components/offerte-form-back-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OfferteStepNavProps {
  onBack: () => void
  primaryLabel: string
  primaryType?: 'submit' | 'button'
  onPrimary?: () => void
  className?: string
}

export default function OfferteStepNav({
  onBack,
  primaryLabel,
  primaryType = 'submit',
  onPrimary,
  className,
}: OfferteStepNavProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <OfferteFormBackLink onClick={onBack} />
      <Button
        type={primaryType}
        variant="primary"
        size="cta"
        onClick={primaryType === 'button' ? onPrimary : undefined}
        className="w-full sm:w-auto sm:min-w-[12rem]"
      >
        {primaryLabel}
      </Button>
    </div>
  )
}
