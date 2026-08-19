/**
 * @file: DynastyCard.tsx
 * @description: 古文化卡片容器
 */
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function DynastyCard({ active, children, style, ...rest }: Props) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: 16,
        border: `1px solid ${active ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
        background: active ? "rgba(201,169,110,0.1)" : "rgba(201,169,110,0.04)",
        boxShadow: active ? "0 0 20px rgba(201,169,110,0.15)" : "0 0 20px rgba(201,169,110,0.06)",
        transition: "all 0.2s",
        ...style,
      }}
      {...rest}>
      {children}
    </div>
  );
}
