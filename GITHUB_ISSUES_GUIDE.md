# GitHub Issues Guide — KMS Installaties Website

> **Doel:** Dit document is de standaardinstructie voor AI dev-agents. Voeg het toe aan elke nieuwe chat zodat GitHub Issues en milestones synchroon blijven met het werk in de codebase.
>
> **Repository:** `Jr-builds/v0-kms-installaties-website`  
> **Bron van waarheid voor planning en voortgang:** GitHub Issues en milestones in deze repository.

---

## 1. Kernregels (altijd volgen)

1. **Eén issue = één afgebakend stuk werk** — niet te groot (meerdere dagen), niet te klein (één regel typo).
2. **Geen duplicaten** — zoek altijd eerst naar bestaande issues voordat je een nieuwe aanmaakt.
3. **Issues volgen de code** — als je code wijzigt, update of sluit het bijbehorende issue in dezelfde sessie.
4. **Milestones volgen thema's** — elk issue hoort bij precies één milestone (zie §4).
5. **Geen stille wijzigingen** — sluit issues niet zonder korte samenvatting in een comment wat er is gedaan.
6. **Geen secrets in issues** — nooit API-keys, wachtwoorden of `.env`-waarden in titels of bodies.
7. **Vraag bij grote beslissingen** — als scope onduidelijk is of een milestone moet worden hernoemd/verwijderd, vraag de gebruiker eerst.

---

## 2. Wanneer issues aanmaken, bijwerken of sluiten

| Situatie | Actie |
|----------|--------|
| Nieuwe taak of gebruikersverzoek | Issue **aanmaken** (of bestaand issue hergebruiken) |
| Werk gestart aan een issue | Issue **bijwerken** (checklist of comment: "In behandeling") |
| Werk afgerond en gecommit/merged | Issue **sluiten** met `state_reason: completed` + afsluitcomment |
| Taak niet meer relevant | Issue **sluiten** met `state_reason: not_planned` + korte reden |
| Dubbel issue gevonden | Eén sluiten als `duplicate` met verwijzing naar het origineel |
| Scope groter geworden | Hoofdissue **bijwerken**; sub-taken als aparte issues met verwijzing |
| Alleen onderzoek/vraag, geen code | Geen issue aanmaken tenzij de gebruiker dat vraagt |

**Sluit een issue pas wanneer:**
- De wijziging daadwerkelijk in de codebase staat (commit of PR), **of**
- De gebruiker expliciet zegt dat het klaar is zonder code (bijv. besluit om iets niet te doen).

---

## 3. Issue-structuur

### 3.1 Titel

Formaat: `[gebied] Korte beschrijving in het Nederlands`

Voorbeelden:
- `[images] Placeholders vervangen op elektra-pagina`
- `[seo] Unieke metadata voor contactpagina`
- `[copy] AI-achtige blockquote op airco-pagina herschrijven`
- `[a11y] Contrast hero-badge op contactpagina verbeteren`

Gebieden (prefix): `images`, `seo`, `ux`, `copy`, `legal`, `forms`, `mobile`, `perf`, `refactor`, `content`, `infra`, `a11y`, `bug`.

### 3.2 Body-template

Gebruik dit sjabloon bij **aanmaken** en bij **grote updates**:

```markdown
## Doel
[Wat moet er bereikt worden en waarom?]

## Scope
- [ ] Concreet sub-taak 1
- [ ] Concreet sub-taak 2

## Bestanden (indicatief)
- `pad/naar/bestand.tsx`

## Acceptatiecriteria
- [ ] Criterium 1
- [ ] Criterium 2

## Referenties
- Gerelateerde issues: #123
- PR's of commits: (indien van toepassing)

## Notities
[Blockers, client input nodig, bewuste beperkingen]
```

### 3.3 Labels

Gebruik **uitsluitend** deze labels bij het aanmaken van issues:

| Label | Betekenis |
|-------|-----------|
| `enhancement` | Nieuwe features of verbeteringen |
| `bug` | Fouten of kapotte functionaliteit |
| `documentation` | Wijzigingen aan README, guides of code comments |
| `refactor` | Code opschonen zonder logica te wijzigen |
| `urgent` | Blokkeert kritieke workflows |

