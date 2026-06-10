# KMS Installaties — Front-End Implementation Plan

> **Scope:** Front-end only. No backend, form submission APIs, or database work in this plan.  
> **Status key:** Use checkboxes below — `- [ ]` todo, `- [x]` done.  
> **Last updated:** June 2026

---

## Overview

This document tracks all front-end improvements identified during the site review. Work is grouped into phases by impact. Complete Phase 1 before moving to polish phases unless a quick win is isolated.

### Available assets (`public/`)

| File | Suggested use |
|------|----------------|
| `KMS-Logo.png` | Navbar, footer, favicon/OG fallback |
| `electrician-professional-work.jpg` | Home hero, elektra service hero |
| `elektra-groepenkast.jpg` | Elektra cards, projecten (meterkast) |
| `airco-binnenunit.jpg` | Airconditioning hero/cards |
| `airco-buitenunit.jpg` | Airco project cards, buitenunit context |
| `ventilatie-wtw.jpg` | Ventilatie hero/cards |
| `vastgoed-pand.jpg` | Technisch vastgoedbeheer hero/cards |
| `cameras-buiten.jpg` | Camera's hero/cards |
| `apple-icon.png`, `icon.svg`, `icon-*.png` | App icons (already present) |

> **Note:** Some page content references photos not yet in `public/` (team portraits, laadpaal, LED verlichting, etc.). Reuse closest match or keep `ImagePlaceholder` only where no asset exists. Compress `vastgoed-pand.jpg` (~1.5 MB) before wiring in.

---

## Phase 1 — High impact (do first)

### 1.1 Replace placeholders with real images

- [ ] Create a reusable `SiteImage` component (wraps `next/image`, accepts `src`, `alt`, `aspectRatio`, `className`, `priority`)
- [ ] Add a central image map in `lib/images.ts` (path + alt text per usage)
- [ ] Compress oversized assets (`vastgoed-pand.jpg` priority)
- [ ] **Home (`app/page.tsx`)**
  - [ ] Hero → `electrician-professional-work.jpg`
  - [ ] Diensten: Elektra → `elektra-groepenkast.jpg`
  - [ ] Diensten: Airconditioning → `airco-binnenunit.jpg`
  - [ ] Diensten: Ventilatie → `ventilatie-wtw.jpg`
  - [ ] Diensten: Vastgoedbeheer → `vastgoed-pand.jpg`
  - [ ] Diensten: Camera's → `cameras-buiten.jpg`
  - [ ] Recente projecten → map to closest matching assets
- [ ] **Service pages** (`app/elektra`, `airconditioning`, `ventilatie`, `technisch-vastgoedbeheer`, `cameras-systemen`)
  - [ ] `ServiceHero` image per service
  - [ ] `DienstenGrid` cards — real image where asset exists, placeholder otherwise
- [ ] **Projecten (`app/projecten/page.tsx`)** — assign images per category
- [ ] **Over ons (`app/over-ons/page.tsx`)** — team photos if/when added; else keep placeholder with note
- [ ] Remove or deprecate `ImagePlaceholder` only after all call sites are migrated or explicitly marked fallback
- [ ] Verify all images have descriptive Dutch `alt` text

### 1.2 Logo in navbar and footer

- [ ] Replace "K" block in `components/navbar.tsx` with `KMS-Logo.png` via `next/image`
- [ ] Replace "K" block in `components/footer.tsx` with same logo
- [ ] Set appropriate `width`/`height` and `priority` on navbar logo
- [ ] Confirm logo reads well on white header and dark footer (add light background wrapper if needed)

### 1.3 Mobile call-to-action

- [ ] Create `components/mobile-cta-bar.tsx` — sticky bottom bar on `sm` and below
  - [ ] Primary: **Bel nu** → `tel:0782032858`
  - [ ] Secondary: **Offerte** → `/offerte`
- [ ] Hide bar on `lg+` breakpoints
- [ ] Add safe-area padding for notched phones (`pb-safe` or equivalent)
- [ ] Ensure bar does not overlap footer content (add bottom padding to `main` on mobile)
- [ ] Optional: floating green phone FAB as alternative — pick one pattern, not both

### 1.4 Clickable trust signals

