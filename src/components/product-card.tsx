import Image from "next/image";
import Link from "next/link";
import { formatPrice, getStockStatus, type Product } from "@/lib/product";

/** `sizes` for cards inside a .scroller row. */
export const SCROLLER_CARD_SIZES =
  "(min-width: 80rem) 24vw, (min-width: 48rem) 40vw, 70vw";

export function ProductCard({
  product,
  sizes,
}: {
  product: Product;
  sizes: string;
}) {
  const hoverImage = product.closeUps[0];
  const isSoldOut = getStockStatus(product).state === "sold-out";

  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card-media">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
        />
        {hoverImage && (
          <Image src={hoverImage.src} alt="" fill sizes={sizes} />
        )}
        {isSoldOut ? (
          <span className="badge absolute top-2 left-2 bg-background">
            Sold out
          </span>
        ) : (
          product.isNew && (
            <span className="badge absolute top-2 left-2 bg-background">New</span>
          )
        )}
      </div>
      <div className="product-card-body">
        <span className="product-card-name">{product.name}</span>
        <span className="product-card-price">{formatPrice(product.priceCents)}</span>
      </div>
    </Link>
  );
}
