/*
 * @Module : domains/qianhang/BreakerBadge
 * @Family : 🧭 言启·千行
 */
"use client";

const STYLE = {
  closed:    "bg-status-success/15 text-status-success",
  open:      "bg-status-danger/15 text-status-danger",
  half_open: "bg-status-warning/15 text-status-warning",
} as const;

const TEXT = {
  closed: "闭合",
  open: "熔断",
  half_open: "半开",
} as const;

export function BreakerBadge({
  state,
}: {
  state: "closed" | "open" | "half_open";
}) {
  return (
    <span className={`px-2 py-0.5 rounded text-caption ${STYLE[state]}`}>
      {TEXT[state]}
    </span>
  );
}
