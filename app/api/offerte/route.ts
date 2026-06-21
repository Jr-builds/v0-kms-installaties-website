import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildOfferteEmailContent } from '@/lib/offerte-email'
import {
  getOfferteFromEmail,
  getOfferteRecipientEmail,
  getResendApiKey,
} from '@/lib/offerte-mail-config'
import {
  getOfferteAudienceLabel,
  getOfferteCategoryLabel,
  offerteAudienceOptions,
  offerteCategories,
  type OfferteAudienceId,
  type OfferteCategoryId,
} from '@/lib/offerte-form'
import {
  validateOfferteFotoFiles,
} from '@/lib/offerte-fotos'
import {
  getOfferteQuestions,
  validateOfferteQuestionAnswers,
} from '@/lib/offerte-questions'
import { formatDutchPostcode, isValidDutchPostcode } from '@/lib/offerte'
import { validateEmail, validatePhone, validateRequired } from '@/lib/form-validation'

const validCategoryIds = new Set(offerteCategories.map((category) => category.id))
const validAudienceIds = new Set(offerteAudienceOptions.map((option) => option.id))

function isOfferteCategoryId(value: string): value is OfferteCategoryId {
  return validCategoryIds.has(value as OfferteCategoryId)
}

function isOfferteAudienceId(value: string): value is OfferteAudienceId {
  return validAudienceIds.has(value as OfferteAudienceId)
}

function parseQuestionAnswers(raw: FormDataEntryValue | null): Record<string, string> {
  if (typeof raw !== 'string' || !raw.trim()) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string') result[key] = value
    }
    return result
  } catch {
    return {}
  }
}

export async function POST(request: Request) {
  const apiKey = getResendApiKey()
  if (!apiKey) {
    return NextResponse.json(
      { error: 'E-mailverzending is nog niet geconfigureerd. Neem contact op via telefoon.' },
      { status: 503 },
    )
  }

  try {
    const formData = await request.formData()

    const categoryRaw = formData.get('categoryId')
    const audienceRaw = formData.get('audienceId')

    if (typeof categoryRaw !== 'string' || !isOfferteCategoryId(categoryRaw)) {
      return NextResponse.json({ error: 'Ongeldige categorie.' }, { status: 400 })
    }
    if (typeof audienceRaw !== 'string' || !isOfferteAudienceId(audienceRaw)) {
      return NextResponse.json({ error: 'Ongeldig type aanvrager.' }, { status: 400 })
    }

    const categoryId = categoryRaw
    const audienceId = audienceRaw
    const questionAnswers = parseQuestionAnswers(formData.get('questionAnswers'))
    const omschrijving = String(formData.get('omschrijving') ?? '')
    const naam = String(formData.get('naam') ?? '').trim()
    const telefoon = String(formData.get('telefoon') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const postcodeRaw = String(formData.get('postcode') ?? '').trim()
    const plaats = String(formData.get('plaats') ?? '').trim()
    const postcode = postcodeRaw ? formatDutchPostcode(postcodeRaw) : ''

    const questionErrors = validateOfferteQuestionAnswers(
      getOfferteQuestions(categoryId),
      questionAnswers,
    )
    const fieldErrors = {
      naam: validateRequired(naam, 'Naam'),
      telefoon: validatePhone(telefoon),
      email: validateEmail(email),
      postcode: validateRequired(postcode, 'Postcode') ?? (isValidDutchPostcode(postcode) ? null : 'Voer een geldige postcode in'),
      ...questionErrors,
    }

    const firstError = Object.values(fieldErrors).find(Boolean)
    if (firstError) {
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const fotoEntries = formData.getAll('fotos').filter((entry): entry is File => entry instanceof File)
    const fotoFiles = fotoEntries.filter((file) => file.size > 0)
    const fotoError = validateOfferteFotoFiles(fotoFiles)
    if (fotoError) {
      return NextResponse.json({ error: fotoError }, { status: 400 })
    }

    const emailContent = buildOfferteEmailContent({
      categoryId,
      audienceId,
      questionAnswers,
      omschrijving,
      naam,
      telefoon,
      email,
      postcode,
      plaats,
      attachmentCount: fotoFiles.length,
    })

    const attachments = await Promise.all(
      fotoFiles.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    )

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: getOfferteFromEmail(),
      to: [getOfferteRecipientEmail()],
      replyTo: email || undefined,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (error) {
      console.error('Resend offerte error:', error)
      return NextResponse.json(
        { error: 'Versturen mislukt. Probeer het opnieuw of bel ons direct.' },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      category: getOfferteCategoryLabel(categoryId),
      audience: getOfferteAudienceLabel(audienceId),
    })
  } catch (error) {
    console.error('Offerte API error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis. Probeer het opnieuw of bel ons direct.' },
      { status: 500 },
    )
  }
}
