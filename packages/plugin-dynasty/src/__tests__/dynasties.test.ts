import { describe, it, expect } from "vitest";
import { THIRTEEN_DYNASTIES, DYNASTY_SKILL_MAP, DYNASTY_CATEGORIES, getSkillsForDynasty, getDynasty } from "../dynasties";

describe("THIRTEEN_DYNASTIES", () => {
  it("应有 13 个朝代", () => {
    expect(THIRTEEN_DYNASTIES).toHaveLength(13);
  });

  it("朝代应按时间排序", () => {
    expect(THIRTEEN_DYNASTIES[0].name).toBe("夏");
    expect(THIRTEEN_DYNASTIES[THIRTEEN_DYNASTIES.length - 1].name).toBe("清");
  });

  it("每个朝代应有 id/name/period/culturalPeak", () => {
    for (const d of THIRTEEN_DYNASTIES) {
      expect(d.id).toBeTruthy();
      expect(d.name).toBeTruthy();
      expect(d.period).toBeTruthy();
      expect(d.culturalPeak).toBeTruthy();
    }
  });

  it("getDynasty 应通过 id 查找", () => {
    expect(getDynasty("tang")?.name).toBe("唐");
    expect(getDynasty("nonexistent")).toBeUndefined();
  });
});

describe("DYNASTY_SKILL_MAP", () => {
  it("应有 26 项 Skills (每朝 2 项)", () => {
    expect(DYNASTY_SKILL_MAP.length).toBe(26);
  });

  it("每朝至少 2 项 Skill", () => {
    for (const d of THIRTEEN_DYNASTIES) {
      const skills = getSkillsForDynasty(d.id);
      expect(skills.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("DYNASTY_CATEGORIES", () => {
  it("应有 9 大类别", () => {
    expect(DYNASTY_CATEGORIES).toHaveLength(9);
  });
});
