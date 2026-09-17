/*
 * @Module : domains/zongshi/KBGrid — 知识库网格
 * @Family : 📚 格物·宗师
 */
"use client";

import { KBCard } from "./KBCard";
import { useZongshiKBs } from "./useZongshiRAG";

export function KBGrid() {
  const { data: kbs, isLoading } = useZongshiKBs();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 animate-pulse">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-bg-subtle" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {kbs?.map((kb) => <KBCard key={kb.id} kb={kb} />)}
    </div>
  );
}
