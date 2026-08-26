# KMS CMS snapshot — 2026-08-26

Read-only backup of Supabase CMS content.
Live site was NOT changed. Site still reads from Supabase.

## Contents
- `site_texts.json` — 100 text records
- `site_images.json` — 63 image records (metadata)
- `images/` — 50 downloaded files (0 failed)
- `images-manifest.json` — mapping key → local file

## Notes
- Rows without `public_url` use local repo assets (already in Git).
- Restore = manual re-upload to Supabase if needed; this folder is not wired into the app.
