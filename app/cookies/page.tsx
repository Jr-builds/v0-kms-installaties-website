import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal-page-layout'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata.cookies

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookiebeleid"
      lead="Op deze website gebruiken wij cookies en vergelijkbare technieken. Hieronder leest u welke cookies wij plaatsen en waarvoor."
      path="/cookies"
    >
      <h2>Wat zijn cookies?</h2>
      <p>
        Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website
        bezoekt. Sommige cookies zijn nodig om de site te laten werken; andere helpen ons de site te
        verbeteren.
      </p>

      <h2>Welke cookies gebruiken wij?</h2>

      <h3>Functionele cookies (noodzakelijk)</h3>
      <p>
        Deze cookies zijn nodig voor het correct functioneren van de website. Zonder deze cookies kunnen
        bepaalde onderdelen niet goed werken.
      </p>
      <ul>
        <li>
          <strong>Cookievoorkeur</strong>: onthoudt of u onze cookiemelding heeft geaccepteerd
          (localStorage, geen vervaldatum tot u deze wist).
        </li>
      </ul>

      <h3>Analytische cookies</h3>
      <p>
        Wij gebruiken anonieme statistieken om te begrijpen hoe bezoekers onze website gebruiken, zodat
        wij de inhoud en navigatie kunnen verbeteren. In productie kan Vercel Analytics worden ingezet;
        daarbij worden geen marketingprofielen opgebouwd.
      </p>

      <h2>Marketing- en trackingcookies</h2>
      <p>
        Wij plaatsen geen advertentiecookies en volgen u niet over andere websites heen voor
        remarketing.
      </p>

      <h2>Cookies beheren of verwijderen</h2>
      <p>
        U kunt cookies uitschakelen of verwijderen via de instellingen van uw browser. Houd er rekening
        mee dat sommige onderdelen van de website dan minder goed werken.
      </p>
      <p>
        Instructies per browser vindt u doorgaans onder &ldquo;Privacy&rdquo; of &ldquo;Cookies&rdquo; in
        de helpfunctie van uw browser.
      </p>

      <h2>Meer informatie</h2>
      <p>
        Vragen over cookies of privacy? Neem contact op via{' '}
        <a href="mailto:info@kmsinstallaties.nl">info@kmsinstallaties.nl</a>. Zie ook onze{' '}
        <a href="/privacyverklaring">privacyverklaring</a>.
      </p>
    </LegalPageLayout>
  )
}
