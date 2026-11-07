import { PendingLink } from "@/components/pending-link";
import { footerGroups, STORE_NAME } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container flex flex-col gap-12">
        <div className="footer-grid">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="type-label mb-3">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <PendingLink href={link.href} className="footer-link">
                      {link.label}
                    </PendingLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t pt-6 sm:flex-row sm:justify-between">
          <p className="font-display text-title">{STORE_NAME}</p>
          <p className="type-caption">
            Demonstration storefront with sample products. Photography from{" "}
            <a
              href="https://unsplash.com"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
