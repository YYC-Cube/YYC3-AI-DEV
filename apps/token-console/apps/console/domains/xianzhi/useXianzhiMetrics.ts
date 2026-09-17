/*
 * @Module : domains/xianzhi/useXianzhiMetrics
 * @Family : 🔮 预见·先知 · 首席预言家 · 0379-0108
 * @Domain : 观测与预测域
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";
import type {
  UsageSummary,
  ModelStat,
  ErrorRecord,
  HealthResponse,
} from "@/domains/_shared/types.gen";

export function useXianzhiSummary() {
  return useQuery({
    queryKey: qk.xianzhi.modelSummary(),
    queryFn: () => apiCall<UsageSummary>("/v1/models/summary"),
    refetchInterval: 60_000,
  });
}

export function useXianzhiStats() {
  return useQuery({
    queryKey: qk.bole.modelStats(),
    queryFn: () => apiCall<ModelStat[]>("/v1/models/stats"),
    refetchInterval: 60_000,
  });
}

export function useXianzhiErrors() {
  return useQuery({
    queryKey: qk.xianzhi.modelErrors(),
    queryFn: () => apiCall<ErrorRecord[]>("/v1/models/errors"),
    refetchInterval: 30_000,
  });
}

export function useXianzhiHealth() {
  return useQuery({
    queryKey: qk.xianzhi.health(),
    queryFn: () => apiCall<HealthResponse>("/health"),
    refetchInterval: 30_000,
  });
}

// 聚合
export function useXianzhiAggregate() {
  const summary = useXianzhiSummary();
  const stats = useXianzhiStats();
  const health = useXianzhiHealth();
  const errors = useXianzhiErrors();

  const avgLatency = stats.data?.length
    ? stats.data.reduce((a, s) => a + s.avg_latency_ms, 0) / stats.data.length
    : 0;
  const avgErrorRate = stats.data?.length
    ? stats.data.reduce((a, s) => a + s.error_rate, 0) / stats.data.length
    : 0;

  return {
    totalRequests: summary.data?.total_requests ?? 0,
    totalTokens: summary.data?.total_tokens ?? 0,
    costUsd: summary.data?.cost_usd ?? 0,
    avgLatencyMs: avgLatency,
    errorRate: avgErrorRate,
    cacheHitRate: health.data?.metrics.cache_hit_rate ?? 0,
    services: health.data?.services,
    system: health.data?.system,
    topErrors: errors.data?.slice(0, 5) ?? [],
    isLoading:
      summary.isLoading || stats.isLoading || health.isLoading || errors.isLoading,
  };
}