- [x] **TrustBar (`components/trust-bar.tsx`)**
  - [x] Link Google rating to Google Business review URL (get URL from client)
  - [x] Link Werkspot rating to Werkspot profile URL (get URL from client)
  - [x] Add `target="_blank"` + `rel="noopener noreferrer"` on external links
- [x] **Certification badges** — add hover tooltip or small info link explaining NEN 3140, STEK, VCA (modal or expandable on click)
- [x] Home certificeringen section — same treatment

### 1.5 Per-page SEO metadata

- [x] Add `metadata` export to each page:
  - [x] `app/page.tsx` (home — may override layout defaults)
  - [x] `app/elektra/page.tsx`
  - [x] `app/airconditioning/page.tsx`
  - [x] `app/ventilatie/page.tsx`
  - [x] `app/technisch-vastgoedbeheer/page.tsx`
  - [x] `app/cameras-systemen/page.tsx`
  - [x] `app/projecten/page.tsx`
  - [x] `app/over-ons/page.tsx`
  - [x] `app/contact/page.tsx`
  - [x] `app/offerte/page.tsx`
- [x] Each page: unique `title`, `description`, `openGraph.title`, `openGraph.description`
- [x] Add `openGraph.images` per service page (use relevant hero image)
- [x] Add `twitter.card` metadata
- [x] Confirm `lang="nl"` on `<html>` (already set in layout)

### 1.6 LocalBusiness structured data

- [x] Add JSON-LD script in `app/layout.tsx` or a dedicated `components/structured-data.tsx`
  - [x] `@type`: `LocalBusiness` or `Electrician`
  - [x] `name`, `url`, `telephone`, `email`, `address`, `openingHours`
  - [x] `areaServed`: Zuid-Holland cities list
  - [x] `aggregateRating` if linking to Google reviews (optional)
- [ ] Validate with Google Rich Results Test (manual — run after deploy)

---

## Phase 2 — Visual design & brand polish

### 2.1 Design token consistency

- [x] Audit all inline `style={{ background: '#1e52a0' }}` and hex literals across components
- [x] Replace with Tailwind utilities: `bg-kms-navy`, `text-kms-yellow`, `bg-kms-light`, `text-kms-green`, etc. (tokens already in `globals.css`)
- [x] Replace `#F5A623` → `text-kms-yellow` / `bg-kms-yellow`
- [x] Replace `#0a2040` → `bg-kms-navy-dark`
- [x] Document token usage in a short comment block at top of `globals.css`

### 2.2 Typography hierarchy

- [x] Decide: keep Inter only with stronger weight scale, or add a display/heading font
- [x] Apply `font-heading` (or new font) to `h1`/`h2` via `@layer base` or component classes
- [x] Tune heading sizes: home hero `h1` vs service page `h1` vs section `h2`
- [x] Ensure consistent `text-balance` on all major headings

### 2.3 Hero visual depth

- [x] Add subtle gradient overlay on navy hero sections (`bg-gradient-to-br from-kms-navy to-kms-navy-dark`)
- [x] Add soft overlay on hero photos (`bg-kms-navy/20` gradient) for text contrast if needed
- [x] Optional: faint geometric/grid pattern on navy backgrounds (CSS only)

### 2.4 Brand logos (MerkLogos) — complete

- [x] Source official logo SVGs/PNGs for key brands (ABB, Hager, Daikin, Mitsubishi, etc.)
- [x] Add logos to `public/brands/` folder (12 brands, all mapped in `lib/brands.ts`)
- [x] Update `components/merklogos.tsx` to render images instead of text pills
- [x] Grayscale + color on hover, or consistent monochrome treatment
- [x] Horizontal scroll on mobile if row overflows

### 2.5 Stats count-up animation

- [x] Add scroll-triggered count-up on home stats and over-ons stats bar
- [x] Respect `prefers-reduced-motion: reduce` — show final numbers immediately
- [x] Keep animation subtle (duration ~1.5s, ease-out)

---

## Phase 3 — UX & conversion

### 3.1 Clarify Contact vs Offerte

- [x] Sharpen hero copy on `app/contact/page.tsx` — storingsmelding, vragen, spoed
- [x] Sharpen hero copy on `app/offerte/page.tsx` — nieuw project, prijsindicatie
- [x] Add cross-link on contact page: "Wilt u een offerte? → Offerte aanvragen"
- [x] Add cross-link on offerte page: "Spoed of storing? → Contact"
- [x] Differentiate form field labels/placeholders between the two forms

