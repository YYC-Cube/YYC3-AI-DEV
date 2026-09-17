/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/flags/health — 开关健康检查（CI / 启动自检用）
 * @Family-Owner : 🧠 元启·天枢
 * ============================================================
 */
import { allGates } from "./gates";

export interface FlagHealthReport {
  ok: boolean;
  total: number;
  enabled: number;
  disabled: number;
  checkedAt: string;
}

export async function flagsHealthCheck(): Promise<FlagHealthReport> {
  const gates = await allGates();
  const values: (boolean | string)[] = Object.values(gates).flatMap(
    (domain) => Object.values(domain),
  );

  return {
    ok: true,
    total: values.length,
    enabled: values.filter((v) => v === true).length,
    disabled: values.filter((v) => v === false).length,
    checkedAt: new Date().toISOString(),
  };
}
