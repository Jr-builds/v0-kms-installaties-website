import {
  businessInfo,
  formatBusinessAddress,
  openingHoursDisplay,
  openingHoursLongDisplay,
  phoneDisplay,
  phoneTelHref,
} from '@/lib/business'

interface ContactInfoProps {
  /** Short label for hours row (contact page). */
  hoursVariant?: 'short' | 'long'
  /** Show "Ook voor spoedmeldingen" under hours. */
  showSpoedNote?: boolean
}

export default function ContactInfo({
  hoursVariant = 'short',
  showSpoedNote = false,
}: ContactInfoProps) {
  const hours =
    hoursVariant === 'long' ? openingHoursLongDisplay : openingHoursDisplay

  return (
    <ul className="space-y-4">
      <li className="flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-kms-navy">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">Adres</div>
          <div className="text-sm text-gray-500">{formatBusinessAddress()}</div>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-kms-navy">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">Telefoon</div>
          <a href={phoneTelHref} className="text-sm text-kms-navy">
            {phoneDisplay}
          </a>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-kms-navy">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">E-mail</div>
          <a href={`mailto:${businessInfo.email}`} className="text-sm text-kms-navy">
            {businessInfo.email}
          </a>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-kms-navy">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">Bereikbaar</div>
          <div className="text-sm text-gray-500">{hours}</div>
          {showSpoedNote ? (
            <div className="mt-0.5 text-xs text-gray-500">Ook voor spoedmeldingen</div>
          ) : null}
        </div>
      </li>
    </ul>
  )
}
