/*
 * @Module : domains/xianzhi/LatencyBar
 * @Family : 🔮 预见·先知
 */
export function LatencyBar({ ms }: { ms: number }) {
  const tone =
    ms <= 100 ? "bg-status-success" : ms <= 500 ? "bg-status-warning" : "bg-status-danger";
  const pct = Math.min(100, (ms / 1000) * 100);
  return (
    <div className="w-full h-1.5 rounded bg-bg-elevated overflow-hidden">
      <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
