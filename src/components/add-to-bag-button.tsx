"use client";

import { useState } from "react";

/** The bag doesn't exist yet, so this says so instead of pretending to add. */
export function AddToBagButton({ isSoldOut }: { isSoldOut: boolean }) {
  const [wasClicked, setWasClicked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        disabled={isSoldOut}
        onClick={() => setWasClicked(true)}
      >
        {isSoldOut ? "Sold out" : "Add to Bag"}
      </button>
      <p role="status" className="field-hint">
        {wasClicked && "The bag isn’t available yet, so nothing was added."}
      </p>
    </div>
  );
}
