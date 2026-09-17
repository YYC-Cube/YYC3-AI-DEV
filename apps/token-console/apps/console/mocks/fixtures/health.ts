/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/health — HealthResponse 契约夹具
 * ============================================================
 */
import type { HealthResponse } from "@/domains/_shared/types.gen";

export const HEALTH: HealthResponse = {
  status: "healthy",
  timestamp: new Date().toISOString(),
  version: "2.0.0",
  uptime_seconds: 86400 * 12,
  services: {
    ollama: { status: "healthy" },
    zhipu: { status: "healthy" },
    redis: { status: "healthy" },
    postgresql: { status: "healthy" },
  },
  system: {
    cpu_percent: 23.5,
    memory_percent: 61.2,
    disk_percent: 45.8,
  },
  metrics: {
    active_requests: 3,
    total_requests: 12847,
    cache_hit_rate: 0.342,
  },
};
