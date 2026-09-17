/*
 * @Module : domains/wanyu/ThoughtBubble — 情感组件
 * @Family : 🤔 语枢·万物
 */
export function ThoughtBubble() {
  return (
    <div className="flex items-center gap-2 text-caption text-text-tertiary">
      <span className="animate-pulse">💭</span>
      <span>正在思考…</span>
      <span className="flex gap-1">
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
      </span>
    </div>
  );
}
