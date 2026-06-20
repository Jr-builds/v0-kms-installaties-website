import { Lock } from 'lucide-react'

export default function OfferteFormSecureNote() {
  return (
    <p className="flex items-center justify-center gap-1.5 border-t border-gray-100 pt-5 text-center text-xs text-gray-400">
      <Lock className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
      Beveiligde verbinding. Gegevens worden vertrouwelijk behandeld.
    </p>
  )
}
