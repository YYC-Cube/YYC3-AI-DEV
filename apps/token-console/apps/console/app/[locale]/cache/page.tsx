/*
 * @Module : app/[locale]/cache — 语义缓存管理（Client）
 * @Family : 🎨 创想·灵韵
 */
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/family/PageHeader";
import { CacheStatCard } from "@/domains/lingyun/CacheStatCard";
import { CacheActions } from "@/domains/lingyun/CacheActions";
import { CacheRipple } from "@/domains/lingyun/CacheRipple";
import { useLingyunCacheStats } from "@/domains/lingyun/useLingyunCache";

export default function CachePage() {
  const stats = useLingyunCacheStats();
  // 灵韵涟漪触发器：每次失效/清空动作后 +1，激起缓存涟漪
  const [ripple, setRipple] = useState(0);

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
        <CacheRipple trigger={ripple} />
        <CacheActions onMutated={() => setRipple((r) => r + 1)} />
      </div>
    </div>
  );
}
