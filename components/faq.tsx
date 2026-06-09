'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
}

function faqId(index: number, part: 'question' | 'answer'): string {
  return `faq-${part}-${index}`
}

export default function FAQ({ items, title = 'Veelgestelde vragen' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section className="bg-kms-light py-16 sm:py-20" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="heading-section text-center mb-10 text-kms-navy">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openItems.has(index)
            const questionId = faqId(index, 'question')
            const answerId = faqId(index, 'answer')

            return (
              <div key={questionId} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  type="button"
                  id={questionId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-gray-800 transition-colors hover:bg-gray-50"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-kms-navy motion-safe:transition-transform${isOpen ? ' rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="border-t border-gray-100 px-6 pb-4 pt-3 text-sm leading-relaxed text-gray-600"
                >
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
