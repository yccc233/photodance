@AGENTS.md

## Project Overview

PhotoDance is a photo gallery website built with Next.js 16.2.1 and React 19, using Tailwind CSS v4. It displays photo albums with multiple layout options (masonry, grid, timeline).

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Pages
- **`src/app/page.js`** - Home page displaying album cards with cinematic animations (stars, meteors, corner frames)
- **`src/app/albums/[slug]/page.js`** - Album detail page with `generateStaticParams` for static generation

### Components
- **`src/components/PhotoWall.js`** - Router component that renders layout based on album config (masonry/grid/timeline)
- **`src/components/layouts/`** - Layout implementations: `Masonry.js`, `Grid.js`, `Timeline.js`
- **`src/components/AlbumCard.js`** - Album card with hover animations (client component)

### Data Flow
1. Albums are configured in **`src/config/albums.js`** with slug, title, description, layout type, cover photo, and photos folder
2. **`src/lib/photos.js`** reads photos from `public/photos/{folder}` at build time
3. Static params are generated via `generateStaticParams` in the album page

### Styling
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) - utility-first CSS
- **Custom CSS** - `src/app/home.css` contains elaborate animations (stars, meteors, corner frames)
- **Google Fonts** - Playfair Display and Lora via `next/font/google`

### Key Responsive Considerations
- Home page uses `clamp()` for fluid typography and Tailwind responsive prefixes (`md:`, `lg:`)
- Corner frames in home.css use fixed positioning (`30px`, `55px`) - may need mobile-specific adjustments
- Masonry columns: `columns-2 md:columns-3 lg:columns-4`
