export default function TrustBar() {
  const items = [
    { label: '5.0 Google', sub: '21 reviews' },
    { label: '5.0 Werkspot', sub: '35 reviews' },
    { label: 'NEN 3140', sub: 'gecertificeerd' },
    { label: 'STEK', sub: 'gecertificeerd' },
    { label: 'VCA', sub: 'gecertificeerd' },
    { label: 'Ma-Zo', sub: '08:00-22:00' },
  ]

  return (
    <section className="bg-[#F8F9FA] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-gray-300">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-2">
              {i < 2 && (
                <span className="text-yellow-400 text-base">&#9733;</span>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-500">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
