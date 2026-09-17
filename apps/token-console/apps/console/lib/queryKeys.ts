/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/queryKeys — TanStack Query Key 单一真源
 * ============================================================
 */
export const qk = {
  guardian: {
    healthz: () => ["guardian", "healthz"] as const,
    ping:    () => ["guardian", "ping"] as const,
    keys:    () => ["guardian", "keys"] as const,
  },
  qianhang: {
    routerStats:  () => ["qianhang", "router", "stats"] as const,
    routerHealth: () => ["qianhang", "router", "health"] as const,
  },
  bole: {
    models:     () => ["bole", "models"] as const,
    modelStats: () => ["bole", "models", "stats"] as const,
    modelType:  (id: string) => ["bole", "models", id, "type"] as const,
  },
  wanyu: {
    chat: (id: string) => ["wanyu", "chat", id] as const,
  },
  zongshi: {
    knowledgeBases:     () => ["zongshi", "kb"] as const,
    knowledgeBaseStats: (id: string) => ["zongshi", "kb", id, "stats"] as const,
    documents:          (kbId?: string) => ["zongshi", "docs", kbId] as const,
  },
  tianshu: {
    mcpTools:  () => ["tianshu", "mcp", "tools"] as const,
    mcpSearch: (q: string) => ["tianshu", "mcp", "search", q] as const,
  },
  xianzhi: {
    health:       () => ["xianzhi", "health"] as const,
    versions:     () => ["xianzhi", "versions"] as const,
    modelSummary: () => ["xianzhi", "models", "summary"] as const,
    modelErrors:  (f?: ErrorFilter) => ["xianzhi", "models", "errors", f] as const,
    // 修正 D-01：移除 cacheStats（归属 lingyun）
  },
  lingyun: {
    cacheStats: () => ["lingyun", "cache", "stats"] as const,
    cacheInfo:  () => ["lingyun", "cache", "info"] as const,
  },
} as const;

export interface ErrorFilter {
  error_type?: string;
  model_id?: string;
  from?: string;
  to?: string;
}
