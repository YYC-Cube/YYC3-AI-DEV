/*
 * @Module : app/[locale]/monitor/loading — Suspense fallback
 * @Family : 🔮 预见·先知
 */
export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-16 bg-bg-subtle rounded-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-72 bg-bg-subtle rounded-lg" />
        <div className="h-72 bg-bg-subtle rounded-lg" />
      </div>
    </div>
  );
}
