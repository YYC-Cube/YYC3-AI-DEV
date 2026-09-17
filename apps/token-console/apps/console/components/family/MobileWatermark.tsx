/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : components/family/MobileWatermark — 移动端 Canvas 水印
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * 移动端（<768px）显示：canvas 平铺（e2e watermark fixture 断言 canvas[aria-hidden]）
 */
"use client";

import { useEffect, useRef } from "react";

export function MobileWatermark() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "currentColor";
      ctx.font = "600 14px system-ui, sans-serif";
      ctx.translate(-20, 40);
      ctx.rotate((-18 * Math.PI) / 180);
      for (let x = 0; x < window.innerWidth + 240; x += 180) {
        for (let y = 0; y < window.innerHeight + 240; y += 120) {
          ctx.fillText("人从众曌众从人", x, y);
          ctx.font = "10px system-ui, sans-serif";
          ctx.fillText("YYC³ AI Family", x, y + 16);
          ctx.font = "600 14px system-ui, sans-serif";
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] select-none"
    />
  );
}
