'use client'

import { useEffect } from 'react'

/** Unregisters leftover service workers/caches from the old Vue site. */
export default function UnregisterLegacySw() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const clear = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations()
          await Promise.all(registrations.map((registration) => registration.unregister()))
        }
        if ('caches' in window) {
          const keys = await caches.keys()
          await Promise.all(keys.map((key) => caches.delete(key)))
        }
      } catch {
        // Best-effort cleanup only.
      }
    }

    void clear()
  }, [])

  return null
}
