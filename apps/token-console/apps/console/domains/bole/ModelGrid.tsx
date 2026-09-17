/*
 * @Module : domains/bole/ModelGrid — 模型市场网格
 * @Family : 🎯 千里·伯乐
 */
"use client";

import { ModelCard } from "./ModelCard";
import { RecommendCard } from "./RecommendCard";
import { useBoleMergedModels } from "./useBoleModels";

export function ModelGrid() {
  const { data: models, isLoading } = useBoleMergedModels();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-lg bg-bg-subtle" />
        ))}
      </div>
    );
  }

  const enabled = models?.filter((m) => m.enabled) ?? [];
  const localFree = enabled.filter(
    (m) => m.cost_per_1k_tokens === 0 && m.stat && m.stat.usage_count > 0,
  );

  return (
    <div className="space-y-4">
      {localFree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localFree.slice(0, 1).map((m) => (
            <RecommendCard
              key={m.id}
              model={m}
              reason="本地运行 · 零成本 · 已有调用记录，适合作为日常默认模型"
            />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {models?.map((m) => <ModelCard key={m.id} model={m} />)}
      </div>
    </div>
  );
}
