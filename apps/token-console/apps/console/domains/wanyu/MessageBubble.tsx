/*
 * @Module : domains/wanyu/MessageBubble
 */
"use client";

import type { ChatMessage } from "./useWanyuChat";

export function MessageBubble({
  message,
  streaming,
}: {
  message: ChatMessage;
  streaming?: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg text-body-sm ${
          isUser
            ? "bg-brand-primary text-white"
            : "bg-bg-elevated text-text-primary"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">
          {message.content}
          {streaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-text-primary animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
