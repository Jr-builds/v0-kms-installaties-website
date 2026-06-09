interface MerkLogosProps {
  brands: string[]
  title?: string
}

export default function MerkLogos({ brands, title = 'Waarmee wij werken' }: MerkLogosProps) {
  return (
    <section className="bg-kms-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">{title}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <div
              key={brand}
              className="px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
