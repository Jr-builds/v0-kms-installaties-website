import { businessInfo } from '@/lib/business'
import { trustLinks } from '@/lib/trust-links'

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician'],
    name: businessInfo.name,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    image: `${businessInfo.url}${businessInfo.image}`,
    logo: `${businessInfo.url}${businessInfo.logo}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      postalCode: businessInfo.address.postalCode,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      addressCountry: businessInfo.address.addressCountry,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...businessInfo.openingHours.days],
        opens: businessInfo.openingHours.opens,
        closes: businessInfo.openingHours.closes,
      },
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Zuid-Holland',
      },
      ...businessInfo.areaServedCities.map((city) => ({
        '@type': 'City',
        name: city,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Zuid-Holland',
        },
      })),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: businessInfo.googleRating.ratingValue,
      reviewCount: businessInfo.googleRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [businessInfo.googleRating.url, trustLinks.werkspot.href],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
