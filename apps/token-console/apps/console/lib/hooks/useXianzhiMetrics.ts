export function useXianzhiMetrics() {          // 🔮 预见·先知
  return useQuery({
    queryKey: qk.xianzhi.modelSummary(),
    queryFn: () => api.get<UsageSummary>("/v1/models/summary"),
    refetchInterval: 60_000,
  });
}

// Phase 1 后端返回 cost_usd 真实值后，UI 无需改动
// 只需在 UI 中根据 cost_usd === 0 显示 BL-02 徽章

// apps/console/lib/hooks/useTimeline.ts（Phase 1 新增 · 🔮 预见）
export function useTimeline(range: DateRange) {
  return useQuery({
    queryKey: ["xianzhi", "usage", "timeline", range],
    queryFn: () => api.get<UsageTimeline[]>("/v1/usage/timeline", { params: range }),
    // Phase 0 时此 hook 返回 [singlePoint] 占位
    // Phase 1 时此 hook 自动返回真实时间序列
  });
}
