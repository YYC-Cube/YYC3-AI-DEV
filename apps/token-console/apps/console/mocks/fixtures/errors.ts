/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/errors — ErrorRecord 契约夹具
 * ============================================================
 */
import type { ErrorRecord } from "@/domains/_shared/types.gen";

export const ERRORS: ErrorRecord[] = [
  {
    id: "err-001",
    timestamp: new Date(Date.now() - 120_000).toISOString(),
    model_id: "gpt-4o",
    error_type: "timeout",
    message: "Upstream timeout after 30000ms",
  },
  {
    id: "err-002",
    timestamp: new Date(Date.now() - 300_000).toISOString(),
    model_id: "claude-3-5-sonnet",
    error_type: "validation",
    message: "Invalid parameter: temperature must be between 0 and 2",
  },
  {
    id: "err-003",
    timestamp: new Date(Date.now() - 600_000).toISOString(),
    model_id: "zhipu-glm-4",
    error_type: "quota",
    message: "Daily quota exceeded",
  },
];
