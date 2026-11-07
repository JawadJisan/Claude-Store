/*
 * Loads the sample catalog: npm run db:seed
 * Existing rows are never overwritten, so re-running can't reset edited stock
 * or prices. It also means changes to seed-data.ts need a database reset.
 */
import { loadEnvConfig } from "@next/env";
import { neon } from "@neondatabase/serverless";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, products } from "@/db/schema";
import { seedCategories, seedProducts } from "@/db/seed-data";

async function main() {
  loadEnvConfig(process.cwd());

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Add it to .env.local.");

  const db = drizzle(neon(url));

  await db
    .insert(categories)
    .values(seedCategories)
    .onConflictDoNothing({ target: categories.slug });

  const categoryRows = await db
    .select({ id: categories.id, slug: categories.slug })
    .from(categories);
  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  await db
    .insert(products)
    .values(
      seedProducts.map(({ categorySlug, ...product }) => {
        const categoryId = categoryIds.get(categorySlug);
        if (categoryId === undefined) {
          throw new Error(`Unknown category "${categorySlug}"`);
        }
        return { ...product, categoryId };
      }),
    )
    .onConflictDoNothing({ target: products.slug });

  const [categoryCount] = await db.select({ total: count() }).from(categories);
  const [productCount] = await db.select({ total: count() }).from(products);
  console.log(
    `Seeded. Database now has ${categoryCount.total} categories and ${productCount.total} products.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
