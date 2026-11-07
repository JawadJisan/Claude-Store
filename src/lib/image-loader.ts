"use client";

import type { ImageLoaderProps } from "next/image";

// Unsplash's CDN resizes and re-encodes on request, so images skip the Next.js
// optimizer. Other sources are returned unchanged and are not optimized: extend
// this when adding images hosted elsewhere or in /public.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
