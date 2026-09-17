/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : apps/console/instrumentation — Prometheus 指标导出
 * @Family-Owner : 🔮 预见·先知（观测与预测域）
 * @Domain   : 观测
 * @License  : Apache-2.0
 * ============================================================
 * 说明:
 *   Next.js 16 支持 instrumentation.ts 在服务端启动时注入
 *   用于 OpenTelemetry + Prometheus 指标导出
 * ============================================================
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerOTel } = await import("@vercel/otel");
    const { PrometheusExporter } = await import("@opentelemetry/exporter-prometheus");

    registerOTel({
      serviceName: "yyc3-token-console",
      attributes: {
        "family.name": "YYC³ AI Family",
        "family.motto": "人从众曌众从人",
        "family.creed": "亦师亦友亦伯乐，一言一语一协同",
        "family.members": "8",
      },
    });

    // Prometheus 导出器（供 ServiceMonitor 抓取）
    new PrometheusExporter({
      port: 9464,
      endpoint: "/metrics",
    });
  }
}
