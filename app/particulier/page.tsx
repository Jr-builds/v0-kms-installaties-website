import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import FAQ from '@/components/faq'
import Reviews from '@/components/reviews'
import ClosingCTA from '@/components/closing-cta'
import EditableText from '@/components/cms/editable-text'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import { Button } from '@/components/ui/button'
import { ServiceJsonLd } from '@/components/service-json-ld'
import { pageMetadata } from '@/lib/metadata'
import { pageReviews } from '@/lib/reviews'
import { whatsAppHref } from '@/lib/business'
import type { SiteImageKey } from '@/lib/images'

export const metadata: Metadata = pageMetadata.particulier

const diensten: {
  title: string
  text: string
  href: string
  imageKey: SiteImageKey
}[] = [
  {
    title: 'Elektra en groepenkast',
    text: 'Van een extra stopcontact of kookgroep tot het vervangen van uw groepenkast of het vernieuwen van elektra tijdens een verbouwing.',
    href: '/elektra',
    imageKey: 'project.elektra-ridderkerk-groepenkast',
  },
  {
    title: 'Laadpaal thuis',
    text: 'We kijken naar uw meterkast, parkeerplek en kabelroute. Daarna adviseren we over een passende laadpaal en bespreken we of slim laden of verrekening via uw werkgever belangrijk is.',
    href: '/laadpaal',
    imageKey: 'hero.laadpaal',
  },
  {
    title: 'Airco installeren en onderhouden',
    text: 'We kijken welke ruimtes u wilt koelen of verwarmen en waar de binnen- en buitenunits kunnen komen. Ook voor onderhoud kunt u bij ons terecht.',
    href: '/airconditioning',
    imageKey: 'hero.airconditioning',
  },
  {
    title: 'Ventilatie en WTW',
    text: 'We helpen met het vervangen of aanpassen van uw mechanische ventilatie of WTW-unit.',
    href: '/ventilatie',
    imageKey: 'project.ventilatie-ridderkerk-wtw',
  },
  {
    title: 'Camerabeveiliging',
    text: "We adviseren over de plaatsing van camera's en verzorgen de montage en aansluiting.",
    href: '/cameras-systemen',
    imageKey: 'hero.cameras',
  },
]

const stappen = [
  {
    title: 'Vertel wat u wilt laten doen',
    text: "Stuur uw postcode en een korte omschrijving mee. Foto's van de meterkast, installatieplek of kabelroute helpen ons om uw situatie in te schatten.",
  },
  {
    title: 'Ontvang advies en een offerte',
    text: 'Als we meer moeten weten, nemen we contact op of plannen we een opname. In de offerte ziet u welke materialen en werkzaamheden zijn inbegrepen en wat de totaalprijs inclusief btw is.',
  },
  {
    title: 'We plannen de montage',
    text: 'Na uw akkoord spreken we een datum af. Vooraf hoort u wat we nodig hebben om het werk uit te voeren.',
  },
  {
    title: 'We leveren het werk op',
    text: 'We controleren de werking, geven uitleg en ruimen onze werkplek op.',
  },
]

const projecten: {
  title: string
  text: string
  imageKey: SiteImageKey
}[] = [
  {
    title: 'Groepenkast in Ridderkerk',
    text: 'De oude groepenkast is vervangen en voorzien van aardlekbeveiliging en een groepenverklaring.',
    imageKey: 'project.elektra-ridderkerk-groepenkast',
  },
  {
    title: 'Elektra in een nieuwbouwwoning in Rotterdam',
    text: 'De elektrische installatie aangelegd, inclusief aansluiting voor een laadpaal.',
    imageKey: 'project.elektra-rotterdam-nieuwbouw',
  },
  {
    title: 'Ventilatie in Ridderkerk',
    text: 'De bestaande WTW-unit vervangen en het leidingwerk vernieuwd.',
    imageKey: 'project.ventilatie-ridderkerk-wtw',
  },
]

const faqItems = [
  {
    question: "Kunnen jullie een offerte maken met foto's?",
    answer:
      "Bij veel aanvragen kunnen we met duidelijke foto's en een korte omschrijving beginnen. Als de situatie ter plaatse beoordeeld moet worden, plannen we een opname.",
  },
  {
    question: 'Kunnen jullie een laadpaal installeren als mijn groepenkast ook aangepast moet worden?',
    answer: 'Ja. We beoordelen welke aanpassing nodig is en nemen die op in het voorstel.',
  },
  {
    question: 'Waar werken jullie?',
    answer:
      'Vanuit Zwijndrecht werken we in de Drechtsteden, regio Rotterdam en op andere locaties in Zuid-Holland, Brabant, Zeeland en de regio Utrecht. Stuur ons uw postcode, dan kijken we naar de mogelijkheden.',
  },
]

