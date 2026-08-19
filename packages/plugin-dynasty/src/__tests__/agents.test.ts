import { describe, it, expect } from "vitest";
import { DYNASTY_AGENTS, AgentIds, DYNASTY_HUB_COMMANDS } from "../agents";

describe("DYNASTY_AGENTS", () => {
  it("应有 12 个 Agent", () => {
    expect(DYNASTY_AGENTS).toHaveLength(12);
  });

  it("每个 Agent 应有唯一 id", () => {
    const ids = DYNASTY_AGENTS.map(a => a.id);
    expect(new Set(ids).size).toBe(12);
  });

  it("应包含三省六部 + 决策/承启/辅助层", () => {
    const levels = new Set(DYNASTY_AGENTS.map(a => a.dynastyLevel));
    expect(levels.has("决策")).toBe(true);
    expect(levels.has("承启")).toBe(true);
    expect(levels.has("三省")).toBe(true);
    expect(levels.has("六部")).toBe(true);
    expect(levels.has("辅助")).toBe(true);
  });

  it("每个 Agent 映射到 AI Family 8 位家人之一", () => {
    for (const a of DYNASTY_AGENTS) {
      expect(a.aiFamilyPersonaId).toBeTruthy();
      expect(["meta-oracle", "navigator", "thinker", "sentinel", "master", "bolero", "prophet", "creative"]).toContain(a.aiFamilyPersonaId);
    }
  });

  it("AgentIds 常量应与其 id 一致", () => {
    expect(AgentIds.EMPEROR).toBe("emperor");
    expect(AgentIds.TAIZI).toBe("taizi");
    expect(AgentIds.ZHONGSHU).toBe("zhongshu");
    expect(AgentIds.MENXIA).toBe("menxia");
  });

  it("应导出 4 条 Hub 命令", () => {
    expect(DYNASTY_HUB_COMMANDS).toHaveLength(4);
    expect(DYNASTY_HUB_COMMANDS[0].systemId).toBe("dynasty");
  });
});
