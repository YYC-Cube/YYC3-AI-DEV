/*
 * @Module : domains/guardian/TrustBadge — 预检连通徽章
 */
"use client";

import { cn } from "@/lib/utils";

export function TrustBadge({ ready, label }: { ready: boolean; label: string }) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center gap-2 px-3 py-2 rounded-md text-sm",
        ready
          ? "bg-status-success/10 text-status-success"
          : "bg-status-warning/10 text-status-warning",
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", ready ? "bg-status-success animate-pulse" : "bg-status-warning")} />
      {label}
    </div>
  );
}
