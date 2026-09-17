/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/domains/wanyu/ParamPanel.tsx
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位实现：Playground 参数面板（完整版待填充）
 */

export interface ParamPanelProps {
  onSubmit: (input: string) => void;
}

export function ParamPanel({ onSubmit }: ParamPanelProps) {
  return (
    <form
      className="p-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const input = String(fd.get("input") ?? "").trim();
        if (!input) return;
        onSubmit(input);
        form.reset();
      }}
    >
      <textarea
        name="input"
        placeholder="输入要发送给模型的内容…"
        className="w-full h-24 p-3 rounded-md border border-border-default bg-bg-subtle text-sm"
        aria-label="对话输入"
      />
      <button
        type="submit"
        className="h-9 px-4 rounded-md bg-brand-primary text-white text-sm"
      >
        发送
      </button>
    </form>
  );
}
