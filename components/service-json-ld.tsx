import {
  buildFaqPageSchema,
  buildServiceSchema,
  type FaqItem,
} from '@/lib/schema'

interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface ServiceJsonLdProps {
  name: string
  description: string
  path: string
  faqItems: FaqItem[]
}

/** Onzichtbare FAQPage + Service markup voor dienstpagina's. */
export function ServiceJsonLd({ name, description, path, faqItems }: ServiceJsonLdProps) {
  return (
    <>
      <JsonLd data={buildServiceSchema({ name, description, path })} />
      <JsonLd data={buildFaqPageSchema(faqItems)} />
    </>
  )
}
