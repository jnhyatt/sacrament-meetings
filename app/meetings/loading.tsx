export default function Loading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading meetings…</span>
      <div className="grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded-card border-line bg-surface shadow-card border p-5">
            <div className="bg-surface-muted h-3 w-32 rounded" />
            <div className="bg-surface-muted mt-4 h-6 w-3/4 rounded" />
            <div className="mt-5 space-y-2">
              <div className="bg-surface-muted h-3.5 w-full rounded" />
              <div className="bg-surface-muted h-3.5 w-5/6 rounded" />
            </div>
            <div className="bg-surface-muted mt-6 h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
