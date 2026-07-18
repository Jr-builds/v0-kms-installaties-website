'use client'

import { useEffect, useState, type ElementType, type KeyboardEvent, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCmsEdit } from '@/components/cms/cms-edit-provider'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { cn } from '@/lib/utils'

interface EditableTextProps {
  textKey: string
  label: string
  defaultValue: string
  as?: ElementType
  className?: string
  multiline?: boolean
  id?: string
}

export default function EditableText({
  textKey,
  label,
  defaultValue,
  as: Tag = 'span',
  className = '',
  multiline = false,
  id,
}: EditableTextProps) {
  const { canEdit } = useCmsEdit()
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(defaultValue)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isSupabaseConfigured()) return

    let cancelled = false
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('site_texts')
          .select('value')
          .eq('key', textKey)
          .maybeSingle()
        if (!cancelled && data?.value != null && data.value !== '') {
          setValue(data.value)
        }
      } catch {
        // keep default
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [textKey])

  function openEditor() {
    setDraft(value)
    setError('')
    setOpen(true)
  }

  async function onSave() {
    const next = draft.trim()
    if (!next) {
      setError('Tekst mag niet leeg zijn.')
      return
    }

    setSaving(true)
    setError('')
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError('Je bent niet ingelogd.')
        return
      }

      const { error: upsertError } = await supabase.from('site_texts').upsert({
        key: textKey,
        label,
        value: next,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })

      if (upsertError) {
        setError(upsertError.message)
        return
      }

      setValue(next)
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Tag
        id={id}
        className={cn(
          className,
          canEdit &&
            'relative cursor-pointer rounded-sm outline-offset-2 hover:outline hover:outline-2 hover:outline-kms-yellow/80',
        )}
        onClick={
          canEdit
            ? (e: MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
                openEditor()
              }
            : undefined
        }
        role={canEdit ? 'button' : undefined}
        tabIndex={canEdit ? 0 : undefined}
        onKeyDown={
          canEdit
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openEditor()
                }
              }
            : undefined
        }
        aria-label={canEdit ? `${label} bewerken` : undefined}
      >
        {value}
        {canEdit ? (
          <span className="ml-1.5 inline-flex align-middle text-kms-yellow opacity-80" aria-hidden>
            <Pencil className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </Tag>

      {open ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cms-text-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) setOpen(false)
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="cms-text-title" className="text-lg font-bold text-kms-navy mb-1">
              Tekst bewerken
            </h2>
            <p className="text-sm text-gray-600 mb-4">{label}</p>

            {multiline ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 outline-none focus:border-kms-navy focus:ring-2 focus:ring-kms-navy/20"
              />
            ) : (
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 outline-none focus:border-kms-navy focus:ring-2 focus:ring-kms-navy/20"
              />
            )}

            {error ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={saving}>
                Annuleren
              </Button>
              <Button type="button" variant="primary" onClick={() => void onSave()} disabled={saving}>
                {saving ? 'Bezig met opslaan...' : 'Opslaan'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
