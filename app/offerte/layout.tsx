import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.offerte

export default function OfferteLayout({ children }: { children: React.ReactNode }) {
  return children
}
