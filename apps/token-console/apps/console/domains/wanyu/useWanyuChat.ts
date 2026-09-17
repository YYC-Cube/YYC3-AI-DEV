/*
 * @Module : domains/wanyu/useWanyuChat — SSE 七态状态机（v5.0 §1.5）
 * @Family : 🤔 语枢·万物 · 首席思考者 · 0379-0107
 * @Domain : 推理对话域
 */
"use client";

import { useCallback, useRef, useState } from "react";

export type ChatPhase =
  | "idle" | "connecting" | "streaming"
  | "paused" | "error" | "degraded" | "done";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatState {
  phase: ChatPhase;
  messages: ChatMessage[];
  buffer: string;
  upstream?: string;
  degraded: boolean;
  ttftMs?: number;
  totalMs?: number;
  error?: { message: string; type: string };
}

export function useWanyuChat() {
  const [state, setState] = useState<ChatState>({
    phase: "idle",
    messages: [],
    buffer: "",
    degraded: false,
  });
  const abortRef = useRef<AbortController | null>(null);
  const startedAtRef = useRef<number>(0);

  const send = useCallback(async (body: {
    model: string;
    messages: ChatMessage[];
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    stream?: boolean;
  }) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setState((s) => ({
      ...s,
      phase: "connecting",
      buffer: "",
      degraded: false,
      error: undefined,
      ttftMs: undefined,
      totalMs: undefined,
    }));
    startedAtRef.current = performance.now();

    try {
      const apiKey =
        sessionStorage.getItem("yyc3_api_key") ??
        localStorage.getItem("yyc3_api_key") ??
        "";
      const res = await fetch(
        "https://api.0379.world/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ ...body, stream: true }),
          signal: ac.signal,
        },
      );

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.detail?.message ?? `HTTP ${res.status}`);
      }

      const upstream = res.headers.get("X-YYC3-Upstream") ?? undefined;
      const degraded = res.headers.get("X-YYC3-Degraded") === "true";

      setState((s) => ({
        ...s,
        upstream,
        degraded,
        phase: degraded ? "degraded" : s.phase,
      }));

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let carry = "";
      let firstByte = true;
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        carry += text;
        const parts = carry.split("\n\n");
        carry = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const payload = part.slice(6).trim();
          if (payload === "[DONE]") {
            setState((s) => ({
              ...s,
              phase: "done",
              totalMs: performance.now() - startedAtRef.current,
              messages: [
                ...s.messages,
                { role: "assistant", content: acc },
              ],
              buffer: "",
            }));
            return;
          }
          try {
            const chunk = JSON.parse(payload);
            if (chunk.error) {
              setState((s) => ({
                ...s,
                phase: "error",
                error: {
                  message: chunk.error.message,
                  type: chunk.error.type,
                },
              }));
              continue;
            }
            if (chunk._yyc3_upstream && !upstream) {
              setState((s) => ({ ...s, upstream: chunk._yyc3_upstream }));
            }
            const delta = chunk?.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              if (firstByte) {
                firstByte = false;
                setState((s) => ({
                  ...s,
                  phase: s.degraded ? "degraded" : "streaming",
                  ttftMs: performance.now() - startedAtRef.current,
                }));
              }
              acc += delta;
              setState((s) => ({ ...s, buffer: acc }));
            }
          } catch {
            /* skip malformed */
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setState((s) => ({ ...s, phase: "paused" }));
        return;
      }
      setState((s) => ({
        ...s,
        phase: "error",
        error: {
          message: (err as Error).message,
          type: "stream_error",
        },
      }));
    }
  }, []);

  const stop = useCallback(() => abortRef.current?.abort(), []);

  return { state, send, stop };
}
