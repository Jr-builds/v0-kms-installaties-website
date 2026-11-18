'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useCmsEdit } from '@/components/cms/cms-edit-provider'

interface AudienceTileFrameProps {
  href: string
  children: ReactNode
}

const tileClassName =
  'group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-kms-light transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2'

/**
 * Voor bezoekers is de hele tegel een link. Voor ingelogde beheerders halen we
 * de link om de tegel weg, zodat de knop "Foto vervangen" op de foto zelf
 * klikbaar is in plaats van dat de tegel naar de pagina navigeert.
 */
export default function AudienceTileFrame({ href, children }: AudienceTileFrameProps) {
  const { canEdit } = useCmsEdit()

  if (canEdit) {
    return <article className={tileClassName}>{children}</article>
  }

  return (
    <Link href={href} className={tileClassName}>
      {children}
    </Link>
  )
}
