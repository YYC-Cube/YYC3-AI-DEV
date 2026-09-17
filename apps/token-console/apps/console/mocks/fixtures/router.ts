/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/router — RouterNode 契约夹具
 * ============================================================
 */
import type { RouterNode } from "@/domains/_shared/types.gen";

export const ROUTER_NODES: RouterNode[] = [
  {
    name: "openai-primary",
    base_url: "https://api.openai.com/v1",
    models: ["gpt-4o", "gpt-4o-mini"],
    capability: ["chat", "vision"],
    priority: 1,
    weight: 100,
    dynamic_weight: 85.3,
    breaker_state: "closed",
    ewma_latency: 420,
    ewma_error_rate: 0.002,
    total_requests: 8421,
    total_failures: 17,
    load: 12,
    capacity: 100,
  },
  {
    name: "anthropic-fallback",
    base_url: "https://api.anthropic.com/v1",
    models: ["claude-3-5-sonnet"],
    capability: ["chat"],
    priority: 2,
    weight: 80,
    dynamic_weight: 62.1,
    breaker_state: "half_open",
    ewma_latency: 380,
    ewma_error_rate: 0.005,
    total_requests: 3210,
    total_failures: 16,
    last_error: "Connection reset by peer (recovered)",
    load: 5,
    capacity: 50,
  },
  {
    name: "zhipu-backup",
    base_url: "https://open.bigmodel.cn/api/paas/v4",
    models: ["zhipu-glm-4"],
    capability: ["chat"],
    priority: 3,
    weight: 50,
    dynamic_weight: 0,
    breaker_state: "open",
    ewma_latency: 1200,
    ewma_error_rate: 0.45,
    total_requests: 1102,
    total_failures: 496,
    last_error: "Upstream 503 Service Unavailable",
    load: 0,
    capacity: 30,
  },
];
