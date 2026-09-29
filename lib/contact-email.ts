export interface ContactEmailPayload {
  naam: string
  telefoon: string
  vraag: string
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

function formatReceivedAt(): string {
  return new Intl.DateTimeFormat('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam',
  }).format(new Date())
}

export function buildContactEmailContent(payload: ContactEmailPayload): {
  subject: string
  text: string
  html: string
} {
  const receivedAt = formatReceivedAt()
  const telHref = phoneToTelHref(payload.telefoon)
  const preview = payload.vraag.trim().slice(0, 60).replace(/\s+/g, ' ')
  const subjectSuffix = preview.length < payload.vraag.trim().length ? `${preview}…` : preview

  const text = [
    'Nieuwe vraag / storingsmelding via kmsinstallaties.nl',
    '',
    'Contact',
    `Naam: ${payload.naam}`,
    `Telefoon: ${payload.telefoon}`,
    '',
    'Melding',
    payload.vraag.trim(),
    '',
    `Ontvangen: ${receivedAt}`,
  ].join('\n')

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: ${KMS_NAVY}; line-height: 1.5; max-width: 560px;">
      <div style="background: ${KMS_NAVY}; color: #ffffff; padding: 18px 20px; border-radius: 8px 8px 0 0;">
        <div style="font-size: 12px; opacity: 0.85; margin-bottom: 4px;">KMS Installaties</div>
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Vraag of storingsmelding</h2>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; background: #ffffff;">
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${KMS_NAVY_MID};">Contact</h3>
          <div style="background: ${KMS_LIGHT}; border-left: 4px solid #F5A623; padding: 16px 16px 2px; border-radius: 8px;">
            <div style="margin-bottom: 14px;">
              <div style="font-size: 12px; line-height: 1.4; color: ${KMS_MUTED}; margin-bottom: 4px;">Naam</div>
              <div style="font-size: 15px; line-height: 1.45; font-weight: 600; color: ${KMS_NAVY};">${escapeHtml(payload.naam)}</div>
            </div>
            <div style="margin-bottom: 14px;">
              <div style="font-size: 12px; line-height: 1.4; color: ${KMS_MUTED}; margin-bottom: 4px;">Telefoon</div>
              <div style="font-size: 15px; line-height: 1.45; font-weight: 600; color: ${KMS_NAVY};">
                <a href="${escapeHtml(telHref)}" style="color: ${KMS_NAVY_MID}; text-decoration: none; font-weight: 600;">${escapeHtml(payload.telefoon)}</a>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${KMS_NAVY_MID};">Melding</h3>
          <div style="font-size: 15px; line-height: 1.55; color: ${KMS_NAVY}; white-space: pre-wrap; background: ${KMS_LIGHT}; padding: 14px 16px; border-radius: 8px;">${escapeHtml(payload.vraag.trim())}</div>
        </div>
        <p style="margin: 0; font-size: 12px; color: ${KMS_MUTED};">Ontvangen: ${escapeHtml(receivedAt)}</p>
      </div>
    </div>
  `.trim()

  return {
    subject: `Storingsmelding / vraag: ${payload.naam}${subjectSuffix ? ` - ${subjectSuffix}` : ''}`,
    text,
    html,
  }
}
