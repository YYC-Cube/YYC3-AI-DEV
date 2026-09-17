/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : lib/flags/gates — 8 域开关门控（服务端聚合读取）
 * @Family-Owner : 🧠 元启·天枢
 * ============================================================
 */
import {
  apiKeysCRUD,
  ssoEnabled,
  routingRulesCRUD,
  modelCompare,
  sseV2,
  playgroundPresetsBackend,
  ragStreaming,
  mcpMultiStep,
  usageBilling,
  requestLogs,
  costRealCalculation,
  pwaInstall,
  i18nJa,
  experimentalUI,
} from "@/flags";

export async function allGates() {
  const [
    apiKeys,
    sso,
    routing,
    compare,
    sse2,
    presets,
    ragStream,
    mcpMulti,
    billing,
    logs,
    realCost,
    pwa,
    ja,
    ui,
  ] = await Promise.all([
    apiKeysCRUD(),
    ssoEnabled(),
    routingRulesCRUD(),
    modelCompare(),
    sseV2(),
    playgroundPresetsBackend(),
    ragStreaming(),
    mcpMultiStep(),
    usageBilling(),
    requestLogs(),
    costRealCalculation(),
    pwaInstall(),
    i18nJa(),
    experimentalUI(),
  ]);

  return {
    guardian: { apiKeys, sso },
    qianhang: { routing },
    bole: { compare },
    wanyu: { sse2, presets },
    zongshi: { ragStream },
    tianshu: { mcpMulti, ui },
    xianzhi: { billing, logs, realCost },
    lingyun: { pwa, ja },
  };
}
