/**
 * @file: register.ts
 * @description: plugin-dev 注册到 Shell（菜单与路由一对一，避免 404）
 */
import { Code2 } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";

export function register(): SystemRegistration {
  return {
    id: "dev", name: "开发工具", description: "设计/终端/IDE", icon: Code2, color: "#E8E8E8", order: 50,
    menuItems: [
      { path: "/dev", label: "设计系统" },
      { path: "/dev/terminal", label: "终端" },
      { path: "/dev/ide", label: "IDE 面板" },
    ],
    routes: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/DesignSystem")).default }) },
      { path: "terminal", lazy: async () => ({ Component: (await import("./pages/DesignSystem")).default }) },
      { path: "ide", lazy: async () => ({ Component: (await import("./pages/DesignSystem")).default }) },
    ],
    hubCommands: [
      { id: "dev-terminal", label: "打开终端", systemId: "dev", icon: Code2, action: () => { window.location.hash = "#/dev"; } },
    ],
  };
}
