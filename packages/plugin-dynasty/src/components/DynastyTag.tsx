/**
 * @file: DynastyTag.tsx
 * @description: 古文化标签组件
 */
import React from "react";

interface Props { color?: string; children: React.ReactNode; }

export function DynastyTag({ color = "rgba(201,169,110,0.4)", children }: Props) {
  return (
    <span style={{
      padding: "1px 6px",
      borderRadius: 4,
      fontSize: "0.6rem",
      background: `${color}15`,
      color,
      border: `1px solid ${color}33`,
    }}>
      {children}
    </span>
  );
}
