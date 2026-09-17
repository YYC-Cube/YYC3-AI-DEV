/*
 * @Module : domains/lingyun/CacheRipple — 情感组件
 * @Family : 🎨 创想·灵韵
 */
"use client";

import { useEffect, useState } from "react";

export function CacheRipple({ trigger }: { trigger: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (trigger <= 0) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!show) return null;
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="w-8 h-8 rounded-full bg-family-lingyun-accent/40 animate-ping" />
    </span>
  );
}
