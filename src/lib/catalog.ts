import "server-only";
import { and, eq, isNotNull, sql } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { connection } from "next/server";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Category, Collection, Product } from "@/lib/product";

/*
 * Everything except getProductStock is cached and joins the prerendered shell.
 * There is no admin UI to invalidate entries yet, so the short "minutes" profile
 * is what makes direct database edits appear.
 */
const CACHE_PROFILE = "minutes";

const productQuery = {
  columns: {
    slug: true,
    name: true,
    description: true,
    details: true,
    priceCents: true,
    stockQuantity: true,
    images: true,
    isNew: true,
  },
  with: { category: { columns: { slug: true, name: true } } },
} as const;

type ProductRow = Pick<
  typeof products.$inferSelect,
  keyof typeof productQuery.columns
> & { category: Category };

function toProduct({ stockQuantity, images, ...fields }: ProductRow): Product {
  const [image, ...closeUps] = images;
  return { ...fields, stock: stockQuantity, image, closeUps };
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  "use cache";
  cacheLife(CACHE_PROFILE);

  const rows = await db
    .select({
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
      imageSrc: categories.imageSrc,
      imageAlt: categories.imageAlt,
    })
    .from(categories)
    .where(
      and(
        isNotNull(categories.homepagePosition),
        isNotNull(categories.description),
        isNotNull(categories.imageSrc),
        isNotNull(categories.imageAlt),
      ),
    )
    .orderBy(categories.homepagePosition)
    .limit(3);

  return rows.map(({ slug, name, description, imageSrc, imageAlt }) => ({
    slug,
    name,
    description: description ?? "",
    image: { src: imageSrc ?? "", alt: imageAlt ?? "" },
  }));
}

export async function getHomepageProducts(
  section: "new_arrivals" | "best_sellers",
): Promise<Product[]> {
  "use cache";
  cacheLife(CACHE_PROFILE);

  const rows = await db.query.products.findMany({
    ...productQuery,
    where: eq(products.homepageSection, section),
    orderBy: products.homepagePosition,
  });
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife(CACHE_PROFILE);

  const row = await db.query.products.findFirst({
    ...productQuery,
    where: eq(products.slug, slug),
  });
  return row ? toProduct(row) : null;
}

/** Available products, the same category first. */
export async function getRelatedProducts(
  slug: string,
  categorySlug: string,
  count = 4,
): Promise<Product[]> {
  "use cache";
  cacheLife(CACHE_PROFILE);

  const rows = await db.query.products.findMany({
    ...productQuery,
    where: (product, { and, gt, ne }) =>
      and(ne(product.slug, slug), gt(product.stockQuantity, 0)),
    orderBy: (product, { asc }) => [
      sql`${product.categoryId} = (select ${categories.id} from ${categories} where ${categories.slug} = ${categorySlug}) desc`,
      sql`${product.homepageSection} asc nulls last`,
      asc(product.homepagePosition),
      asc(product.slug),
    ],
    limit: count,
  });
  return rows.map(toProduct);
}

export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife(CACHE_PROFILE);

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

/** Not cached: the product page shows this next to the buy button. */
export async function getProductStock(slug: string): Promise<number> {
  await connection();

  const [row] = await db
    .select({ stock: products.stockQuantity })
    .from(products)
    .where(eq(products.slug, slug));
  return row?.stock ?? 0;
}
