/*
 * @Module : domains/xianzhi/StatCard
 * @Family : 🔮 预见·先知
 * @BIND   : GET /v1/models/summary#{total_requests,total_tokens,cost_usd}
 */
"use client";

export interface StatCardProps {
  label: string;
  value: string | number;
  note?: string;
  tone?: "default" | "success" | "warning" | "danger";
  blBadge?: string;
}

const TONE = {
  default: "text-text-primary",
  success: "text-status-success",
  warning: "text-status-warning",
  danger: "text-status-danger",
} as const;

export function StatCard({
  label,
  value,
  note,
  tone = "default",
  blBadge,
}: StatCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
      <div className="text-caption text-text-tertiary mb-1">{label}</div>
      <div className={`text-h2 font-semibold ${TONE[tone]}`}>{value}</div>
      {note && (
        <div className="text-caption text-text-tertiary mt-1 italic">
          {note}
        </div>
      )}
      {blBadge && (
        <span className="inline-block mt-2 px-1.5 py-0.5 text-caption rounded bg-status-warning/20 text-status-warning">
          {blBadge}
        </span>
      )}
    </div>
  );
}
