'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { legalPages } from '@/lib/legal'

const CONSENT_KEY = 'kms-cookie-consent-v1'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(CONSENT_KEY)
      if (!consent) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch {
      // localStorage unavailable — hide for this session
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-notice-title"
      aria-describedby="cookie-notice-description"
      className="fixed inset-x-0 z-30 border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p id="cookie-notice-title" className="text-sm font-semibold text-kms-navy">
            Cookies op deze website
          </p>
          <p id="cookie-notice-description" className="mt-1 text-sm leading-relaxed text-gray-600">
            Wij gebruiken functionele cookies en anonieme statistieken om de website te verbeteren.{' '}
            <Link href={legalPages.cookies.href} className="font-semibold text-kms-navy underline underline-offset-2">
              Lees ons cookiebeleid
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button type="button" variant="primary" size="sm" onClick={accept}>
            Accepteren
          </Button>
          <Link
            href={legalPages.cookies.href}
            className="rounded-md px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:text-kms-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2"
          >
            Instellingen
          </Link>
        </div>
      </div>
    </aside>
  )
}
