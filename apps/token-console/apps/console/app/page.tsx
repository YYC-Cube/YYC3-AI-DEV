/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : app/page — 根路径重定向到默认 locale
 * @Family : 🧭 言启·千行（路由域）
 * ============================================================
 */
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/zh-CN");
}
