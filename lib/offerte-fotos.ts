import type { OfferteCategoryId } from '@/lib/offerte-form'

export const OFFERTE_FOTO_MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024
export const OFFERTE_FOTO_MAX_FILES = 10

export const OFFERTE_FOTO_ACCEPT =
  'image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf,video/mp4,video/quicktime'

export const OFFERTE_FOTO_FORMAT_LABEL =
  'JPEG, PNG, WebP, HEIC, PDF of video (MP4/MOV), max 8 MB per bestand'

export const offerteFotoTipsByCategory: Record<OfferteCategoryId, string> = {
  meterkast:
    'Een overzichtsfoto van uw groepenkast en een close-up van de automaten helpen ons bepalen of uitbreiding of 3-fase haalbaar is. Voeg de meter toe als die los van de kast hangt.',
  laadpaal:
    'Wij beoordelen laadpaal-werkzaamheden aan de meterkast en de plek waar u wilt laden. Fotografeer beide locaties; een beeld van het kabeltraject ertussen is extra waardevol.',
  'elektra-renovatie':
    'Laat ons de huidige situatie zien: de ruimtes die mee moeten in de verbouwing, de groepenkast en opvallende oude bedrading of stopcontacten die vervangen moeten worden.',
  storing:
    'Begin met een duidelijke foto van waar het misgaat. Bij stroomuitval in de hele woning is een shot van de meterkast vaak net zo nuttig als close-ups van schade of verbranding.',
  'airco-installatie':
    'Wij willen de binnenruimte zien waar de unit komt en de buitenmuur voor de buitenunit. Een foto van de meterkast laat zien of de elektra voorbereid is.',
  'airco-onderhoud':
    'Het merkplaatje op de unit vertelt ons veel over type en onderhoud. Stuur ook een foto van binnen- en buitenunit mee als u die veilig kunt bereiken.',
  ventilatie:
    'Filters, ventielen en het centrale unit geven ons snel inzicht. Ziet u condens, vreemde geuren of lekkage? Fotografeer dan ook precies die plek.',
  camerabeveiliging:
    'Loop de plekken na die u wilt bewaken en maak per hoekpunt een foto. Houd binnen en buiten apart; zo stellen wij een passend camerasysteem voor.',
  'technisch-vastgoedbeheer':
    'Een overzichtsfoto van het pand plus de technische ruimte volstaat vaak voor een eerste inschatting. Meerdere locaties? Eén foto per pand is al genoeg.',
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
