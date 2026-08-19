/**
 * @file: edict-protocol.ts
 * @description: Dynasty EdictMessage 消息协议 — 六阶段任务流转
 *
 * 流转: 下旨 → 草拟 → 审议 → 派发 → 回奏 → 赏赐
 *        edict  memorial review dispatch report reward
 */
import { eventBus, Events } from "@yyc3/shell";

// ============================================================
// 消息类型
// ============================================================

export const EdictTypes = {
  EDICT:    "edict",     // 下旨 — 皇帝发起任务
  MEMORIAL: "memorial",  // 草拟 — 中书制定方案
  REVIEW:   "review",    // 审议 — 门下审核批准/封驳
  DISPATCH: "dispatch",  // 派发 — 尚书分发至六部
  REPORT:   "report",    // 回奏 — 六部汇报结果
  REWARD:   "reward",    // 赏赐 — 皇帝颁发勋章
} as const;
type EdictType = typeof EdictTypes[keyof typeof EdictTypes];

// ============================================================
// EdictMessage
// ============================================================

export interface EdictMessage {
  version: "1.0";
  messageId: string;        // UUID — 全链路追踪
  timestamp: string;        // ISO 8601
  from: string;             // Agent ID
  to: string;               // Agent ID
  type: EdictType;
  payload: EdictPayload;
  signature?: string;       // HMAC 防篡改
}

export interface EdictPayload {
  edictId?: string;         // 任务关联 ID
  title?: string;
  content: unknown;
  urgency: "low" | "medium" | "high" | "urgent";
  relatedIds?: string[];    // 消息链追溯
  metadata?: Record<string, unknown>;
}

// ============================================================
// 任务状态机
// ============================================================

export const EDICT_STAGES = [
  { stage: 1, key: "issued",    name: "下旨",   desc: "皇帝创建任务",      next: "drafting" },
  { stage: 2, key: "drafting",  name: "草拟",   desc: "中书制定执行方案",  next: "reviewing" },
  { stage: 3, key: "reviewing", name: "审议",   desc: "门下审核(准奏/封驳)", next: ["dispatching", "drafting"] },
  { stage: 4, key: "dispatching", name: "派发", desc: "尚书分派至六部",     next: "executing" },
  { stage: 5, key: "executing", name: "执行",   desc: "六部协作执行任务",  next: "reporting" },
  { stage: 6, key: "reporting", name: "回奏",   desc: "汇总结果上奏皇帝",  next: "rewarding" },
  { stage: 7, key: "rewarding", name: "赏赐",   desc: "皇帝颁发勋章",      next: "archived" },
  { stage: 8, key: "archived",  name: "归档",   desc: "任务记录归档存储",  next: null },
];

// ============================================================
// EventBus 集成
// ============================================================

export const DynastyEvents = {
  /** 下旨: (edict: EdictMessage) */
  EDICT_CREATE:   "dynasty:edict:create",
  /** 草拟: (memorial: EdictMessage) */
  MEMORIAL_DRAFT: "dynasty:memorial:draft",
  /** 审议通过: (review: EdictMessage) */
  REVIEW_APPROVE: "dynasty:review:approve",
  /** 审议封驳: (review: EdictMessage) */
  REVIEW_REJECT:  "dynasty:review:reject",
  /** 派发: (dispatch: EdictMessage) */
  DISPATCH_SEND:  "dynasty:dispatch:send",
  /** 回奏: (report: EdictMessage) */
  REPORT_SUBMIT:  "dynasty:report:submit",
  /** 赏赐: (reward: EdictMessage) */
  REWARD_AWARD:   "dynasty:reward:award",
  /** 早朝播报: (summary: string) */
  COURT_MORNING:  "dynasty:court:morning",
} as const;

// ============================================================
// 消息构造函数
// ============================================================

let idCounter = 0;

function createEdict(
  type: EdictType, from: string, to: string, content: unknown,
  urgency: EdictPayload["urgency"] = "medium", edictId?: string,
): EdictMessage {
  idCounter += 1;
  return {
    version: "1.0",
    messageId: `dyn-msg-${Date.now()}-${idCounter}`,
    timestamp: new Date().toISOString(),
    from, to, type,
    payload: { edictId, content, urgency, title: undefined },
  };
}

/** 皇帝下旨 */
export function issueEdict(from: string, title: string, content: unknown, urgency: EdictPayload["urgency"] = "medium"): EdictMessage {
  const edictId = `edict-${Date.now()}`;
  const msg = createEdict("edict", from, "taizi", { title, content, urgency }, urgency, edictId);
  msg.payload.title = title;
  eventBus.emit(DynastyEvents.EDICT_CREATE, msg);
  return msg;
}

/** 门下审议通过 */
export function approveMemorial(from: string, edictId: string): EdictMessage {
  const msg = createEdict("review", from, "shangshu", { approved: true }, "medium", edictId);
  eventBus.emit(DynastyEvents.REVIEW_APPROVE, msg);
  return msg;
}

/** 门下审议封驳 */
export function rejectMemorial(from: string, edictId: string, reason: string): EdictMessage {
  const msg = createEdict("review", from, "zhongshu", { approved: false, reason }, "medium", edictId);
  eventBus.emit(DynastyEvents.REVIEW_REJECT, msg);
  return msg;
}

/** 尚书派发至六部 */
export function dispatchToMinistry(from: string, edictId: string, ministry: string): EdictMessage {
  const msg = createEdict("dispatch", from, ministry, { assignedTo: ministry }, "medium", edictId);
  eventBus.emit(DynastyEvents.DISPATCH_SEND, msg);
  return msg;
}

/** 六部回奏 */
export function submitReport(from: string, edictId: string, result: unknown): EdictMessage {
  const msg = createEdict("report", from, "emperor", { result }, "medium", edictId);
  eventBus.emit(DynastyEvents.REPORT_SUBMIT, msg);
  return msg;
}
