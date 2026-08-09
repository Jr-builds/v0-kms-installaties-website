import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import CmsEditProvider from '@/components/cms/cms-edit-provider'
import MobileCtaBar from '@/components/mobile-cta-bar'
import CookieNotice from '@/components/cookie-notice'
import GoogleAnalytics from '@/components/google-analytics'
import SkipLink from '@/components/skip-link'
import StructuredData from '@/components/structured-data'
import UnregisterLegacySw from '@/components/unregister-legacy-sw'
import { defaultMetadata } from '@/lib/metadata'
import './globals.css'

export const metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased mobile-cta-spacing">
        <Script id="unregister-legacy-sw" strategy="beforeInteractive">
          {`(function(){try{if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(x){x.unregister()})})}if(window.caches){caches.keys().then(function(k){k.forEach(function(n){caches.delete(n)})})}}catch(e){}})();`}
        </Script>
        <CmsEditProvider>
          <SkipLink />
          <StructuredData />
          <UnregisterLegacySw />
          {children}
          <CookieNotice />
          <GoogleAnalytics />
          <MobileCtaBar />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </CmsEditProvider>
      </body>
    </html>
  )
}
