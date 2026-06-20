import { cn } from '@/lib/utils'

interface OfferteFormBackLinkProps {
  onClick: () => void
  className?: string
}

export default function OfferteFormBackLink({ onClick, className }: OfferteFormBackLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-kms-navy',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2',
        className,
      )}
    >
      <span aria-hidden="true">←</span>
      Terug
    </button>
  )
}
