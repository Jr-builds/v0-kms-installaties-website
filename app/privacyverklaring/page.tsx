import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal-page-layout'
import { businessInfo, formatBusinessAddress, kvkNumber, phoneDisplay, phoneTelHref } from '@/lib/business'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.privacy

export default function PrivacyverklaringPage() {
  return (
    <LegalPageLayout
      title="Privacyverklaring"
      lead="KMS Installaties respecteert uw privacy. In deze verklaring leest u welke gegevens wij verwerken en waarom."
      path="/privacyverklaring"
    >
      <h2>Wie zijn wij?</h2>
      <p>
        {businessInfo.name} is gevestigd op {formatBusinessAddress()}. Wij zijn ingeschreven bij de
        Kamer van Koophandel onder nummer {kvkNumber}. Voor privacyvragen kunt u mailen naar{' '}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> of bellen naar{' '}
        <a href={phoneTelHref}>{phoneDisplay}</a>.
      </p>

      <h2>Welke gegevens verwerken wij?</h2>
      <p>Wij verwerken persoonsgegevens die u zelf aan ons verstrekt, bijvoorbeeld wanneer u:</p>
      <ul>
        <li>ons contactformulier invult (naam, telefoonnummer, vraag of storingsmelding);</li>
        <li>een offerteaanvraag doet (naam, contactgegevens, adres/postcode, projectomschrijving);</li>
        <li>ons belt, appt of mailt in verband met een opdracht of storing.</li>
      </ul>
      <p>
        Daarnaast verwerken wij technische gegevens die nodig zijn om de website veilig en bruikbaar te
        houden, zoals IP-adres, browsertype en apparaatinformatie (zie ook ons{' '}
        <a href="/cookies">cookiebeleid</a>).
      </p>

      <h2>Waarvoor gebruiken wij uw gegevens?</h2>
      <ul>
        <li>Om contact met u op te nemen naar aanleiding van uw vraag, storing of offerteaanvraag;</li>
        <li>Om een offerte op te stellen of werkzaamheden uit te voeren;</li>
        <li>Om afspraken te plannen en onze dienstverlening te verbeteren;</li>
        <li>Om te voldoen aan wettelijke administratie- en bewaarplichten.</li>
      </ul>

      <h2>Rechtsgrond</h2>
      <p>
        Wij verwerken uw gegevens op basis van uitvoering van een overeenkomst, uw toestemming (bij
        formulieren), een gerechtvaardigd belang (websitebeveiliging en verbetering) of een wettelijke
        verplichting.
      </p>

      <h2>Bewaartermijn</h2>
      <p>
        Wij bewaren uw gegevens niet langer dan nodig voor het doel waarvoor ze zijn verzameld, tenzij
        een langere bewaartermijn wettelijk verplicht is (bijvoorbeeld voor administratie of garantie).
      </p>

      <h2>Delen met derden</h2>
      <p>
        Wij verkopen uw gegevens niet. Wij delen gegevens alleen met partijen die ons helpen bij onze
        dienstverlening (bijvoorbeeld hosting of e-mail) of wanneer wij daartoe wettelijk verplicht zijn.
        Met verwerkers sluiten wij verwerkersovereenkomsten waar dat vereist is.
      </p>

      <h2>Beveiliging</h2>
      <p>
        Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies en onbevoegde
        toegang tot persoonsgegevens te voorkomen.
      </p>

      <h2>Uw rechten</h2>
      <p>U heeft het recht om:</p>
      <ul>
        <li>inzage te vragen in uw persoonsgegevens;</li>
        <li>correctie of verwijdering te verzoeken;</li>
        <li>bezwaar te maken tegen of beperking te vragen van verwerking;</li>
        <li>uw gegevens over te dragen, voor zover van toepassing;</li>
        <li>een klacht in te dienen bij de Autoriteit Persoonsgegevens.</li>
      </ul>
      <p>
        Stuur verzoeken naar <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>. Wij
        reageren binnen de termijnen die de AVG voorschrijft.
      </p>

      <h2>Wijzigingen</h2>
      <p>
        Wij kunnen deze privacyverklaring aanpassen. De meest recente versie staat altijd op deze pagina.
      </p>
    </LegalPageLayout>
  )
}
