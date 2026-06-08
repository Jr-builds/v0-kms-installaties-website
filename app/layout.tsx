import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KMS Installaties | Elektra & Airconditioning Zwijndrecht',
  description:
    'KMS Installaties: vakkundige elektra, airconditioning, ventilatie, vastgoedbeheer en camerasystemen in Zuid-Holland. Bereikbaar ma-zo 08:00-22:00. NEN 3140, STEK en VCA gecertificeerd.',
  keywords:
    'elektra installatie, airconditioning, ventilatie, camerasystemen, technisch vastgoedbeheer, Zwijndrecht, Rotterdam, Zuid-Holland, NEN 3140, STEK',
  openGraph: {
    title: 'KMS Installaties | Elektra & Airconditioning',
    description:
      'Vakkundige installaties in Zuid-Holland. Bereikbaar ma-zo 08:00-22:00.',
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
