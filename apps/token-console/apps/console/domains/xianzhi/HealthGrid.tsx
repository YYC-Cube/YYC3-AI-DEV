/*
 * @Module : domains/xianzhi/HealthGrid
 * @Family : 🔮 预见·先知
 * @BIND   : GET /health#services
 */
"use client";

import type { HealthResponse } from "@/domains/_shared/types.gen";

const COLOR = {
  healthy: "bg-status-success",
  unreachable: "bg-status-danger",
  configured: "bg-text-tertiary",
} as const;

const LABEL = {
  healthy: "健康",
  unreachable: "不可达",
  configured: "已配置",
} as const;

export function HealthGrid({ services }: { services: HealthResponse["services"] }) {
  return (
    <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
      <h3 className="text-body-md font-semibold mb-3">模型健康</h3>
      <ul className="space-y-2">
        {(Object.entries(services) as [string, { status: keyof typeof COLOR }][]).map(
          ([name, svc]) => (
            <li key={name} className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${COLOR[svc.status]}`} />
              <code className="font-mono">{name}</code>
              <span className="ml-auto text-caption text-text-tertiary">
                {LABEL[svc.status]}
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
