/*
 * @Module : domains/qianhang/UpstreamCard
 * @Family : 🧭 言启·千行
 * @座右铭 : 「一言既出，千行可至」
 */
"use client";

import { BreakerBadge } from "./BreakerBadge";
import type { UpstreamNode } from "./useQianhangRouting";

export function UpstreamCard({ node }: { node: UpstreamNode }) {
  const loadPct = node.capacity ? (node.load / node.capacity) * 100 : 0;
  return (
    <article className="p-4 rounded-lg border border-border-default bg-bg-subtle space-y-3">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-body-md">{node.name}</h3>
          <code className="text-caption text-text-tertiary">{node.base_url}</code>
        </div>
        <BreakerBadge state={node.breaker_state} />
      </header>

      <dl className="grid grid-cols-2 gap-2 text-caption">
        <div>
          <dt className="text-text-tertiary">动态权重</dt>
          <dd className="font-mono">{node.dynamic_weight.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-text-tertiary">EWMA 延迟</dt>
          <dd className="font-mono">{Math.round(node.ewma_latency)}ms</dd>
        </div>
        <div>
          <dt className="text-text-tertiary">错误率</dt>
          <dd className="font-mono">{(node.ewma_error_rate * 100).toFixed(2)}%</dd>
        </div>
        <div>
          <dt className="text-text-tertiary">负载</dt>
          <dd className="font-mono">
            {node.load}/{node.capacity}
          </dd>
        </div>
      </dl>

      <div className="w-full h-1 rounded bg-bg-elevated overflow-hidden">
        <div
          className="h-full bg-brand-primary"
          style={{ width: `${loadPct}%` }}
        />
      </div>

      {node.last_error && (
        <p className="text-caption text-status-danger truncate" title={node.last_error}>
          {node.last_error}
        </p>
      )}
    </article>
  );
}
