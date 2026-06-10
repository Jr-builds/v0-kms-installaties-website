'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import { getProjectImageKeyForProject, type Project } from '@/lib/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return

    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const imageKey = getProjectImageKeyForProject(project)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-kms-navy/70 backdrop-blur-sm" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <SiteImageOrPlaceholder
          imageKey={imageKey}
          placeholderLabel=""
          aspectRatio="aspect-video"
          sizePreset="hero"
          priority
        />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-yellow px-2.5 py-0.5 text-xs font-bold">
                {project.category}
              </span>
              <span className="text-xs text-gray-500">{project.city}</span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex-shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-kms-light hover:text-kms-navy"
              aria-label="Sluit projectdetails"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 id="project-modal-title" className="heading-subsection text-kms-navy mb-3">
            {project.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">{project.details}</p>
          <p className="text-sm font-semibold text-kms-yellow-dark mb-6">Resultaat: {project.resultaat}</p>

          <Link
            href="/offerte"
            className="cta-yellow inline-block px-6 py-3 text-sm"
            onClick={onClose}
          >
            Vergelijkbaar project? Vraag offerte aan
          </Link>
        </div>
      </div>
    </div>
  )
}
