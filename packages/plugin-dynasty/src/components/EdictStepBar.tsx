/**
 * @file: EdictStepBar.tsx
 * @description: 六阶段敕令进度条 — 下旨→草拟→审议→派发→回奏→赏赐
 * 来源: Dynasty Design System (Figma-to-Code)
 */
import React from "react";
import { Check, Loader2, X } from "lucide-react";

export type StepStatus = "completed" | "current" | "pending" | "rejected";

export interface EdictStep {
  label: string;
  status: StepStatus;
}

interface Props { steps: EdictStep[]; className?: string; }

export function EdictStepBar({ steps }: Props) {
  const T = { success: "#00FF88", warn: "#FFDD00", reject: "#FF3366", accent: "#C9A96E", muted: "rgba(201,169,110,0.2)" };
  return (
    <div className="flex items-center justify-between w-full relative py-2">
      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0" style={{ background: T.muted }} />
      {steps.map((step, i) => (
        <div key={i} className="relative z-10 flex flex-col items-center gap-1.5 px-2" style={{ background: "#1E180E" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: step.status === "completed" ? "#C9A96E" : step.status === "rejected" ? "rgba(255,51,102,0.15)" : "transparent",
              border: step.status === "pending" ? `1px solid ${T.muted}` : step.status === "current" ? "2px dashed #C9A96E" : "1px solid transparent",
              color: step.status === "completed" ? "#1E180E" : step.status === "rejected" ? T.reject : step.status === "current" ? "#C9A96E" : "rgba(201,169,110,0.3)",
              boxShadow: step.status === "completed" ? "0 0 10px rgba(201,169,110,0.5)" : "none",
            }}>
            {step.status === "completed" && <Check size={14} />}
            {step.status === "current" && <Loader2 size={14} className="animate-spin" />}
            {step.status === "rejected" && <X size={14} />}
          </div>
          <span style={{ fontSize: "0.62rem", color: step.status === "rejected" ? T.reject : step.status === "completed" || step.status === "current" ? "#C9A96E" : "rgba(201,169,110,0.3)" }}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
