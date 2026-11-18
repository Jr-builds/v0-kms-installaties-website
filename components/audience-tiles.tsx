import EditableText from '@/components/cms/editable-text'
import AudienceTileFrame from '@/components/audience-tile-frame'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import type { SiteImageKey } from '@/lib/images'

const tiles: {
  href: string
  imageKey: SiteImageKey
  title: string
  textKey: string
  text: string
  cta: string
}[] = [
  {
    href: '/zakelijk',
    imageKey: 'home.tegel.zakelijk',
    title: 'Zakelijk',
    textKey: 'home.tegel.zakelijk',
    text: 'Elektra, klimaatinstallaties en laadoplossingen voor bedrijfspanden. Ook inzetbaar als elektrotechnisch onderaannemer bij bouw en renovatie.',
    cta: 'Bekijk zakelijk',
  },
  {
    href: '/particulier',
    imageKey: 'home.tegel.particulier',
    title: 'Particulier',
    textKey: 'home.tegel.particulier',
    text: 'Van een nieuwe groepenkast of laadpaal tot airco en ventilatie. Wij adviseren, installeren en leggen uit hoe alles werkt.',
    cta: 'Bekijk particulier',
  },
]

export default function AudienceTiles() {
  return (
    <section aria-label="Zakelijk of particulier" className="bg-white py-12 sm:py-16">
      <style>{`.kms-audience-photo { aspect-ratio: 16 / 9; }`}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {tiles.map((tile) => (
            <AudienceTileFrame key={tile.href} href={tile.href}>
              <SiteImageOrPlaceholder
                imageKey={tile.imageKey}
                placeholderLabel={`Homepage tegel: ${tile.title}`}
                aspectRatio="aspect-video"
                className="kms-audience-photo w-full shrink-0"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-xl font-bold text-kms-navy">
                  <EditableText
                    textKey={`${tile.textKey}.title`}
                    label={`Homepage tegel ${tile.title} - titel`}
                    defaultValue={tile.title}
                    as="span"
                  />
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                  <EditableText
                    textKey={`${tile.textKey}.text`}
                    label={`Homepage tegel ${tile.title} - tekst`}
                    defaultValue={tile.text}
                    as="span"
                    multiline
                  />
                </p>
                <span className="mt-5 inline-flex w-fit items-center rounded-lg border-2 border-kms-navy px-4 py-2 text-sm font-semibold text-kms-navy transition-colors group-hover:bg-kms-navy group-hover:text-white">
                  <EditableText
                    textKey={`${tile.textKey}.cta`}
                    label={`Homepage tegel ${tile.title} - knop`}
                    defaultValue={tile.cta}
                    as="span"
                  />
                </span>
              </div>
            </AudienceTileFrame>
          ))}
        </div>
      </div>
    </section>
  )
}
