import { Check } from 'lucide-react'
import { offerteFormSteps } from '@/lib/offerte-form'
import { cn } from '@/lib/utils'

interface OfferteFormProgressProps {
  currentStep: number
  className?: string
}

export default function OfferteFormProgress({ currentStep, className }: OfferteFormProgressProps) {
  return (
    <nav
      aria-label="Voortgang offerteformulier"
      className={cn('mb-8', className)}
    >
      <ol className="flex items-start justify-between gap-1">
        {offerteFormSteps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isComplete = stepNumber < currentStep
          const isLast = index === offerteFormSteps.length - 1

          return (
            <li
              key={step.id}
              className={cn('flex min-w-0 flex-1 items-start', isLast && 'flex-none')}
            >
              <div className="flex w-full min-w-0 flex-col items-center">
                <div className="flex w-full items-center">
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors sm:size-9',
                      isActive && 'bg-kms-yellow text-kms-navy-dark',
                      isComplete && 'bg-kms-green text-white',
                      !isActive && !isComplete && 'bg-[#F3EDE4] text-gray-400',
                    )}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isComplete ? (
                      <Check className="size-4 sm:size-5" strokeWidth={2.5} aria-hidden />
                    ) : (
                      stepNumber
                    )}
                  </span>
                  {!isLast ? (
                    <span
                      className={cn(
                        'mx-1 h-0.5 min-w-2 flex-1 rounded-full sm:mx-2',
                        isComplete ? 'bg-kms-green/40' : 'bg-gray-200',
                      )}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <span
                  className={cn(
                    'mt-1.5 hidden text-center text-[11px] leading-tight sm:block',
                    isActive ? 'font-semibold text-kms-navy' : 'text-gray-400',
                    isComplete && 'text-gray-500',
                  )}
                >
                  {step.label}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="mt-2 text-center text-[11px] font-medium text-kms-navy sm:hidden">
        Stap {currentStep}: {offerteFormSteps[currentStep - 1]?.label}
      </p>
    </nav>
  )
}
