/*
 * @Module : domains/bole/useBoleModels
 * @Family : 🎯 千里·伯乐 · 首席推荐官 · 0379-0109
 * @Domain : 模型市场域
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";
import type { ModelConfig, ModelStat } from "@/domains/_shared/types.gen";

export function useBoleModels() {
  return useQuery({
    queryKey: qk.bole.models(),
    queryFn: () => apiCall<ModelConfig[]>("/v1/models"),
    staleTime: 30_000,
  });
}

export function useBoleModelStats() {
  return useQuery({
    queryKey: qk.bole.modelStats(),
    queryFn: () => apiCall<ModelStat[]>("/v1/models/stats"),
    refetchInterval: 60_000,
  });
}

export function useBoleMergedModels() {
  const models = useBoleModels();
  const stats = useBoleModelStats();
  const statMap = new Map(stats.data?.map((s) => [s.model_id, s]));
  const merged = models.data?.map((m) => ({
    ...m,
    stat: statMap.get(m.id),
  }));
  return { data: merged, isLoading: models.isLoading || stats.isLoading };
}
