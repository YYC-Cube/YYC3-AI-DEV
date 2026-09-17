/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/domains/wanyu/DebugPanel.tsx
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位实现：Playground 调试面板（完整版待填充）
 */

import type { ChatState } from "./useWanyuChat";

export function DebugPanel({ state }: { state: ChatState }) {
  return (
    <div className="p-4 space-y-2 text-sm">
      <h3 className="font-semibold">调试信息</h3>
      <div>
        阶段: <code className="font-mono">{state.phase}</code>
      </div>
      {state.ttftMs !== undefined && <div>TTFT: {state.ttftMs}ms</div>}
      {state.totalMs !== undefined && <div>总耗时: {state.totalMs}ms</div>}
      {state.upstream && (
        <div>
          上游: <code className="font-mono">{state.upstream}</code>
        </div>
      )}
      {state.error && (
        <div className="text-status-danger">
          错误: {state.error.message} ({state.error.type})
        </div>
      )}
    </div>
  );
}
