/*
 * @Module : domains/xianzhi/DashboardContent — 04_Dashboard
 * @Family : 🔮 预见·先知
 */
"use client";

import { StatCard } from "./StatCard";
import { LatencyBar } from "./LatencyBar";
import { ErrorRateBadge } from "./ErrorRateBadge";
import { ErrorTable } from "./ErrorTable";
import { HealthGrid } from "./HealthGrid";
import { useXianzhiAggregate } from "./useXianzhiMetrics";

export function DashboardContent() {
  const d = useXianzhiAggregate();

  return (
    <div className="p-6 space-y-6">
      {/* StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          label="总请求"
          value={d.totalRequests.toLocaleString()}
          note="累计感知到的召唤"
        />
        <StatCard
          label="总 Token"
          value={d.totalTokens.toLocaleString()}
          note="累计交换的思想"
        />
        <StatCard
          label="总成本"
          value={`$${d.costUsd.toFixed(2)}`}
          note="预言家尚未学会计价"
          blBadge={d.costUsd === 0 ? "BL-02" : undefined}
        />
        <StatCard
          label="平均延迟"
          value={`${Math.round(d.avgLatencyMs)}ms`}
          note="思考的速度"
          tone={
            d.avgLatencyMs <= 100
              ? "success"
              : d.avgLatencyMs <= 500
              ? "warning"
              : "danger"
          }
        />
        <StatCard
          label="错误率"
          value={`${(d.errorRate * 100).toFixed(2)}%`}
          note="罕见的迷途"
          tone={d.errorRate < 0.01 ? "success" : d.errorRate < 0.05 ? "warning" : "danger"}
        />
        <StatCard
          label="缓存命中率"
          value={`${(d.cacheHitRate * 100).toFixed(1)}%`}
          note="灵感的复现"
        />
      </div>

      {/* Health + Errors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {d.services && <HealthGrid services={d.services} />}
        <ErrorTable errors={d.topErrors} />
      </div>
    </div>
  );
}
