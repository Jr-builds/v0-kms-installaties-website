import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden pb-safe"
      role="region"
      aria-label="Snel contact"
    >
      <div className="flex gap-2 p-3">
        <a
          href="tel:0782032858"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-kms-navy py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Bel nu
        </a>
        <Link
          href="/offerte"
          className="flex flex-1 items-center justify-center rounded-lg bg-kms-yellow py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Offerte
        </Link>
      </div>
    </div>
  )
}
