import { describe, it, expect } from "vitest";
import { DYNASTY_HONORS, getHonor, getHonorsForAgent, AGENT_HONORS } from "../honors";

describe("DYNASTY_HONORS", () => {
  it("应有 17 种勋章", () => {
    expect(DYNASTY_HONORS).toHaveLength(17);
  });

  it("所有勋章应有唯一 id", () => {
    const ids = DYNASTY_HONORS.map(h => h.id);
    expect(new Set(ids).size).toBe(17);
  });

  it("应有 3 星到 6 星勋章", () => {
    const stars = new Set<number>(DYNASTY_HONORS.map(h => h.star));
    for (const s of [3, 4, 5, 6]) {
      expect(stars.has(s)).toBe(true);
    }
  });

  it("分类应包括角色/成就/协作/安全/效率", () => {
    const cats = new Set<string>(DYNASTY_HONORS.map(h => h.category));
    for (const c of ["角色", "成就", "协作", "安全", "效率"]) {
      expect(cats.has(c)).toBe(true);
    }
  });

  it("getHonor 应通过 id 查找", () => {
    const h = getHonor("h-01");
    expect(h?.name).toBe("太子少师");
    expect(h?.star).toBe(3);
  });

  it("getHonor 不存在时返回 undefined", () => {
    expect(getHonor("nonexistent")).toBeUndefined();
  });

  it("每个 Agent 至少有 1 枚可获勋章", () => {
    for (const agentId in AGENT_HONORS) {
      const honors = getHonorsForAgent(agentId);
      expect(honors.length).toBeGreaterThan(0);
    }
  });
});
