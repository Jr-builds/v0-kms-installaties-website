import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal-page-layout'
import {
  businessInfo,
  formatBusinessAddress,
  kvkNumber,
  openingHoursLongDisplay,
  phoneDisplay,
  phoneTelHref,
} from '@/lib/business'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.terms

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalPageLayout
      title="Algemene voorwaarden"
      lead="Deze voorwaarden zijn van toepassing op offertes, opdrachten en overeenkomsten tussen KMS Installaties en de opdrachtgever."
      path="/algemene-voorwaarden"
    >
      <h2>Artikel 1 — Definities</h2>
      <p>
        <strong>KMS Installaties</strong>: {businessInfo.name}, gevestigd te {formatBusinessAddress()},
        ingeschreven bij de Kamer van Koophandel onder nummer {kvkNumber}.
      </p>
      <p>
        <strong>Opdrachtgever</strong>: de natuurlijke persoon of rechtspersoon die een opdracht verstrekt.
      </p>
      <p>
        <strong>Werkzaamheden</strong>: elektra-, installatie-, onderhouds- en aanverwante diensten zoals
        omschreven in de offerte of overeenkomst.
      </p>

      <h2>Artikel 2 — Toepasselijkheid</h2>
      <p>
        Deze algemene voorwaarden gelden voor alle offertes en overeenkomsten, tenzij schriftelijk anders
        is overeengekomen. Afwijkende voorwaarden van de opdrachtgever worden alleen aanvaard indien
        KMS Installaties deze uitdrukkelijk schriftelijk heeft bevestigd.
      </p>

      <h2>Artikel 3 — Offertes en totstandkoming</h2>
      <ul>
        <li>Offertes zijn vrijblijvend, tenzij anders vermeld.</li>
        <li>Een overeenkomst komt tot stand na schriftelijke bevestiging door KMS Installaties of na aanvang van de werkzaamheden met instemming van de opdrachtgever.</li>
        <li>Prijzen in offertes zijn gebaseerd op de opgegeven situatie; wijzigingen kunnen de prijs beïnvloeden.</li>
      </ul>

      <h2>Artikel 4 — Uitvoering van werkzaamheden</h2>
      <p>
        KMS Installaties voert werkzaamheden uit volgens geldende normen en certificeringen (waar van
        toepassing NEN 3140, STEK en VCA). Planning en uitvoering geschieden in overleg met de
        opdrachtgever. KMS Installaties is bereikbaar {openingHoursLongDisplay.toLowerCase()}.
      </p>

      <h2>Artikel 5 — Verplichtingen opdrachtgever</h2>
      <ul>
        <li>De opdrachtgever verstrekt tijdig alle informatie die nodig is voor een goede uitvoering.</li>
        <li>De opdrachtgever zorgt voor vrije toegang tot de werkplek en een veilige werkomgeving.</li>
        <li>Eventuele vergunningen of toestemmingen van derden (bijvoorbeeld VvE) zijn voor rekening van de opdrachtgever, tenzij anders overeengekomen.</li>
      </ul>

      <h2>Artikel 6 — Prijzen en betaling</h2>
      <p>
        Alle genoemde prijzen zijn exclusief btw, tenzij anders vermeld. Betaling dient te geschieden
        binnen de op de factuur vermelde termijn. Bij te late betaling kunnen wettelijke rente en
        incassokosten in rekening worden gebracht.
      </p>

      <h2>Artikel 7 — Garantie</h2>
      <p>
        Op uitgevoerde werkzaamheden geldt garantie conform de geldende wettelijke bepalingen en
        fabrieksgaranties van geleverde materialen. Garantie vervalt bij onoordeelkundig gebruik,
        wijzigingen door derden of gebrek aan onderhoud.
      </p>

      <h2>Artikel 8 — Aansprakelijkheid</h2>
      <p>
        KMS Installaties is uitsluitend aansprakelijk voor directe schade door een toerekenbare
        tekortkoming, tot maximaal het factuurbedrag van de betreffende opdracht, tenzij dwingend recht
        anders bepaalt. Wij zijn niet aansprakelijk voor indirecte schade, gevolgschade of
        bedrijfsstagnatie.
      </p>

      <h2>Artikel 9 — Overmacht</h2>
      <p>
        Bij overmacht (waaronder storingen bij toeleveranciers, extreme weersomstandigheden of
        overheidsmaatregelen) worden verplichtingen opgeschort zolang de overmacht voortduurt.
      </p>

      <h2>Artikel 10 — Klachten</h2>
      <p>
        Klachten over uitgevoerde werkzaamheden dient u zo spoedig mogelijk, maar uiterlijk binnen 14
        dagen na ontdekking, schriftelijk te melden via{' '}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> of{' '}
        <a href={phoneTelHref}>{phoneDisplay}</a>.
      </p>

      <h2>Artikel 11 — Toepasselijk recht</h2>
      <p>
        Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de
        bevoegde rechter in het arrondissement waar KMS Installaties is gevestigd, tenzij dwingend recht
        anders voorschrijft.
      </p>
    </LegalPageLayout>
  )
}
