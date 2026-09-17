/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/models — ModelConfig 契约夹具
 * ============================================================
 */
import type { ModelConfig } from "@/domains/_shared/types.gen";

export const MODELS: ModelConfig[] = [
  {
    id: "gpt-4o",
    display_name: "GPT-4o",
    backend: "openai",
    version: "2024-08-06",
    enabled: true,
    max_tokens: 128000,
    temperature: 0.7,
    top_p: 0.9,
    cost_per_1k_tokens: 0.005,
  },
  {
    id: "claude-3-5-sonnet",
    display_name: "Claude 3.5 Sonnet",
    backend: "upstream",
    enabled: true,
    max_tokens: 200000,
    temperature: 0.7,
    cost_per_1k_tokens: 0.003,
  },
  {
    id: "zhipu-glm-4",
    display_name: "智谱 GLM-4",
    backend: "zhipu",
    enabled: true,
    max_tokens: 128000,
    temperature: 0.7,
    cost_per_1k_tokens: 0.001,
  },
  {
    id: "deepseek-v3",
    display_name: "DeepSeek V3",
    backend: "deepseek",
    enabled: true,
    max_tokens: 64000,
    temperature: 0.7,
    cost_per_1k_tokens: 0.0005,
  },
  {
    id: "qwen2.5:7b",
    display_name: "Qwen2.5 7B (本地)",
    backend: "ollama",
    enabled: true,
    max_tokens: 32768,
    temperature: 0.7,
    cost_per_1k_tokens: 0,
  },
  {
    id: "llama3.2:3b",
    display_name: "Llama 3.2 3B (本地)",
    backend: "local",
    enabled: false,
    max_tokens: 8192,
    temperature: 0.7,
    cost_per_1k_tokens: 0,
  },
];
