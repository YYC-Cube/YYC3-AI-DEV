/*
 * @Module : domains/lingyun/CacheStatCard — 缓存统计卡
 * @Family : 🎨 创想·灵韵
 */
"use client";

export function CacheStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
      <div className="text-caption text-text-tertiary mb-1">{label}</div>
      <div className="text-heading-md font-semibold text-family-lingyun-accent">
        {value}
      </div>
    </div>
  );
}
