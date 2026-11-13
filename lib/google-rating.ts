import 'server-only'

import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { businessInfo } from '@/lib/business'

/** Publieke Place ID van de Google-vermelding (5,0 en 63 reviews, kmsinstallaties.nl). */
const DEFAULT_PLACE_ID = 'ChIJ-6NAgVQvxEcRNbIe70yfjog'
const PLACE_ID_PATTERN = /^ChIJ[\w-]{10,}$/
/** Eén Places-aanroep per dag. Alleen score en aantal, geen reviewteksten. */
const REVALIDATE_SECONDS = 60 * 60 * 24

export type GoogleRating = {
  ratingValue: number
  reviewCount: number
}

const fallbackRating: GoogleRating = {
  ratingValue: businessInfo.googleRating.ratingValue,
  reviewCount: businessInfo.googleRating.reviewCount,
}

function resolvePlaceId() {
  const fromEnv = process.env.GOOGLE_PLACE_ID?.trim()
  if (fromEnv && PLACE_ID_PATTERN.test(fromEnv)) return fromEnv
  return DEFAULT_PLACE_ID
}

export function parseGooglePlaceRating(data: {
  rating?: unknown
  userRatingCount?: unknown
}): GoogleRating | null {
  const { rating, userRatingCount } = data
  if (typeof rating !== 'number' || !Number.isFinite(rating) || rating < 1 || rating > 5) return null
  if (typeof userRatingCount !== 'number' || !Number.isInteger(userRatingCount) || userRatingCount < 1) {
    return null
  }
  return { ratingValue: rating, reviewCount: userRatingCount }
}

async function fetchGoogleRating(): Promise<GoogleRating> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim()
  if (!apiKey) return fallbackRating

  const placeId = resolvePlaceId()

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('[google-rating] Places antwoord', response.status)
      return fallbackRating
    }

    const parsed = parseGooglePlaceRating(await response.json())
    return parsed ?? fallbackRating
  } catch (error) {
    console.error('[google-rating] Places niet bereikbaar', error)
    return fallbackRating
  }
}

const fetchGoogleRatingDaily = unstable_cache(fetchGoogleRating, ['kms-google-rating'], {
  revalidate: REVALIDATE_SECONDS,
})

async function loadGoogleRating(): Promise<GoogleRating> {
  if (!process.env.GOOGLE_PLACES_API_KEY?.trim()) return fallbackRating
  return fetchGoogleRatingDaily()
}

export const getGoogleRating = cache(loadGoogleRating)
