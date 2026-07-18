import type { Metadata } from 'next'
import BeheerLoginClient from './beheer-login-client'

export const metadata: Metadata = {
  title: 'Website beheer | KMS Installaties',
  robots: { index: false, follow: false },
}

export default function BeheerPage() {
  return <BeheerLoginClient />
}
