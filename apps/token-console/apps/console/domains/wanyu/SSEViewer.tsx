/*
 * @Module : domains/wanyu/SSEViewer — 流式查看器
 * @Family : 🤔 语枢·万物
 * @座右铭 : 「语枢一启，万物皆明」
 */
"use client";

import { ThoughtBubble } from "./ThoughtBubble";
import { MessageBubble } from "./MessageBubble";
import type { ChatState } from "./useWanyuChat";

export function SSEViewer({ state }: { state: ChatState }) {
  const streaming = state.phase === "streaming" || state.phase === "degraded";
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {state.messages.map((m, i) => (
        <MessageBubble key={i} message={m} />
      ))}
      {state.buffer && (
        <MessageBubble
          message={{ role: "assistant", content: state.buffer }}
          streaming={streaming}
        />
      )}
      {state.phase === "connecting" && <ThoughtBubble />}
      {state.phase === "degraded" && state.upstream && (
        <div className="text-caption text-status-warning">
          「原路径受阻，改由 {state.upstream} 继续思考」
        </div>
      )}
      {state.phase === "done" && (
        <div className="text-caption text-text-tertiary">
          「思考完毕 · {state.buffer.length >> 2} tokens · {Math.round(state.totalMs ?? 0)}ms」
        </div>
      )}
      {state.phase === "error" && state.error && (
        <div className="p-3 rounded-md bg-status-danger/10 text-status-danger text-sm">
          思绪中断：{state.error.type} · {state.error.message}
        </div>
      )}
    </div>
  );
}
