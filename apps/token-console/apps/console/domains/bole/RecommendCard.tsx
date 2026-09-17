/*
 * @Module : domains/bole/RecommendCard — 情感组件
 * @Family : 🎯 千里·伯乐
 */
"use client";

import type { ModelConfig } from "@/domains/_shared/types.gen";

export function RecommendCard({
  model,
  reason,
}: {
  model: ModelConfig;
  reason: string;
}) {
  return (
    <aside className="p-3 rounded-md border border-family-bole-accent/30 bg-family-bole-primary/5">
      <div className="flex items-center gap-2 mb-1">
        <span>🎯</span>
        <span className="text-caption text-text-tertiary">千里·伯乐 荐才</span>
      </div>
      <p className="text-body-sm">
        为当前任务推荐 <strong>{model.display_name}</strong>
        <code className="ml-2 text-caption">（{model.backend}）</code>
      </p>
      <p className="text-caption text-text-tertiary mt-1">{reason}</p>
    </aside>
  );
}
