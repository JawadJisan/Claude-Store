export type Focus = { x: number; y: number; zoom: number };

// Width and quality are added per request by src/lib/image-loader.ts. Pass the
// frame's ratio so the CDN crops to it: a wide photo fitted into a tall frame
// otherwise displays much larger than the file next/image selects for it.
export function unsplash(id: string, ratio?: string, focus?: Focus) {
  const params = new URLSearchParams({ auto: "format", fit: "crop" });
  if (ratio) params.set("ar", ratio);
  if (focus) {
    params.set("crop", "focalpoint");
    params.set("fp-x", String(focus.x));
    params.set("fp-y", String(focus.y));
    params.set("fp-z", String(focus.zoom));
  }
  return `https://images.unsplash.com/photo-${id}?${params}`;
}
