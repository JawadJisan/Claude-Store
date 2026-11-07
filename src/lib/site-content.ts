/*
 * Fixed site copy and editorial images. Catalog data lives in the database.
 * Client components import from this file, so it must never import the database.
 * Photos are from Unsplash (https://unsplash.com/license).
 */
import type { Picture } from "@/lib/product";
import { unsplash } from "@/lib/unsplash";

export const STORE_NAME = "Atelier Nord";

export const heroImage: Picture = {
  src: unsplash("1603189343302-e603f7add05a"),
  alt: "Model in an oversized black jacket, silhouetted against a white backdrop",
};

export const lookbookFeature: Picture = {
  src: unsplash("1608748010899-18f300247112"),
  alt: "Model in a beige coat and knit roll-neck, one hand raised to dark sunglasses",
};

export const tailoringImages: Picture[] = [
  {
    src: unsplash("1613915617430-8ab0fd7c6baf"),
    alt: "Black and white portrait of a model in a houndstooth blazer and black trousers",
  },
  {
    src: unsplash("1574015974293-817f0ebebb74"),
    alt: "Black and white portrait of a model in a black jacket, hair blown across the face",
  },
];

export const craftImage: Picture = {
  src: unsplash("1644258676710-ffb99d7d7a1b"),
  alt: "Leather offcuts and a curved cutting knife laid out on a dark workbench",
};

export const services = [
  {
    title: "Complimentary Delivery",
    description: "Tracked shipping on every order, packed in recycled boxes.",
  },
  {
    title: "30-Day Returns",
    description: "Send back unworn pieces within a month, free of charge.",
  },
  {
    title: "Care & Repair",
    description: "Reconditioning for leather goods and shoes, for life.",
  },
];

export const navigation = [
  { label: "New In", href: "/#new-arrivals" },
  { label: "Collections", href: "/#collections" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "Our Craft", href: "/#craft" },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Outerwear", href: "/collections/outerwear" },
      { label: "Leather Goods", href: "/collections/leather-goods" },
      { label: "Footwear", href: "/collections/footwear" },
      { label: "Tailoring", href: "/collections/tailoring" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Delivery", href: "/delivery" },
      { label: "Returns", href: "/returns" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Craft", href: "/#craft" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
