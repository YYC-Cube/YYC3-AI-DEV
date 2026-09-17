/*
 * @Module : domains/xianzhi/ErrorTable
 * @Family : 🔮 预见·先知
 */
"use client";

import type { ErrorRecord } from "@/domains/_shared/types.gen";

const ERROR_COLOR = {
  timeout:    "text-status-warning",
  validation: "text-status-danger",
  quota:      "text-yellow-400",
  internal:   "text-text-tertiary",
} as const;

export function ErrorTable({ errors }: { errors: ErrorRecord[] }) {
  if (!errors.length) {
    return (
      <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
        <h3 className="text-body-md font-semibold mb-3">最近错误</h3>
        <p className="text-caption text-text-tertiary italic">
          「尚无历史数据，预言需要时间的积累」
        </p>
      </div>
    );
  }
  return (
    <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
      <h3 className="text-body-md font-semibold mb-3">最近错误</h3>
      <ul className="space-y-2">
        {errors.map((e) => (
          <li key={e.id} className="text-caption flex items-start gap-2">
            <span className={`font-mono ${ERROR_COLOR[e.error_type as keyof typeof ERROR_COLOR]}`}>
              [{e.error_type}]
            </span>
            <code className="text-text-secondary">{e.model_id}</code>
            <span className="text-text-primary flex-1 truncate">
              {e.message.slice(0, 60)}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-caption text-text-tertiary italic mt-3">
        「异常已现 · 预言家已记录」
      </p>
    </div>
  );
}
