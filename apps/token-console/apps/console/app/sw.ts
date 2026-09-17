/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : app/sw — Service Worker（serwist）
 * @Family-Owner : 🎨 创想·灵韵
 * @兼容 : Next.js 16 + Turbopack（serwist 方案）
 * ============================================================
 */
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, CacheFirst, NetworkFirst, StaleWhileRevalidate } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    ignoreURLParametersMatching: [/.*/],
  },
  runtimeCaching: [
    // ============================================================
    // API 请求：Network-first（在线优先，离线降级）
    // ============================================================
    {
      matcher: ({ url }) => url.pathname.startsWith("/v1/"),
      handler: new NetworkFirst({
        cacheName: "yyc3-api",
        networkTimeoutSeconds: 10,
        plugins: [],
      }),
    },
    // ============================================================
    // 健康检查：Network-first（短缓存）
    // ============================================================
    {
      matcher: ({ url }) =>
        url.pathname === "/health" || url.pathname === "/healthz",
      handler: new NetworkFirst({
        cacheName: "yyc3-health",
        networkTimeoutSeconds: 5,
      }),
    },
    // ============================================================
    // 徽章图片：Cache-first（长期缓存）
    // ============================================================
    {
      matcher: ({ url }) => url.pathname.startsWith("/badges/"),
      handler: new CacheFirst({
        cacheName: "yyc3-badges",
        plugins: [],
      }),
    },
    // ============================================================
    // 静态资源：StaleWhileRevalidate
    // ============================================================
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
