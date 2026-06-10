'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProjectModal from '@/components/project-modal'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import {
  filterProjects,
  getProjectImageKeyForProject,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/projects'
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'

export default function ProjectenPage() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState<ProjectCategory>('Alle')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [gridKey, setGridKey] = useState(0)

  const filtered = filterProjects(active)

  function handleFilter(category: ProjectCategory) {
    if (category === active) return
    setActive(category)
    if (!prefersReducedMotion) {
      setGridKey((key) => key + 1)
    }
  }

  function handleCloseModal() {
    setSelectedProject(null)
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-14">
          <div className="hero-navy-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="heading-page text-white mb-3">Onze projecten</h1>
            <p className="text-blue-200 text-lg">
              Een greep uit het werk dat wij hebben mogen uitvoeren in Zuid-Holland.
            </p>
          </div>
        </section>

        <section className="bg-kms-light py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border-2 motion-safe:transition-colors ${
                    active === cat
                      ? 'text-white border-kms-navy bg-kms-navy'
                      : 'text-gray-600 border-gray-300 bg-white hover:border-kms-navy hover:text-kms-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className={cn('project-grid-fade rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center', prefersReducedMotion && 'motion-disable')}>
                <p className="text-lg font-semibold text-kms-navy mb-2">
                  Geen projecten in deze categorie
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Probeer een andere filter of bekijk alle projecten.
                </p>
                <button
                  type="button"
                  onClick={() => handleFilter('Alle')}
                  className="inline-block rounded-lg border-2 border-kms-navy px-5 py-2.5 text-sm font-bold text-kms-navy transition-colors hover:bg-kms-navy hover:text-white"
                >
                  Toon alle projecten
                </button>
              </div>
            ) : (
              <div
                key={prefersReducedMotion ? active : gridKey}
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
                  !prefersReducedMotion && 'project-grid-fade',
                )}
              >
                {filtered.map((project) => (
                  <article
                    key={project.id}
                    className="group rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm motion-safe:transition-shadow motion-safe:hover:shadow-lg motion-safe:hover:-translate-y-0.5"
                  >
                    <button
                      type="button"
                      className="w-full cursor-pointer text-left"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Bekijk project: ${project.title}`}
                    >
                      <div className="overflow-hidden">
                        <SiteImageOrPlaceholder
                          imageKey={getProjectImageKeyForProject(project)}
                          placeholderLabel=""
                          aspectRatio="aspect-video"
                          className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="badge-yellow px-2.5 py-0.5 text-xs font-bold">
                            {project.category}
                          </span>
                          <span className="text-xs text-gray-500">{project.city}</span>
                        </div>
                        <h3 className="font-bold text-base mb-1.5 text-kms-navy">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                        <p className="text-sm font-semibold text-kms-yellow-dark mb-3">
                          Resultaat: {project.resultaat}
                        </p>
                        <span className="inline-flex items-center text-sm font-semibold text-kms-navy group-hover:underline">
                          Bekijk project
                          <span aria-hidden="true" className="ml-1 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="hero-navy py-14">
          <div className="hero-navy-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-section text-white mb-3">Wilt u ook zo&apos;n resultaat?</h2>
            <p className="text-blue-200 mb-8">Vraag een vrijblijvende offerte aan.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offerte"
                className="cta-yellow inline-block px-8 py-3.5 text-base"
              >
                Vraag een offerte aan
              </Link>
              <a
                href="tel:0782032858"
                className="inline-block px-8 py-3.5 rounded-lg text-base font-bold text-white border-2 border-white hover:bg-white hover:text-kms-navy transition-colors"
              >
                078 203 28 58
              </a>
            </div>
          </div>
        </section>
      </main>

      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      <Footer />
    </>
  )
}
