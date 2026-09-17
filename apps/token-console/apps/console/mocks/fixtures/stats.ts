/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/stats — ModelStat 契约夹具
 * ============================================================
 */
import type { ModelStat } from "@/domains/_shared/types.gen";

export const MODEL_STATS: ModelStat[] = [
  {
    model_id: "gpt-4o",
    usage_count: 8421,
    avg_latency_ms: 420,
    error_rate: 0.002,
    total_tokens: 1248000,
  },
  {
    model_id: "claude-3-5-sonnet",
    usage_count: 3210,
    avg_latency_ms: 380,
    error_rate: 0.005,
    total_tokens: 512000,
  },
  {
    model_id: "zhipu-glm-4",
    usage_count: 1102,
    avg_latency_ms: 290,
    error_rate: 0.001,
    total_tokens: 245000,
  },
  {
    model_id: "deepseek-v3",
    usage_count: 842,
    avg_latency_ms: 650,
    error_rate: 0.012,
    total_tokens: 187000,
  },
  {
    model_id: "qwen2.5:7b",
    usage_count: 128,
    avg_latency_ms: 45,
    error_rate: 0,
    total_tokens: 12000,
  },
  {
    model_id: "llama3.2:3b",
    usage_count: 12,
    avg_latency_ms: 85,
    error_rate: 0.003,
    total_tokens: 3400,
  },
];
