/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : scripts/contract/hash — OpenAPI 哈希计算
 * @Family : 🔮 预见·先知（观测与预测域）
 * ============================================================
 */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export async function sha256File(path: string): Promise<string> {
  const buf = await readFile(path);
  return createHash("sha256").update(buf).digest("hex");
}

export function sha256String(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

// 规范化 JSON（排序 key），避免因 key 顺序变化误报
export function canonicalizeJson(obj: unknown): string {
  return JSON.stringify(sortKeys(obj));
}

function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") {
    return Object.keys(v as object)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys((v as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return v;
}

export function sha256Canonical(obj: unknown): string {
  return sha256String(canonicalizeJson(obj));
}
