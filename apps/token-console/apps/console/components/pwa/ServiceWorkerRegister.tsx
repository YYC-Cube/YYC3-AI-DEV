/*
 * @Module : components/pwa/ServiceWorkerRegister — SW 注册
 * @Family-Owner : 🎨 创想·灵韵
 */
"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      import("@serwist/window").then(({ Serwist }) => {
        const wb = new Serwist("/sw.js", { scope: "/" });
        wb.register();
      });
    }
  }, []);
  return null;
}
