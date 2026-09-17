/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : flags — 特性开关唯一真源
 * @Family-Owner : 🧠 元启·天枢（工具与编排域 · 总指挥）
 * @Domain   : 灰度发布 + 特性开关
 * @License  : Apache-2.0
 * ============================================================
 */
import { flag } from "flags/next";

// ============================================================
// 🛡️ 智云·守护 · 接入与安全域
// ============================================================
export const apiKeysCRUD = flag<boolean>({
  key: "guardian-api-keys-crud",
  description: "🛡️ API Keys 管理页（BL-05 完成后启用）",
  decide: async () => {
    // Phase 1 完成后默认开启
    return process.env.PHASE_1_ENABLED === "true";
  },
  defaultValue: false,
  options: [
    { value: true, label: "启用" },
    { value: false, label: "禁用" },
  ],
});

export const ssoEnabled = flag<boolean>({
  key: "guardian-sso",
  description: "🛡️ SSO/SCIM 登录（Phase 3）",
  decide: async () => false,
  defaultValue: false,
});

// ============================================================
// 🧭 言启·千行 · 路由与网关域
// ============================================================
export const routingRulesCRUD = flag<boolean>({
  key: "qianhang-routing-crud",
  description: "🧭 路由规则 CRUD（Phase 2）",
  decide: async () => false,
  defaultValue: false,
});

// ============================================================
// 🎯 千里·伯乐 · 模型市场域
// ============================================================
export const modelCompare = flag<boolean>({
  key: "bole-model-compare",
  description: "🎯 多模型并排对比",
  decide: async () => true,
  defaultValue: true,
});

// ============================================================
// 🤔 语枢·万物 · 推理对话域
// ============================================================
export const sseV2 = flag<boolean>({
  key: "wanyu-sse-v2",
  description: "🤔 SSE V2 协议（含 request_id 追踪 · BL-04）",
  decide: async () => process.env.BL_04_ENABLED === "true",
  defaultValue: false,
});

export const playgroundPresetsBackend = flag<boolean>({
  key: "wanyu-presets-backend",
  description: "🤔 Playground 预设后端存储（Phase 1）",
  decide: async () => false,
  defaultValue: false,
});

// ============================================================
// 📚 格物·宗师 · 知识与质量域
// ============================================================
export const ragStreaming = flag<boolean>({
  key: "zongshi-rag-streaming",
  description: "📚 RAG 问答流式输出",
  decide: async () => true,
  defaultValue: true,
});

// ============================================================
// 🧠 元启·天枢 · 工具与编排域
// ============================================================
export const mcpMultiStep = flag<boolean>({
  key: "tianshu-mcp-multistep",
  description: "🧠 MCP 多步编排（实验性）",
  decide: async () => false,
  defaultValue: false,
});

// ============================================================
// 🔮 预见·先知 · 观测与预测域
// ============================================================
export const usageBilling = flag<boolean>({
  key: "xianzhi-usage-billing",
  description: "🔮 用量计费页（BL-06 完成后启用）",
  decide: async () => process.env.PHASE_1_ENABLED === "true",
  defaultValue: false,
});

export const requestLogs = flag<boolean>({
  key: "xianzhi-request-logs",
  description: "🔮 请求级日志（BL-06）",
  decide: async () => process.env.PHASE_1_ENABLED === "true",
  defaultValue: false,
});

export const costRealCalculation = flag<boolean>({
  key: "xianzhi-cost-real",
  description: "🔮 真实成本计算（BL-02）",
  decide: async () => process.env.BL_02_ENABLED === "true",
  defaultValue: false,
});

// ============================================================
// 🎨 创想·灵韵 · 缓存与体验域
// ============================================================
export const pwaInstall = flag<boolean>({
  key: "lingyun-pwa-install",
  description: "🎨 PWA 安装提示",
  decide: async () => true,
  defaultValue: true,
});

export const i18nJa = flag<boolean>({
  key: "lingyun-i18n-ja",
  description: "🎨 日本語界面",
  decide: async () => true,
  defaultValue: true,
});

// ============================================================
// 百分比灰度示例
// ============================================================
export const experimentalUI = flag<"control" | "variant-a" | "variant-b">({
  key: "tianshu-experimental-ui",
  description: "🧠 实验性 UI（A/B 测试）",
  options: [
    { value: "control", label: "对照组" },
    { value: "variant-a", label: "方案 A" },
    { value: "variant-b", label: "方案 B" },
  ],
  decide: async () => "control" as const,
  defaultValue: "control",
});
