/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : performance/react-profiler/Profiler — 生产 Profiler
 * @Family-Owner : 🔮 预见·先知（观测与预测域）
 * @Domain   : 性能观测
 * @License  : Apache-2.0
 * ============================================================
 * 说明:
 *   React 19 支持生产环境 Profiler（采样模式）
 *   通过 ?profile=1 开启，避免生产开销
 * ============================================================
 */
"use client";

import { Profiler, type ProfilerOnRenderCallback } from "react";

const ENABLED =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("profile");

const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) => {
  if (!ENABLED) return;

  // 上报到 performance.mark（Chrome DevTools Performance 可见）
  const mark = `${id}.${phase}`;
  performance.mark(`${mark}-start`, { startTime });
  performance.mark(`${mark}-end`, { startTime: commitTime });
  performance.measure(mark, `${mark}-start`, `${mark}-end`);

  // 慢组件告警
  if (actualDuration > 16) {
    console.warn(
      `🐌 [${id}] ${phase} 耗时 ${actualDuration.toFixed(2)}ms`,
      { baseDuration, startTime, commitTime },
    );
  }

  // 采样上报（10%）
  if (Math.random() < 0.1) {
    navigator.sendBeacon?.(
      "/api/perf/render",
      JSON.stringify({
        id,
        phase,
        actualDuration,
        baseDuration,
        timestamp: Date.now(),
      }),
    );
  }
};

export function FamilyProfiler({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  if (!ENABLED) return <>{children}</>;
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