Regels:
- Elk issue krijgt **precies één** type-label: `enhancement`, `bug`, `documentation` of `refactor`.
- Voeg `urgent` **optioneel** toe wanneer het werk kritieke workflows blokkeert (mag gecombineerd worden met elk type-label).
- Gebruik **geen andere labels** — maak geen extra labels aan.

---

## 4. Milestones

Milestones groeperen werk per thema. Pas titels en beschrijvingen aan wanneer de gebruiker nieuwe prioriteiten geeft.

### 4.1 Milestone-lijst

| # | Milestone-titel | Beschrijving | Due date (richtlijn) |
|---|-----------------|--------------|----------------------|
| M1 | Visual identity & images | Logo, afbeeldingen, placeholders, merklogos | — |
| M2 | Design & polish | Design tokens, typografie, spacing, visuele consistentie | — |
| M3 | UX & conversion | CTA's, contact/offerte, projecten, navigatie | — |
| M4 | Mobile & accessibility | Mobiele layout, formulieren, toegankelijkheid | — |
| M5 | Content & copy | Teksten, tone of voice, Nederlandse copy | — |
| M6 | SEO & discoverability | Metadata, structured data, Open Graph, rich results | — |
| M7 | Performance & code quality | Compressie, Lighthouse, deduplicatie, refactoring | — |
| M8 | Enhancements | Nice-to-have features (WhatsApp, seasonal, ISDE, etc.) | — |
| M9 | Backlog / Client input | Wacht op assets, besluiten of externe input (bijv. teamfoto's, backend forms) | — |

**Eerste setup (eenmalig):** als milestones nog niet bestaan, maak ze aan via GitHub (Issues → Milestones) of `gh api`. Wijs daarna bestaande issues toe.

### 4.2 Milestone-regels voor agents

1. **Bij aanmaken:** koppel elk issue aan de juiste milestone (`milestone` parameter).
2. **Bij afronden van een issue:** controleer of de milestone bijna leeg is (alle issues closed).
3. **Milestone bijna compleet:** meld dit aan de gebruiker met een korte voortgangsregel:
   > Milestone "Performance & code quality": 14/14 issues gesloten. Klaar om milestone te sluiten?
4. **Sluit een milestone niet zelf** — vraag de gebruiker om bevestiging.
5. **Nieuwe scope zonder duidelijke milestone:** plaats in M9 (Backlog) tot de gebruiker een thema kiest.
6. **Nieuwe milestone nodig:** stel voor aan de gebruiker; maak niet zelfstandig milestones aan buiten bovenstaande lijst zonder overleg.

---

## 5. Workflow per agentsessie

### 5.1 Start van sessie (verplicht)

Voer deze stappen uit **voordat** je code wijzigt:

```
[ ] 1. Begrijp de gebruikersvraag en welk thema/milestone het raakt
[ ] 2. Zoek open issues (zelfde onderwerp/gebied)
[ ] 3. Als issue bestaat → pak dat op; anders → maak nieuw issue aan
[ ] 4. Voeg comment toe of werk checklist bij: "In behandeling"
[ ] 5. Bevestig kort aan gebruiker: issue #N, label(s), milestone, wat je gaat doen
```

**Zoeken op duplicaten (voorbeelden):**

```bash
# gh CLI
gh issue list --repo Jr-builds/v0-kms-installaties-website --state open
gh search issues "repo:Jr-builds/v0-kms-installaties-website elektra placeholder" --limit 10
```

Via GitHub MCP: `search_issues` met query `repo:Jr-builds/v0-kms-installaties-website <trefwoorden>`.

### 5.2 Tijdens het werk

```
[ ] Issue bijwerken als scope verandert (body of checklist aanpassen)
[ ] Bij blocker: noteer in issue-body (Notities) + comment met wat er nodig is; koppel aan M9 indien externe input nodig is
[ ] Bij ontdekking van extra werk: nieuw issue, niet stiekem in huidige scope stoppen
[ ] Commit messages refereren aan issue: "fix: contrast hero badge (#42)"
```

### 5.3 Einde van sessie (verplicht)

```
[ ] Alle afgeronde issues sluiten met afsluitcomment (wat, welke bestanden)
[ ] In-progress issues laten open met actuele checklist-stand
[ ] Korte samenvatting aan gebruiker:
    - Issues aangemaakt: #X, #Y
    - Issues gesloten: #Z
    - Milestone-voortgang: "M7: 12/14 open"
    - Open blockers
```

### 5.4 Afsluitcomment-template

```markdown
Afgerond in deze sessie.

**Gedaan:**
- [bullet 1]
- [bullet 2]

**Bestanden:** `components/foo.tsx`, `app/bar/page.tsx`

**Niet in scope / vervolg:** #<issue-nummer> of geen
```

---

## 6. Aanbevolen issue-splitsing per projecttype

Gebruik deze richtlijnen voor dit Next.js-project:

| Te breed (splitsen) | Juiste grootte (één issue) |
|---------------------|----------------------------|
| "Alle images fixen" | "Logo in navbar en footer" |
| "Alle servicepagina's SEO" | "Metadata uniek maken voor /elektra" |
| "Fix all placeholders" | "Elektra diensten-grid: ontbrekende images" |
| "Mobile improvements" | "Mobile CTA-bar: safe-area padding" |

---

## 7. Technische uitvoering (voor agents)

### 7.1 GitHub MCP (voorkeur in Cursor)

| Actie | Tool |
|-------|------|
| Issues zoeken | `search_issues` |
| Issues lijsten | `list_issues` |
| Issue aanmaken/bijwerken | `issue_write` (method: `create` / `update`) |
| Comment plaatsen | `add_issue_comment` |
| Issue types (indien org dit ondersteunt) | `list_issue_types` vóór aanmaken |

Voorbeeld create:

```
issue_write:
  method: create
  owner: Jr-builds
  repo: v0-kms-installaties-website
  title: "[images] Placeholders vervangen op elektra-pagina"
  body: <template uit §3.2>
  labels: ["enhancement"]
  milestone: <milestone-nummer>
```

### 7.2 gh CLI (alternatief)

```bash
# Issue aanmaken
gh issue create \
  --repo Jr-builds/v0-kms-installaties-website \
  --title "[images] Placeholders vervangen op elektra-pagina" \
  --body-file /tmp/issue-body.md \
  --label "enhancement" \
  --milestone "Visual identity & images"

# Issue sluiten
gh issue close 42 --repo Jr-builds/v0-kms-installaties-website --reason completed \
  && gh issue comment 42 --repo Jr-builds/v0-kms-installaties-website --body "Afgerond: ..."

# Milestone-voortgang
gh api repos/Jr-builds/v0-kms-installaties-website/milestones --jq '.[] | {title, open_issues, closed_issues}'
```

### 7.3 Pull requests

- PR-titel: beschrijvend; vermeld `Closes #N` of `Fixes #N` in de PR-body als het werk het issue volledig afhandelt.
- Sluit issues niet handmatig én via PR als dat dubbel sluit — kies één methode.

---

## 8. Wat agents níet moeten doen

- Geen issues aanmaken voor puur conversationele vragen of uitleg zonder codewijziging.
- Geen milestones verwijderen of hernoemen zonder gebruikersbevestiging.
- Geen grote batches issues aanmaken zonder de gebruiker te informeren (max. 5 per sessie tenzij gevraagd).
- Geen work loggen alleen in chat — GitHub is het auditspoor.
- Geen labels gebruiken buiten `enhancement`, `bug`, `documentation`, `refactor` en `urgent`.

---

## 9. Lege backlog

Als er nog geen issues zijn:

1. Vraag de gebruiker wat de huidige prioriteiten zijn.
2. Maak issues aan op basis van het **concrete verzoek in de chat**, niet op basis van aannames over openstaand werk.
3. Maximaal 5 issues per sessie tenzij de gebruiker expliciet om meer vraagt.
4. Koppel blockers direct aan milestone M9 (Backlog / Client input) en noteer de blocker in de issue-body.

---

## 10. Checklist voor de gebruiker (optioneel)

Plak onderstaande regel in elke nieuwe agent-chat samen met dit bestand:

```
Volg GITHUB_ISSUES_GUIDE.md: zoek eerst bestaande issues, werk milestones bij,
en sluit issues af aan het einde van de sessie. Repository: Jr-builds/v0-kms-installaties-website
```

---

*Laatste update: juni 2026*
