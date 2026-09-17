/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/mocks/handlers/guardian.ts
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位：guardian 域 MSW handlers 待接入 52 端点规格
 */

import { http, type HttpHandler } from "msw";

export const guardianHandlers: HttpHandler[] = [
  http.get("*/healthz", () => Response.json({ status: "ok" })),
];
