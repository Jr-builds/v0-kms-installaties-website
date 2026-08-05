import EditableText from '@/components/cms/editable-text'
import OfferteFormBackLink from '@/components/offerte-form-back-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OfferteStepNavProps {
  onBack: () => void
  primaryLabel: string
  primaryLabelKey?: string
  primaryType?: 'submit' | 'button'
  onPrimary?: () => void
  className?: string
  disabled?: boolean
}

export default function OfferteStepNav({
  onBack,
  primaryLabel,
  primaryLabelKey = 'offerte.nav.nextArrow',
  primaryType = 'submit',
  onPrimary,
  className,
  disabled = false,
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
        disabled={disabled}
        onClick={primaryType === 'button' ? onPrimary : undefined}
        className="w-full sm:w-auto sm:min-w-[12rem]"
      >
        {disabled ? (
          primaryLabel
        ) : (
          <EditableText
            textKey={primaryLabelKey}
            label={`Offerte knop: ${primaryLabel}`}
            defaultValue={primaryLabel}
            as="span"
          />
        )}
      </Button>
    </div>
  )
}
