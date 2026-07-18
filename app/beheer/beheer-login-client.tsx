'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export default function BeheerLoginClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) {
      setChecking(false)
      return
    }

    let cancelled = false
    async function check() {
      try {
        const supabase = createClient()
        const { data } = await supabase.auth.getUser()
        if (!cancelled && data.user) {
          router.replace('/')
          return
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setChecking(false)
      }
    }
    void check()
    return () => {
      cancelled = true
    }
  }, [configured, router])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message)
        return
      }
      router.replace('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inloggen mislukt.')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-kms-light flex items-center justify-center px-4">
        <p className="text-gray-600">Bezig met controleren...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-kms-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-kms-navy/70 mb-2">KMS Installaties</p>
        <h1 className="heading-section text-kms-navy mb-2">Website beheer</h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Log in om foto&apos;s op de website te vervangen. Daarna klik je op een foto om een nieuwe te uploaden.
        </p>

        {!configured ? (
          <p className="text-sm text-red-600">
            Supabase is nog niet geconfigureerd. Zet <code>NEXT_PUBLIC_SUPABASE_URL</code> en{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="beheer-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <input
                id="beheer-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 outline-none focus:border-kms-navy focus:ring-2 focus:ring-kms-navy/20"
              />
            </div>
            <div>
              <label htmlFor="beheer-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Wachtwoord
              </label>
              <input
                id="beheer-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 outline-none focus:border-kms-navy focus:ring-2 focus:ring-kms-navy/20"
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="primary" size="cta-sm" className="w-full" disabled={loading}>
              {loading ? 'Bezig...' : 'Inloggen'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-kms-navy underline-offset-2 hover:underline">
            Terug naar de website
          </Link>
        </p>
      </div>
    </main>
  )
}
