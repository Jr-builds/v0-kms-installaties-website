export const COOKIE_CONSENT_KEY = 'kms-cookie-consent-v1'
export const COOKIE_CONSENT_EVENT = 'kms-cookie-consent'

export type CookieConsent = 'accepted'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return value === 'accepted' ? 'accepted' : null
  } catch {
    return null
  }
}

export function setCookieConsentAccepted(): void {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  } catch {
    // localStorage unavailable
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}
