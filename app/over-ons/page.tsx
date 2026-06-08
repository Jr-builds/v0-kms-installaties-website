import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import ClosingCTA from '@/components/closing-cta'

const reviews = [
  { quote: 'Snel gereageerd en netjes geinstalleerd. Airco werkt perfect en de afwerking was keurig. Zeker een aanrader!', name: 'Mohammed A.', platform: 'Google' },
  { quote: 'Vakkundige monteurs, duidelijke communicatie en op tijd. Groepenkast is perfect vervangen.', name: 'Sandra V.', platform: 'Werkspot' },
  { quote: 'Ook op zaterdagavond nog bereikbaar voor een storingsmelding. Binnen 2 uur was het opgelost.', name: 'Peter K.', platform: 'Google' },
  { quote: 'KMS verzorgt het technisch beheer van ons pand al twee jaar. Altijd professioneel en op tijd.', name: 'R. Bakker', platform: 'Google' },
]

const certificeringen = [
  { name: 'NEN 3140', description: 'Wettelijk vereist voor elektrische installaties. Elke installatie wordt gekeurd en geleverd met een groepenverklaring.' },
  { name: 'STEK', description: 'Verplichte certificering voor werken met koelmiddelen. Niet elk installatiebedrijf heeft dit certificaat.' },
  { name: 'VCA', description: 'Veiligheidscertificering voor technische werkzaamheden. Garandeert veilig werken op locatie.' },
]

export default function OverOnsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: '#1e52a0' }} className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5 text-balance">
              Vakmanschap met een persoonlijk verhaal
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto">
              KMS Installaties is opgericht door Kerem Sen en Mevlut Sumer, twee vakmannen met een gedeelde passie voor techniek en kwaliteit. Vanuit Zwijndrecht bedienen wij particulieren en bedrijven door heel Zuid-Holland.
            </p>
          </div>
        </section>

        {/* Team sectie */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-balance" style={{ color: '#1e52a0' }}>
              Onze specialisten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                { imageLabel: 'Foto: Kerem Sen', name: 'Kerem Sen', role: 'Eigenaar & Elektrotechnicus' },
                { imageLabel: 'Foto: Mevlut Sumer', name: 'Mevlut Sumer', role: 'Eigenaar & Installatiespecialist' },
              ].map((person, i) => (
                <div key={i} className="text-center">
                  <ImagePlaceholder label={person.imageLabel} aspectRatio="aspect-square" className="w-full max-w-xs mx-auto rounded-2xl mb-4" />
                  <h3 className="font-bold text-lg" style={{ color: '#1e52a0' }}>{person.name}</h3>
                  <p className="text-gray-500 text-sm">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feiten balk */}
        <section style={{ background: '#1e52a0' }} className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { number: '10+', label: 'Jaar', sub: 'Vakmanschap' },
                { number: '200+', label: 'Afgeronde', sub: 'projecten' },
                { number: '56', label: 'Vijfsterren', sub: 'reviews' },
                { number: 'Zuid', label: '-Holland', sub: 'Werkgebied' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold" style={{ color: '#F5A623' }}>{item.number}</div>
                  <div className="text-white font-medium text-sm mt-1">{item.label}</div>
                  <div className="text-blue-300 text-xs">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificeringen */}
        <section className="bg-[#F8F9FA] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-balance" style={{ color: '#1e52a0' }}>
              Onze certificeringen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificeringen.map((cert, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border-t-4 border border-gray-100 shadow-sm" style={{ borderTopColor: '#F5A623' }}>
                  <div className="text-2xl font-black mb-3" style={{ color: '#1e52a0' }}>{cert.name}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-balance" style={{ color: '#1e52a0' }}>
              Wat klanten zeggen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.map((review, i) => (
                <article key={i} className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100">
                  <div className="flex gap-0.5 mb-3" aria-label="5 sterren">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: '#F5A623' }} className="text-lg">&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-3">&ldquo;{review.quote}&rdquo;</blockquote>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: review.platform === 'Google' ? '#e8f0fe' : '#e6f7ee', color: review.platform === 'Google' ? '#1e52a0' : '#166534' }}>
                      {review.platform}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Werkgebied */}
        <section className="bg-[#F8F9FA] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold mb-3" style={{ color: '#1e52a0' }}>Ons werkgebied</h2>
            <p className="text-gray-600 leading-relaxed">
              Wij werken door heel Zuid-Holland, waaronder Rotterdam, Dordrecht, Zwijndrecht, Ridderkerk, Barendrecht, Papendrecht en omgeving.
            </p>
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
