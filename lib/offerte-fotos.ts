import type { OfferteCategoryId } from '@/lib/offerte-form'

export const OFFERTE_FOTO_MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024
export const OFFERTE_FOTO_MAX_FILES = 10

export const OFFERTE_FOTO_ACCEPT =
  'image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf,video/mp4,video/quicktime'

export const OFFERTE_FOTO_FORMAT_LABEL =
  'JPEG, PNG, WebP, HEIC, PDF of video (MP4/MOV), max 8 MB per bestand'

export const offerteFotoTipsByCategory: Record<OfferteCategoryId, string> = {
  meterkast:
    'Voor een meterkast-aanvraag helpen foto\'s van: uw groepenkast (van dichtbij en op afstand), de meter en eventuele labels of beschadigingen.',
  laadpaal:
    'Handig zijn foto\'s van: de meterkast, de beoogde locatie van de laadpaal (binnen of buiten) en de route naar de meterkast.',
  'elektra-renovatie':
    'Upload foto\'s van: de ruimtes waar gewerkt wordt, de bestaande groepenkast en eventuele oude bedrading of stopcontacten.',
  storing:
    'Maak foto\'s van: het defecte onderdeel, de meterkast bij stroomuitval, en eventuele schade of verbranding.',
  'airco-installatie':
    'Foto\'s van: de binnenruimte, de buitenmuur waar de buitenunit kan komen, en de huidige meterkast.',
  'airco-onderhoud':
    'Upload foto\'s van: het merkplaatje of type airco, de binnenunit en buitenunit indien zichtbaar.',
  ventilatie:
    'Handig zijn foto\'s van: het bestaande ventilatiesysteem, filters, roosters en eventuele lekkage of condens.',
  camerabeveiliging:
    'Upload foto\'s van: de locaties waar camera\'s moeten komen (binnen en buiten), en de gewenste bekabelingsroute indien bekend.',
  'technisch-vastgoedbeheer':
    'Foto\'s van: het pand of complex, technische ruimtes en eventuele bestaande installaties helpen bij een eerste inschatting.',
}

export function getOfferteFotoTip(categoryId: OfferteCategoryId): string {
  return offerteFotoTipsByCategory[categoryId]
}

export function formatOfferteFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function validateOfferteFotoFiles(files: File[]): string | null {
  if (files.length > OFFERTE_FOTO_MAX_FILES) {
    return `U kunt maximaal ${OFFERTE_FOTO_MAX_FILES} bestanden toevoegen.`
  }

  const tooLarge = files.find((file) => file.size > OFFERTE_FOTO_MAX_FILE_SIZE_BYTES)
  if (tooLarge) {
    return `"${tooLarge.name}" is groter dan 8 MB. Kies een kleiner bestand.`
  }

  return null
}

export function mergeOfferteFotoFiles(existing: File[], incoming: File[]): File[] {
  const merged = [...existing]

  for (const file of incoming) {
    if (merged.length >= OFFERTE_FOTO_MAX_FILES) break
    const isDuplicate = merged.some(
      (existingFile) =>
        existingFile.name === file.name &&
        existingFile.size === file.size &&
        existingFile.lastModified === file.lastModified,
    )
    if (!isDuplicate) merged.push(file)
  }

  return merged
}
