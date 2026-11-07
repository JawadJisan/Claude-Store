import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-container section flex flex-1 flex-col items-start justify-center gap-6">
      <p className="type-label text-muted">Page not found</p>
      <h1 className="max-w-2xl">This page isn’t available yet.</h1>
      <Link href="/" className="btn btn-primary">
        Return to the homepage
      </Link>
    </main>
  );
}
