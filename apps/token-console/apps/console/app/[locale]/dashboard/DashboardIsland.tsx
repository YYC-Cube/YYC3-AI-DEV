/*
 * @Module : app/dashboard/DashboardIsland — Client Island
 * @Family : 🔮 预见·先知
 */
"use client";

import { DashboardContent } from "@/domains/xianzhi/DashboardContent";

export function DashboardIsland({
  initialHealthz: _initialHealthz,
}: {
  initialHealthz?: unknown;
}) {
  // 首屏如果有 SSR 数据，可注入 hydrate 初值（可选）
  return <DashboardContent />;
}
