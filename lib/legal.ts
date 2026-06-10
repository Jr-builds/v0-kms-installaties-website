export const legalPages = {
  privacy: {
    href: '/privacyverklaring',
    label: 'Privacyverklaring',
  },
  cookies: {
    href: '/cookies',
    label: 'Cookiebeleid',
  },
  terms: {
    href: '/algemene-voorwaarden',
    label: 'Algemene voorwaarden',
  },
} as const

export const legalPageLinks = [legalPages.privacy, legalPages.cookies, legalPages.terms]
