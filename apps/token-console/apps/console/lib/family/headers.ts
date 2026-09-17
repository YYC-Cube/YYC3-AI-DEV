/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : apps/console/lib/family/headers.ts
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * 家人请求头 — 每次调用 52 端点均携带，供后端审计与路由观测归因
 * 契约来源：docs/开发推进/01-后端契约快照.md §X-Family 头
 */

import type { MemberKey } from "./members";

/** 请求头常量名（契约冻结，禁止改名） */
export const FAMILY_HEADER = "X-Family" as const;
export const FAMILY_TRACE_HEADER = "X-Family-Trace" as const;

/** MemberKey → X-Family 值（后端 8 域唯一标识，取 domain 目录名） */
const FAMILY_HEADER_VALUE: Record<MemberKey, string> = {
  zhihui: "guardian",
  qianhang: "qianhang",
  bole: "bole",
  wanyu: "wanyu",
  zongshi: "zongshi",
  tianshu: "tianshu",
  xianzhi: "xianzhi",
  lingyun: "lingyun",
};

/** 生成家人归因头（ApiClient 拦截器统一注入） */
export function familyHeaders(member: MemberKey, traceId?: string): Record<string, string> {
  const h: Record<string, string> = { [FAMILY_HEADER]: FAMILY_HEADER_VALUE[member] };
  if (traceId) h[FAMILY_TRACE_HEADER] = traceId;
  return h;
}

/** 全局固定头（非归因请求也需身份标识） */
export const FAMILY_REQUEST_HEADERS: Record<string, string> = {
  [FAMILY_HEADER]: "console",
  "X-Family-Version": "5.1.1",
};
