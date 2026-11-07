/* Catalog types and pure helpers. Safe to import from any component. */

export type Picture = {
  src: string;
  alt: string;
};

export type Category = {
  slug: string;
  name: string;
};

export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  category: Category;
  /** Units available. Read it through getStockStatus. */
  stock: number;
  description: string;
  details: string[];
  image: Picture;
  /** Tighter crops for the gallery. The first also shows on card hover. */
  closeUps: Picture[];
  isNew: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  image: Picture;
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
});

export const formatPrice = (priceCents: number) => usd.format(priceCents / 100);

const LOW_STOCK_THRESHOLD = 3;

export type StockState = "in-stock" | "low-stock" | "sold-out";

export function getStockStatus({ stock }: Pick<Product, "stock">): {
  state: StockState;
  label: string;
} {
  if (stock <= 0) return { state: "sold-out", label: "Sold out" };
  if (stock <= LOW_STOCK_THRESHOLD) {
    return { state: "low-stock", label: `Only ${stock} left` };
  }
  return { state: "in-stock", label: "In stock" };
}
