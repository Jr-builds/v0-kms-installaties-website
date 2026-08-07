import { businessInfo } from '@/lib/business'
import { SITE_URL } from '@/lib/metadata'
import { serviceAreaProvinces } from '@/lib/service-area'

export interface FaqItem {
  question: string
  answer: string
}

export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

interface ServiceSchemaOptions {
  name: string
  description: string
  path: string
}

export function buildServiceSchema({ name, description, path }: ServiceSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      url: businessInfo.url,
      telephone: businessInfo.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address.streetAddress,
        postalCode: businessInfo.address.postalCode,
        addressLocality: businessInfo.address.addressLocality,
        addressRegion: businessInfo.address.addressRegion,
        addressCountry: businessInfo.address.addressCountry,
      },
    },
    areaServed: [
      ...serviceAreaProvinces.map((province) => ({
        '@type': 'AdministrativeArea' as const,
        name: province,
      })),
      ...businessInfo.areaServedCities.map((city) => ({
        '@type': 'City' as const,
        name: city,
      })),
    ],
  }
}
