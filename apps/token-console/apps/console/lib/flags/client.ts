/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/flags/client — 客户端开关读取封装
 * @Family-Owner : 🧠 元启·天枢
 * @Note   : 客户端组件不直接 import flags/next（RSC-only），
 *           由服务端组件求值后经 props / context 传递。
 * ============================================================
 */
export interface ClientFlags {
  [key: string]: boolean | string;
}

let cached: ClientFlags | null = null;

export function setClientFlags(flags: ClientFlags) {
  cached = flags;
}

export function getClientFlag<T extends boolean | string = boolean>(
  key: string,
  fallback: T,
): T {
  if (!cached) return fallback;
  const value = cached[key];
  return (value as T) ?? fallback;
}
