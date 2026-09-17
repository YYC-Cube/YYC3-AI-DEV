/*
 * @Module : performance/long-tasks/observer — 长任务监控
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 */
export function observeLongTasks() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn(
          `🐌 长任务: ${entry.duration.toFixed(2)}ms`,
          {
            name: entry.name,
            startTime: entry.startTime,
            attribution: (entry as any).attribution,
            route: window.location.pathname,
          },
        );

        // 上报
        navigator.sendBeacon?.(
          "/api/perf/long-task",
          JSON.stringify({
            duration: entry.duration,
            startTime: entry.startTime,
            route: window.location.pathname,
            family: getRouteFamily(window.location.pathname),
          }),
        );
      }
    }
  });

  observer.observe({ type: "longtask", buffered: true });

  return () => observer.disconnect();
}

function getRouteFamily(path: string): string {
  const map: Record<string, string> = {
    "/": "zhihui",
    "/dashboard": "xianzhi",
    "/models": "bole",
    "/playground": "wanyu",
    "/routing": "qianhang",
    "/knowledge": "zongshi",
    "/mcp": "tianshu",
    "/cache": "lingyun",
  };
  return map[path] ?? "tianshu";
}
