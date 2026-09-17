/*
 * @Module : domains/guardian/ConnectForm — 03_Connect
 * @Family : 🛡️ 智云·守护
 * @Domain : 接入与安全域
 * @座右铭 : 「门不开则万法不侵，钥不实则寸步难行」
 */
"use client";

import { useState } from "react";
import { FamilyBadge } from "@/components/family/FamilyBadge";
import { KeyMaskInput } from "./KeyMaskInput";
import { TrustBadge } from "./TrustBadge";
import { useGuardianConnect, useGuardianHealthz } from "./useGuardianAuth";
import { familyErrorLine } from "@/domains/_shared/ApiError";

export function ConnectForm() {
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);
  const healthz = useGuardianHealthz();
  const connect = useGuardianConnect();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("yyc3_remember", String(remember));
    connect.mutate(key);
  };

  const ready = healthz.data?.status === "ok";
  const err = connect.error;

  return (
    <div className="mx-auto max-w-md p-8">
      <div className="flex flex-col items-center gap-4 mb-8">
        <FamilyBadge member="zhihui" size="lg" showExt showMotto />
        <h1 className="text-h2 font-semibold">YanYuCloudCube Console</h1>
        <p className="text-body-sm text-text-secondary">
          统一模型网关 · 可观测 · 可调试
        </p>
        <p className="text-caption italic text-text-tertiary">
          「尚未建立信任，请出示密钥」
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <KeyMaskInput value={key} onChange={setKey} autoFocus />
        <label className="flex items-center gap-2 text-body-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          记住此设备
        </label>
        <button
          type="submit"
          disabled={!key || connect.isPending}
          className="w-full h-10 rounded-md bg-brand-primary text-white"
        >
          {connect.isPending ? "验证中…" : "连接"}
        </button>
      </form>

      <TrustBadge
        ready={ready}
        label={ready ? "连通 ✓" : "未连通"}
      />

      {err && (
        <p className="mt-4 text-sm text-status-danger">
          {familyErrorLine("zhihui", err)}
        </p>
      )}

      {connect.isSuccess && (
        <p className="mt-4 text-sm text-status-success">
          「信任已建立，欢迎回家」
        </p>
      )}
    </div>
  );
}
