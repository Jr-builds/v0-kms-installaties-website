import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import CmsEditProvider from '@/components/cms/cms-edit-provider'
import MobileCtaBar from '@/components/mobile-cta-bar'
import CookieNotice from '@/components/cookie-notice'
import SkipLink from '@/components/skip-link'
import StructuredData from '@/components/structured-data'
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
        <CmsEditProvider>
          <SkipLink />
          <StructuredData />
          {children}
          <CookieNotice />
          <MobileCtaBar />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </CmsEditProvider>
      </body>
    </html>
  )
}
