/*
 * @Module : domains/qianhang/useQianhangRouting
 * @Family : 🧭 言启·千行 · 首席导航员 · 0379-0106
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";

export interface UpstreamNode {
  name: string;
  base_url: string;
  models: string[];
  capability: string[];
  priority: number;
  weight: number;
  dynamic_weight: number;
  breaker_state: "closed" | "open" | "half_open";
  ewma_latency: number;
  ewma_error_rate: number;
  total_requests: number;
  total_failures: number;
  last_error?: string;
  load: number;
  capacity: number;
}

export function useQianhangRouterStats() {
  return useQuery({
    queryKey: qk.qianhang.routerStats(),
    queryFn: () => apiCall<{ nodes: UpstreamNode[] }>("/v1/router/stats"),
    refetchInterval: 15_000,
  });
}

export function useQianhangRouterHealth() {
  return useQuery({
    queryKey: qk.qianhang.routerHealth(),
    queryFn: () => apiCall<{ nodes: UpstreamNode[] }>("/v1/router/health"),
    enabled: false,
  });
}
