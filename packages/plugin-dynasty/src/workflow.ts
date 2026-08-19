/**
 * @file: workflow.ts
 * @description: Dynasty 任务流转引擎 — 下旨→草拟→审议→派发→回奏→赏赐
 *
 * 使用 EventBus 驱动, 与 AI Family Hub 浮窗实时联动
 */
import { eventBus } from "@yyc3/shell";
import { EDICT_STAGES, DynastyEvents, EdictTypes, type EdictMessage } from "./edict-protocol";
import { AgentIds, DYNASTY_AGENTS } from "./agents";
import { DYNASTY_HONORS, getHonor } from "./honors";

// ============================================================
// 工作流状态
// ============================================================

interface WorkflowState {
  currentStage: string;
  history: WorkflowStep[];
  blockedAt?: string;
  honorAwarded?: string;
}

interface WorkflowStep {
  timestamp: string;
  stage: string;
  message: string;
  agentId: string;
  agentName: string;
}

export class DynastyWorkflow {
  private states = new Map<string, WorkflowState>();
  private unsubs: (() => void)[] = [];

  constructor() {
    this.listen();
  }

  private listen() {
    this.unsubs.push(
      eventBus.on(DynastyEvents.EDICT_CREATE, (msg: EdictMessage) => {
        this.onEdict(msg);
      }),
      eventBus.on(DynastyEvents.REVIEW_APPROVE, (msg: EdictMessage) => {
        this.onApprove(msg);
      }),
      eventBus.on(DynastyEvents.REVIEW_REJECT, (msg: EdictMessage) => {
        this.onReject(msg);
      }),
      eventBus.on(DynastyEvents.REPORT_SUBMIT, (msg: EdictMessage) => {
        this.onReport(msg);
      }),
    );
  }

  private onEdict(msg: EdictMessage) {
    const id = msg.payload.edictId!;
    const agent = DYNASTY_AGENTS.find(a => a.id === msg.from);
    this.states.set(id, {
      currentStage: "drafting",
      history: [{
        timestamp: msg.timestamp, stage: "下旨",
        message: msg.payload.title ?? "新任务",
        agentId: msg.from, agentName: agent?.name ?? "皇帝",
      }],
    });
    eventBus.emit("dynasty:state:changed", { edictId: id, stage: "drafting" });
  }

  private onApprove(msg: EdictMessage) {
    const id = msg.payload.edictId!;
    const state = this.states.get(id);
    if (!state) return;
    state.currentStage = "dispatching";
    state.history.push({
      timestamp: msg.timestamp, stage: "审议通过",
      message: "准奏 — 派发执行",
      agentId: msg.from, agentName: "门下省",
    });
    eventBus.emit("dynasty:state:changed", { edictId: id, stage: "dispatching" });
  }

  private onReject(msg: EdictMessage) {
    const id = msg.payload.edictId!;
    const state = this.states.get(id);
    if (!state) return;
    state.currentStage = "drafting";
    state.blockedAt = "reviewing";
    state.history.push({
      timestamp: msg.timestamp, stage: "审议封驳",
      message: "封驳 — 退回重拟",
      agentId: msg.from, agentName: "门下省",
    });
    eventBus.emit("dynasty:state:changed", { edictId: id, stage: "drafting", blocked: true });
  }

  private onReport(msg: EdictMessage) {
    const id = msg.payload.edictId!;
    const state = this.states.get(id);
    if (!state) return;
    state.currentStage = "completed";
    const agent = DYNASTY_AGENTS.find(a => a.id === msg.from);
    state.history.push({
      timestamp: msg.timestamp, stage: "回奏",
      message: "任务完成 — 上奏皇帝",
      agentId: msg.from, agentName: agent?.name ?? "六部",
    });
    // 随机颁发勋章
    const honor = this.randomHonor();
    if (honor) state.honorAwarded = honor.id;
    eventBus.emit("dynasty:state:changed", { edictId: id, stage: "completed", honor: state.honorAwarded });
  }

