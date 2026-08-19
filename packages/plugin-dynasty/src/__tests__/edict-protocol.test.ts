import { describe, it, expect, beforeEach } from "vitest";
import { EDICT_STAGES, EdictTypes, issueEdict, approveMemorial, rejectMemorial } from "../edict-protocol";

describe("edict-protocol", () => {
  it("EDICT_STAGES 应有 8 阶段", () => {
    expect(EDICT_STAGES).toHaveLength(8);
    expect(EDICT_STAGES[0].name).toBe("下旨");
    expect(EDICT_STAGES[EDICT_STAGES.length - 1].name).toBe("归档");
  });

  it("EdictTypes 应有 6 种类型", () => {
    expect(EdictTypes.EDICT).toBe("edict");
    expect(EdictTypes.MEMORIAL).toBe("memorial");
    expect(EdictTypes.REVIEW).toBe("review");
    expect(EdictTypes.DISPATCH).toBe("dispatch");
    expect(EdictTypes.REPORT).toBe("report");
    expect(EdictTypes.REWARD).toBe("reward");
  });

  it("issueEdict 应返回有效的 EdictMessage", () => {
    const msg = issueEdict("emperor", "测试任务", { priority: "high" }, "urgent");
    expect(msg.version).toBe("1.0");
    expect(msg.from).toBe("emperor");
    expect(msg.to).toBe("taizi");
    expect(msg.type).toBe("edict");
    expect(msg.payload.title).toBe("测试任务");
    expect(msg.payload.urgency).toBe("urgent");
    expect(msg.payload.edictId).toBeTruthy();
  });

  it("approveMemorial 应标记审议通过", () => {
    const msg = approveMemorial("menxia", "edict-001");
    expect(msg.type).toBe("review");
    expect(msg.from).toBe("menxia");
    expect(msg.payload.content).toEqual({ approved: true });
  });

  it("rejectMemorial 应标记审议封驳", () => {
    const msg = rejectMemorial("menxia", "edict-002", "资源不足");
    expect(msg.type).toBe("review");
    expect(msg.payload.content).toEqual({ approved: false, reason: "资源不足" });
  });
});
