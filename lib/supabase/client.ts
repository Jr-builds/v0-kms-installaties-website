import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '@/lib/supabase/env'

let browserClient: SupabaseClient | null = null

export function createClient() {
  const env = getSupabaseEnv()
  if (!env) {
    throw new Error('Supabase is niet geconfigureerd. Zet NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient(env.url, env.anonKey)
  return browserClient
}
