'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CmsEditBarProps {
  onLogout: () => Promise<void>
}

export default function CmsEditBar({ onLogout }: CmsEditBarProps) {
  return (
    <div className="sticky top-0 z-[100] border-b border-amber-300 bg-amber-100 text-amber-950">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <p className="text-sm font-medium">
          Bewerkmodus aan - klik op een foto om deze te vervangen.
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/beheer"
            className="text-sm font-medium text-amber-950/80 underline-offset-2 hover:underline"
          >
            Beheer
          </Link>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="bg-white hover:bg-amber-50"
            onClick={() => void onLogout()}
          >
            Uitloggen
          </Button>
        </div>
      </div>
    </div>
  )
}
