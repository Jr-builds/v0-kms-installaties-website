'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import CmsEditBar from '@/components/cms/cms-edit-bar'

interface CmsEditContextValue {
  canEdit: boolean
  loading: boolean
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
}

const CmsEditContext = createContext<CmsEditContextValue>({
  canEdit: false,
  loading: true,
  refreshSession: async () => {},
  logout: async () => {},
})

export function useCmsEdit() {
  return useContext(CmsEditContext)
}

export default function CmsEditProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [canEdit, setCanEdit] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setCanEdit(false)
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setCanEdit(Boolean(data.user))
    } catch {
      setCanEdit(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    setCanEdit(false)
    router.refresh()
  }, [router])

  useEffect(() => {
    void refreshSession()
  }, [refreshSession])

  const value = useMemo(
    () => ({ canEdit, loading, refreshSession, logout }),
    [canEdit, loading, refreshSession, logout],
  )

  return (
    <CmsEditContext.Provider value={value}>
      {canEdit ? <CmsEditBar onLogout={logout} /> : null}
      {children}
    </CmsEditContext.Provider>
  )
}
