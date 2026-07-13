import { werkwijzeSteps } from '@/lib/werkwijze'

export default function Werkwijze() {
  return (
    <section id="werkwijze" className="bg-kms-light py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-kms-yellow-dark mb-2">
            Zo werken wij
          </p>
          <h2 className="heading-section text-kms-navy mb-3">
            Van eerste contact tot oplevering
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Duidelijke afspraken, vakkundig uitgevoerd.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
          {werkwijzeSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.title}>
                <article className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="relative mb-5 inline-flex">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-kms-yellow/15 text-kms-navy">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span
                      className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-kms-navy text-xs font-bold text-white ring-2 ring-white"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-kms-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
