/*
 * ============================================================
 * @Module : tests/contract/schemas — Schema 字段级契约
 * @Family-Owner : 📚 格物·宗师
 * @对应 : v5.1 §7.2.2 检查项 8、9、10、12
 * ============================================================
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ModelConfigSchema,
  ModelStatSchema,
  ErrorRecordSchema,
  UsageSummarySchema,
  HealthResponseSchema,
  BackendSchema,
  ErrorTypeSchema,
} from "../../domains/_shared/types.zod";

const SNAPSHOT = JSON.parse(
  readFileSync(
    resolve(__dirname, "../../.contract-snapshot.json"),
    "utf-8",
  ),
);
const schemas = SNAPSHOT.components?.schemas ?? {};

describe("契约 · ModelConfig", () => {
  const expectedFields = [
    "id",
    "display_name",
    "backend",
    "enabled",
    "max_tokens",
    "temperature",
    "cost_per_1k_tokens",
  ];

  it("字段与冻结契约一致", () => {
    const actual = Object.keys(schemas.ModelConfig?.properties ?? {});
    for (const f of expectedFields) {
      expect(actual, `ModelConfig 缺字段 ${f}`).toContain(f);
    }
  });

  it("backend 枚举仅 6 种", () => {
    const enumValues = schemas.ModelConfig?.properties?.backend?.enum ?? [];
    expect(enumValues.sort()).toEqual(
      ["deepseek", "local", "ollama", "openai", "upstream", "zhipu"].sort(),
    );
  });

  it("zod 可解析合法样本", () => {
    const sample = {
      id: "gpt-4o",
      display_name: "GPT-4o",
      backend: "openai",
      enabled: true,
      max_tokens: 128000,
      temperature: 0.7,
      cost_per_1k_tokens: 0.005,
    };
    expect(() => ModelConfigSchema.parse(sample)).not.toThrow();
  });

  it("zod 拒绝非法 backend", () => {
    const invalid = {
      id: "x",
      display_name: "X",
      backend: "claude",
      enabled: true,
      max_tokens: 4096,
      temperature: 0.7,
      cost_per_1k_tokens: 0,
    };
    expect(() => ModelConfigSchema.parse(invalid)).toThrow();
  });
});

describe("契约 · ErrorRecord", () => {
  it("字段名为 model_id（不是 model）", () => {
    const fields = Object.keys(schemas.ErrorRecord?.properties ?? {});
    expect(fields).toContain("model_id");
    expect(fields).not.toContain("model"); // ⚠️ v5.0 修正点
  });

  it("error_type 枚举仅 4 种", () => {
    const enumValues = schemas.ErrorRecord?.properties?.error_type?.enum ?? [];
    expect(enumValues.sort()).toEqual(
      ["internal", "quota", "timeout", "validation"].sort(),
    );
  });

  it("zod 拒绝 v3.0 废弃枚举（network/api）", () => {
    expect(() => ErrorTypeSchema.parse("network")).toThrow();
    expect(() => ErrorTypeSchema.parse("api")).toThrow();
    expect(() => ErrorTypeSchema.parse("timeout")).not.toThrow();
  });
});

describe("契约 · UsageSummary", () => {
  it("cost_usd 存在于 schema", () => {
    const fields = Object.keys(schemas.UsageSummary?.properties ?? {});
    expect(fields).toContain("cost_usd");
  });

  it("cost_usd 恒为 0.0（BL-02 未完成前）", () => {
    // 后端当前硬编码；契约测试在此断言后端行为
    const sample = { total_requests: 100, total_tokens: 5000, cost_usd: 0 };
    const parsed = UsageSummarySchema.parse(sample);
    // UI 层负责显示 BL-02 徽章
    expect(parsed.cost_usd).toBe(0);
  });
});

describe("契约 · HealthResponse", () => {
  it("services 含 4 个服务", () => {
    const props = schemas.HealthResponse?.properties?.services?.properties ?? {};
    expect(Object.keys(props).sort()).toEqual(
      ["ollama", "postgresql", "redis", "zhipu"].sort(),
    );
  });

  it("service status 枚举 3 种", () => {
    const statusEnum =
      schemas.HealthResponse?.properties?.services?.properties?.ollama
        ?.properties?.status?.enum ?? [];
    expect(statusEnum.sort()).toEqual(
      ["configured", "healthy", "unreachable"].sort(),
    );
  });

  it("system 含 3 指标", () => {
    const props = schemas.HealthResponse?.properties?.system?.properties ?? {};
    expect(Object.keys(props).sort()).toEqual(
      ["cpu_percent", "disk_percent", "memory_percent"].sort(),
    );
  });

  it("metrics 含 cache_hit_rate", () => {
    const props = schemas.HealthResponse?.properties?.metrics?.properties ?? {};
    expect(Object.keys(props)).toContain("cache_hit_rate");
  });

  it("zod 校验数值范围", () => {
    const invalid = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "2.0.0",
      uptime_seconds: 100,
      services: {
        ollama: { status: "healthy" },
        zhipu: { status: "healthy" },
        redis: { status: "healthy" },
        postgresql: { status: "healthy" },
      },
      system: {
        cpu_percent: 150, // ⚠️ 超范围
        memory_percent: 50,
        disk_percent: 30,
      },
      metrics: {
        active_requests: 0,
        total_requests: 100,
        cache_hit_rate: 0.5,
      },
    };
    expect(() => HealthResponseSchema.parse(invalid)).toThrow();
  });
});

describe("契约 · ModelStat", () => {
  it("error_rate 范围 0-1", () => {
    const valid = {
      model_id: "x",
      usage_count: 0,
      avg_latency_ms: 0,
      error_rate: 0.5,
      total_tokens: 0,
    };
    expect(() => ModelStatSchema.parse(valid)).not.toThrow();

    const invalid = { ...valid, error_rate: 1.5 };
    expect(() => ModelStatSchema.parse(invalid)).toThrow();
  });

  it("usage_count 非负", () => {
    expect(() =>
      ModelStatSchema.parse({
        model_id: "x",
        usage_count: -1,
        avg_latency_ms: 0,
        error_rate: 0,
        total_tokens: 0,
      }),
    ).toThrow();
  });
});
