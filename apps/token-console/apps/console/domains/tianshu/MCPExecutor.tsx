/*
 * @Module : domains/tianshu/MCPExecutor
 * @Family : 🧠 元启·天枢
 * @座右铭 : 「天枢运于中，众星拱其北」
 */
"use client";

import { useState } from "react";
import { JsonViewer } from "./JsonViewer";
import { ParamEditor } from "./ParamEditor";
import { useTianshuMCPExecute } from "./useTianshuMCP";
import type { MCPTool } from "./useTianshuMCP";

export function MCPExecutor({ tool }: { tool: MCPTool | null }) {
  const [params, setParams] = useState<Record<string, unknown>>({});
  const exec = useTianshuMCPExecute();

  if (!tool) {
    return (
      <div className="p-8 text-center text-text-tertiary">
        「待命中，请选择一件工具」
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header>
        <h3 className="text-body-md font-semibold">{tool.name}</h3>
        <p className="text-caption text-text-tertiary">{tool.description}</p>
      </header>

      <ParamEditor schema={tool.schema} value={params} onChange={setParams} />

      <button
        onClick={() => exec.mutate({ tool: tool.name, params })}
        disabled={exec.isPending}
        className="h-10 px-4 rounded-md bg-brand-primary text-white"
      >
        {exec.isPending ? "执行中…" : "调用"}
      </button>

      <p className="text-caption text-text-tertiary italic">
        {exec.isPending && `「调用 ${tool.name} · 参数已核 · 开始执行」`}
        {exec.data &&
          `「${tool.name} 执行完毕 · ${exec.data.latency_ms}ms · ${exec.data.status}」`}
      </p>

      {exec.data && <JsonViewer data={exec.data.result} />}
      {exec.error && (
        <p className="text-status-danger text-sm">
          号令受阻 · {(exec.error as Error).message}
        </p>
      )}
    </div>
  );
}
