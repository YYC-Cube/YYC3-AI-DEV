/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : domains/_shared/types.gen — 后端契约冻结类型（快照 2026-09-17）
 * @Source : docs/YYC3-AI-Family-Token-Console-开发推进/01-后端契约快照.md §1.2
 * @Note   : openapi-typescript 生成前的手工冻结版；后端契约变更时重新生成
 * ============================================================ */

export type Backend =
  | "local"
  | "openai"
  | "zhipu"
  | "deepseek"
  | "ollama"
  | "upstream";

export interface ModelConfig {
  id: string;
  display_name: string;
  backend: Backend;
  version?: string | null;
  enabled: boolean;
  max_tokens: number;
  temperature: number;
  top_p?: number | null;
  cost_per_1k_tokens: number;
}

export interface ModelStat {
  model_id: string;
  usage_count: number;
  avg_latency_ms: number;
  error_rate: number;
  total_tokens: number;
}

export type ErrorType = "timeout" | "validation" | "quota" | "internal";

export interface ErrorRecord {
  id: string;
  timestamp?: string;
  model_id: string;
  error_type: ErrorType;
  message: string;
  stack?: string | null;
}

export interface UsageSummary {
  total_requests: number;
  total_tokens: number;
  cost_usd: number;
}

export type ServiceStatus = "healthy" | "unreachable" | "configured";

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
  uptime_seconds: number;
  services: {
    ollama: { status: ServiceStatus };
    zhipu: { status: ServiceStatus };
    redis: { status: ServiceStatus };
    postgresql: { status: ServiceStatus };
  };
  system: {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
  };
  metrics: {
    active_requests: number;
    total_requests: number;
    cache_hit_rate: number;
  };
}

export interface APIError {
  detail: {
    error: "network" | "api" | "timeout" | "validation";
    message: string;
    context?: unknown;
    status_code: number;
  };
}

export type BreakerState = "closed" | "open" | "half_open";

export interface RouterNode {
  name: string;
  base_url: string;
  models: string[];
  capability: string[];
  priority: number;
  weight: number;
  dynamic_weight: number;
  breaker_state: BreakerState;
  ewma_latency: number;
  ewma_error_rate: number;
  total_requests: number;
  total_failures: number;
  last_error?: string;
  load: number;
  capacity: number;
}
