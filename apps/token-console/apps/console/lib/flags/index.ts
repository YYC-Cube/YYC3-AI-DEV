/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Module : lib/flags — 功能开关（服务端解析）
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 * Phase 0 占位实现：全部开关默认关闭，Phase 1 接入 Vercel Flags SDK
 * 供 app/[locale]/dashboard/page.tsx 等服务端组件调用
 * ============================================================
 */

export interface FeatureFlags {
  usageBilling: boolean;
  costRealCalculation: boolean;
  requestLogs: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  usageBilling: false,
  costRealCalculation: false,
  requestLogs: false,
};

/** 服务端解析开关（当前为 Phase 0 静态占位） */
export async function getFlags(): Promise<FeatureFlags> {
  return { ...DEFAULT_FLAGS };
}

export const usageBilling = async () => (await getFlags()).usageBilling;
export const costRealCalculation = async () =>
  (await getFlags()).costRealCalculation;
export const requestLogs = async () => (await getFlags()).requestLogs;
