import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { Picture } from "@/lib/product";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

// Declaration order is sort order: related products rely on it.
export const homepageSection = pgEnum("homepage_section", [
  "new_arrivals",
  "best_sellers",
]);

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  imageSrc: text("image_src"),
  imageAlt: text("image_alt"),
  /** Set to show the category as a homepage tile, in this order. */
  homepagePosition: integer("homepage_position"),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    details: text("details")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    priceCents: integer("price_cents").notNull(),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    /** The first image is the lead image. */
    images: jsonb("images").$type<Picture[]>().notNull(),
    isNew: boolean("is_new").notNull().default(false),
    homepageSection: homepageSection("homepage_section"),
    homepagePosition: integer("homepage_position"),
    ...timestamps,
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_cents_non_negative", sql`${table.priceCents} >= 0`),
    check(
      "products_stock_quantity_non_negative",
      sql`${table.stockQuantity} >= 0`,
    ),
    check(
      "products_images_not_empty",
      sql`jsonb_array_length(${table.images}) >= 1`,
    ),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
