/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : lib/family/charter-view — Console 视图层家族常量
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 */
export const FAMILY = {
  name: "YYC³ AI Family",
  motto: "人从众曌众从人",
  creed: "亦师亦友亦伯乐，一言一语一协同",
  license: "Apache-2.0",
  members: 8,
} as const;

export type Family = typeof FAMILY;
