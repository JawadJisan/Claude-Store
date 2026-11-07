"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { PendingLink } from "@/components/pending-link";
import { navigation } from "@/lib/site-content";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  // A click on the dialog element itself can only be on its backdrop.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        className="nav-link cursor-pointer lg:hidden"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        Menu
      </button>
      <dialog
        ref={dialogRef}
        className="drawer"
        aria-label="Main menu"
        onClick={closeOnBackdrop}
      >
        <div className="drawer-panel">
          <button
            type="button"
            className="nav-link cursor-pointer self-start"
            onClick={close}
          >
            Close
          </button>
          <nav aria-label="Main menu" className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="type-heading"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <PendingLink href="/search" className="nav-link" onClick={close}>
            Search
          </PendingLink>
        </div>
      </dialog>
    </>
  );
}
