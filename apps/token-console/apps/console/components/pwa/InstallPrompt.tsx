/*
 * @Module : components/pwa/InstallPrompt — PWA 安装提示
 * @Family-Owner : 🎨 创想·灵韵
 */
"use client";

import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg bg-bg-elevated border border-border-default shadow-lg max-w-sm">
      <p className="text-body-sm mb-3">
        🌹 将 YYC³ Console 添加到桌面，离线也可查看仪表盘
      </p>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === "accepted") setDeferredPrompt(null);
          }}
          className="flex-1 h-9 rounded-md bg-brand-primary text-white text-sm"
        >
          添加
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="h-9 px-3 rounded-md border border-border-default text-sm"
        >
          稍后
        </button>
      </div>
    </div>
  );
}
