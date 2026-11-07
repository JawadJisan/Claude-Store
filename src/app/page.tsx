import Image from "next/image";
import Link from "next/link";
import { PendingLink } from "@/components/pending-link";
import { ProductCard, SCROLLER_CARD_SIZES } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedCollections, getHomepageProducts } from "@/lib/catalog";
import {
  craftImage,
  heroImage,
  lookbookFeature,
  services,
  tailoringImages,
} from "@/lib/site-content";

const GRID_SIZES = "(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw";

// Tiles after the first sit in the second row on phones, so the lead collection
// reads large before the grid evens out at lg.
const COLLECTION_SPANS = [
  "col-span-4",
  "col-span-2 lg:col-span-4",
  "col-span-2 lg:col-span-4",
];

export default async function Home() {
  const [collections, newArrivals, bestSellers] = await Promise.all([
    getFeaturedCollections(),
    getHomepageProducts("new_arrivals"),
    getHomepageProducts("best_sellers"),
  ]);

  return (
    <main>
      <section className="hero theme-dark" aria-labelledby="hero-title">
        <Image
          className="hero-media object-[30%_12%]"
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          // A 4:3 photo cropped to fill the hero can be wider than the viewport.
          sizes="max(100vw, 133svh)"
          preload
        />
        <div className="hero-content flex flex-col items-start gap-5">
          <p className="type-label">Autumn–Winter Collection</p>
          <h1 id="hero-title" className="type-display max-w-3xl">
            Shape, held in shadow
          </h1>
          <p className="max-w-md">
            Sculptural outerwear and quiet leather, cut for the colder months.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/#new-arrivals" className="btn btn-primary">
              Shop New Arrivals
            </Link>
            <Link href="/#collections" className="btn btn-secondary">
              View Collections
            </Link>
          </div>
        </div>
      </section>

      <section id="collections" className="section page-container">
        <SectionHeading eyebrow="Collections" title="Begin with the essentials" />
        <div className="grid-layout gap-y-grid">
          {collections.map((collection, index) => (
            <PendingLink
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className={`editorial-tile theme-dark ${COLLECTION_SPANS[index]}`}
            >
              <Image
                src={collection.image.src}
                alt={collection.image.alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 64rem) 33vw, 100vw"
                    : "(min-width: 64rem) 33vw, 50vw"
                }
              />
              <span className="editorial-tile-caption">
                <span className="type-title">{collection.name}</span>
                <span className="type-body-sm hidden sm:block">
                  {collection.description}
                </span>
              </span>
            </PendingLink>
          ))}
        </div>
      </section>

      <section id="new-arrivals" className="page-container pb-section">
        <SectionHeading eyebrow="Just in" title="New Arrivals" />
        <div className="product-grid grid-flow-dense">
          {newArrivals.slice(0, 2).map((product) => (
            <ProductCard key={product.slug} product={product} sizes={GRID_SIZES} />
          ))}
          <PendingLink
            href="/collections/outerwear"
            className="product-grid-feature editorial-tile theme-dark md:aspect-auto"
          >
            <Image
              src={lookbookFeature.src}
              alt={lookbookFeature.alt}
              fill
              // Two rows tall above md, so it crops wider than its box.
              sizes="(min-width: 80rem) 60vw, (min-width: 48rem) 85vw, 100vw"
            />
            <span className="editorial-tile-caption">
              <span className="type-heading">The Winter Lookbook</span>
              <span className="type-label">Discover the edit</span>
            </span>
          </PendingLink>
          {newArrivals.slice(2).map((product) => (
            <ProductCard key={product.slug} product={product} sizes={GRID_SIZES} />
          ))}
        </div>
      </section>

      <section aria-labelledby="tailoring-title" className="relative theme-dark">
        <div className="split gap-0">
          {tailoringImages.map((image) => (
            <div key={image.src} className="relative aspect-editorial lg:max-h-[90svh] lg:w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="scrim-bottom absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 px-gutter py-section-tight">
          <p className="type-label">The Tailoring Edit</p>
          <h2 id="tailoring-title" className="type-headline max-w-2xl">
            Severe lines, softly worn
          </h2>
          <PendingLink href="/collections/tailoring" className="btn btn-secondary">
            Shop Tailoring
          </PendingLink>
        </div>
      </section>

      <section
        id="best-sellers"
        className="section"
        aria-labelledby="best-sellers-title"
      >
        <div className="page-container">
          <SectionHeading
            eyebrow="Most wanted"
            title="Best Sellers"
            titleId="best-sellers-title"
          />
        </div>
        <div className="scroller scroll-px-gutter px-gutter">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              sizes={SCROLLER_CARD_SIZES}
            />
          ))}
        </div>
      </section>

      <section id="craft" className="split gap-0 theme-dark">
        <div className="relative aspect-editorial lg:aspect-auto lg:min-h-[80svh]">
          <Image
            src={craftImage.src}
            alt={craftImage.alt}
            fill
            // A 3:2 photo cropped to a portrait frame renders wider than its box.
            sizes="(min-width: 64rem) 75vw, 190vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-5 px-gutter py-section">
          <p className="type-label">Our Craft</p>
          <h2 className="type-headline max-w-lg">Made slowly, by hand</h2>
          <p className="max-w-prose text-muted">
            Every bag begins on a single workbench. Hides are selected, cut, and
            saddle-stitched by one artisan from first panel to final edge, so
            each piece carries the marks of how it was made.
          </p>
          <PendingLink href="/about" className="btn btn-secondary mt-2">
            Inside the Workshop
          </PendingLink>
        </div>
      </section>

      <section aria-label="Client services" className="section-tight page-container">
        <ul className="grid gap-8 sm:grid-cols-3">
          {services.map((service) => (
            <li key={service.title} className="flex flex-col gap-2">
              <h2 className="type-label">{service.title}</h2>
              <p className="type-body-sm text-muted max-w-xs">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
