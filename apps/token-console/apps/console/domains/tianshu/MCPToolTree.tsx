/*
 * @Module : domains/tianshu/MCPToolTree — MCP 工具树
 * @Family : 🧠 元启·天枢
 */
"use client";

import { useTianshuMCPTools } from "./useTianshuMCP";

export function MCPToolTree({ onSelect }: { onSelect?: (tool: string) => void }) {
  const { data: tools, isLoading } = useTianshuMCPTools();

  if (isLoading) {
    return <div className="h-72 rounded-lg bg-bg-subtle animate-pulse" />;
  }

  const byCategory = new Map<string, typeof tools>();
  tools?.forEach((t) => {
    const list = byCategory.get(t.category) ?? [];
    list.push(t);
    byCategory.set(t.category, list);
  });

  return (
    <aside className="p-3 rounded-lg border border-border-default bg-bg-subtle space-y-3 overflow-y-auto max-h-[70vh]">
      {[...byCategory.entries()].map(([category, list]) => (
        <div key={category}>
          <h3 className="text-caption text-text-tertiary uppercase tracking-wide mb-1">
            {category}
          </h3>
          <ul className="space-y-1">
            {list?.map((t) => (
              <li key={t.name}>
                <button
                  onClick={() => onSelect?.(t.name)}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-bg-elevated text-body-sm"
                  title={t.description}
                >
                  <code className="font-mono">{t.name}</code>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
