export function isValidPhoneNumber(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false

  const digits = trimmed.replace(/\D/g, '')

  if (trimmed.startsWith('+31')) {
    return digits.length === 11 && digits.startsWith('31')
  }

  if (trimmed.startsWith('0031')) {
    return digits.length === 13 && digits.startsWith('0031')
  }

  if (digits.startsWith('0')) {
    return digits.length === 10
  }

  return digits.length >= 9 && digits.length <= 10
}

export function validateRequired(value: string, label = 'Dit veld'): string | null {
  if (!value.trim()) return `${label} is verplicht`
  return null
}

export function validatePhone(value: string): string | null {
  const required = validateRequired(value, 'Telefoonnummer')
  if (required) return required
  if (!isValidPhoneNumber(value)) {
    return 'Voer een geldig telefoonnummer in (bijv. 078 203 28 58)'
  }
  return null
}

export function formInputClassName(hasError = false): string {
  return hasError ? 'form-input form-input-error' : 'form-input'
}
