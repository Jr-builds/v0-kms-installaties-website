import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildContactEmailContent } from '@/lib/contact-email'
import {
  getOfferteFromEmail,
  getOfferteRecipientEmail,
  getResendApiKey,
} from '@/lib/offerte-mail-config'
import { validatePhone, validateRequired } from '@/lib/form-validation'

const MAX_VRAAG_LENGTH = 4000

export async function POST(request: Request) {
  const apiKey = getResendApiKey()
  if (!apiKey) {
    return NextResponse.json(
      { error: 'E-mailverzending is nog niet geconfigureerd. Neem contact op via telefoon.' },
      { status: 503 },
    )
  }

  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Ongeldige aanvraag.' }, { status: 400 })
    }

    const record = body as Record<string, unknown>
    const naam = typeof record.naam === 'string' ? record.naam.trim() : ''
    const telefoon = typeof record.telefoon === 'string' ? record.telefoon.trim() : ''
    const vraag = typeof record.vraag === 'string' ? record.vraag.trim() : ''

    const fieldErrors = {
      naam: validateRequired(naam, 'Naam'),
      telefoon: validatePhone(telefoon),
      vraag: validateRequired(vraag, 'Vraag of storingsmelding'),
    }

    const firstError = Object.values(fieldErrors).find(Boolean)
    if (firstError) {
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    if (vraag.length > MAX_VRAAG_LENGTH) {
      return NextResponse.json(
        { error: 'Uw melding is te lang. Kort het bericht in of bel ons direct.' },
        { status: 400 },
      )
    }

    const emailContent = buildContactEmailContent({ naam, telefoon, vraag })
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: getOfferteFromEmail(),
      to: [getOfferteRecipientEmail()],
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    })

    if (error) {
      console.error('Resend contact error:', error)
      return NextResponse.json(
        { error: 'Versturen mislukt. Probeer het opnieuw of bel ons direct.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis. Probeer het opnieuw of bel ons direct.' },
      { status: 500 },
    )
  }
}
