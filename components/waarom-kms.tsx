interface WaaromItem {
  title: string
  description: string
}

interface WaaromKMSProps {
  items: WaaromItem[]
}

export default function WaaromKMS({ items }: WaaromKMSProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-section text-center mb-10 text-kms-navy">
          Waarom KMS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border-l-4 border-l-kms-yellow bg-kms-light border border-gray-100"
            >
              <h3 className="font-bold text-base mb-2 text-kms-navy">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
