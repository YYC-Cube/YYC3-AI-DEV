/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : app/manifest — PWA 清单
 * @Family : 🎨 创想·灵韵
 * ============================================================
 */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YYC³ Token Console",
    short_name: "YYC³ Console",
    description: "人从众曌众从人 · 8 位家人同构 52 端点 API 控制台",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    lang: "zh-CN",
  };
}
