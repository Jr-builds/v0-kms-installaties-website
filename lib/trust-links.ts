/** Fallback zolang Google geen score teruggeeft. */
export const googleReviewCount = 63

export const trustLinks = {
  googleReviews: {
    href: 'https://share.google/7PCZZ2xMMjEvdS7HM',
    label: '5.0',
    platform: 'Google',
    sub: `${googleReviewCount} reviews`,
    logo: '/brands/google.svg',
  },
  werkspot: {
    href: 'https://www.werkspot.nl/profiel/kms-installaties',
    label: '4.9',
    platform: 'Werkspot',
    sub: '36 reviews',
    logo: '/brands/werkspot.png',
  },
} as const
