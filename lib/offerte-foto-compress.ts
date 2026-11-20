const COMPRESSIBLE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_DIMENSION = 1920
const JPEG_QUALITY = 0.82

/**
 * Telefoonfoto's zijn al snel 4 tot 8 MB. Het offerteformulier verstuurt alles
 * in één verzoek en dat mag niet te groot worden, dus verkleinen we foto's
 * in de browser voordat ze worden meegestuurd. Lukt verkleinen niet
 * (bijv. HEIC in een browser zonder ondersteuning), dan blijft het origineel
 * staan en vangt de totale-groottecontrole het af.
 */
export async function compressOfferteImageFile(file: File): Promise<File> {
  if (!COMPRESSIBLE_TYPES.has(file.type)) return file

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))

    if (scale === 1 && file.size <= 1024 * 1024) {
      bitmap.close()
      return file
    }

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) {
      bitmap.close()
      return file
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
    })
    if (!blob || blob.size >= file.size) return file

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([blob], name, { type: 'image/jpeg', lastModified: file.lastModified })
  } catch {
    return file
  }
}

export async function compressOfferteFotoFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => compressOfferteImageFile(file)))
}
