/*
 * @Module : app/playground/PlaygroundLayout — 响应式三栏
 * @Family : 🤔 语枢·万物
 */
"use client";

import { useState } from "react";
import { ParamPanel } from "@/domains/wanyu/ParamPanel";
import { SSEViewer } from "@/domains/wanyu/SSEViewer";
import { DebugPanel } from "@/domains/wanyu/DebugPanel";
import { useWanyuChat } from "@/domains/wanyu/useWanyuChat";
import { cn } from "@/lib/utils";

type MobileTab = "params" | "chat" | "debug";

export function PlaygroundLayout() {
  const { state, send, stop } = useWanyuChat();
  // 快捷发送：单条输入直接作为 user 消息（模型/采样参数走默认契约）
  const sendText = (input: string) =>
    void send({ model: "gpt-4o", messages: [{ role: "user", content: input }], stream: true });
  const [tab, setTab] = useState<MobileTab>("chat");

  return (
    <>
      {/* ≥lg: 三栏 */}
      <div className="hidden lg:flex h-[calc(100vh-4rem)]">
        <aside className="w-72 border-r border-border-default overflow-y-auto">
          <ParamPanel onSubmit={sendText} />
        </aside>
        <main className="flex-1 flex flex-col min-w-0">
          <SSEViewer state={state} />
        </main>
        <aside className="w-80 border-l border-border-default overflow-y-auto">
          <DebugPanel state={state} />
        </aside>
      </div>

      {/* md: 两栏（参数折叠为顶部 Tab） */}
      <div className="hidden md:flex lg:hidden h-[calc(100vh-4rem)]">
        <main className="flex-1 flex flex-col min-w-0">
          <SSEViewer state={state} />
        </main>
        <aside className="w-80 border-l border-border-default overflow-y-auto">
          <DebugPanel state={state} />
        </aside>
      </div>

      {/* <md: Tab 切换 */}
      <div className="md:hidden flex flex-col h-[calc(100dvh-3rem)]">
        <div
          role="tablist"
          className="flex border-b border-border-default sticky top-0 bg-bg-default z-10"
        >
          {(
            [
              ["params", "参数"],
              ["chat", "对话"],
              ["debug", "调试"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={cn(
                "flex-1 h-11 text-body-sm",
                tab === k
                  ? "text-brand-primary border-b-2 border-brand-primary"
                  : "text-text-tertiary",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden">
          {tab === "params" && (
            <div className="h-full overflow-y-auto">
              <ParamPanel onSubmit={sendText} />
            </div>
          )}
          {tab === "chat" && (
            <div className="h-full flex flex-col">
              <SSEViewer state={state} />
              {(state.phase === "streaming" || state.phase === "degraded") && (
                <button
                  onClick={stop}
                  className="self-center my-2 w-32 h-11 rounded-md border border-status-danger text-status-danger"
                >
                  停止
                </button>
              )}
            </div>
          )}
          {tab === "debug" && (
            <div className="h-full overflow-y-auto">
              <DebugPanel state={state} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
