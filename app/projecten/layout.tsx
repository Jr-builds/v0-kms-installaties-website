import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.projecten

export default function ProjectenLayout({ children }: { children: React.ReactNode }) {
  return children
}
