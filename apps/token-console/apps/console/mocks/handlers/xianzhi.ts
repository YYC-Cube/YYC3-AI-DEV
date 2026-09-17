/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/mocks/handlers/xianzhi.ts
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位：xianzhi 域 MSW handlers 待接入 52 端点规格
 */

import { http, type HttpHandler } from "msw";

export const xianzhiHandlers: HttpHandler[] = [
  http.get("*/v1/models/summary", () =>
    Response.json({
      total_requests: 0,
      total_tokens: 0,
      cost_usd: 0,
    }),
  ),
  http.get("*/v1/models/stats", () => Response.json([])),
  http.get("*/v1/models/errors", () => Response.json([])),
  http.get("*/health", () =>
    Response.json({
      status: "ok",
      services: {},
      system: {},
      metrics: { cache_hit_rate: 0 },
    }),
  ),
];
