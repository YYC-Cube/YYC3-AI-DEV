/**
 * @file: register.ts
 * @description: plugin-ai 注册到 Shell（菜单与路由一对一，避免 404）
 */
import { Brain } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";

export function register(): SystemRegistration {
  return {
    id: "ai", name: "AI 智能", description: "决策/模型/诊断", icon: Brain, color: "#AA55FF", order: 32,
    menuItems: [
      { path: "/ai", label: "智能决策" },
      { path: "/ai/models", label: "模型配置" },
      { path: "/ai/diagnosis", label: "智能诊断" },
    ],
    routes: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/AISuggestion")).default }) },
      { path: "models", lazy: async () => ({ Component: (await import("./pages/AISuggestion")).default }) },
      { path: "diagnosis", lazy: async () => ({ Component: (await import("./pages/AISuggestion")).default }) },
    ],
    hubCommands: [
      { id: "ai-analyze", label: "AI 智能分析", systemId: "ai", icon: Brain, action: () => { window.location.hash = "#/ai"; } },
    ],
  };
}