  private randomHonor() {
    const pool = DYNASTY_HONORS.filter(h => h.star <= 3);
    return pool[Math.floor(Math.random() * pool.length)] ?? null;
  }

  getState(edictId: string): WorkflowState | undefined {
    return this.states.get(edictId);
  }

  getAllTasks(): { edictId: string; state: WorkflowState }[] {
    return Array.from(this.states.entries()).map(([edictId, state]) => ({ edictId, state }));
  }

  destroy() {
    this.unsubs.forEach(fn => fn());
  }
}

// ============================================================
// 古风 Mock 回复 (人格感知)
// ============================================================

const PERSONA_MOCK: Record<string, (msg: string) => string> = {
  "emperor": (msg) => {
    const l = msg.toLowerCase();
    if (l.includes("状态") || l.includes("查看")) return "【圣旨】\n\n朕已阅。着中书省即刻草拟方案，门下省严加审议，六部待命。\n\n— 天子御批";
    if (l.includes("任务") || l.includes("创建")) return "【圣旨】\n\n准奏。太子将此旨意分发三省，务必从速办理。\n\n— 钦此";
    return `【上谕】\n\n朕已知悉。三省六部各司其职，不得懈怠。\n\n— ${new Date().toLocaleDateString("zh-CN")} 御笔`;
  },
  "taizi": (msg) => {
    return `【太子承启】\n\n臣已将旨意整理归类，按轻重缓急分为三路：\n\n· 急务 → 中书省即刻草拟\n· 要务 → 户部先行核算\n· 常务 → 尚书省按序派发\n\n请陛下圣裁。`;
  },
  "zhongshu": (msg) => {
    return `【中书省·奏章】\n\n臣已拟定方案如下：\n\n一、分析当前态势\n二、制定执行路径\n三、预估所需资源\n四、设定考核标准\n\n呈门下省审议。\n\n— 中书令 敬上`;
  },
  "menxia": (msg) => {
    if (Math.random() > 0.3) {
      return `【门下省·审议】\n\n臣已逐条审核中书所奏：\n\n✅ 方案可行，逻辑严密\n✅ 资源配比恰当\n✅ 符合规范\n\n准奏。转尚书省派发。\n\n— 门下侍中 谨奏`;
    }
    return `【门下省·封驳】\n\n经审议发现如下问题：\n\n⚠️ 第三项资源预估不足\n⚠️ 缺少应急预案\n\n封驳！请中书省重新草拟。\n\n— 门下侍中 谨奏`;
  },
  "shangshu": (msg) => {
    return `【尚书省·派发令】\n\n已按六部职责分派如下：\n\n· 户部 → 数据分析\n· 礼部 → 文档规范\n· 兵部 → 核心研发\n· 刑部 → 安全审查\n· 工部 → 部署流水线\n· 吏部 → 过程考核\n\n各部按期回奏。\n\n— 尚书令`;
  },
  default: (msg: string) => `臣已收到旨意。正在全力执行中。\n\n当前进度: ${Math.floor(Math.random() * 60 + 30)}%\n预计完成: 约${Math.floor(Math.random() * 30 + 10)}分钟后回奏。`,
};

export function getPersonaMock(personaId: string): (msg: string) => string {
  return PERSONA_MOCK[personaId] || PERSONA_MOCK.default;
}

/** 获取 Agent 全名 */
export function getAgentDisplayName(agentId: string): string {
  const agent = DYNASTY_AGENTS.find(a => a.id === agentId);
  return agent ? `${agent.title}·${agent.name}` : agentId;
}

/** 获取随机 Agent 名言 */
export function getRandomDynastyQuote(): string {
  const quotes = [
    "三省以治，六部以行 — YYC³ Dynasty",
    "以铜为镜，可以正衣冠；以古为镜，可以知兴替 — 唐太宗",
    "究天人之际，通古今之变 — 司马迁",
    "格物致知，诚意正心 — 《大学》",
    "为天地立心，为生民立命 — 张载",
    "知行合一 — 王阳明",
    "苟日新，日日新，又日新 — 《大学》",
    "天行健，君子以自强不息 — 《周易》",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
