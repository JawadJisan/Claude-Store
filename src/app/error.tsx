"use client";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <main className="page-container section flex flex-1 flex-col items-start justify-center gap-6">
      <p className="type-label text-muted">Something went wrong</p>
      <h1 className="max-w-2xl">We couldn’t load this page.</h1>
      <button type="button" className="btn btn-primary" onClick={() => retry()}>
        Try again
      </button>
    </main>
  );
}
