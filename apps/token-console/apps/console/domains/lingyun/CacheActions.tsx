/*
 * @Module : domains/lingyun/CacheActions — 缓存操作
 * @Family : 🎨 创想·灵韵
 */
"use client";

import { useLingyunClearAll, useLingyunInvalidate } from "./useLingyunCache";

export function CacheActions({ onMutated }: { onMutated?: () => void }) {
  const invalidate = useLingyunInvalidate();
  const clearAll = useLingyunClearAll();

  const handleInvalidate = () =>
    invalidate.mutate("gpt-4o", { onSuccess: () => onMutated?.() });
  const handleClearAll = () => {
    if (confirm("确认清空全部语义缓存？")) clearAll.mutate(undefined, { onSuccess: () => onMutated?.() });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleInvalidate}
        disabled={invalidate.isPending}
        className="h-10 px-4 rounded-md bg-brand-primary text-white disabled:opacity-50"
      >
        {invalidate.isPending ? "失效中…" : "失效 gpt-4o 缓存"}
      </button>
      <button
        onClick={handleClearAll}
        disabled={clearAll.isPending}
        className="h-10 px-4 rounded-md border border-status-danger text-status-danger disabled:opacity-50"
      >
        {clearAll.isPending ? "清空中…" : "清空全部"}
      </button>
      {(invalidate.isError || clearAll.isError) && (
        <p className="text-caption text-status-danger">操作失败，请重试</p>
      )}
    </div>
  );
}
