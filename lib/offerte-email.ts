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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatLine(label: string, value: string): string {
  return `${label}: ${value}`
}

export function buildOfferteEmailContent(payload: OfferteEmailPayload): {
  subject: string
  text: string
  html: string
} {
  const categoryLabel = getOfferteCategoryLabel(payload.categoryId)
  const audienceLabel = getOfferteAudienceLabel(payload.audienceId)
  const questions = getOfferteQuestions(payload.categoryId)

  const questionLines = questions
    .filter((question) => payload.questionAnswers[question.id]?.trim())
    .map((question) =>
      formatLine(
        question.label,
        getOfferteAnswerLabel(question, payload.questionAnswers[question.id]),
      ),
    )

  const contactLines = [
    formatLine('Naam', payload.naam),
    formatLine('Telefoon', payload.telefoon),
    ...(payload.email.trim() ? [formatLine('E-mail', payload.email.trim())] : []),
    formatLine('Postcode', payload.postcode),
    ...(payload.plaats.trim() ? [formatLine('Plaats', payload.plaats.trim())] : []),
  ]

  const textSections = [
    'Nieuwe offerteaanvraag via kmsinstallaties.nl',
    '',
    formatLine('Categorie', categoryLabel),
    formatLine('Aanvrager', audienceLabel),
    '',
    ...(questionLines.length > 0 ? ['Vragen:', ...questionLines.map((line) => `- ${line}`), ''] : []),
    'Contact:',
    ...contactLines.map((line) => `- ${line}`),
    '',
    ...(payload.omschrijving.trim()
      ? ['Verhaal:', payload.omschrijving.trim(), '']
      : []),
    payload.attachmentCount > 0
      ? `Bijlagen: ${payload.attachmentCount} bestand(en)`
      : 'Bijlagen: geen',
  ]

  const htmlQuestionItems = questionLines
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('')

  const htmlContactItems = contactLines
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('')

  const html = `
    <div style="font-family: sans-serif; color: #1a2b4a; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">Nieuwe offerteaanvraag</h2>
      <p style="margin: 0 0 8px;"><strong>Categorie:</strong> ${escapeHtml(categoryLabel)}</p>
      <p style="margin: 0 0 16px;"><strong>Aanvrager:</strong> ${escapeHtml(audienceLabel)}</p>
      ${
        questionLines.length > 0
          ? `<h3 style="margin: 0 0 8px;">Vragen</h3><ul style="margin: 0 0 16px; padding-left: 20px;">${htmlQuestionItems}</ul>`
          : ''
      }
      <h3 style="margin: 0 0 8px;">Contact</h3>
      <ul style="margin: 0 0 16px; padding-left: 20px;">${htmlContactItems}</ul>
      ${
        payload.omschrijving.trim()
          ? `<h3 style="margin: 0 0 8px;">Verhaal</h3><p style="margin: 0 0 16px; white-space: pre-wrap;">${escapeHtml(payload.omschrijving.trim())}</p>`
          : ''
      }
      <p style="margin: 0; color: #666;"><strong>Bijlagen:</strong> ${
        payload.attachmentCount > 0
          ? `${payload.attachmentCount} bestand(en)`
          : 'geen'
      }</p>
    </div>
  `.trim()

  return {
    subject: `Offerteaanvraag: ${categoryLabel} - ${payload.naam}`,
    text: textSections.join('\n'),
    html,
  }
}
