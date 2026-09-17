/*
 * ============================================================
 * @Module : tests/contract/errors — 错误码契约
 * @Family-Owner : 🛡️ 智云·守护
 * ============================================================
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { APIErrorSchema } from "../../domains/_shared/types.zod";

const SNAPSHOT = JSON.parse(
  readFileSync(
    resolve(__dirname, "../../.contract-snapshot.json"),
    "utf-8",
  ),
);
const schemas = SNAPSHOT.components?.schemas ?? {};

describe("契约 · 错误结构", () => {
  it("APIError 使用 detail 包裹", () => {
    const fields = Object.keys(schemas.APIError?.properties ?? {});
    expect(fields).toContain("detail");
  });

  it("error 枚举 4 种（network/api/timeout/validation）", () => {
    const enumValues =
      schemas.APIError?.properties?.detail?.properties?.error?.enum ?? [];
    expect(enumValues.sort()).toEqual(
      ["api", "network", "timeout", "validation"].sort(),
    );
  });

  it("zod 校验合法错误样本", () => {
    const sample = {
      detail: {
        error: "validation",
        message: "Invalid parameter",
        status_code: 400,
      },
    };
    expect(() => APIErrorSchema.parse(sample)).not.toThrow();
  });

  it("zod 拒绝非法 error 枚举", () => {
    const invalid = {
      detail: {
        error: "quota",
        message: "Quota exceeded",
        status_code: 429,
      },
    };
    expect(() => APIErrorSchema.parse(invalid)).toThrow();
  });
});
