import { businessInfo } from '@/lib/business'

export function getOfferteRecipientEmail(): string {
  return process.env.OFFERTE_RECIPIENT_EMAIL?.trim() || businessInfo.email
}

export function getOfferteFromEmail(): string {
  return process.env.OFFERTE_FROM_EMAIL?.trim() || 'KMS Installaties <onboarding@resend.dev>'
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined
}
