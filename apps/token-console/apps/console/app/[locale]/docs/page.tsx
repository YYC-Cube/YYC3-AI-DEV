/*
 * @Module : app/[locale]/docs — API 文档
 * @Family : 🎨 创想·灵韵
 */
import { PageHeader } from "@/components/family/PageHeader";

const ENDPOINTS = [
  { group: "🛡️ 守护", items: ["GET /healthz", "GET /v1/ping", "GET /docs", "GET /openapi.json"] },
  { group: "🎯 伯乐", items: ["GET /v1/models", "GET /v1/models/stats", "GET /v1/model/type"] },
  { group: "🤔 语枢", items: ["POST /v1/chat/completions (SSE)"] },
  { group: "🧭 千行", items: ["GET /v1/router/stats", "GET /v1/router/health"] },
  { group: "📚 宗师", items: ["GET /v1/knowledge-bases", "POST /v1/rag/search", "POST /v1/rag/ask"] },
  { group: "🧠 天枢", items: ["GET /v1/mcp/tools", "POST /v1/mcp/execute"] },
  { group: "🔮 先知", items: ["GET /v1/models/summary", "GET /v1/models/errors", "GET /health"] },
  { group: "🎨 灵韵", items: ["GET /v1/cache/stats", "POST /v1/cache/invalidate/:model"] },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="API 文档" subtitle="52 端点 · 8 位家人 · 一份契约" />
      <div className="p-6 space-y-6 max-w-3xl">
        {ENDPOINTS.map((section) => (
          <section
            key={section.group}
            className="p-4 rounded-lg border border-border-default bg-bg-subtle"
          >
            <h2 className="text-body-md font-semibold mb-2">{section.group}</h2>
            <ul className="space-y-1">
              {section.items.map((ep) => (
                <li key={ep} className="font-mono text-caption text-text-secondary">
                  {ep}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
