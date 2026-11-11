/**
 * @file: register.ts
 * @description: plugin-monitor 注册到 Shell（菜单与路由一对一，避免 404）
 */
import { Activity } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";

export function register(): SystemRegistration {
  return {
    id: "monitor", name: "监控中心", description: "实时监控与告警", icon: Activity, color: "#00d4ff", order: 12,
    menuItems: [
      { path: "/monitor", label: "数据监控" },
      { path: "/monitor/follow-up", label: "跟进事项" },
      { path: "/monitor/patrol", label: "巡检任务" },
      { path: "/monitor/alerts", label: "告警中心" },
    ],
    routes: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Dashboard")).default }) },
      { path: "follow-up", lazy: async () => ({ Component: (await import("./pages/Dashboard")).default }) },
      { path: "patrol", lazy: async () => ({ Component: (await import("./pages/Dashboard")).default }) },
      { path: "alerts", lazy: async () => ({ Component: (await import("./pages/Dashboard")).default }) },
    ],
    hubCommands: [
      { id: "mon-status", label: "查看集群状态", systemId: "monitor", icon: Activity, action: () => { window.location.hash = "#/monitor"; } },
    ],
  };
}
