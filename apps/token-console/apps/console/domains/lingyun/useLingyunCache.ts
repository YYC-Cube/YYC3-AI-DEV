/*
 * @Module : domains/lingyun/useLingyunCache
 * @Family : 🎨 创想·灵韵 · 首席创意官 · 0379-0209
 */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";

export interface CacheStats {
  hit_rate: number;
  entries: number;
  ttl_seconds: number;
}

export function useLingyunCacheStats() {
  return useQuery({
    queryKey: qk.lingyun.cacheStats(),
    queryFn: () => apiCall<CacheStats>("/v1/cache/stats"),
    refetchInterval: 60_000,
  });
}

export function useLingyunInvalidate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (model: string) =>
      apiCall(`/v1/cache/invalidate/${model}`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.lingyun.cacheStats() }),
  });
}

export function useLingyunClearAll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiCall("/v1/cache/all", { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.lingyun.cacheStats() }),
  });
}
