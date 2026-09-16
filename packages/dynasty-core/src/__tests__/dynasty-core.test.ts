/**
 * @file: __tests__/dynasty-core.test.ts
 * @description: dynasty-core 协议层边界守卫测试（此前该包零测试覆盖）
 */
import { describe, expect, it } from "vitest";
import type { DynastyAgentID, EdictMessage } from "../index";
import {
  DYNASTY_ROLES,
  DynastyMessageBus,
  EDICT_FLOW,
  HonorsSystem,
  bufferToEdict,
  createDispatch,
  createEdict,
  createEdictMessage,
  createMemorial,
  createReport,
  createReview,
  createReward,
  edictToBuffer,
  getEdictId,
  getEdictUrgency,
} from "../index";

describe("DynastyTypes 协议常量", () => {
  it("DYNASTY_ROLES 覆盖全部 12 朝臣", () => {
    const ids = Object.keys(DYNASTY_ROLES) as DynastyAgentID[];
    expect(ids).toHaveLength(12);
    expect(new Set(ids).size).toBe(12);
    expect(ids).toContain("emperor");
    expect(ids).toContain("zaochao");
  });

  it("EDICT_FLOW 定义完整敕令流转链", () => {
    expect(Array.isArray(EDICT_FLOW)).toBe(true);
    expect(EDICT_FLOW.length).toBeGreaterThan(0);
  });
});

describe("EdictMessage 工厂函数", () => {
  it("createEdictMessage 生成唯一 message_id 与合法信封", () => {
    const a = createEdictMessage("emperor", "taizi", "edict", { content: { text: "test" }, urgency: "low" });
    const b = createEdictMessage("emperor", "taizi", "edict", { content: { text: "test" }, urgency: "low" });
    expect(a.message_id).not.toBe(b.message_id);
    expect(a.version).toBe("1.0");
    expect(a.from).toBe("emperor");
    expect(a.to).toBe("taizi");
    expect(new Date(a.timestamp).getTime()).not.toBeNaN();
  });

  it("六种敕令类型工厂均产出正确 type", () => {
    const tasks = [{ id: "t1", assignee: "hubu" as const, description: "核算", priority: "high" as const }];
    expect(createEdict("兴兵").type).toBe("edict");
    expect(createMemorial("taizi", "edict-1", "执行计划").type).toBe("memorial");
    expect(createReview("approved", "准", "edict-1").type).toBe("review");
    expect(createReview("rejected", "驳", "edict-1").to).toBe("zhongshu");
    expect(createDispatch(tasks, "edict-1").type).toBe("dispatch");
    expect(createReport("t1", "edict-1", "success", {}, "gongbu").type).toBe("report");
    expect(createReward("hubu", "honor-1", "记账有功").type).toBe("reward");
  });

  it("getEdictId / getEdictUrgency 提取器工作正常", () => {
    // getEdictId 提取 payload.edict_id（非 message_id）
    const memorial = createMemorial("taizi", "edict-42", "计划");
    expect(getEdictId(memorial)).toBe("edict-42");
    // 敕令本体无 edict_id（是源头），返回 undefined
    const edict = createEdict("test", "default", "urgent");
    expect(getEdictId(edict)).toBeUndefined();
    expect(getEdictUrgency(edict)).toBe("urgent");
  });

  it("edictToBuffer → bufferToEdict 序列化往返无损", () => {
    const msg = createEdict("往返测试", "war-room", "high");
    const buf = edictToBuffer(msg);
    const restored = bufferToEdict(buf) as EdictMessage;
    expect(restored.message_id).toBe(msg.message_id);
    expect(restored.type).toBe(msg.type);
  });
});

describe("DynastyMessageBus 构造", () => {
  it("可实例化且具备订阅能力", () => {
    const bus = new DynastyMessageBus({ maxQueueSize: 100, retryPolicy: { maxRetries: 3, backoffFactor: 2 } });
    expect(bus).toBeInstanceOf(DynastyMessageBus);
  });
});

describe("HonorsSystem 勋章系统", () => {
  it("可实例化", () => {
    const honors = new HonorsSystem();
    expect(honors).toBeInstanceOf(HonorsSystem);
  });
});
