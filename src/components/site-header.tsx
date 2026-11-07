import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { PendingLink } from "@/components/pending-link";
import { navigation, STORE_NAME } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-start">
        <MobileMenu />
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <Link
        href="/"
        className="whitespace-nowrap font-display text-title tracking-wide lg:text-heading"
      >
        {STORE_NAME}
      </Link>
      <div className="site-header-end">
        <PendingLink href="/search" className="nav-link hidden sm:inline-flex">
          Search
        </PendingLink>
        <PendingLink href="/bag" className="nav-link">
          Bag (0)
        </PendingLink>
      </div>
    </header>
  );
}
