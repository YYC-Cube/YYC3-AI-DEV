/*
 * @Module : lib/utils — cn 合并工具（clsx + tailwind-merge）
 * @Module : 供 shadcn/ui 风格组件使用
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
