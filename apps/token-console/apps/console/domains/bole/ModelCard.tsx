/*
 * @Module : domains/bole/ModelCard — 模型卡
 * @Family : 🎯 千里·伯乐
 * @座右铭 : 「千里马常有，而伯乐不常有」
 * @BIND   : GET /v1/models#{display_name,id,backend,max_tokens,cost_per_1k_tokens,enabled}
 *           GET /v1/models/stats#usage_count (join by model_id)
 */
"use client";

import { BackendBadge } from "./BackendBadge";
import type { ModelConfig, ModelStat } from "@/domains/_shared/types.gen";

export interface ModelCardProps {
  model: ModelConfig & { stat?: ModelStat };
  onClick?: () => void;
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  const isFree = model.cost_per_1k_tokens === 0;
  return (
    <article
      onClick={onClick}
      className="p-4 rounded-lg border border-border-default bg-bg-subtle hover:border-brand-primary transition-colors cursor-pointer"
    >
      <header className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="text-body-md font-semibold text-text-primary">
            {model.display_name}
          </h3>
          <code className="text-caption font-mono text-text-tertiary">
            {model.id}
          </code>
        </div>
        <BackendBadge backend={model.backend} />
      </header>

      <dl className="grid grid-cols-2 gap-2 text-caption mt-3">
        <div>
          <dt className="text-text-tertiary">最大 Token</dt>
          <dd className="font-mono">{model.max_tokens.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-text-tertiary">调用次数</dt>
          <dd className="font-mono">
            {(model.stat?.usage_count ?? 0).toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-text-tertiary">价格</dt>
          <dd className={isFree ? "text-status-success" : "font-mono"}>
            {isFree ? "本地免费 · 推荐自用" : `$${model.cost_per_1k_tokens}/1K`}
          </dd>
        </div>
        <div>
          <dt className="text-text-tertiary">状态</dt>
          <dd>
            <span
              className={
                model.enabled ? "text-status-success" : "text-text-tertiary"
              }
            >
              {model.enabled ? "● 启用" : "○ 禁用"}
            </span>
          </dd>
        </div>
      </dl>
    </article>
  );
}
