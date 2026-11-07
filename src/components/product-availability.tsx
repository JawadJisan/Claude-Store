import { AddToBagButton } from "@/components/add-to-bag-button";
import { getProductStock } from "@/lib/catalog";
import { getStockStatus } from "@/lib/product";

export async function ProductAvailability({ slug }: { slug: string }) {
  const status = getStockStatus({ stock: await getProductStock(slug) });

  return (
    <div className="flex flex-col gap-3">
      <p className="stock-status" data-state={status.state}>
        {status.label}
      </p>
      <AddToBagButton key={slug} isSoldOut={status.state === "sold-out"} />
    </div>
  );
}

/** Same height as the loaded block, so the page doesn't jump when stock arrives. */
export function ProductAvailabilitySkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <p className="stock-status invisible">In stock</p>
      <div className="flex flex-col gap-2">
        <div className="btn btn-lg btn-block cursor-default bg-surface" />
        <p className="field-hint" />
      </div>
    </div>
  );
}
