# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev`: start the dev server at http://localhost:3000
- `npm run build`: create a production build
- `npm run start`: serve the production build
- `npm run lint`: run ESLint
- `npx tsc --noEmit`: type-check (there is no script for this)
- `npm run db:generate`: create a SQL migration in `drizzle/` from `src/db/schema.ts`
- `npm run db:migrate`: apply pending migrations
- `npm run db:seed`: load the sample catalog (never overwrites existing rows)
- `npm run db:studio`: browse and edit data in Drizzle Studio

No test framework is configured, so there is no way to run tests yet.

## Current state

The homepage and product pages (`src/app/products/[slug]/page.tsx`) exist. Products, categories, and stock come from PostgreSQL. Links to routes not built yet (collections, bag, search, and others) use `PendingLink`, which turns off prefetching, and land on `src/app/not-found.tsx`. Swap each one for `next/link` as its route is built.

`AddToBagButton` is a placeholder until a cart exists. `better-auth` is installed but not used in any code yet.

## Database

- **Scope:** only products, categories, and stock. Don't add carts, orders, payments, reviews, wishlists, or product variants unless asked.
- **Schema conventions:**
  - Store money as integer cents (`price_cents`). USD only, so there is no currency column.
  - Stock is `products.stock_quantity`, not a separate table. Revisit this only when variants arrive.
  - Product images are `jsonb` on `products`, and the first is the lead image. Don't add tables for data nothing queries on its own.
  - Use integer IDs internally and slugs in URLs. IDs never reach the UI.
- **Migrations:** edit `src/db/schema.ts`, run `db:generate`, review the SQL in `drizzle/`, then run `db:migrate`. Never use `drizzle-kit push`. Migrations are forward-only.
- **Build order:** migrate, seed, then build. `next build` needs a reachable database with at least one product, because Cache Components rejects an empty `generateStaticParams`.
- **Seeding:** `db:seed` must never overwrite existing rows, so it can't reset real stock or prices.
- **Query boundaries:** all reads go through `src/lib/catalog.ts`, which is server-only. Client components import `src/lib/site-content.ts` and `src/lib/product.ts`, so neither may import the database.
- **Caching:** catalog queries use `'use cache'` with `cacheLife("minutes")`. `getProductStock` is deliberately uncached and must stay inside `<Suspense>`. Card badges use cached stock and may lag behind the product page.
- **Driver:** `drizzle-orm/neon-http` only works with Neon and has no transactions (`db.transaction` throws). Anything that changes stock atomically needs a connection-based driver.

## Architecture

- **Routing:** App Router, rooted at `src/app/`. The README's `app/page.tsx` path is out of date; the file is `src/app/page.tsx`.
- **Imports:** `@/*` resolves to `./src/*`.
- **Caching and rendering:** `next.config.ts` enables `cacheComponents` and `partialPrefetching`, which changes the defaults:
  - Data fetching is dynamic unless opted into caching with `use cache`, `cacheLife`, and `cacheTag`.
  - Routes prerender a static shell, and dynamic content streams in.
  - Do not export the `runtime` route segment config. Cache Components requires the Node.js runtime and does not support it.
  - Client navigation hides previous routes with React `<Activity>` instead of unmounting them, so state persists and effects re-run when a route becomes visible again.
  - Links prefetch one App Shell per route. `<Link prefetch={true}>` fetches more, and a segment can export `prefetch` to override the default.
- **Styling:** Tailwind CSS 4 has no `tailwind.config` or PostCSS config. It runs through the `@tailwindcss/turbopack` loader in `next.config.ts`. The whole design system lives in `src/app/globals.css`; read it before adding UI.
- **Images:** `next.config.ts` uses a custom loader, `src/lib/image-loader.ts`, so `next/image` requests resized files directly from Unsplash's CDN. Images from any other source, including `/public`, are served unoptimized until the loader is extended.
- **Fonts:** `layout.tsx` loads Geist (`font-sans`, the default), Newsreader (`font-display`, used by `h1`-`h3` and large `type-*` roles), and Geist Mono (`font-mono`).

## Design system rules

- Tailwind's default colors, text sizes, radii, and shadows are cleared on purpose, so classes like `bg-zinc-100`, `text-3xl`, `rounded-lg`, and `shadow-md` generate nothing. Use the semantic tokens (`bg-surface`, `text-muted`, `text-body-sm`) and `type-*` roles instead, and add new tokens to `globals.css` rather than using one-off values.
- Use the existing component classes (`btn`, `input`, `product-grid`, `product-card`, `site-header`, `page-container`, `section`, and others) before writing new markup styles.
- Color tokens use `light-dark()`. The build compiles it to variables that resolve where they are declared, so any new scheme scope must be added to the `:root, .theme-light, .theme-dark` selector or it will not switch.
- Tailwind's `dark:` variant follows the OS setting only and ignores `.theme-dark`. Prefer semantic tokens, which follow both.
