# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Critical: Next.js 16 with Breaking Changes

This project uses **Next.js 16.2.1 and React 19** — these versions have breaking changes from earlier releases. APIs, conventions, and file structure may differ from familiar patterns. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Project Overview

PhotoDance is a personal photo gallery website for "俞澄❤张昕", displaying multiple albums with three layout options (masonry, grid, timeline). Includes a wedding countdown timer targeting **2026-09-26** and click-based heart/sparkle effects.

## Commands

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Generate thumbnails + production build (via build hook in scripts)
npm run start   # Start production server
npm run lint    # ESLint (flat config, ESLint 9)
npm run thumbs  # Regenerate thumbnails only (scripts/generate-thumbs.mjs)
```

## Architecture

### Data Flow

```
albums.js (config) ──┬──> page.js (home) ──> getAlbumsWithCoverThumbs() ──> AlbumCard
                     └──> [slug]/page.js ──> generateStaticParams()
                                            getPhotosFromFolder() ──> AlbumPageClient ──> PhotoWall ──> Layout
```

- **Album config** (`src/config/albums.js`) — all albums with slug, title, layout type, cover, photosFolder, date
- **Server components** fetch photos at build time via `getPhotosFromFolder()`, which reads `manifest.json` for thumbnails/blurDataURL
- **Client components** (`"use client"`) handle interactivity: lightbox navigation, scroll animations, click effects

### Build Process

The `build` script in `package.json` runs `next build`. The `next.config.js` (not present as dedicated file, uses defaults) does not explicitly hook thumbs generation — thumbs are a separate `npm run thumbs` step, or the build output phase in `scripts/generate-thumbs.mjs` reads all `public/photos/*` subdirectories and generates:
- 400px-wide WebP thumbnails in `public/photos/{album}/.thumbs/`
- `manifest.json` per album: thumb paths, dimensions, 10px-wide base64 WebP blur data URLs

### Pages

- **`src/app/page.js`** — Server component. Home page with cinematic animations (stars, meteors, corner frames), timeline layout with album cards, wedding countdown. Fetches albums with cover thumbs via `getAlbumsWithCoverThumbs()`.
- **`src/app/albums/[slug]/page.js`** — Server component with `generateStaticParams`. Fetches photos from `getPhotosFromFolder()`, passes data to `AlbumPageClient` client component.

### Component Tree (Album Page)

```
[slug]/page.js (server, fetches photos)
  └── AlbumPageClient (client, manages lightboxIndex state)
      ├── AlbumHeader (logo + back button)
      ├── ScrollProgress (reading progress bar)
      ├── AlbumInfoSection (title, description, photo count)
      ├── PhotoWall (routes to layout based on album config)
      │   ├── Masonry (waterfall with film-perforation decoration)
      │   ├── Grid (uniform size grid)
      │   └── Timeline (left-right alternating)
      └── PhotoLightbox (full-screen viewer with keyboard nav, thumbnail strip)
```

### Components

- **`PhotoLightbox.js`** — Client component with keyboard navigation (arrow keys, Escape), thumbnail filmstrip (7 thumbnails centered on current), loads `<Image>` with blur placeholder from manifest data
- **`AlbumPageClient.js`** — State hub for album page: holds `lightboxIndex`, wires header + lightbox + photo wall
- **`AlbumCard.js`** — Client component with hover animations, used on home page timeline
- **`ScrollReveal.js`** — Client component using IntersectionObserver for scroll-triggered fade-in animations
- **`ScrollProgress.js`** — Reading progress indicator at top of album pages
- **`HeartMagic.js`** — Global client component in root layout. Click anywhere creates floating hearts + sparkle particles (auto-cleanup after 2s)
- **`Countdown.js`** — Animated flip-card countdown to wedding date (2026-09-26)
- **`AlbumHeader.js`** — Logo + back-to-home navigation at top of album pages

### Key Patterns

- **Server/Client split**: Data fetching in server components, state/interactivity in client components. Photos array flows server → client via props.
- **Photo objects** returned from `getPhotosFromFolder()`: `{ src, thumb, width, height, blurDataURL }` — used directly by `next/image` with `placeholder="blur"`
- **Path alias**: `@/*` maps to `src/*` (configured in `jsconfig.json`)

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Custom CSS**: `home.css` (home page animations), `albums.css` (lightbox, masonry, grid, timeline — all album-related styles), `globals.css` (global resets, scroll-reveal, heart-magic, flip-card, album-card)
- **Google Fonts**: Playfair Display (titles) + Lora (body) via `next/font/google` with CSS variables `--font-playfair`, `--font-lora`
- **Color palette**: Gold `#b48c50`, dark `#1a1a1a`, cream `#faf9f7`

### Linting

- ESLint 9 flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals`

## Adding a New Album

1. Add entry to `src/config/albums.js` with slug, title, description, layout, cover, photosFolder, date
2. Add photos to `public/photos/{folder}`
3. Run `npm run thumbs` to generate thumbnails and manifest
4. Run `npm run build` to rebuild with static generation
