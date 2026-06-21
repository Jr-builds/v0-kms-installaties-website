#!/usr/bin/env node
/**
 * Generate default Open Graph image (1200×630) for social sharing.
 * Run: npm run generate-og-image
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.join(process.cwd(), 'public')
const width = 1200
const height = 630

const svgOverlay = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a2040"/>
      <stop offset="100%" stop-color="#1e52a0"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <text x="600" y="300" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700" fill="#ffffff" text-anchor="middle">KMS Installaties</text>
  <text x="600" y="365" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600" fill="#F5A623" text-anchor="middle">Elektra &amp; Airconditioning</text>
  <text x="600" y="410" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#bfdbfe" text-anchor="middle">Zuid-Holland · Brabant · Zeeland · regio Utrecht</text>
</svg>`

async function main() {
  const logoPath = path.join(publicDir, 'KMS-Logo.png')
  const logo = await sharp(logoPath).resize(140, 140, { fit: 'inside' }).png().toBuffer()

  const background = await sharp(Buffer.from(svgOverlay)).png().toBuffer()

  const output = await sharp(background)
    .composite([{ input: logo, top: 118, left: 530 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer()

  await writeFile(path.join(publicDir, 'og-image.jpg'), output)
  console.log(`Created public/og-image.jpg (${Math.round(output.length / 1024)} KB)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