### 3.2 Project cards interactivity

- [x] Decide pattern: modal detail view (chosen over static `/projecten/[slug]` pages for prototype scope)
- [x] Add click/hover affordance on project cards (cursor, shadow, "Bekijk project" link)
- [x] If modal: create `components/project-modal.tsx` with extended description + larger image
- [x] Add smooth fade when filtering on `app/projecten/page.tsx`
- [x] Add empty state when filter returns no results

### 3.3 Breadcrumbs on service pages

- [x] Create `components/breadcrumbs.tsx`
- [x] Add to all 5 service pages: Home → Diensten → [Service name]
- [x] Style consistently below navbar or inside hero
- [x] Use semantic `<nav aria-label="Breadcrumb">` + structured data `BreadcrumbList` (optional)

### 3.4 Werkgebied visual (Over ons)

- [x] Replace plain text werkgebied with styled city chips or list with map-pin icons
- [x] Optional: static map image or simplified Zuid-Holland region graphic
- [x] Link cities to offerte with pre-filled context (future: query param)

### 3.5 Contact map embed

- [x] Replace map placeholder in `app/contact/page.tsx` with Google Maps iframe embed
- [x] Or: static map screenshot with pin + "Open in Google Maps" link (already partially there)
- [x] Set iframe `title` for accessibility
- [x] Lazy-load iframe (`loading="lazy"`)

### 3.6 Offerte form UX (UI only)

- [x] Read `?dienst=` query param on `/offerte` and pre-select dropdown
- [x] Add postcode field with front-end-only validation (format check)
- [x] Add file upload UI for situatiefoto's (disabled state + "Binnenkort beschikbaar" or visual-only mock)
- [x] Link service page CTA buttons to `/offerte?dienst=elektra` (etc.)

### 3.7 Homepage diensten layout

- [x] Refactor 3+2 grid to uniform layout (e.g. 5 cards: 3+2 → single responsive grid, or featured row)
- [x] Ensure equal card heights and consistent image aspect ratios

### 3.8 Projecten filter — Vastgoed category

- [x] Add "Vastgoed" filter tab or rename to match service naming
- [x] Add at least 1–2 vastgoed project entries (or note as coming soon)

---

## Phase 4 — Mobile & accessibility

### 4.1 Navbar refinements

- [x] Show phone number prominently at top of mobile menu (before nav links)
- [x] Fix desktop dropdown gap: add invisible bridge padding so menu doesn't close on mouse travel
- [x] Add `aria-haspopup`, `aria-expanded` on Diensten dropdown button
- [x] Trap focus in mobile menu when open (optional enhancement)
- [x] Close mobile menu on route change (`useEffect` on `pathname`)

### 4.2 Form focus & error states

- [x] Standardize `focus:ring-2 focus:ring-kms-navy focus:border-transparent` on all inputs
- [x] Add visible `:focus-visible` styles on all interactive elements
- [x] Add client-side validation messages (required fields, phone format) — UI only, no API
- [x] Associate errors with inputs via `aria-describedby`

### 4.3 FAQ accordion

- [x] Add `id` on answer panels and `aria-controls` on toggle buttons (`components/faq.tsx`)
- [x] Consider `aria-labelledby` on panel region
- [x] Optional: allow multiple items open simultaneously

### 4.4 Motion preferences

- [x] Wrap all animations in `@media (prefers-reduced-motion: no-preference)` or JS check
- [x] Disable count-up, filter transitions, and scroll reveals when reduced motion preferred

### 4.5 General accessibility pass

- [x] Run Lighthouse accessibility audit on home + one service page + contact (100 / 100 / 100 after contrast fixes)
- [x] Verify color contrast on yellow CTA buttons — switched to `text-kms-navy-dark` on `#F5A623` (8:1); added `kms-yellow-dark` / `kms-yellow-light` tokens for accent text
- [x] Ensure all icon-only buttons have `aria-label` (certification info buttons, modal close, mobile menu)
- [x] Skip-to-main-content link in `app/layout.tsx` + `id="main-content"` on all pages

---

## Phase 5 — Content & copy polish

