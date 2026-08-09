'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_EVENT, getCookieConsent } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    if (getCookieConsent() === 'accepted') {
      setEnabled(true)
    }

    function onConsent() {
      setEnabled(true)
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  if (!GA_MEASUREMENT_ID || !enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
