/*
 * @Module : app/dashboard/DashboardIsland — Client Island
 * @Family : 🔮 预见·先知
 */
"use client";

import { DashboardContent } from "@/domains/xianzhi/DashboardContent";

export interface DashboardFlags {
  showBilling: boolean;
  showRealCost: boolean;
  showLogs: boolean;
}

export function DashboardIsland({
  initialHealthz: _initialHealthz,
  flags,
}: {
  initialHealthz?: unknown;
  flags: DashboardFlags;
}) {
  // 首屏如果有 SSR 数据，可注入 hydrate 初值（可选）
  // flags 由服务端 RSC 解析后透传（灰度决策不在客户端）
  void flags;
  return <DashboardContent />;
}
