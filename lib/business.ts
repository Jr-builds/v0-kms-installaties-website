import { SITE_NAME, SITE_URL } from '@/lib/metadata'
import { trustLinks } from '@/lib/trust-links'

export const businessInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  telephone: '+31782032858',
  email: 'info@kmsinstallaties.nl',
  address: {
    streetAddress: 'Voltastraat 6A',
    postalCode: '3335 KK',
    addressLocality: 'Zwijndrecht',
    addressRegion: 'Zuid-Holland',
    addressCountry: 'NL',
  },
  openingHours: {
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ] as const,
    opens: '08:00',
    closes: '22:00',
  },
  areaServedCities: [
    'Rotterdam',
    'Dordrecht',
    'Zwijndrecht',
    'Ridderkerk',
    'Barendrecht',
    'Papendrecht',
    'Capelle aan den IJssel',
    'Schiedam',
    'Vlaardingen',
    'Spijkenisse',
  ],
  logo: '/KMS-Logo.png',
  image: '/electrician-professional-work.jpg',
  googleRating: {
    ratingValue: 5.0,
    reviewCount: 39,
    url: trustLinks.googleReviews.href,
  },
} as const

export function formatBusinessAddress(): string {
  const { streetAddress, postalCode, addressLocality } = businessInfo.address
  return `${streetAddress}, ${postalCode} ${addressLocality}`
}

export function getGoogleMapsUrl(): string {
  return `https://maps.google.com/?q=${encodeURIComponent(formatBusinessAddress())}`
}

export function getGoogleMapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(formatBusinessAddress())}&output=embed`
}
