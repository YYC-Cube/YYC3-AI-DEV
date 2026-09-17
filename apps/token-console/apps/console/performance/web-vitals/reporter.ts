/*
 * @Module : performance/web-vitals/reporter — Core Web Vitals
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 */
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

function report(metric: Metric) {
  // 1. 上报到 Prometheus（通过 /api/perf/vitals）
  navigator.sendBeacon?.(
    "/api/perf/vitals",
    JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
      route: window.location.pathname,
      family: getRouteFamily(window.location.pathname),
    }),
  );

  // 2. Console 输出（dev）
  if (process.env.NODE_ENV === "development") {
    console.log(
      `${metric.rating === "good" ? "✅" : metric.rating === "needs-improvement" ? "⚠️" : "🚫"} ${metric.name}: ${metric.value.toFixed(2)}`,
    );
  }

  // 3. 超预算告警
  const budget = WEB_VITALS_BUDGET[metric.name];
  if (budget && metric.value > budget.poor) {
    console.error(
      `🐌 [${metric.name}] ${metric.value.toFixed(2)} 超过劣化阈值 ${budget.poor}`,
      { route: window.location.pathname },
    );
  }
}

export function reportWebVitals() {
  onCLS(report);
  onINP(report);
  onLCP(report);
  onFCP(report);
  onTTFB(report);
}

// 路由 → 家人映射
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
    "/monitor": "xianzhi",
    "/settings": "zhihui",
    "/docs": "lingyun",
  };
  return map[path] ?? "tianshu";
}

// 预算（v5.1 §3.10）
export const WEB_VITALS_BUDGET: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};
