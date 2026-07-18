import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/env'

export function createClient() {
  const env = getSupabaseEnv()
  if (!env) {
    throw new Error('Supabase is niet geconfigureerd. Zet NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createBrowserClient(env.url, env.anonKey)
}
