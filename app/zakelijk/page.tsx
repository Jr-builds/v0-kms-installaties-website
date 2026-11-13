import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBar from '@/components/trust-bar'
import FAQ from '@/components/faq'
import ClosingCTA from '@/components/closing-cta'
import EditableText from '@/components/cms/editable-text'
import SiteImageOrPlaceholder from '@/components/site-image-or-placeholder'
import { Button } from '@/components/ui/button'
import { ServiceJsonLd } from '@/components/service-json-ld'
import { pageMetadata } from '@/lib/metadata'
import type { SiteImageKey } from '@/lib/images'

export const metadata: Metadata = pageMetadata.zakelijk

const inschakelen = [
  {
    title: 'Bedrijven',
    text: 'Nieuwe verlichting, extra aansluitpunten, klimaatbeheersing of laadpunten voor medewerkers en bezoekers? Wij stemmen het werk af op het gebruik van uw pand en bespreken vooraf wanneer ruimtes of installaties beschikbaar moeten zijn.',
  },
  {
    title: 'Aannemers',
    text: 'Schakel ons in voor elektrotechnisch werk bij nieuwbouw, verbouwing en renovatie. Denk aan leidingwerk, bekabeling, verdeelinrichtingen, verlichting en aansluitpunten. We stemmen de uitvoering en planning af met uw uitvoerder en de andere partijen op de bouw.',
  },
  {
    title: "Vastgoedbeheerders en VvE's",
    text: 'Wij helpen met technische aanpassingen, gepland onderhoud en laadvoorzieningen. Vooraf bespreken we de toegang tot het gebouw, eventuele hinder voor gebruikers en wie binnen de organisatie het aanspreekpunt is.',
  },
]

const diensten: {
  title: string
  text: string
  href: string
  imageKey: SiteImageKey
}[] = [
  {
    title: 'Elektrotechniek',
    text: 'Nieuwe aanleg, renovatie, uitbreiding van verdeelinrichtingen, verlichting en aansluitpunten.',
    href: '/elektra',
    imageKey: 'hero.elektra',
  },
  {
    title: 'Airconditioning',
    text: 'Installatie, vervanging en onderhoud voor onder meer kantoren en bedrijfsruimtes.',
    href: '/airconditioning',
    imageKey: 'home.tegel.zakelijk',
  },
  {
    title: 'Ventilatie',
    text: 'Installatie, vervanging en onderhoud van ventilatie voor kantoren en bedrijfsruimtes.',
    href: '/ventilatie',
    imageKey: 'hero.ventilatie',
  },
  {
    title: 'Zakelijke laadpunten',
    text: 'Laadvoorzieningen voor medewerkers, bezoekers of bedrijfswagens. We bespreken het beschikbare vermogen, load balancing en gewenste uitbreidingsmogelijkheden.',
    href: '/laadpaal',
    imageKey: 'laadpaal.onderhoud',
  },
  {
    title: 'Technisch onderhoud',
    text: 'Periodiek onderhoud en technische werkzaamheden aan uw pand. We spreken vooraf af welke installaties en werkzaamheden onder de opdracht vallen.',
    href: '/technisch-vastgoedbeheer',
    imageKey: 'hero.vastgoedbeheer',
  },
  {
    title: 'Camerabeveiliging',
    text: 'Advies en installatie afgestemd op de indeling en het gebruik van uw pand.',
    href: '/cameras-systemen',
    imageKey: 'hero.cameras',
  },
]

const samenwerken = [
  {
    title: 'Rechtstreeks contact',
    text: 'U heeft contact met de mensen die het werk voorbereiden en uitvoeren. We spreken af wie uw aanspreekpunt is tijdens het project.',
  },
  {
    title: 'Vooraf duidelijkheid over het werk',
    text: 'U ontvangt een omschrijving van de werkzaamheden. We leggen vast wie welke onderdelen verzorgt en bespreken wijzigingen en meerwerk voordat we die uitvoeren.',
  },
  {
    title: 'Afstemming met uw planning',
    text: 'We bespreken vooraf de bouwfasen, de toegang tot werkruimtes en eventuele momenten waarop een installatie buiten bedrijf moet.',
  },
  {
    title: 'Oplevering volgens afspraak',
    text: 'We controleren de uitgevoerde werkzaamheden en spreken vooraf af welke documenten u bij oplevering nodig heeft, zoals een groepenverklaring, schema of meetrapport.',
  },
]

const projecten: {
  title: string
  text: string
  imageKey: SiteImageKey
  imageLabel: string
}[] = [
  {
    title: 'Laadpunten bij een bedrijfspand in Dordrecht',
    text: 'Drie laadpalen geplaatst met dynamische load balancing. Medewerkers kunnen hun auto tijdens werktijd opladen.',
    imageKey: 'laadpaal.onderhoud',
    imageLabel: 'Laadpaal bij een pand',
  },
  {
    title: 'Zakelijke Alfen-laadpaal in Papendrecht',
    text: 'Alfen-laadpaal geïnstalleerd met Siemens load balancing, afgestemd op het beschikbare vermogen van de bestaande installatie.',
    imageKey: 'page.zakelijk.papendrecht',
    imageLabel: 'Foto van de Alfen-laadpaal in Papendrecht',
  },
  {
    title: 'Airco-onderhoud voor een kantoor in Rotterdam',
    text: 'Periodiek onderhoud uitgevoerd aan meer dan 30 airco-installaties, met reiniging, filterwerk en functietests.',
    imageKey: 'home.tegel.zakelijk',
    imageLabel: 'Klimaatinstallatie op een bedrijfspand',
  },
]

