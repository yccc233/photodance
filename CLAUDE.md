# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Critical: Next.js 16 with Breaking Changes

This project uses **Next.js 16.2.1 and React 19** — these versions have breaking changes from earlier releases. APIs, conventions, and file structure may differ from familiar patterns. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Project Overview

PhotoDance is a photo gallery website that displays photo albums with multiple layout options (masonry, grid, timeline).

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Note:** No test framework is configured (no test script in package.json).

## Architecture

### Data Flow
1. **Album config** (`src/config/albums.js`) — defines all albums with slug, title, layout type, cover photo, and photos folder
2. **Photo reading** (`src/lib/photos.js`) — reads photos from `public/photos/{folder}` at build time via `getPhotosFromFolder()`
3. **Static generation** — `generateStaticParams` in album page creates static routes for each album

### Pages
- **`src/app/page.js`** — Home page with cinematic animations (stars, meteors, corner frames)
- **`src/app/albums/[slug]/page.js`** — Album detail page with `generateStaticParams`

### Layout Router Pattern
**`src/components/PhotoWall.js`** — Route component that renders the appropriate layout based on album config:
- `masonry` → `src/components/layouts/Masonry.js`
- `grid` → `src/components/layouts/Grid.js`
- `timeline` → `src/components/layouts/Timeline.js`

### Components
- **`AlbumCard.js`** — Client component (`"use client"`) with hover animations
- **`ScrollReveal.js`** — Animation wrapper component

## Styling
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Custom CSS** — `src/app/home.css` contains elaborate home page animations
- **Google Fonts** — Playfair Display and Lora via `next/font/google`

## Adding a New Album

1. Add entry to `src/config/albums.js` with slug, title, description, layout, cover, and photosFolder
2. Add photos to `public/photos/{folder}` — `getPhotosFromFolder()` auto-discovers them at build time
3. Static params are auto-generated — no manual route config needed
