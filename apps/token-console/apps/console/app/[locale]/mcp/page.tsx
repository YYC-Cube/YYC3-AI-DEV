/*
 * @Module : app/[locale]/mcp — MCP 工具编排（Client）
 * @Family : 🧠 元启·天枢
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { MCPToolTree } from "@/domains/tianshu/MCPToolTree";
import { MCPExecutor } from "@/domains/tianshu/MCPExecutor";

export default function MCPPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="MCP 编排" subtitle="天枢既定，万器归一" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <MCPToolTree />
        <MCPExecutor tool={null} />
      </div>
    </div>
  );
}
