/**
 * @file: honors.ts
 * @description: Dynasty 勋章系统 — 17 种中华文化勋章 (1-6星)
 */
import { Crown, Scroll, Gavel, Star, Shield, Code, BookOpen, Sun, Zap, Award, Sword, Gem } from "lucide-react";

export interface DynastyHonor {
  id: string;
  name: string;           // 勋章名称 (中华文化典故)
  desc: string;
  icon: typeof Crown;
  star: 1 | 2 | 3 | 4 | 5 | 6;
  category: "角色" | "成就" | "协作" | "安全" | "效率";
  condition: string;      // 获得条件
}

// ============================================================
// 17 种勋章
// ============================================================

export const DYNASTY_HONORS: DynastyHonor[] = [
  // ─── 角色勋章 (5种) ───
  { id: "h-01", name: "太子少师",   desc: "太子分拣消息达百件无差错",            icon: Star,    star: 3, category: "角色", condition: "太子累计分拣 100 条消息无错误" },
  { id: "h-02", name: "中书舍人",   desc: "中书草拟方案连续通过 50 次",          icon: Scroll,  star: 4, category: "角色", condition: "中书连续 50 次草拟未遭封驳" },
  { id: "h-03", name: "门下执法",   desc: "门下审议捕获 10 次重大风险",          icon: Gavel,   star: 4, category: "角色", condition: "门下通过审议识别重大风险 10 次" },
  { id: "h-04", name: "六朝元老",   desc: "担任 Agent 角色超过 180 天",          icon: Crown,   star: 5, category: "角色", condition: "Agent 持续运行 180 天无中断" },
  { id: "h-05", name: "御前行走",   desc: "早朝播报连续 30 天准时",              icon: Sun,     star: 3, category: "角色", condition: "早朝连续 30 天准时播报" },

  // ─── 成就勋章 (5种) ───
  { id: "h-06", name: "日理万机",   desc: "完成 100 个任务",                    icon: Zap,     star: 4, category: "成就", condition: "累计完成 100 个 Dynasty 任务" },
  { id: "h-07", name: "天工开物",   desc: "创造或优化 20 个工具/流程",          icon: Gem,     star: 5, category: "成就", condition: "创建/优化工具或流程 20 项" },
  { id: "h-08", name: "学富五车",   desc: "知识库贡献文档超过 50 篇",           icon: BookOpen,star: 4, category: "成就", condition: "向知识库贡献 50 篇文档" },
  { id: "h-09", name: "金戈铁马",   desc: "兵部完成紧急 Bug 修复 30 次",        icon: Sword,   star: 4, category: "成就", condition: "1小时内修复紧急Bug 30 次" },
  { id: "h-10", name: "指日可待",   desc: "提前完成高优先级任务 10 次",          icon: Sun,     star: 3, category: "成就", condition: "urgent 任务提前完成 10 次" },

  // ─── 协作勋章 (3种) ───
  { id: "h-11", name: "三省同心",   desc: "三省接力完成 100 个无封驳任务",      icon: Award,   star: 6, category: "协作", condition: "三省接力 100 个任务零封驳" },
  { id: "h-12", name: "群臣辑睦",   desc: "跨部协作任务完成 30 次",              icon: Star,    star: 4, category: "协作", condition: "跨六部协作完成 30 个任务" },
  { id: "h-13", name: "君臣佐使",   desc: "皇帝-太子-三省最优协作达成 50 次",   icon: Crown,   star: 5, category: "协作", condition: "皇帝-太子-三省协作评分满分 50 次" },

  // ─── 安全勋章 (2种) ───
  { id: "h-14", name: "铜墙铁壁",   desc: "连续 90 天无安全事故",               icon: Shield,  star: 6, category: "安全", condition: "连续 90 天零安全事件" },
  { id: "h-15", name: "明察秋毫",   desc: "刑部识别 50 个高危漏洞",              icon: Shield,  star: 5, category: "安全", condition: "刑部发现并修复 50 个高危漏洞" },

  // ─── 效率勋章 (2种) ───
  { id: "h-16", name: "九九归一",   desc: "连续 99 个任务无阻塞",               icon: Zap,     star: 6, category: "效率", condition: "连续 99 个任务流畅完成无阻塞" },
  { id: "h-17", name: "人从众曌",   desc: "获得 20 个五星回奏评价",             icon: Award,   star: 5, category: "效率", condition: "累计获得 20 个五星回奏评价" },
];

// ============================================================
// 按 Agent 可获得的勋章
// ============================================================

export const AGENT_HONORS: Record<string, string[]> = {
  "emperor":    ["h-01", "h-13", "h-10"],
  "taizi":      ["h-01", "h-04"],
  "zhongshu":   ["h-02", "h-11", "h-13"],
  "menxia":     ["h-03", "h-11", "h-15"],
  "shangshu":   ["h-11", "h-12", "h-13"],
  "hubu":       ["h-06", "h-12"],
  "libu":       ["h-08", "h-12"],
  "bingbu":     ["h-09", "h-12"],
  "xingbu":     ["h-14", "h-15"],
  "gongbu":     ["h-07", "h-12"],
  "libu_hr":    ["h-17", "h-12"],
  "zaochao":    ["h-05", "h-04"],
};

export function getHonor(id: string): DynastyHonor | undefined {
  return DYNASTY_HONORS.find(h => h.id === id);
}

export function getHonorsForAgent(agentId: string): DynastyHonor[] {
  const ids = AGENT_HONORS[agentId] ?? [];
  return ids.map(getHonor).filter(Boolean) as DynastyHonor[];
}
