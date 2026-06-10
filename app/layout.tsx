import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import MobileCtaBar from '@/components/mobile-cta-bar'
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
        <SkipLink />
        <StructuredData />
        {children}
        <MobileCtaBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
