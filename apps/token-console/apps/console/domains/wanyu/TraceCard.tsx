/*
 * @Module : domains/wanyu/TraceCard — 降级链路追溯
 * @Family : 🧭 言启·千行 + 🤔 语枢·万物（协同）
 */
"use client";

export function TraceCard({
  primary,
  degraded,
  fallback,
  latencyMs,
}: {
  primary: string;
  degraded: boolean;
  fallback?: string;
  latencyMs?: number;
}) {
  return (
    <div className="p-3 rounded-md border border-border-default bg-bg-subtle">
      <div className="text-caption text-text-tertiary mb-2">Upstream Trace</div>
      <div className="flex items-center gap-2 text-sm font-mono">
        <span className={degraded ? "text-status-danger" : "text-status-success"}>
          {primary} {degraded ? "✗" : "✓"}
        </span>
        {degraded && fallback && (
          <>
            <span className="text-text-tertiary">→</span>
            <span className="text-status-warning">{fallback} ✓</span>
          </>
        )}
        {latencyMs != null && (
          <span className="ml-auto text-caption text-text-tertiary">
            served in {Math.round(latencyMs)}ms
          </span>
        )}
      </div>
    </div>
  );
}
