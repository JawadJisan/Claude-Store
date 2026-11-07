import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PendingLink } from "@/components/pending-link";
import {
  ProductAvailability,
  ProductAvailabilitySkeleton,
} from "@/components/product-availability";
import { ProductCard, SCROLLER_CARD_SIZES } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  getAllProductSlugs,
  getProduct,
  getRelatedProducts,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/product";
import { services } from "@/lib/site-content";

const LEAD_IMAGE_SIZES = "(min-width: 64rem) 58vw, (min-width: 48rem) 60vw, 88vw";
const CLOSE_UP_SIZES = "(min-width: 64rem) 29vw, (min-width: 48rem) 60vw, 88vw";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.slug, product.category.slug);

  return (
    <main>
      <article className="product-detail">
        <div
          role="group"
          aria-label={`Images of ${product.name}`}
          className="scroller product-gallery"
        >
          <div className="product-gallery-item">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes={LEAD_IMAGE_SIZES}
              preload
            />
          </div>
          {product.closeUps.map((closeUp) => (
            <div key={closeUp.src} className="product-gallery-item">
              <Image
                src={closeUp.src}
                alt={closeUp.alt}
                fill
                sizes={CLOSE_UP_SIZES}
              />
            </div>
          ))}
        </div>

        <div className="product-summary">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <PendingLink
                href={`/collections/${product.category.slug}`}
                className="nav-link text-muted"
              >
                {product.category.name}
              </PendingLink>
              {product.isNew && <span className="badge">New</span>}
            </div>
            <h1 className="type-heading">{product.name}</h1>
            <p className="type-title tabular-nums">
              {formatPrice(product.priceCents)}
            </p>
          </div>

          <Suspense fallback={<ProductAvailabilitySkeleton />}>
            <ProductAvailability slug={product.slug} />
          </Suspense>

          <p className="max-w-prose text-muted">{product.description}</p>

          <div>
            <details className="disclosure" open>
              <summary>Details</summary>
              <ul className="disclosure-body">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </details>
            <details className="disclosure">
              <summary>Delivery, Returns &amp; Care</summary>
              <ul className="disclosure-body">
                {services.map((service) => (
                  <li key={service.title}>{service.description}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </article>

      <section className="section" aria-labelledby="related-title">
        <div className="page-container">
          <SectionHeading
            eyebrow="Keep exploring"
            title="You May Also Like"
            titleId="related-title"
          />
        </div>
        <div className="scroller scroll-px-gutter px-gutter">
          {related.map((item) => (
            <ProductCard
              key={item.slug}
              product={item}
              sizes={SCROLLER_CARD_SIZES}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
