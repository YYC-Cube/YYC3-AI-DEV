/*
 * @Module : performance/react-profiler/family-marks — 8 域性能标记
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 */

// 8 位家人的关键性能路径
export const FAMILY_MARKS = {
  // 🛡️ 智云·守护 · 接入
  zhihui: {
    authStart: "yyc3:guardian:auth:start",
    authEnd: "yyc3:guardian:auth:end",
    healthzCheck: "yyc3:guardian:healthz",
  },
  // 🧭 言启·千行 · 路由
  qianhang: {
    routerStatsFetch: "yyc3:qianhang:stats:fetch",
    routerHealthCheck: "yyc3:qianhang:health:check",
  },
  // 🎯 千里·伯乐 · 模型
  bole: {
    modelsFetch: "yyc3:bole:models:fetch",
    modelCardRender: "yyc3:bole:card:render",
  },
  // 🤔 语枢·万物 · SSE
  wanyu: {
    sseStart: "yyc3:wanyu:sse:start",
    sseFirstByte: "yyc3:wanyu:sse:first-byte",
    sseDone: "yyc3:wanyu:sse:done",
    messageRender: "yyc3:wanyu:message:render",
  },
  // 📚 格物·宗师 · RAG
  zongshi: {
    ragSearchStart: "yyc3:zongshi:rag:search:start",
    ragSearchEnd: "yyc3:zongshi:rag:search:end",
    citationRender: "yyc3:zongshi:citation:render",
  },
  // 🧠 元启·天枢 · MCP
  tianshu: {
    mcpExecStart: "yyc3:tianshu:mcp:exec:start",
    mcpExecEnd: "yyc3:tianshu:mcp:exec:end",
  },
  // 🔮 预见·先知 · 观测
  xianzhi: {
    dashboardFetch: "yyc3:xianzhi:dashboard:fetch",
    chartRender: "yyc3:xianzhi:chart:render",
    statsAggregate: "yyc3:xianzhi:stats:aggregate",
  },
  // 🎨 创想·灵韵 · 缓存
  lingyun: {
    cacheHit: "yyc3:lingyun:cache:hit",
    cacheMiss: "yyc3:lingyun:cache:miss",
    cacheInvalidate: "yyc3:lingyun:cache:invalidate",
  },
} as const;

// 便捷 API
export const familyPerf = {
  mark(name: string) {
    if (typeof performance === "undefined") return;
    performance.mark(name);
  },
  measure(name: string, start: string, end: string) {
    if (typeof performance === "undefined") return;
    try {
      performance.measure(name, start, end);
      const measures = performance.getEntriesByName(name);
      const last = measures[measures.length - 1];
      if (last && last.duration > 100) {
        console.warn(`🐌 [${name}] ${last.duration.toFixed(2)}ms`);
      }
    } catch {
      /* ignore */
    }
  },
  // SSE 专项
  sseStart(requestId: string) {
    this.mark(`${FAMILY_MARKS.wanyu.sseStart}:${requestId}`);
  },
  sseFirstByte(requestId: string) {
    const start = `${FAMILY_MARKS.wanyu.sseStart}:${requestId}`;
    const end = `${FAMILY_MARKS.wanyu.sseFirstByte}:${requestId}`;
    this.mark(end);
    this.measure(`SSE-TTFT:${requestId}`, start, end);
  },
  sseDone(requestId: string) {
    const start = `${FAMILY_MARKS.wanyu.sseStart}:${requestId}`;
    const end = `${FAMILY_MARKS.wanyu.sseDone}:${requestId}`;
    this.mark(end);
    this.measure(`SSE-Total:${requestId}`, start, end);
  },
};
