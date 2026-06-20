import type { OfferteCategoryId } from '@/lib/offerte-form'

export const OFFERTE_FOTO_MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024
export const OFFERTE_FOTO_MAX_FILES = 10

export const OFFERTE_FOTO_ACCEPT =
  'image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf,video/mp4,video/quicktime'

export const OFFERTE_FOTO_FORMAT_LABEL =
  'JPEG, PNG, WebP, HEIC, PDF of video (MP4/MOV), max 8 MB per bestand'

export const offerteFotoTipsByCategory: Record<OfferteCategoryId, string> = {
  meterkast:
    'Maak een foto van uw hele meterkast en eentje van dichtbij van de schakelaars. Zo zien wij snel of uitbreiding of extra stroom mogelijk is. Staat de meter los? Fotografeer die ook.',
  laadpaal:
    'Fotografeer uw meterkast en de plek waar u wilt laden, bijvoorbeeld de oprit of garage. Kunt u ook het pad ertussen fotograferen? Dat helpt ons bij de planning.',
  'elektra-renovatie':
    'Laat ons zien welke ruimtes u wilt aanpakken, hoe de meterkast er nu uitziet en opvallende oude stopcontacten of bedrading.',
  storing:
    'Begin met een duidelijke foto van waar het misgaat. Is de stroom overal uit? Fotografeer dan ook uw meterkast. Ziet u schade of verbranding? Maak daar een foto van dichtbij.',
  'airco-installatie':
    'Wij willen de kamer zien waar de airco binnen komt en de buitenmuur waar het apparaat buiten kan hangen. Een foto van de meterkast is ook handig.',
  'airco-onderhoud':
    'Een foto van het stickerplaatje op de airco vertelt ons veel over het type. Kunt u veilig bij het binnen- en buitendeel? Stuur die foto\'s ook mee.',
  ventilatie:
    'Filters, ventilatierooster of de ventilatiebox in huis geven ons snel een beeld. Lekt het, ruikt het vreemd of is er condens? Fotografeer dan die plek.',
  camerabeveiliging:
    'Loop langs de plekken die u wilt bewaken en maak per punt een foto. Houd binnen en buiten apart, zo stellen wij een passend voorstel op.',
  'technisch-vastgoedbeheer':
    'Een foto van het pand en van de technische ruimte volstaat vaak voor een eerste inschatting. Meerdere locaties? Eén foto per pand is genoeg.',
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
