const TIMEZONE = 'Europe/Amsterdam'
const OPENS_MINUTES = 8 * 60
const CLOSES_MINUTES = 22 * 60

export interface AvailabilityStatus {
  isOpen: boolean
  label: string
}

function getAmsterdamMinutes(now: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
  return hour * 60 + minute
}

export function getAvailabilityStatus(now = new Date()): AvailabilityStatus {
  const minutes = getAmsterdamMinutes(now)
  const isOpen = minutes >= OPENS_MINUTES && minutes < CLOSES_MINUTES

  if (isOpen) {
    return { isOpen: true, label: 'Nu bereikbaar' }
  }

  if (minutes < OPENS_MINUTES) {
    return { isOpen: false, label: 'Vandaag vanaf 08:00 bereikbaar' }
  }

  return { isOpen: false, label: 'Morgen vanaf 08:00 bereikbaar' }
}
