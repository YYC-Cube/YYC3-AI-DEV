/*
 * @Module : domains/bole/BackendBadge
 * @Family : 🎯 千里·伯乐
 */
import type { ModelConfig } from "@/domains/_shared/types.gen";

const COLOR: Record<ModelConfig["backend"], string> = {
  local:    "bg-status-success/15 text-status-success",
  ollama:   "bg-status-success/15 text-status-success",
  zhipu:    "bg-blue-500/15 text-blue-400",
  deepseek: "bg-purple-500/15 text-purple-400",
  openai:   "bg-cyan-500/15 text-cyan-400",
  upstream: "bg-cyan-500/15 text-cyan-400",
};

export function BackendBadge({ backend }: { backend: ModelConfig["backend"] }) {
  return (
    <span className={`px-2 py-0.5 rounded text-caption ${COLOR[backend]}`}>
      {backend}
    </span>
  );
}
