import {
  getOfferteAudienceLabel,
  getOfferteCategoryLabel,
  type OfferteAudienceId,
  type OfferteCategoryId,
} from '@/lib/offerte-form'
import {
  getOfferteAnswerLabel,
  getOfferteQuestions,
} from '@/lib/offerte-questions'

export interface OfferteEmailPayload {
  categoryId: OfferteCategoryId
  audienceId: OfferteAudienceId
  questionAnswers: Record<string, string>
  omschrijving: string
  naam: string
  telefoon: string
  email: string
  postcode: string
  plaats: string
  attachmentCount: number
}

interface EmailField {
  label: string
  value: string
  href?: string
}

const KMS_NAVY = '#0a2040'
const KMS_NAVY_MID = '#1e52a0'
const KMS_MUTED = '#64748b'
const KMS_LIGHT = '#f4f6f9'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function phoneToTelHref(phone: string): string {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')
  if (trimmed.startsWith('+')) {
    return `tel:${trimmed.replace(/\s/g, '')}`
  }
  if (digits.startsWith('0')) {
    return `tel:${digits}`
  }
  return `tel:${digits}`
}

function renderTextFields(fields: EmailField[]): string[] {
  return fields.flatMap((field) => [field.label, field.value, ''])
}

function renderHtmlField(field: EmailField): string {
  const valueHtml = field.href
    ? `<a href="${escapeHtml(field.href)}" style="color: ${KMS_NAVY_MID}; text-decoration: none; font-weight: 600;">${escapeHtml(field.value)}</a>`
    : escapeHtml(field.value)

  return `
    <div style="margin-bottom: 14px;">
      <div style="font-size: 12px; line-height: 1.4; color: ${KMS_MUTED}; margin-bottom: 4px;">${escapeHtml(field.label)}</div>
      <div style="font-size: 15px; line-height: 1.45; font-weight: 600; color: ${KMS_NAVY};">${valueHtml}</div>
    </div>
  `.trim()
}

function renderHtmlSection(title: string, fields: EmailField[], highlighted = false): string {
  const items = fields.map(renderHtmlField).join('')
  const boxStyle = highlighted
    ? `background: ${KMS_LIGHT}; border-left: 4px solid #F5A623; padding: 16px 16px 2px; border-radius: 8px;`
    : 'padding: 0;'

  return `
    <div style="margin-bottom: 20px;">
      <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${KMS_NAVY_MID};">${escapeHtml(title)}</h3>
      <div style="${boxStyle}">${items}</div>
    </div>
  `.trim()
}

export function buildOfferteEmailContent(payload: OfferteEmailPayload): {
  subject: string
  text: string
  html: string
} {
  const categoryLabel = getOfferteCategoryLabel(payload.categoryId)
  const audienceLabel = getOfferteAudienceLabel(payload.audienceId)
  const questions = getOfferteQuestions(payload.categoryId)

  const summaryFields: EmailField[] = [
    { label: 'Categorie', value: categoryLabel },
    { label: 'Aanvrager', value: audienceLabel },
  ]

  const contactFields: EmailField[] = [
    { label: 'Naam', value: payload.naam },
    { label: 'Telefoon', value: payload.telefoon, href: phoneToTelHref(payload.telefoon) },
    ...(payload.email.trim()
      ? [{ label: 'E-mail', value: payload.email.trim(), href: `mailto:${payload.email.trim()}` }]
      : []),
    { label: 'Postcode', value: payload.postcode },
    ...(payload.plaats.trim() ? [{ label: 'Plaats', value: payload.plaats.trim() }] : []),
  ]

  const questionFields: EmailField[] = questions
    .filter((question) => payload.questionAnswers[question.id]?.trim())
    .map((question) => ({
      label: question.label,
      value: getOfferteAnswerLabel(question, payload.questionAnswers[question.id]),
    }))

  const textSections = [
    'Nieuwe offerteaanvraag via kmsinstallaties.nl',
    '',
    'Samenvatting',
    ...renderTextFields(summaryFields),
    'Contact',
    ...renderTextFields(contactFields),
    ...(questionFields.length > 0 ? ['Vragen', ...renderTextFields(questionFields)] : []),
    ...(payload.omschrijving.trim()
      ? ['Verhaal', payload.omschrijving.trim(), '']
      : []),
    'Bijlagen',
    payload.attachmentCount > 0 ? `${payload.attachmentCount} bestand(en)` : 'geen',
  ]

  const htmlSections = [
    renderHtmlSection('Samenvatting', summaryFields),
    renderHtmlSection('Contact', contactFields, true),
    ...(questionFields.length > 0 ? [renderHtmlSection('Vragen', questionFields)] : []),
    ...(payload.omschrijving.trim()
      ? [
          `
            <div style="margin-bottom: 20px;">
              <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${KMS_NAVY_MID};">Verhaal</h3>
              <div style="font-size: 15px; line-height: 1.55; color: ${KMS_NAVY}; white-space: pre-wrap; background: ${KMS_LIGHT}; padding: 14px 16px; border-radius: 8px;">${escapeHtml(payload.omschrijving.trim())}</div>
            </div>
          `.trim(),
        ]
      : []),
    `
      <p style="margin: 0; font-size: 13px; color: ${KMS_MUTED};">
        <span style="display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${KMS_NAVY_MID}; margin-bottom: 4px;">Bijlagen</span>
        ${payload.attachmentCount > 0 ? `${payload.attachmentCount} bestand(en)` : 'geen'}
      </p>
    `.trim(),
  ].join('')

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: ${KMS_NAVY}; line-height: 1.5; max-width: 560px;">
      <div style="background: ${KMS_NAVY}; color: #ffffff; padding: 18px 20px; border-radius: 8px 8px 0 0;">
        <div style="font-size: 12px; opacity: 0.85; margin-bottom: 4px;">KMS Installaties</div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Nieuwe offerteaanvraag</h2>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; background: #ffffff;">
        ${htmlSections}
      </div>
    </div>
  `.trim()

  return {
    subject: `Offerteaanvraag: ${categoryLabel} - ${payload.naam}`,
    text: textSections.join('\n'),
    html,
  }
}
