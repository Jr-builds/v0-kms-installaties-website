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

export default function FAQ({ items, title = 'Veelgestelde vragen' }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-kms-light py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-section text-center mb-10 text-kms-navy">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm sm:text-base">{item.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-kms-navy"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