export default function ParticulierPage() {
  return (
    <>
      <ServiceJsonLd
        name="Elektricien, airco en laadpaal voor uw woning"
        description="Een groepenkast vervangen, thuislaadpaal of airco installeren? KMS Installaties uit Zwijndrecht adviseert en monteert."
        path="/particulier"
        faqItems={faqItems}
      />
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h1 className="heading-hero mb-4 text-white">
                <EditableText
                  textKey="particulier.hero.title"
                  label="Particulier hero titel"
                  defaultValue="Elektricien, airco en laadpaal voor uw woning"
                  as="span"
                />
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-blue-200">
                <EditableText
                  textKey="particulier.hero.text"
                  label="Particulier hero tekst"
                  defaultValue="Wilt u uw groepenkast vervangen, thuis een auto opladen of uw woning koelen en verwarmen met airco? KMS Installaties uit Zwijndrecht helpt u kiezen wat bij uw woning past. We verzorgen de montage, controleren de installatie en leggen uit hoe u die gebruikt."
                  as="span"
                  multiline
                />
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/offerte?voor=particulier" />}
                  nativeButton={false}
                  variant="primary"
                  size="cta-sm"
                  className="text-center"
                >
                  Vraag een vrijblijvende offerte aan
                </Button>
                <Button
                  render={
                    <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="hero-outline"
                  size="cta-sm"
                  className="text-center"
                >
                  Stuur foto's via WhatsApp
                </Button>
              </div>
            </div>
            <SiteImageOrPlaceholder
              imageKey="hero.elektra"
              placeholderLabel="Particulier hero"
              aspectRatio="aspect-[4/3]"
              className="w-full"
              priority
              sizePreset="hero"
            />
          </div>
        </section>

        <TrustBar variant="slim" />

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-10 text-center text-kms-navy">
              Waar kunnen we u thuis mee helpen?
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {diensten.map((card) => (
                <Link
                  key={card.href + card.title}
                  href={card.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-kms-light transition-shadow hover:shadow-md"
                >
                  <SiteImageOrPlaceholder
                    imageKey={card.imageKey}
                    placeholderLabel={card.title}
                    aspectRatio="aspect-video"
                    className="w-full shrink-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1.5 font-bold text-kms-navy transition-colors group-hover:text-kms-yellow-dark">
                      {card.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">{card.text}</p>
                    <span className="mt-3 text-sm font-semibold text-kms-yellow-dark">Meer informatie &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-kms-light py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-10 text-center text-kms-navy">Zo werkt een aanvraag</h2>
            <ol className="space-y-4">
              {stappen.map((stap, index) => (
                <li key={stap.title} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-kms-navy text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-kms-navy">
                      <EditableText
                        textKey={`particulier.stappen.${index}.title`}
                        label={`Particulier stap ${index + 1} titel`}
                        defaultValue={stap.title}
                        as="span"
                      />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      <EditableText
                        textKey={`particulier.stappen.${index}.text`}
                        label={`Particulier stap ${index + 1} tekst`}
                        defaultValue={stap.text}
                        as="span"
                        multiline
                      />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="particuliere-projecten" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-10 text-center text-kms-navy">Projecten bij mensen thuis</h2>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {projecten.map((project) => (
                <article
                  key={project.title}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-kms-light"
                >
                  <SiteImageOrPlaceholder
                    imageKey={project.imageKey}
                    placeholderLabel={project.title}
                    aspectRatio="aspect-video"
                    className="w-full shrink-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-bold text-kms-navy">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{project.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center">
              <Link href="/projecten" className="font-semibold text-kms-yellow-dark hover:underline">
                Bekijk alle projecten
              </Link>
            </p>
          </div>
        </section>

        <Reviews reviews={pageReviews.particulier} title="Ervaringen van klanten" />
        <FAQ items={faqItems} namespace="particulier.faq" />
        <ClosingCTA
          title="Vraag een offerte aan voor uw woning"
          subtitle="Vertel ons wat u wilt laten doen en voeg eventueel foto's toe. Dan laten we weten wat de volgende stap is."
          primaryLabel="Vraag een vrijblijvende offerte aan"
          primaryHref="/offerte?voor=particulier"
        />
      </main>
      <Footer />
    </>
  )
}
