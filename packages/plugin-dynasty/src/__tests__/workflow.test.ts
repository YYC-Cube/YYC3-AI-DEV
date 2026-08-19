import { describe, it, expect, beforeEach } from "vitest";
import { DynastyWorkflow, getPersonaMock, getAgentDisplayName, getRandomDynastyQuote } from "../workflow";

describe("DynastyWorkflow", () => {
  let wf: DynastyWorkflow;
  beforeEach(() => { wf = new DynastyWorkflow(); });

  it("应创建实例", () => {
    expect(wf).toBeDefined();
    expect(wf.getAllTasks()).toEqual([]);
  });

  it("destroy 应清理监听器", () => {
    wf.destroy();
    expect(wf.getAllTasks()).toEqual([]);
  });
});

describe("getPersonaMock", () => {
  it("emperor 应返回圣旨风格回复", () => {
    const mock = getPersonaMock("emperor");
    const result = mock("查看状态");
    expect(result).toContain("圣旨");
    expect(result).toContain("朕");
  });

  it("taizi 应返回承启风格", () => {
    const mock = getPersonaMock("taizi");
    const result = mock("测试");
    expect(result).toContain("太子承启");
  });

  it("zhongshu 应返回奏章风格", () => {
    const mock = getPersonaMock("zhongshu");
    const result = mock("测试");
    expect(result).toContain("中书省");
  });

  it("未知 persona 应返回默认回复", () => {
    const mock = getPersonaMock("unknown");
    const result = mock("测试");
    expect(result).toContain("臣已收到旨意");
  });
});

describe("getAgentDisplayName", () => {
  it("应返回完整显示名", () => {
    expect(getAgentDisplayName("emperor")).toBe("天子·皇帝");
  });

  it("未知 Agent 应只返回 id", () => {
    expect(getAgentDisplayName("unknown")).toBe("unknown");
  });
});

describe("getRandomDynastyQuote", () => {
  it("应返回非空字符串", () => {
    const quote = getRandomDynastyQuote();
    expect(quote.length).toBeGreaterThan(0);
  });
});
