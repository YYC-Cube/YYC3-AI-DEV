/*
 * @Module : app/[locale]/dashboard/loading — Suspense fallback
 * @Family : 🔮 预见·先知
 */
export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-24 bg-bg-subtle rounded-lg" />
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-bg-subtle rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64 bg-bg-subtle rounded-lg" />
        <div className="h-64 bg-bg-subtle rounded-lg" />
      </div>
    </div>
  );
}
