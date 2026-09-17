/*
 * @Module : domains/guardian/KeyMaskInput — API Key 掩码输入
 */
"use client";

import { useState } from "react";

export function KeyMaskInput({
  value,
  onChange,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk-..."
        autoFocus={autoFocus}
        className="w-full h-10 px-3 pr-10 rounded-md border border-border-default bg-bg-subtle font-mono text-sm"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary"
      >
        {visible ? "隐藏" : "显示"}
      </button>
    </div>
  );
}
