'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import SiteImage from '@/components/site-image'
import ImagePlaceholder from '@/components/image-placeholder'
import { Button } from '@/components/ui/button'
import { useCmsEdit } from '@/components/cms/cms-edit-provider'
import { createClient } from '@/lib/supabase/client'
import type { SiteImageKey } from '@/lib/images'
import { cn } from '@/lib/utils'

interface EditableImageProps {
  imageKey: SiteImageKey
  label: string
  src: string | null
  alt: string
  aspectRatio?: string
  className?: string
  priority?: boolean
  sizePreset?: 'hero' | 'card' | 'square' | 'modal'
  onSaved?: (src: string) => void
}

export default function EditableImage({
  imageKey,
  label,
  src,
  alt,
  aspectRatio = 'aspect-video',
  className = '',
  priority = false,
  sizePreset = 'card',
  onSaved,
}: EditableImageProps) {
  const { canEdit } = useCmsEdit()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function resetModal() {
    setOpen(false)
    setPreview(null)
    setFile(null)
    setError('')
    setSaving(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  function onFileChange(selected: File | null) {
    setError('')
    if (!selected) {
      setFile(null)
      setPreview(null)
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  async function onSave() {
    if (!file) {
      setError('Kies eerst een foto.')
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

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${imageKey}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage.from('site-media').upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      })
      if (uploadError) {
        setError(uploadError.message)
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('site-media').getPublicUrl(path)

      const { error: upsertError } = await supabase.from('site_images').upsert({
        key: imageKey,
        label,
        alt,
        storage_path: path,
        public_url: publicUrl,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })

      if (upsertError) {
        setError(upsertError.message)
        return
      }

      onSaved?.(publicUrl)
      resetModal()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload mislukt.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className={cn('relative', className)}>
        {src ? (
          <SiteImage
            src={src}
            alt={alt}
            aspectRatio={aspectRatio}
            priority={priority}
            sizePreset={sizePreset}
          />
        ) : (
          <ImagePlaceholder label={label} aspectRatio={aspectRatio} />
        )}

        {canEdit ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpen(true)
            }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-kms-navy/0 text-white opacity-0 transition-all hover:bg-kms-navy/55 hover:opacity-100 focus-visible:bg-kms-navy/55 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-yellow focus-visible:ring-offset-2"
            aria-label={`${label} vervangen`}
          >
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold text-kms-navy shadow-sm">
              <Pencil className="h-4 w-4" aria-hidden />
              Foto vervangen
            </span>
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cms-replace-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) resetModal()
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="cms-replace-title" className="text-lg font-bold text-kms-navy mb-1">
              Foto vervangen
            </h2>
            <p className="text-sm text-gray-600 mb-4">{label}</p>

            <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              {preview || src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview ?? src ?? undefined}
                  alt="Voorbeeld"
                  className="max-h-64 w-full object-contain"
                />
              ) : (
                <div className="flex h-40 items-center justify-center text-sm text-gray-500">
                  Nog geen foto
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-kms-navy file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-kms-navy/90"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            />

            {error ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" onClick={resetModal} disabled={saving}>
                Annuleren
              </Button>
              <Button type="button" variant="primary" onClick={() => void onSave()} disabled={saving || !file}>
                {saving ? 'Bezig met opslaan...' : 'Opslaan'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
