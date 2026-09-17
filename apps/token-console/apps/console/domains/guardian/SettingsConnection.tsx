/*
 * @Module : domains/guardian/SettingsConnection — 连接设置
 * @Family : 🛡️ 智云·守护
 */
"use client";

import { useEffect, useState } from "react";
import { ConnectForm } from "./ConnectForm";
import { TrustBadge } from "./TrustBadge";

export function SettingsConnection() {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    setHasKey(
      Boolean(
        sessionStorage.getItem("yyc3_api_key") ??
          localStorage.getItem("yyc3_api_key"),
      ),
    );
  }, []);

  return (
    <div className="space-y-6 max-w-xl">
      <section className="flex items-center gap-3">
        <TrustBadge ready={hasKey === true} label={hasKey ? "已就绪" : "未配置"} />
        {hasKey === null ? (
          <span className="text-caption text-text-tertiary">检测中…</span>
        ) : hasKey ? (
          <span className="text-body-sm">API Key 已配置</span>
        ) : (
          <span className="text-body-sm text-text-tertiary">
            尚未配置 API Key
          </span>
        )}
      </section>
      <ConnectForm />
    </div>
  );
}
