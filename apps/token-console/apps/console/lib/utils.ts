/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/utils — className 合并工具
 * ============================================================
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