const faqItems = [
  {
    question: 'Kunnen jullie werken op basis van tekeningen of een werkomschrijving?',
    answer:
      'Ja. Stuur de beschikbare stukken mee. Dan bespreken we welke werkzaamheden binnen de opdracht vallen en welke informatie we nog nodig hebben.',
  },
  {
    question: 'Kunnen jullie ook een deel van de elektrotechnische werkzaamheden uitvoeren?',
    answer:
      'Ja. Geef aan welk deel u wilt uitbesteden en wie de overige werkzaamheden uitvoert. We stemmen de aansluitpunten en planning samen af.',
  },
  {
    question: 'Kunnen jullie werken in een pand dat in gebruik blijft?',
    answer:
      'We bespreken vooraf welke ruimten beschikbaar zijn en welke werkzaamheden eventueel in fases kunnen worden uitgevoerd.',
  },
]

export default function ZakelijkPage() {
  return (
    <>
      <ServiceJsonLd
        name="Installatiepartner voor bedrijven, aannemers en vastgoed"
        description="KMS Installaties uit Zwijndrecht voor zakelijke elektra, airco, ventilatie en laadpunten. Ook inzetbaar als elektrotechnisch onderaannemer."
        path="/zakelijk"
        faqItems={faqItems}
      />
      <Navbar />
      <main id="main-content">
        <section className="hero-navy py-16 sm:py-24">
          <div className="hero-navy-content mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h1 className="heading-hero mb-4 text-white">
                <EditableText
                  textKey="zakelijk.hero.title"
                  label="Zakelijk hero titel"
                  defaultValue="Installatiepartner voor bedrijven, aannemers en vastgoed"
                  as="span"
                />
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-blue-200">
                <EditableText
                  textKey="zakelijk.hero.text"
                  label="Zakelijk hero tekst"
                  defaultValue="Vanuit Zwijndrecht verzorgt KMS Installaties elektrotechniek, airconditioning, ventilatie en laadoplossingen voor bedrijfspanden. U kunt ons inschakelen voor een complete installatie, onderhoud of als elektrotechnisch onderaannemer bij bouw en renovatie."
                  as="span"
                  multiline
                />
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/offerte?voor=zakelijk" />}
                  nativeButton={false}
                  variant="primary"
                  size="cta-sm"
                  className="text-center"
                >
                  Bespreek uw project
                </Button>
                <Button
                  render={<Link href="#zakelijke-projecten" />}
                  nativeButton={false}
                  variant="hero-outline"
                  size="cta-sm"
                  className="text-center"
                >
                  Bekijk zakelijke projecten
                </Button>
              </div>
            </div>
            <SiteImageOrPlaceholder
              imageKey="home.tegel.zakelijk"
              placeholderLabel="Zakelijk hero"
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
              <EditableText
                textKey="zakelijk.inschakelen.title"
                label="Zakelijk inschakelen titel"
                defaultValue="Waarvoor kunt u ons inschakelen?"
                as="span"
              />
            </h2>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {inschakelen.map((item, index) => (
                <article key={item.title} className="rounded-xl border border-gray-100 bg-kms-light p-6">
                  <h3 className="mb-2 text-lg font-bold text-kms-navy">
                    <EditableText
                      textKey={`zakelijk.inschakelen.${index}.title`}
                      label={`Zakelijk inschakelen ${item.title}`}
                      defaultValue={item.title}
                      as="span"
                    />
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    <EditableText
                      textKey={`zakelijk.inschakelen.${index}.text`}
                      label={`Zakelijk inschakelen ${item.title} tekst`}
                      defaultValue={item.text}
                      as="span"
                      multiline
                    />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-kms-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-10 text-center text-kms-navy">Onze zakelijke diensten</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {diensten.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-md"
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

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-3 text-kms-navy">Samenwerken met KMS</h2>
            <p className="mb-8 max-w-2xl text-gray-600">
              <Link href="/over-ons" className="font-semibold text-kms-yellow-dark hover:underline">
                Meer over KMS Installaties
              </Link>
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {samenwerken.map((item, index) => (
                <article key={item.title} className="rounded-xl border border-gray-100 bg-kms-light p-6">
                  <h3 className="mb-2 font-bold text-kms-navy">
                    <EditableText
                      textKey={`zakelijk.samenwerken.${index}.title`}
                      label={`Zakelijk samenwerken ${item.title}`}
                      defaultValue={item.title}
                      as="span"
                    />
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    <EditableText
                      textKey={`zakelijk.samenwerken.${index}.text`}
                      label={`Zakelijk samenwerken ${item.title} tekst`}
                      defaultValue={item.text}
                      as="span"
                      multiline
                    />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="zakelijke-projecten" className="scroll-mt-24 bg-kms-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section mb-10 text-center text-kms-navy">Zakelijke projecten</h2>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {projecten.map((project) => (
                <article
                  key={project.title}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white"
                >
                  <SiteImageOrPlaceholder
                    imageKey={project.imageKey}
                    placeholderLabel={project.imageLabel}
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

        <FAQ items={faqItems} namespace="zakelijk.faq" />
        <ClosingCTA
          title="Bespreek uw project met KMS Installaties"
          subtitle="Heeft u een renovatie, nieuwbouwproject of onderhoudsvraag? Stuur ons de locatie, de werkzaamheden en uw gewenste planning. Heeft u al tekeningen, foto's of een werkomschrijving? Voeg die gerust toe."
          primaryLabel="Bespreek uw project"
          primaryHref="/offerte?voor=zakelijk"
        />
      </main>
      <Footer />
    </>
  )
}
