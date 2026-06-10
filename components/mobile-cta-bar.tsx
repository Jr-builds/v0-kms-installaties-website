import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { phoneTelHref, whatsAppHref } from '@/lib/business'

export default function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden pb-safe"
      role="region"
      aria-label="Snel contact"
    >
      <div className="grid grid-cols-3 gap-2 p-3">
        <Button
          render={<a href={phoneTelHref} />}
          nativeButton={false}
          variant="default"
          className="flex flex-col gap-1 bg-kms-navy px-2 py-2.5 text-xs font-bold text-white hover:opacity-90"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          Bel
        </Button>
        <Button
          render={<a href={whatsAppHref} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          variant="spoed"
          className="flex flex-col gap-1 px-2 py-2.5 text-xs font-bold"
          aria-label="WhatsApp KMS Installaties"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden />
          WhatsApp
        </Button>
        <Button
          render={<Link href="/offerte" />}
          nativeButton={false}
          variant="primary"
          className="flex flex-col gap-1 px-2 py-2.5 text-xs font-bold"
        >
          Offerte
        </Button>
      </div>
    </div>
  )
}
