export function ClassCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-600 bg-ink-900">
      <div className="skeleton aspect-[16/10]" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="flex justify-between pt-2">
          <div className="skeleton h-6 w-12 rounded" />
          <div className="skeleton h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-lg border border-ink-600 bg-ink-900 p-4">
          <div className="skeleton h-4 w-1/4 rounded" />
          <div className="skeleton h-4 w-1/4 rounded" />
          <div className="skeleton h-4 w-1/6 rounded" />
          <div className="skeleton h-4 w-1/6 rounded" />
        </div>
      ))}
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="rounded-xl border border-ink-600 bg-ink-900 p-6">
      <div className="skeleton h-4 w-1/2 rounded mb-3" />
      <div className="skeleton h-8 w-1/4 rounded" />
    </div>
  );
}
