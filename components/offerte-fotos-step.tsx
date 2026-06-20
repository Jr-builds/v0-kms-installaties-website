'use client'

import { useRef, useState } from 'react'
import { Lightbulb, Paperclip, X } from 'lucide-react'
import FormFieldError from '@/components/form-field-error'
import OfferteFormBackLink from '@/components/offerte-form-back-link'
import OfferteFormSecureNote from '@/components/offerte-form-secure-note'
import { Button } from '@/components/ui/button'
import type { OfferteCategoryId } from '@/lib/offerte-form'
import {
  formatOfferteFileSize,
  getOfferteFotoTip,
  mergeOfferteFotoFiles,
  OFFERTE_FOTO_ACCEPT,
  OFFERTE_FOTO_FORMAT_LABEL,
  validateOfferteFotoFiles,
} from '@/lib/offerte-fotos'
import { cn } from '@/lib/utils'

interface OfferteFotosStepProps {
  categoryId: OfferteCategoryId
  files: File[]
  onFilesChange: (files: File[]) => void
  onBack: () => void
  onContinue: () => void
}

export default function OfferteFotosStep({
  categoryId,
  files,
  onFilesChange,
  onBack,
  onContinue,
}: OfferteFotosStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function addFiles(incoming: FileList | File[]) {
    const nextFiles = mergeOfferteFotoFiles(files, Array.from(incoming))
    const validationError = validateOfferteFotoFiles(nextFiles)

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    onFilesChange(nextFiles)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      addFiles(event.target.files)
    }
    event.target.value = ''
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files.length) {
      addFiles(event.dataTransfer.files)
    }
  }

  function handleRemove(index: number) {
    setError(null)
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))
  }

  function handleContinue() {
    const validationError = validateOfferteFotoFiles(files)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    onContinue()
  }

  const tip = getOfferteFotoTip(categoryId)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-4 text-xl font-bold text-kms-navy sm:text-2xl">
          Foto&apos;s toevoegen (optioneel)
        </h3>

        <div className="flex gap-3 rounded-lg border border-sky-100 bg-sky-50/80 px-4 py-3.5">
          <Lightbulb
            className="mt-0.5 size-5 shrink-0 text-kms-yellow-dark"
            strokeWidth={2}
            aria-hidden
          />
          <p className="text-sm leading-relaxed text-gray-700">
            <span className="font-semibold text-kms-navy">Tip: </span>
            {tip}
          </p>
        </div>
      </div>

      <div>
        <input
          ref={inputRef}
          id="situatiefotos"
          type="file"
          accept={OFFERTE_FOTO_ACCEPT}
          multiple
          className="sr-only"
          onChange={handleInputChange}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            setIsDragging(false)
          }}
          onDrop={handleDrop}
          className={cn(
            'cursor-pointer rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kms-navy focus-visible:ring-offset-2',
            isDragging
              ? 'border-kms-yellow-dark bg-kms-yellow/10'
              : 'border-kms-navy/15 bg-kms-light/70 hover:border-kms-yellow-dark/60 hover:bg-kms-light',
          )}
        >
          <Paperclip
            className="mx-auto mb-3 size-8 text-kms-navy/40"
            strokeWidth={1.75}
            aria-hidden
          />
          <p className="text-sm text-gray-600">
            Sleep bestanden hierheen{' '}
            <span className="font-semibold text-kms-yellow-dark">of klik om te bladeren</span>
          </p>
          <p className="mt-2 text-xs text-gray-400">{OFFERTE_FOTO_FORMAT_LABEL}</p>
        </div>

        {error ? (
          <div className="mt-2">
            <FormFieldError id="fotos-error" message={error} />
          </div>
        ) : null}

        {files.length > 0 ? (
          <ul className="mt-4 space-y-2" aria-label="Geselecteerde bestanden">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-kms-navy">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatOfferteFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-kms-navy"
                  aria-label={`Verwijder ${file.name}`}
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <p className="text-center text-sm text-gray-500">
        Foto&apos;s helpen ons een betere inschatting te maken.
      </p>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <OfferteFormBackLink onClick={onBack} />
        <Button
          type="button"
          variant="primary"
          size="cta"
          onClick={handleContinue}
          className="w-full sm:w-auto sm:min-w-[12rem]"
        >
          Volgende →
        </Button>
      </div>

      <p className="text-center">
        <button
          type="button"
          onClick={onContinue}
          className="text-sm text-gray-400 transition-colors hover:text-kms-navy"
        >
          Deze stap kunt u overslaan
        </button>
      </p>

      <OfferteFormSecureNote />
    </div>
  )
}
