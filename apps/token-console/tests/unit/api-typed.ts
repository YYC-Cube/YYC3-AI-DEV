/*
 * ============================================================
 * @Module : tests/unit/api-typed — 类型化客户端单元测试
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 */
import { describe, it, expect } from "vitest";
import { BoleAPI, XianzhiAPI } from "../../domains/_shared/api-typed";

describe("API 客户端（类型化）", () => {
  it("BoleAPI.models 返回 ModelConfig[]", async () => {
    const res = await BoleAPI.models();
    expect(res.data).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
    if (res.data?.length) {
      const m = res.data[0];
      expect(m).toHaveProperty("id");
      expect(m).toHaveProperty("display_name");
      expect(m).toHaveProperty("backend");
    }
  });

  it("XianzhiAPI.summary 返回 UsageSummary", async () => {
    const res = await XianzhiAPI.summary();
    expect(res.data).toBeDefined();
    expect(res.data).toHaveProperty("total_requests");
    expect(res.data).toHaveProperty("total_tokens");
    expect(res.data).toHaveProperty("cost_usd");
  });

  it("XianzhiAPI.health 返回 HealthResponse", async () => {
    const res = await XianzhiAPI.health();
    expect(res.data).toBeDefined();
    expect(res.data).toHaveProperty("services");
    expect(res.data).toHaveProperty("system");
    expect(res.data).toHaveProperty("metrics");
  });
});
