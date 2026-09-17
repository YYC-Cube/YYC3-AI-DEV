/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/hooks/useXianzhiMetrics — 🔮 预见·先知 · 用量指标
 * ============================================================
 */
import { useQuery } from "@tanstack/react-query";
import { qk } from "@/lib/queryKeys";
import { apiCall } from "@/domains/_shared/ApiClient";
import type { UsageSummary } from "@/domains/_shared/types.gen";

export function useXianzhiMetrics() {
  return useQuery({
    queryKey: qk.xianzhi.modelSummary(),
    queryFn: () => apiCall<UsageSummary>("/v1/models/summary"),
    refetchInterval: 60_000,
  });
}

// Phase 1 后端返回 cost_usd 真实值后，UI 无需改动
// 只需在 UI 中根据 cost_usd === 0 显示 BL-02 徽章

// apps/console/lib/hooks/useTimeline.ts（Phase 1 新增 · 🔮 预见）
export function useTimeline(range: { start: string; end: string }) {
  return useQuery({
    queryKey: ["xianzhi", "usage", "timeline", range] as const,
    queryFn: () =>
      apiCall<unknown[]>("/v1/usage/timeline", {
        method: "GET",
        // Phase 0 时此 hook 返回 [singlePoint] 占位
        // Phase 1 时此 hook 自动返回真实时间序列
      }),
    enabled: Boolean(range.start && range.end),
  });
}
