/**
 * @file: register.ts
 * @description: plugin-ops 注册到 Shell（菜单与路由一对一，避免 404）
 */
import { Wrench } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";

export function register(): SystemRegistration {
  return {
    id: "ops", name: "运维管理", description: "操作/文件/数据库", icon: Wrench, color: "#FF6600", order: 22,
    menuItems: [
      { path: "/ops", label: "操作中心" },
      { path: "/ops/files", label: "文件管理" },
      { path: "/ops/database", label: "数据库管理" },
      { path: "/ops/reports", label: "报表导出" },
    ],
    routes: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/OperationCenter")).default }) },
      { path: "files", lazy: async () => ({ Component: (await import("./pages/OperationCenter")).default }) },
      { path: "database", lazy: async () => ({ Component: (await import("./pages/OperationCenter")).default }) },
      { path: "reports", lazy: async () => ({ Component: (await import("./pages/OperationCenter")).default }) },
    ],
    hubCommands: [
      { id: "ops-backup", label: "执行数据备份", systemId: "ops", icon: Wrench, action: () => { window.location.hash = "#/ops"; } },
    ],
  };
}