### 5.1 Dutch diacritics pass

- [x] Find/replace `geinstalleerd` → `geïnstalleerd` across all files
- [x] Audit other common misses: `coordineren` → `coördineren`, `Coordinatie` → `Coördinatie`
- [x] Review FAQ and service descriptions for consistent tone (unchanged — already consistent formal Dutch)

### 5.2 Reduce repetition across pages

- [x] **Home:** keep full TrustBar + certs + reviews + stats
- [x] **Service pages:** slim TrustBar (`variant="slim"` — reviews + certs only)
- [x] **Over ons / Projecten:** lighter trust treatment (compact cert badges in hero; shared `Reviews` / `ClosingCTA`)
- [x] Rotate review quotes via `lib/reviews.ts` — no overlap between home, elektra, and over-ons
- [x] Deduplicate `ClosingCTA` on projecten page

### 5.3 TrustBar mobile layout

- [x] Improve wrapping on small screens — 2-column grid on mobile, flex + divide-x from `sm` up
- [x] Cert badges grouped in a full-width row on mobile; availability on its own row (full variant only)

### 5.4 Em-dash copy polish

- [x] Replaced em-dashes (`—`) in user-facing page copy and components with natural Dutch punctuation (commas, periods, or sentence rewrites)
- [x] Preserved hyphens in times (`08:00-22:00`) and compound words (e.g. `elektra-`, `NEN-conforme`)
- [x] Updated files: `lib/metadata.ts`, `lib/seasonal.ts`, `app/contact/page.tsx`, `app/offerte/page.tsx`, `app/elektra/page.tsx`, `components/navbar.tsx`, `components/werkgebied.tsx`

---

## Phase 6 — Performance & code quality

### 6.1 Image optimization

- [x] Run all JPGs through compression — `npm run compress-images` (sharp script; skips files that would grow)
- [x] Use `next/image` `sizes` prop correctly per layout breakpoint (`hero`, `card`, `square`, `modal` presets in `SiteImage`)
- [x] Set `priority` only on above-the-fold hero images (home + service heroes; removed from project modal)
- [x] WebP/AVIF output via Next.js image optimizer (default — no config needed)

### 6.2 Component deduplication

- [x] Extract shared `ContactSidebar` from contact + offerte pages
- [x] Extract shared contact info list into `components/contact-info.tsx`
- [x] Replace inline ClosingCTA duplicate on projecten page (done in Phase 5.2)
- [x] Consolidate review card markup — all pages use `components/reviews.tsx`

### 6.3 Adopt shadcn Button component

- [x] Define variants in `components/ui/button.tsx`: `primary`, `secondary`, `hero-outline`, `spoed`, `ghost`
- [x] Replace raw `<Link className="...">` CTA patterns with `<Button render={<Link … />}>` on heroes, closing CTA, navbar, mobile bar, forms
- [x] Unified hover/focus/disabled states via Button variants

### 6.4 Remove dead code

- [x] Remove unused `placeholder-*` assets from `public/`
- [x] Keep `ImagePlaceholder` as explicit fallback (team photos, diensten cards without assets)
- [x] Centralized phone/hours/WhatsApp/ISDE URLs in `lib/business.ts`
- [x] Audit unused imports and hardcoded `tel:` links (footer, navbar use shared helpers)

---

## Phase 7 — Nice-to-have enhancements

### 7.1 Live availability indicator

- [x] Client-side check: if current time is Ma–Zo 08:00–22:00, show green "Nu bereikbaar" pill in navbar + home hero (`components/availability-pill.tsx`, `lib/availability.ts`)
- [x] Outside hours: "Vandaag vanaf 08:00 bereikbaar" or "Morgen vanaf 08:00 bereikbaar"

### 7.2 WhatsApp button

- [x] WhatsApp link via `whatsAppHref` (`wa.me/31782032858`) in `lib/business.ts`
- [x] Mobile CTA bar (3-column: Bel / WhatsApp / Offerte) + contact/offerte sidebars

### 7.3 Before/after slider

- [x] `components/before-after.tsx` with drag slider on elektra page (groepenkast renovatie)
- [x] Demo uses single asset with grayscale "voor" treatment until client provides paired photos

### 7.4 ISDE / subsidie callout

