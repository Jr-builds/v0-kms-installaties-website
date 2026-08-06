import ProjectenClient from './projecten-client'
import { allProjects, getProjectImageKeyForProject, type ProjectImageSource } from '@/lib/projects'
import { getImage } from '@/lib/images'
import { fetchSiteImageOverrides } from '@/lib/supabase/site-images'

export default async function ProjectenPage() {
  const overrides = await fetchSiteImageOverrides()
  const imageSources: Record<string, ProjectImageSource> = {}

  for (const project of allProjects) {
    const imageKey = getProjectImageKeyForProject(project)
    const base = getImage(imageKey)
    const override = overrides.get(imageKey)
    imageSources[imageKey] = {
      src: override?.public_url ?? base.src,
      alt: override?.alt || base.alt,
    }
  }

  return <ProjectenClient imageSources={imageSources} />
}
