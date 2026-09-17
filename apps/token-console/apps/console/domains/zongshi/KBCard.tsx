/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : domains/zongshi/KBCard — 知识库卡片
 * @Family : 📚 格物·宗师
 * ============================================================
 */
"use client";

import type { KnowledgeBase } from "./useZongshiRAG";

export function KBCard({ kb }: { kb: KnowledgeBase }) {
  return (
    <article className="p-4 rounded-lg border border-border-default bg-bg-subtle space-y-2">
      <header className="flex items-center gap-2">
        <span>📚</span>
        <h3 className="text-body-md font-semibold">{kb.name}</h3>
      </header>
      {kb.description && (
        <p className="text-caption text-text-tertiary">{kb.description}</p>
      )}
      <p className="text-caption text-text-tertiary italic">
        建于 {new Date(kb.created_at).toLocaleDateString("zh-CN")}
      </p>
    </article>
  );
}
