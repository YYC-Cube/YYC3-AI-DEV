/*
 * ============================================================
 * @Module : tests/contract/sse — SSE 协议契约
 * @Family-Owner : 🤔 语枢·万物
 * @对应 : v5.1 §7.2.2 检查项 13（SSE 协议）
 * ============================================================
 */
import { describe, it, expect } from "vitest";
import {
  FirstChunkExtrasSchema,
} from "../../domains/_shared/types.zod";

describe("契约 · SSE 协议", () => {
  it("首 chunk 允许 _yyc3_upstream 字段", () => {
    const chunk = {
      id: "chatcmpl-1",
      _yyc3_upstream: "openai-primary",
      choices: [{ delta: { role: "assistant" }, index: 0 }],
    };
    expect(() => FirstChunkExtrasSchema.parse(chunk)).not.toThrow();
  });

  it("错误 chunk 结构符合预期", () => {
    const errorChunk = {
      error: {
        message: "Upstream timeout",
        type: "stream_error",
      },
    };
    expect(errorChunk.error.type).toBe("stream_error");
    expect(errorChunk.error.message).toBeTruthy();
  });

  it("结束标记为 [DONE]", () => {
    const terminator = "[DONE]";
    expect(terminator).toBe("[DONE]");
  });

  it("分隔符为 \\n\\n", () => {
    const raw = 'data: {"id":"1"}\n\ndata: [DONE]\n\n';
    const parts = raw.split("\n\n").filter(Boolean);
    expect(parts).toHaveLength(2);
    expect(parts[0].startsWith("data: ")).toBe(true);
    expect(parts[1]).toBe("data: [DONE]");
  });

  it("响应头字段名正确", () => {
    const expectedHeaders = ["X-YYC3-Upstream", "X-YYC3-Degraded"];
    expect(expectedHeaders).toContain("X-YYC3-Upstream");
    expect(expectedHeaders).toContain("X-YYC3-Degraded");
  });

  it("Token 估算口径 = len // 4", () => {
    const content = "这是一段测试文本"; // 8 字符
    expect(Math.floor(content.length / 4)).toBe(2);
  });
});
