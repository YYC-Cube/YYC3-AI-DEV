/**
 * @file: register.ts
 * @description: plugin-admin 注册到 Shell（菜单与路由一对一，避免 404）
 */
import { ShieldCheck } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";

export function register(): SystemRegistration {
  return {
    id: "admin", name: "系统管理", description: "设置/用户/安全", icon: ShieldCheck, color: "#FFDD00", order: 60,
    menuItems: [
      { path: "/admin", label: "审计日志" },
      { path: "/admin/settings", label: "系统设置" },
      { path: "/admin/users", label: "用户管理" },
      { path: "/admin/security", label: "安全监控" },
      { path: "/admin/pwa", label: "PWA 管理" },
    ],
    routes: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Audit")).default }) },
      { path: "settings", lazy: async () => ({ Component: (await import("./pages/Audit")).default }) },
      { path: "users", lazy: async () => ({ Component: (await import("./pages/Audit")).default }) },
      { path: "security", lazy: async () => ({ Component: (await import("./pages/Audit")).default }) },
      { path: "pwa", lazy: async () => ({ Component: (await import("./pages/Audit")).default }) },
    ],
    hubCommands: [
      { id: "admin-settings", label: "打开系统设置", systemId: "admin", icon: ShieldCheck, action: () => { window.location.hash = "#/admin"; } },
    ],
  };
}
