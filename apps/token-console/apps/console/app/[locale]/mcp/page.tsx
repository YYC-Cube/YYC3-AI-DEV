/*
 * @Module : app/[locale]/mcp — MCP 工具编排（Client）
 * @Family : 🧠 元启·天枢
 */
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/family/PageHeader";
import { MCPToolTree } from "@/domains/tianshu/MCPToolTree";
import { MCPExecutor } from "@/domains/tianshu/MCPExecutor";
import type { MCPTool } from "@/domains/tianshu/useTianshuMCP";

export default function MCPPage() {
  // 天枢编排：左树选中工具 → 右侧执行器加载参数 Schema
  const [tool, setTool] = useState<MCPTool | null>(null);

  return (
    <div className="min-h-screen">
      <PageHeader title="MCP 编排" subtitle="天枢既定，万器归一" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <MCPToolTree onSelect={setTool} />
        <MCPExecutor tool={tool} />
      </div>
    </div>
  );
}
