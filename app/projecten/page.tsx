'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import { getProjectImageKey } from '@/lib/images'

type Category = 'Alle' | 'Elektra' | 'Airconditioning' | 'Ventilatie' | "Camera's"

const allProjects = [
  // Elektra
  { category: 'Elektra', city: 'Zwijndrecht', title: 'Volledige herinstallatie meterkast', description: 'Groepenkast vervangen na waterschade.', resultaat: 'Veilige NEN-gecertificeerde installatie.' },
  { category: 'Elektra', city: 'Rotterdam', title: 'Complete elektra nieuwbouwwoning', description: 'Volledige elektrische aanleg inclusief laadpaal.', resultaat: 'Gebruiksklare installatie opgeleverd binnen planning.' },
  { category: 'Elektra', city: 'Dordrecht', title: 'Laadpaal installatie bedrijfspand', description: 'Drie laadpalen geplaatst met dynamic loadbalancing.', resultaat: 'Medewerkers kunnen elektrische auto\'s opladen tijdens werktijd.' },
  // Airconditioning
  { category: 'Airconditioning', city: 'Rotterdam', title: 'LG Schilderij airco-unit woning', description: 'Nieuwe unit geplaatst op bestaande muur, creatieve oplossing voor beperkte ruimte.', resultaat: 'Strakke afwerking, klant zeer tevreden.' },
  { category: 'Airconditioning', city: 'Rotterdam', title: '3x Mitsubishi Heavy airco-units', description: 'Drie units op plat dak, samenwerking met dakdekker.', resultaat: 'Comfortabel binnenklimaat alle verdiepingen, app-gestuurd.' },
  { category: 'Airconditioning', city: 'Zwijndrecht', title: 'Klimaatbeheersing kantoorruimte', description: 'Multisplit-systeem voor open kantoor van 200m2.', resultaat: 'Stabiele temperatuur het hele jaar, lagere energiekosten.' },
  // Ventilatie
  { category: 'Ventilatie', city: 'Ridderkerk', title: 'Vervangen WTW-unit en leidingen', description: 'Oude WTW vervangen, leidingen vernieuwd.', resultaat: 'Betere luchtkwaliteit, lagere stookkosten.' },
  { category: 'Ventilatie', city: 'Dordrecht', title: 'Mechanische ventilatie nieuwbouw', description: 'Volledig ventilatiesysteem aangelegd.', resultaat: 'Frisse lucht in elke ruimte, voldoet aan bouwbesluit.' },
  { category: 'Ventilatie', city: 'Rotterdam', title: 'Jaarlijks onderhoud LBK utiliteit', description: 'Filters vervangen, GBS gecontroleerd.', resultaat: 'Optimale luchtkwaliteit gegarandeerd voor komend jaar.' },
  // Camera's
  { category: "Camera's", city: 'Almere', title: 'Camerabeveiliging woning', description: 'Volledig systeem met app-koppeling.', resultaat: '24/7 live zicht via smartphone.' },
  { category: "Camera's", city: 'Rotterdam', title: 'Camerasysteem bedrijfspand', description: '8 cameras buiten, NVR-systeem, bewegingsdetectie.', resultaat: 'Volledig beveiligd pand, AVG-conform geregistreerd.' },
  { category: "Camera's", city: 'Zwijndrecht', title: 'Beveiliging parkeerterrein', description: '6 cameras met nachtzicht en app-bediening.', resultaat: 'Incidenten op parkeerterrein significant afgenomen.' },
]

const categories: Category[] = ['Alle', 'Elektra', 'Airconditioning', 'Ventilatie', "Camera's"]

export default function ProjectenPage() {
  const [active, setActive] = useState<Category>('Alle')

  const filtered = active === 'Alle' ? allProjects : allProjects.filter((p) => p.category === active)

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section style={{ background: '#1e52a0' }} className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-balance">Onze projecten</h1>
            <p className="text-blue-200 text-lg">Een greep uit het werk dat wij hebben mogen uitvoeren in Zuid-Holland.</p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="bg-[#F8F9FA] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    active === cat
                      ? 'text-white border-transparent'
                      : 'text-gray-600 border-gray-300 bg-white hover:border-[#1e52a0] hover:text-[#1e52a0]'
                  }`}
                  style={active === cat ? { background: '#1e52a0', borderColor: '#1e52a0' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <article key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <SiteImageOrPlaceholder
                    imageKey={getProjectImageKey(project.category)}
                    placeholderLabel=""
                    aspectRatio="aspect-video"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#F5A623' }}>
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-500">{project.city}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color: '#1e52a0' }}>{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                    <p className="text-sm font-semibold" style={{ color: '#F5A623' }}>Resultaat: {project.resultaat}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section style={{ background: '#1e52a0' }} className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">Wilt u ook zo&apos;n resultaat?</h2>
            <p className="text-blue-200 mb-8">Vraag een vrijblijvende offerte aan.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/offerte" className="inline-block px-8 py-3.5 rounded-lg text-base font-bold text-white transition-opacity hover:opacity-90" style={{ background: '#F5A623' }}>
                Vraag een offerte aan
              </Link>
              <a href="tel:0782032858" className="inline-block px-8 py-3.5 rounded-lg text-base font-bold text-white border-2 border-white hover:bg-white hover:text-[#1e52a0] transition-colors">
                078 203 28 58
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
