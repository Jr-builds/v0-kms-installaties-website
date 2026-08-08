import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseEnv } from '@/lib/supabase/env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const shouldClearLegacyCache =
    request.method === 'GET' &&
    !request.nextUrl.pathname.startsWith('/api/') &&
    (request.headers.get('accept')?.includes('text/html') ?? false) &&
    !request.cookies.get('kms_legacy_cache_cleared')

  const applyLegacyCacheClear = (response: NextResponse) => {
    if (!shouldClearLegacyCache) return response
    response.headers.set('Clear-Site-Data', '"cache", "storage"')
    response.cookies.set('kms_legacy_cache_cleared', '1', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: true,
    })
    return response
  }

  applyLegacyCacheClear(supabaseResponse)

  const env = getSupabaseEnv()
  if (!env) {
    return supabaseResponse
  }

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        supabaseResponse = NextResponse.next({ request })
        applyLegacyCacheClear(supabaseResponse)
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  await supabase.auth.getUser()

  return supabaseResponse
}
