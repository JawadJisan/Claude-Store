import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * For links to routes that are not built yet. Prefetching them would only
 * produce 404 requests. Replace with next/link once the route exists.
 */
export function PendingLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
