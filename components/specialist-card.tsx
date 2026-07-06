import { User } from 'lucide-react'

interface SpecialistCardProps {
  name: string
  role: string
}

export default function SpecialistCard({ name, role }: SpecialistCardProps) {
  return (
    <article className="rounded-2xl border border-kms-navy/10 bg-gradient-to-br from-kms-navy/5 to-kms-navy/10 px-6 py-10 text-center">
      <div
        className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-kms-navy/15"
        aria-hidden="true"
      >
        <User className="h-11 w-11 text-kms-navy" strokeWidth={1.75} />
      </div>
      <h3 className="font-bold text-lg text-kms-navy">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">{role}</p>
    </article>
  )
}
