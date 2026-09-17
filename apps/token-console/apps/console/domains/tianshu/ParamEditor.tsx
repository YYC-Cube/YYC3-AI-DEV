/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/domains/tianshu/ParamEditor.tsx
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位实现：JSON Schema 参数编辑器（完整版待填充）
 */

export interface ParamEditorProps {
  schema: unknown;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export function ParamEditor({ schema: _schema, value, onChange }: ParamEditorProps) {
  return (
    <textarea
      className="w-full h-32 p-3 rounded-md border border-border-default bg-bg-subtle font-mono text-sm"
      value={JSON.stringify(value, null, 2)}
      onChange={(e) => {
        try {
          onChange(JSON.parse(e.target.value));
        } catch {
          /* 输入中允许暂态非法 JSON */
        }
      }}
      aria-label="工具参数（JSON）"
    />
  );
}
