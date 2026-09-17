/*
 * @Module : domains/qianhang/UpstreamGrid — 上游节点网格
 * @Family : 🧭 言启·千行
 */
"use client";

import { UpstreamCard } from "./UpstreamCard";
import { useQianhangRouterStats } from "./useQianhangRouting";

export function UpstreamGrid() {
  const { data, isLoading } = useQianhangRouterStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-bg-subtle" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {data?.nodes.map((node) => (
        <UpstreamCard key={node.name} node={node} />
      ))}
    </div>
  );
}
