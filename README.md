# KMS Installaties website

Marketingwebsite voor **KMS Installaties** (elektra, laadpalen, airconditioning, ventilatie, vastgoedbeheer en camerasystemen) in Zuid-Holland.

Live deploy via Vercel (push naar `main`). Later volgt de site naar hun eigen domein; content (foto’s) leeft in Supabase.

## Functies

- Dienstpagina’s, lokale landingspagina’s, projecten, offerteformulier
- Trust/certificeringen, reviews, FAQ, werkgebied
- **Website beheer** (`/beheer`): inloggen via Supabase Auth, foto’s én korte teksten op de site wijzigen (klik-om-te-bewerken)
- Offerte-aanvragen via Resend (e-mail)
- Sentry voor error monitoring (optioneel geconfigureerd)

## Tech stack

| Onderdeel | Keuze |
|-----------|--------|
| Framework | Next.js (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| Hosting | Vercel |
| Content / media | Supabase (Postgres + Storage + Auth) |
| E-mail | Resend |
| Monitoring | Sentry |
| UI | Base UI / shadcn-achtige componenten |

## Getting started

```bash
npm install
cp .env.example .env.local
# Vul de keys in .env.local (zie hieronder)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Kopieer `.env.example` naar `.env.local` (nooit committen). Belangrijkste:

| Variabele | Waarvoor |
|-----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publieke (anon) API key |
| `RESEND_API_KEY` | Offerteformulier e-mail |
| `OFFERTE_RECIPIENT_EMAIL` | Ontvanger offerte-mails |

Supabase keys: dashboard → **Project Settings → API** (URL + legacy anon key).

Zelfde variabelen ook zetten in **Vercel → Settings → Environment Variables**, daarna redeployen. Zonder dat werkt beheer/foto’s niet op de live site.

### Website beheer (foto’s)

1. In Supabase: **Authentication → Users → Add user** (e-mail + wachtwoord, bij voorkeur auto-confirm)
2. Lokaal of live: ga naar `/beheer` en log in
3. Gele balk = bewerkmodus → klik op een foto of tekst → aanpassen → opslaan

Uploads en teksten gaan naar Supabase. Code en layout blijven in GitHub.

## Projectstructuur (kort)

- `app/` – pagina’s en routes (o.a. diensten, offerte, `/beheer`)
- `components/` – UI; `components/cms/` – bewerkmodus
- `lib/images.ts` – lokale fallback-foto’s + keys
- `lib/supabase/` – clients, middleware-sessie, image resolve
- `public/` – statische assets (fallback-beelden)

## Status

- Marketing-site en dienstenstructuur: in gebruik / review
- Supabase contentbeheer (foto’s): aangesloten; tekst-CMS volgt later
- Custom domein: later via Vercel DNS

## Scripts

```bash
npm run dev              # lokale development
npm run build            # productiebuild
npm run lint             # ESLint
npm run compress-images  # afbeeldingen comprimeren
```
