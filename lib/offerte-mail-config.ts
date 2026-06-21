import { businessInfo } from '@/lib/business'

/** Testfase-ontvanger; overschrijf met OFFERTE_RECIPIENT_EMAIL in Vercel. */
const OFFERTE_TEST_RECIPIENT = 'docscrypto652@gmail.com'

export function getOfferteRecipientEmail(): string {
  const configured = process.env.OFFERTE_RECIPIENT_EMAIL?.trim()
  if (configured) return configured
  return OFFERTE_TEST_RECIPIENT
}

export function getOfferteProductionRecipientEmail(): string {
  return businessInfo.email
}

export function getOfferteFromEmail(): string {
  return process.env.OFFERTE_FROM_EMAIL?.trim() || 'KMS Installaties <onboarding@resend.dev>'
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined
}
