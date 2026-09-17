/*
 * @Module : lib/metrics/family — 8 域自定义指标
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 */
import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("yyc3-family", "5.1.0");

// ============================================================
// 🛡️ 智云·守护 — 接入与安全
// ============================================================
export const guardianAuthTotal = meter.createCounter(
  "yyc3_guardian_auth_total",
  {
    description: "🛡️ 智云·守护 · 鉴权尝试次数",
    unit: "1",
  },
);

export const guardianAuthDuration = meter.createHistogram(
  "yyc3_guardian_auth_duration_seconds",
  {
    description: "🛡️ 智云·守护 · 鉴权耗时",
    unit: "s",
  },
);

// ============================================================
// 🤔 语枢·万物 — SSE 核心指标
// ============================================================
export const sseTTFT = meter.createHistogram(
  "yyc3_sse_ttft_seconds",
  {
    description: "🤔 语枢·万物 · 首字节延迟（TTFT）",
    unit: "s",
  },
);

export const sseActiveStreams = meter.createUpDownCounter(
  "yyc3_sse_active_streams",
  {
    description: "🤔 语枢·万物 · 活跃流数",
    unit: "1",
  },
);

export const sseTokensTotal = meter.createCounter(
  "yyc3_sse_tokens_total",
  {
    description: "🤔 语枢·万物 · 累计 Token",
    unit: "1",
  },
);

export const sseDegradedTotal = meter.createCounter(
  "yyc3_sse_degraded_total",
  {
    description: "🤔 语枢·万物 · 降级流数",
    unit: "1",
  },
);

// ============================================================
// 🧭 言启·千行 — 路由
// ============================================================
export const qianhangUpstreamRequests = meter.createCounter(
  "yyc3_qianhang_upstream_requests_total",
  {
    description: "🧭 言启·千行 · 上游请求",
    unit: "1",
  },
);

export const qianhangBreakerState = meter.createUpDownCounter(
  "yyc3_qianhang_breaker_state",
  {
    description: "🧭 言启·千行 · 熔断状态（0=closed, 1=half_open, 2=open）",
    unit: "1",
  },
);

// ============================================================
// 🎯 千里·伯乐 — 模型
// ============================================================
export const boleModelUsage = meter.createCounter(
  "yyc3_bole_model_usage_total",
  {
    description: "🎯 千里·伯乐 · 模型调用",
    unit: "1",
  },
);

// ============================================================
// 📚 格物·宗师 — 知识库
// ============================================================
export const zongshiRAGQueries = meter.createCounter(
  "yyc3_zongshi_rag_queries_total",
  {
    description: "📚 格物·宗师 · RAG 查询",
    unit: "1",
  },
);

export const zongshiRAGLatency = meter.createHistogram(
  "yyc3_zongshi_rag_latency_seconds",
  {
    description: "📚 格物·宗师 · RAG 延迟",
    unit: "s",
  },
);

// ============================================================
// 🧠 元启·天枢 — MCP
// ============================================================
export const tianshuMCPExecutions = meter.createCounter(
  "yyc3_tianshu_mcp_executions_total",
  {
    description: "🧠 元启·天枢 · MCP 执行",
    unit: "1",
  },
);

// ============================================================
// 🔮 预见·先知 — 观测
// ============================================================
export const xianzhiApiErrors = meter.createCounter(
  "yyc3_xianzhi_api_errors_total",
  {
    description: "🔮 预见·先知 · API 错误",
    unit: "1",
  },
);

// ============================================================
// 🎨 创想·灵韵 — 缓存
// ============================================================
export const lingyunCacheHits = meter.createCounter(
  "yyc3_lingyun_cache_hits_total",
  {
    description: "🎨 创想·灵韵 · 缓存命中",
    unit: "1",
  },
);

export const lingyunCacheMisses = meter.createCounter(
  "yyc3_lingyun_cache_misses_total",
  {
    description: "🎨 创想·灵韵 · 缓存未命中",
    unit: "1",
  },
);
