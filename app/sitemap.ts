import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/metadata'
import { getAllStadSlugs } from '@/lib/steden'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const stadSlugs = getAllStadSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/elektra`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/laadpaal`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/airconditioning`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/ventilatie`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${SITE_URL}/technisch-vastgoedbeheer`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cameras-systemen`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: `${SITE_URL}/projecten`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/over-ons`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/offerte`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${SITE_URL}/privacyverklaring`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${SITE_URL}/cookies`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: `${SITE_URL}/algemene-voorwaarden`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const cityRoutes: MetadataRoute.Sitemap = stadSlugs.flatMap((slug) => [
    {
      url: `${SITE_URL}/elektricien/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/airconditioning/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  return [...staticRoutes, ...cityRoutes]
}
