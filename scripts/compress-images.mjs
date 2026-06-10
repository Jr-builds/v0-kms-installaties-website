#!/usr/bin/env node
/**
 * Compress JPG assets in public/ for faster page loads.
 * Run: npm run compress-images
 */
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.join(process.cwd(), 'public')
const maxWidth = 1920
const quality = 82

async function compressJpg(filePath) {
  const before = (await stat(filePath)).size
  const image = sharp(filePath)
  const metadata = await image.metadata()

  let pipeline = image.rotate()
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  const buffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer()

  if (buffer.length >= before) {
    console.log(`${path.basename(filePath)}: ${formatKb(before)} (already optimized, skipped)`)
    return
  }

  await sharp(buffer).toFile(filePath)
  const after = (await stat(filePath)).size
  const saved = before - after
  const pct = before > 0 ? Math.round((saved / before) * 100) : 0
  console.log(`${path.basename(filePath)}: ${formatKb(before)} → ${formatKb(after)} (−${pct}%)`)
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

async function main() {
  const entries = await readdir(publicDir)
  const jpgs = entries.filter(
    (name) => name.toLowerCase().endsWith('.jpg') && !name.startsWith('placeholder'),
  )

  if (jpgs.length === 0) {
    console.log('No JPG files found in public/')
    return
  }

  for (const name of jpgs) {
    await compressJpg(path.join(publicDir, name))
  }

  console.log(`Compressed ${jpgs.length} file(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
