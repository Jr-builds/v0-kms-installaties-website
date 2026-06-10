import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Breadcrumbs from '@/components/breadcrumbs'

interface LegalPageLayoutProps {
  title: string
  lead?: string
  path: string
  lastUpdated?: string
  children: React.ReactNode
}

export default function LegalPageLayout({
  title,
  lead,
  path,
  lastUpdated = 'juni 2026',
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-kms-light py-10 sm:py-14 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: title, href: path },
              ]}
              variant="light"
              className="mb-6"
            />
            <h1 className="heading-page text-kms-navy mb-3">{title}</h1>
            {lead && <p className="text-gray-600 text-lg leading-relaxed">{lead}</p>}
            <p className="mt-4 text-sm text-gray-500">Laatst bijgewerkt: {lastUpdated}</p>
          </div>
        </section>
        <section className="bg-white py-10 sm:py-14">
          <div className="legal-prose max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}
