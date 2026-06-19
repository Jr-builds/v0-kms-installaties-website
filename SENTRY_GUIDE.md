# Sentry Setup — KMS Installaties Website

Korte handleiding voor account, project en integratie in dit Next.js-project.

---

## 1. Account & project

1. Ga naar [sentry.io/signup](https://sentry.io/signup/) en maak een (gratis) account aan.
2. Maak een **Organization** aan (bijv. `kms-installaties`).
3. Maak een **Project** aan:
   - Platform: **Next.js**
   - Naam: `kms-website` (of vergelijkbaar)
4. Noteer de **DSN** (Settings → Projects → [project] → Client Keys). Deel deze nooit publiek.

---

## 2. SDK installeren

In de projectroot:

```bash
npx @sentry/wizard@latest -i nextjs
```

De wizard maakt o.a. aan:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `instrumentation.ts`
- wijzigingen in `next.config.mjs`

Controleer daarna of `pnpm build` / `npm run build` slaagt.

---

## 3. Environment variables

Voeg toe in `.env.local` (lokaal) en in **Vercel → Project → Settings → Environment Variables**:

| Variabele | Waarde | Omgeving |
|-----------|--------|----------|
| `NEXT_PUBLIC_SENTRY_DSN` | DSN uit Sentry | Production (+ Preview optioneel) |
| `SENTRY_AUTH_TOKEN` | Auth token (source maps) | Production |
| `SENTRY_ORG` | Org-slug | Production |
| `SENTRY_PROJECT` | Project-slug | Production |

> **Geen secrets committen.** `.env.local` staat in `.gitignore`.

---

## 4. Vercel-koppeling (aanbevolen)

1. Sentry → **Settings → Integrations → Vercel**
2. Koppel het Vercel-project van deze site.
3. Voordelen: automatische releases, source maps upload, deployment-notificaties.

---

## 5. Error tracking verifiëren

1. Deploy naar Preview of Production.
2. Test een bewuste error (tijdelijk in een dev-only route of via Sentry wizard testknop).
3. Controleer in Sentry → **Issues** of de error binnenkomt met stack trace en release-tag.

---

## 6. User Feedback (feedback loop)

Voor bezoekers die een bug melden:

1. Sentry → Project → **User Feedback** → inschakelen.
2. In `sentry.client.config.ts`:

```ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: 'system',
      showBranding: false,
    }),
  ],
});
```

3. Optioneel: trigger de widget via een eigen knop (`Sentry.getFeedback()?.createWidget()`).

---

## 7. Privacy & cookies

De site heeft al een cookiebanner (`CookieNotice`). Voordat Sentry in productie live gaat:

- [ ] Leg Sentry vast in het **cookiebeleid** (`/cookies`) als functionele/analytische tool (afhankelijk van configuratie).
- [ ] Zet **PII-scrubbing** aan: Sentry → Settings → Security & Privacy.
- [ ] Gebruik `beforeSend` om gevoelige velden te filteren (formulierdata, e-mail).
- [ ] Overweeg Sentry alleen te laden **na cookie-toestemming** als je strikt GDPR-wil werken.

---

## 8. Productie-checklist

- [ ] DSN en auth token in Vercel gezet
- [ ] Source maps uploaden bij build
- [ ] Test-error gezien in Sentry dashboard
- [ ] Alerts ingesteld (e-mail bij nieuwe issues)
- [ ] Cookiebeleid bijgewerkt
- [ ] User Feedback getest op mobiel

---

## Referenties

- [Sentry Next.js docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [User Feedback](https://docs.sentry.io/product/user-feedback/)
- GitHub issue: [#1](https://github.com/Jr-builds/v0-kms-installaties-website/issues/1)