- [x] `components/isde-callout.tsx` on ventilatie + airconditioning pages
- [x] Links to RVO ISDE info (`https://www.rvo.nl/subsidies-financiering/isde`)

### 7.5 Seasonal hero messaging

- [x] `components/seasonal-hero-subtitle.tsx` — summer (Jun–Aug) airco, winter (Dec–Feb) storingen, default otherwise
- [x] Client-only swap after mount to avoid hydration mismatch

### 7.6 Open Graph & social sharing

- [x] `public/og-image.jpg` (1200×630) via `npm run generate-og-image`
- [x] Default `openGraph.images` + Twitter card in `lib/metadata.ts` (`defaultMetadata`)
- [x] Per-service OG images via `createPageMetadata` + `imageKey` (existing)

---

## File reference — what to touch

| Area | Primary files |
|------|----------------|
| Images | `components/image-placeholder.tsx` → `components/site-image.tsx`, `lib/images.ts` |
| Logo | `components/navbar.tsx`, `components/footer.tsx` |
| Mobile CTA | New `components/mobile-cta-bar.tsx`, `app/layout.tsx` or per-page `main` padding |
| Trust | `components/trust-bar.tsx` |
| SEO | Each `app/**/page.tsx`, `app/layout.tsx` |
| Structured data | `components/structured-data.tsx` |
| Design tokens | `app/globals.css`, all components with inline hex |
| Forms | `app/contact/page.tsx`, `app/offerte/page.tsx` |
| Projects | `app/projecten/page.tsx`, `app/page.tsx` |
| Service template | `components/service-hero.tsx`, `components/diensten-grid.tsx`, all service `page.tsx` |
| Shared UI | `components/ui/button.tsx`, new breadcrumbs/contact components |

---

## Suggested work order (sprints)

### Sprint 1 — Visual credibility
1.1 Images + 1.2 Logo + 6.1 Image compression

### Sprint 2 — Conversion
1.3 Mobile CTA + 1.4 Trust links + 3.1 Contact vs Offerte + 3.6 Offerte query params

### Sprint 3 — Discoverability
1.5 Page metadata + 1.6 Structured data + 7.6 OG image

### Sprint 4 — Polish
2.1 Design tokens + 2.2 Typography + 4.1 Navbar + 4.2 Forms + 5.1 Diacritics

### Sprint 5 — Engagement
3.2 Projects interactivity + 3.3 Breadcrumbs + 3.5 Map embed + 3.7 Homepage grid

### Sprint 6 — Cleanup
5.2 Repetition reduction + 6.2 Deduplication + 6.3 Button component + 6.4 Dead code

### Sprint 7 — Optional extras
Phase 7 complete (availability pill, WhatsApp, before/after demo, ISDE callouts, seasonal hero, OG image)

---

## Progress summary

| Phase | Total tasks | Done | % |
|-------|-------------|------|---|
| 1 — High impact | — | — | — |
| 2 — Visual polish | — | — | — |
| 3 — UX & conversion | — | — | — |
| 4 — Mobile & a11y | — | — | — |
| 5 — Content polish | — | — | — |
| 6 — Performance & code | 14 | 14 | 100% |
| 7 — Nice-to-have | 12 | 12 | 100% |

> Update this table manually as phases complete.

---

## Blockers / client input needed

- [x] Google Business Profile review URL
- [x] Werkspot profile URL
- [x] WhatsApp link via main business number (`wa.me/31782032858`)
- [ ] Team photos for Kerem Sen & Mevlut Sumer (Over ons)
- [ ] Additional project photos for categories without a matching asset
- [ ] Dedicated before/after photo pairs (slider uses demo grayscale on elektra page until provided)
- [x] Brand logo files for MerkLogos section (12 logos in `public/brands/`, all brands on elektra/airconditioning/ventilatie pages)
- [ ] Confirm opening hours and address for structured data

---

## Definition of done (whole plan)

- [ ] No `ImagePlaceholder` on pages where a real asset exists in `public/`
- [ ] Logo visible in navbar and footer
- [ ] Mobile users can call or request offerte in one tap
- [ ] Every route has unique metadata
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (home + sample service page)
- [ ] No hardcoded hex colors outside `globals.css`
- [ ] Dutch copy pass complete
- [ ] All checklists above marked complete or explicitly deferred with reason
