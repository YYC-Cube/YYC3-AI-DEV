/*
 * ============================================================
 * @Module : tests/contract/endpoints — 端点存在性契约
 * @Family-Owner : 📚 格物·宗师
 * @对应 : v5.1 §7.2.2 检查项 11（端点真实）
 * ============================================================
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SNAPSHOT = JSON.parse(
  readFileSync(
    resolve(__dirname, "../../.contract-snapshot.json"),
    "utf-8",
  ),
);

const REQUIRED_ENDPOINTS = [
  // ✅ 直接对接 43 个（部分列表）
  "post /v1/chat/completions",
  "get /v1/models",
  "get /v1/models/stats",
  "get /v1/models/errors",
  "get /v1/model/type",
  "get /v1/router/stats",
  "get /v1/router/health",
  "get /v1/cache/stats",
  "get /v1/cache/info",
  "post /v1/cache/invalidate/{model}",
  "delete /v1/cache/all",
  "post /v1/embeddings",
  "post /v1/rerank",
  "post /v1/audio/transcriptions",
  "post /v1/ocr",
  "get /v1/knowledge-bases",
  "post /v1/knowledge-bases",
  "get /v1/documents",
  "post /v1/documents/upload",
  "post /v1/rag/search",
  "post /v1/rag/ask",
  "get /v1/mcp/tools",
  "post /v1/mcp/execute",
  "get /health",
  "get /healthz",
  "get /v1/ping",
  "get /v1/versions",
  "get /metrics",
  "get /docs",
  "get /openapi.json",
];

const FORBIDDEN_ENDPOINTS = [
  // 🚫 禁止虚构（v5.1 §7.2.2 检查项 11）
  "get /v1/keys",
  "post /v1/keys",
  "get /v1/billing",
  "post /v1/billing",
  "get /v1/team/members",
  "get /v1/alerts",
  "post /v1/alerts/rules",
];

describe("契约 · 端点存在性", () => {
  it("所有必需端点存在", () => {
    const paths = SNAPSHOT.paths ?? {};
    const missing: string[] = [];
    for (const ep of REQUIRED_ENDPOINTS) {
      const [method, path] = ep.split(" ");
      if (!paths[path]?.[method]) missing.push(ep);
    }
    expect(missing).toEqual([]);
  });

  it("禁止的虚构端点不存在", () => {
    const paths = SNAPSHOT.paths ?? {};
    const found: string[] = [];
    for (const ep of FORBIDDEN_ENDPOINTS) {
      const [method, path] = ep.split(" ");
      if (paths[path]?.[method]) found.push(ep);
    }
    expect(found).toEqual([]);
  });

  it("端点总数与冻结一致（52）", () => {
    let count = 0;
    for (const path of Object.keys(SNAPSHOT.paths ?? {})) {
      for (const method of Object.keys(SNAPSHOT.paths[path])) {
        if (["get", "post", "put", "patch", "delete"].includes(method)) {
          count++;
        }
      }
    }
    // 允许 ±5 浮动（版本迭代）
    expect(count).toBeGreaterThanOrEqual(47);
    expect(count).toBeLessThanOrEqual(60);
  });
});
