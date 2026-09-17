/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : domains/guardian/useGuardianAuth
 * @Family : 🛡️ 智云·守护 · 首席安全官 · 0379-0207
 * @Domain : 接入与安全域
 * ============================================================
 */
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";

export function useGuardianHealthz() {
  return useQuery({
    queryKey: qk.guardian.healthz(),
    queryFn: () => apiCall<{ status: string }>("/healthz"),
    refetchInterval: 10_000,
    retry: 1,
  });
}

export function useGuardianConnect() {
  return useMutation({
    mutationFn: async (apiKey: string) => {
      sessionStorage.setItem("yyc3_api_key", apiKey);
      return apiCall<{ status: string }>("/v1/ping");
    },
    onSuccess: (_, apiKey) => {
      // 用户勾选「记住」时持久化
      if (sessionStorage.getItem("yyc3_remember") === "true") {
        localStorage.setItem("yyc3_api_key", apiKey);
      }
    },
  });
}

export function useGuardianDisconnect() {
  return () => {
    sessionStorage.removeItem("yyc3_api_key");
    localStorage.removeItem("yyc3_api_key");
    sessionStorage.removeItem("yyc3_remember");
  };
}
