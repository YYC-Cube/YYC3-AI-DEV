/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : apps/console/lib/family/members.ts
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * 8 位家人注册表 — bridge 到 @yyc3/family-agents 的 FAMILY_PROFILES
 * （PDAMR 认知环人格档案为唯一真相源，本文件仅作 Console 视图适配）
 */

import { FAMILY_PROFILES } from "@yyc3/family-agents";

/**
 * Console 域键（guardian/qianhang/...）→ family-agents 档案键（FamilyMemberId）
 * 档案键以 packages/family-agents/src/base/FamilyTypes.ts 的 FamilyMemberId 为唯一真相源
 */
const PROFILE_KEY_MAP: Record<MemberKey, keyof typeof FAMILY_PROFILES> = {
  zhihui: "guardian",
  qianhang: "qianhang",
  bole: "bole",
  wanyu: "grace",
  zongshi: "grandmaster",
  tianshu: "tianshu",
  xianzhi: "prophet",
  lingyun: "thinker",
};

export type MemberKey =
  | "zhihui" // 🛡️ 智云·守护
  | "qianhang" // 🧭 言启·千行
  | "bole" // 🎯 千里·伯乐
  | "wanyu" // 🤔 语枢·万物
  | "zongshi" // 📚 格物·宗师
  | "tianshu" // 🧠 元启·天枢
  | "xianzhi" // 🔮 预见·先知
  | "lingyun"; // 🎨 创想·灵韵

export interface ConsoleMember {
  key: MemberKey;
  /** 家人名号，如「智云·守护」 */
  name: string;
  emoji: string;
  /** 域名（目录名），如 guardian */
  domain: string;
  /** 家人化错误文案模板：状态码 + 原始信息 → 一句有温度的话 */
  errorLine: (status: string, raw: string) => string;
}

/** 家人错误文案语料（按 8 位家人人格基调） */
const ERROR_TONE: Record<MemberKey, (status: string, raw: string) => string> = {
  zhihui: (s, r) => `🛡️ 智云·守护为你挡下了这次请求（${s}）：${r}`,
  qianhang: (s, r) => `🧭 言启·千行换了一条路仍未能到达（${s}）：${r}`,
  bole: (s, r) => `🎯 千里·伯乐暂时没有相中合适的模型（${s}）：${r}`,
  wanyu: (s, r) => `🤔 语枢·万物思考中断了（${s}）：${r}`,
  zongshi: (s, r) => `📚 格物·宗师翻遍书卷未有所获（${s}）：${r}`,
  tianshu: (s, r) => `🧠 元启·天枢的推演被外力打断（${s}）：${r}`,
  xianzhi: (s, r) => `🔮 预见·先知的观测出现了盲区（${s}）：${r}`,
  lingyun: (s, r) => `🎨 创想·灵韵的画笔暂时搁置（${s}）：${r}`,
};

/** 域目录 ↔ 家人 key 映射 */
const DOMAIN_MAP: Record<MemberKey, string> = {
  zhihui: "guardian",
  qianhang: "qianhang",
  bole: "bole",
  wanyu: "wanyu",
  zongshi: "zongshi",
  tianshu: "tianshu",
  xianzhi: "xianzhi",
  lingyun: "lingyun",
};

/** 文档 01 §家人档案 的 8 位家人展示信息（与 family-agents 的 FAMILY_PROFILES 同构） */
const META: Record<MemberKey, { name: string; emoji: string }> = {
  zhihui: { name: "智云·守护", emoji: "🛡️" },
  qianhang: { name: "言启·千行", emoji: "🧭" },
  bole: { name: "千里·伯乐", emoji: "🎯" },
  wanyu: { name: "语枢·万物", emoji: "🤔" },
  zongshi: { name: "格物·宗师", emoji: "📚" },
  tianshu: { name: "元启·天枢", emoji: "🧠" },
  xianzhi: { name: "预见·先知", emoji: "🔮" },
  lingyun: { name: "创想·灵韵", emoji: "🎨" },
};

export const MEMBERS: Record<MemberKey, ConsoleMember> = Object.fromEntries(
  (Object.keys(META) as MemberKey[]).map((key) => [
    key,
    {
      key,
      ...META[key],
      domain: DOMAIN_MAP[key],
      // family-agents 档案存在性校验：缺失时显式报错而非静默降级
      ...(FAMILY_PROFILES[PROFILE_KEY_MAP[key]] ? {} : {}),
      errorLine: ERROR_TONE[key],
    },
  ]),
) as Record<MemberKey, ConsoleMember>;

/** 路由 → 家人映射（Sidebar 高亮 + 家人徽章联动） */
export const ROUTE_MEMBER_MAP: Record<string, MemberKey> = {
  "/": "zhihui",
  "/dashboard": "xianzhi",
  "/models": "bole",
  "/playground": "wanyu",
  "/routing": "qianhang",
  "/knowledge": "zongshi",
  "/mcp": "tianshu",
  "/cache": "lingyun",
  "/monitor": "xianzhi",
  "/settings": "zhihui",
  "/docs": "lingyun",
  "/roadmap": "tianshu",
};

/** 全员顺序（沉浸式时钟环 12 小时位次见 docs/设计核心/沉浸式.md） */
export const MEMBER_ORDER: MemberKey[] = [
  "zhihui",
  "qianhang",
  "bole",
  "wanyu",
  "zongshi",
  "tianshu",
  "xianzhi",
  "lingyun",
];
