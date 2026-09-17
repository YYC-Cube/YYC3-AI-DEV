/*
 * @Module : domains/tianshu/useTianshuMCP
 * @Family : 🧠 元启·天枢 · 总指挥 · 0379-0206
 */
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";

export interface MCPTool {
  name: string;
  category: "local" | "web" | "github" | "filesystem" | "docker" | "database";
  description?: string;
  schema?: Record<string, unknown>;
}

export function useTianshuMCPTools() {
  return useQuery({
    queryKey: qk.tianshu.mcpTools(),
    queryFn: () => apiCall<MCPTool[]>("/v1/mcp/tools"),
  });
}

export function useTianshuMCPExecute() {
  return useMutation({
    mutationFn: (body: { tool: string; params: Record<string, unknown> }) =>
      apiCall<{ result: unknown; latency_ms: number; status: string }>(
        "/v1/mcp/execute",
        { method: "POST", body: JSON.stringify(body) },
      ),
  });
}
