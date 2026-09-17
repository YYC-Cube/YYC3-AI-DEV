/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : domains/zongshi/KBCard — 知识库卡片
 * @Family : 📚 格物·宗师
 * ============================================================
 */
"use client";

import { cn } from "@/lib/utils";
import type { KnowledgeBase } from "./useZongshiRAG";

export function KBCard({
  kb,
  selected,
  onToggle,
}: {
  kb: KnowledgeBase;
  selected?: boolean;
  onToggle?: () => void;
}) {
  const body = (
    <article
      className={cn(
        "p-4 rounded-lg border bg-bg-subtle space-y-2 transition-colors",
        selected
          ? "border-brand-primary ring-1 ring-brand-primary"
          : "border-border-default",
        onToggle && "cursor-pointer hover:border-border-strong",
      )}
    >
      <header className="flex items-center gap-2">
        <span>📚</span>
        <h3 className="text-body-md font-semibold">{kb.name}</h3>
        {selected !== undefined && (
          <span className="ml-auto text-caption">
            {selected ? "✓ 已选入检索" : "未选"}
          </span>
        )}
      </header>
      {kb.description && (
        <p className="text-caption text-text-tertiary">{kb.description}</p>
      )}
      <p className="text-caption text-text-tertiary italic">
        建于 {new Date(kb.created_at).toLocaleDateString("zh-CN")}
      </p>
    </article>
  );

  return onToggle ? (
    <button type="button" onClick={onToggle} className="text-left w-full">
      {body}
    </button>
  ) : (
    body
  );
}
