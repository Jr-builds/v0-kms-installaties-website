'use client'

import { useEffect } from 'react'

/**
 * Trustoo conversion chatbot ("Kees").
 * Alleen actief als NEXT_PUBLIC_TRUSTOO_CHATBOT_ENABLED=true.
 *
 * Mount-node wordt één keer op document.body gezet en NOOIT door React
 * weer weggehaald. Anders wist React Strict Mode (dev) de widget, terwijl
 * Trustoo.init() daarna weigert opnieuw te starten (one-shot flag).
 */
const TRUSTOO_CHATBOT_ENABLED = process.env.NEXT_PUBLIC_TRUSTOO_CHATBOT_ENABLED === 'true'

const TRUSTOO_CHATBOT_ID = 'GzKQ7oD6BmqbthQ4EGr8Ymb26FXrHfvEAL5_VLWA3xfWvg'
const TRUSTOO_AVATAR_URL = 'https://static.trustoo.nl/pros/646326/chatbot/avatar?v=4873358'
const TRUSTOO_CSS_HREF = 'https://chatbot-widget.trustoo.nl/trustoo-chatbot.css'
const TRUSTOO_SCRIPT_SRC = 'https://chatbot-widget.trustoo.nl/trustoo-chatbot.iife.js'
const TRUSTOO_SCRIPT_ID = 'trustoo-chatbot-script'
const TRUSTOO_STYLE_ID = 'trustoo-chatbot-style'
const TRUSTOO_MOUNT_ID = 'trustoo-chatbot'
/** Teaserballon ("Hoi! Hulp nodig...") pas na deze delay tonen */
const TRUSTOO_TEASER_DELAY_MS = 4000
const TRUSTOO_TEASER_READY_CLASS = 'kms-trustoo-teaser-ready'

const KNOWLEDGE = [
  'Je bent de vriendelijke en professionele digitale assistent van KMS Installaties.',
  '',
  '* Reageer vriendelijk, duidelijk en behulpzaam.',
  '* Houd antwoorden kort, persoonlijk en begrijpelijk.',
  "* Spreek bezoekers informeel aan met 'je' en 'jij'.",
  '* Help bezoekers met vragen over onze diensten, installaties, onderhoud en offerteaanvragen.',
  '* Stel gerichte vragen om de klant zo goed mogelijk te helpen.',
  '* Doe geen toezeggingen over prijzen, beschikbaarheid of planning zonder bevestiging.',
  '* Verzin geen informatie als je het antwoord niet weet.',
  '* Verwijs bij complexe technische vragen, klachten of spoedgevallen door naar een medewerker van KMS Installaties.',
  '* Vraag bij offerteaanvragen naar de naam, contactgegevens en een korte omschrijving van de werkzaamheden.',
  '* Blijf altijd professioneel, positief en klantgericht.',
  '',
  'Doel: Bezoekers snel en prettig helpen en waar nodig in contact brengen met de juiste medewerker van KMS Installaties.',
].join('\n')

const CHATBOT_CONFIG = {
  token: TRUSTOO_CHATBOT_ID,
  countryCode: 'NL',
  language: 'nl',
  mainLanguage: 'nl',
  environment: 'production' as const,
  source: 'conversion_bot' as const,
  botName: 'Kees',
  avatarUrl: TRUSTOO_AVATAR_URL,
  avatarColor: '#1F6FEB',
  primaryColor: '#1F6FEB',
  launcherIcon: 'support',
  enableCallback: true,
  enableWhatsapp: true,
  enableQuote: true,
  enableAppointment: false,
  enableAi: true,
  whatsappNumber: '+31782032858',
  quoteFields: ['name', 'phone', 'email', 'project', 'postal', 'budget'],
  welcomeMessage:
    'Hoi! Ik ben Kees, jouw digitale installatiehulp bij KMS Installaties. Heb je vragen over elektra of airco? Ik help je graag!',
  teaserEnabled: true,
  teaserText: 'Hoi! Hulp nodig of een vraag? We helpen je graag!',
  autoOpenEnabled: true,
  autoOpenDelay: 5,
  knowledgeInstructions: KNOWLEDGE,
  tone: 'friendly',
  addressForm: 'u',
}

type TrustooApi = {
  init: (config: unknown) => void
  resolveConfig?: (config: unknown) => Promise<unknown>
}

declare global {
  interface Window {
    TrustooChatbot?: TrustooApi
    __kmsTrustooStarting?: boolean
  }
}

function ensureMountNode() {
  let mount = document.getElementById(TRUSTOO_MOUNT_ID)
  if (!mount) {
    mount = document.createElement('div')
    mount.id = TRUSTOO_MOUNT_ID
    document.body.appendChild(mount)
  }
  return mount
}

function widgetAlreadyVisible() {
  return Boolean(document.querySelector(`#${TRUSTOO_MOUNT_ID} .trustoo-chatbot`))
}

async function startTrustooChatbot() {
  if (widgetAlreadyVisible()) return
  if (window.__kmsTrustooStarting) return
  window.__kmsTrustooStarting = true

  const api = window.TrustooChatbot
  if (!api?.init) {
    window.__kmsTrustooStarting = false
    return
  }

  ensureMountNode()

  try {
    const resolved = api.resolveConfig ? await api.resolveConfig(CHATBOT_CONFIG) : CHATBOT_CONFIG
    if (!widgetAlreadyVisible()) {
      api.init(resolved ?? CHATBOT_CONFIG)
    }
  } catch (error) {
    console.error('[TrustooChatbot] init mislukt', error)
    if (!widgetAlreadyVisible()) {
      api.init(CHATBOT_CONFIG)
    }
  } finally {
    window.__kmsTrustooStarting = false
  }
}

export default function TrustooChatbot() {
  useEffect(() => {
    if (!TRUSTOO_CHATBOT_ENABLED) return

    ensureMountNode()

    const teaserTimer = window.setTimeout(() => {
      document.body.classList.add(TRUSTOO_TEASER_READY_CLASS)
    }, TRUSTOO_TEASER_DELAY_MS)

    if (!document.getElementById(TRUSTOO_STYLE_ID)) {
      const link = document.createElement('link')
      link.id = TRUSTOO_STYLE_ID
      link.rel = 'stylesheet'
      link.href = TRUSTOO_CSS_HREF
      document.head.appendChild(link)
    }

    const existing = document.getElementById(TRUSTOO_SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      if (window.TrustooChatbot) {
        void startTrustooChatbot()
      } else {
        const onLoad = () => {
          void startTrustooChatbot()
        }
        existing.addEventListener('load', onLoad)
        return () => {
          window.clearTimeout(teaserTimer)
          existing.removeEventListener('load', onLoad)
        }
      }
      // Geen cleanup die #trustoo-chatbot weghaalt: dat breekt Trustoo in React Strict Mode.
      return () => {
        window.clearTimeout(teaserTimer)
      }
    }

    const script = document.createElement('script')
    script.id = TRUSTOO_SCRIPT_ID
    script.src = TRUSTOO_SCRIPT_SRC
    script.async = true
    script.addEventListener('load', () => {
      void startTrustooChatbot()
    })
    script.addEventListener('error', () => {
      console.error('[TrustooChatbot] script kon niet laden')
    })
    document.body.appendChild(script)

    return () => {
      window.clearTimeout(teaserTimer)
    }
  }, [])

  // Geen React-DOM voor de mount-node: die moet Strict Mode overleven.
  return null
}
