/*
 * @Module : app/[locale]/cache — 语义缓存管理（Client）
 * @Family : 🎨 创想·灵韵
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { CacheStatCard } from "@/domains/lingyun/CacheStatCard";
import { CacheActions } from "@/domains/lingyun/CacheActions";
import { CacheRipple } from "@/domains/lingyun/CacheRipple";
import { useLingyunCacheStats } from "@/domains/lingyun/useLingyunCache";

export default function CachePage() {
  const stats = useLingyunCacheStats();

  return (
    <div className="min-h-screen">
      <PageHeader title="灵感缓存" subtitle="灵感的复现，省下每一次思考" />
      <div className="p-6 space-y-6">
        {stats.data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <CacheStatCard
              label="命中率"
              value={`${(stats.data.hit_rate * 100).toFixed(1)}%`}
            />
            <CacheStatCard
              label="缓存条目"
              value={stats.data.entries.toLocaleString()}
            />
            <CacheStatCard
              label="TTL"
              value={`${Math.round(stats.data.ttl_seconds / 60)} 分钟`}
            />
          </div>
        )}
        <CacheRipple trigger={0} />
        <CacheActions />
      </div>
    </div>
  );
}
