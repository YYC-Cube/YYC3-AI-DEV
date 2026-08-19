/**
 * @file: agents.ts
 * @description: 12 Dynasty Agent 定义 — 三省六部制 × AI Family 人格映射
 */
import { Crown, Scroll, Gavel, Building2, Coins, BookOpen, Code, Shield, Wrench, Users, Sun, Sparkles } from "lucide-react";
import type { HubCommand } from "@yyc3/shell";

// ============================================================
// Agent ID 常量
// ============================================================

export const AgentIds = {
  EMPEROR:   "emperor",
  TAIZI:     "taizi",
  ZHONGSHU:  "zhongshu",
  MENXIA:    "menxia",
  SHANGSHU:  "shangshu",
  HUBU:      "hubu",
  LIBU:      "libu",
  BINGBU:    "bingbu",
  XINGBU:    "xingbu",
  GONGBU:    "gongbu",
  LIBU_HR:   "libu_hr",
  ZAOCHAO:   "zaochao",
} as const;
type AgentId = typeof AgentIds[keyof typeof AgentIds];

// ============================================================
// Agent 定义
// ============================================================

export interface DynastyAgent {
  id: AgentId;
  name: string;           // 中文名
  title: string;          // 官职
  dynastyLevel: "决策" | "承启" | "三省" | "六部" | "辅助";
  color: string;
  icon: typeof Crown;     // lucide-react 图标
  role: string;
  expertise: string[];
  aiFamilyPersonaId: string;  // 映射到 AI Family 8 位家人
}

export const DYNASTY_AGENTS: DynastyAgent[] = [
  {
    id: AgentIds.EMPEROR, name: "皇帝", title: "天子",
    dynastyLevel: "决策", color: "#FFD700", icon: Crown,
    role: "最终决策 · 下旨发令",
    expertise: ["战略决策", "全局调度", "资源分配", "赏惩罚恶"],
    aiFamilyPersonaId: "meta-oracle",
  },
  {
    id: AgentIds.TAIZI, name: "太子", title: "储君",
    dynastyLevel: "承启", color: "#FFA500", icon: Sparkles,
    role: "消息分拣 · 旨意整理",
    expertise: ["意图识别", "需求分析", "消息路由", "优先级排序"],
    aiFamilyPersonaId: "navigator",
  },
  {
    id: AgentIds.ZHONGSHU, name: "中书省", title: "中书令",
    dynastyLevel: "三省", color: "#00d4ff", icon: Scroll,
    role: "草拟方案 · 制定计划",
    expertise: ["方案设计", "技术选型", "计划制定", "可行性分析"],
    aiFamilyPersonaId: "thinker",
  },
  {
    id: AgentIds.MENXIA, name: "门下省", title: "门下侍中",
    dynastyLevel: "三省", color: "#BF00FF", icon: Gavel,
    role: "审议封驳 · 质量把控",
    expertise: ["审核评估", "风险识别", "质量门控", "合规检查"],
    aiFamilyPersonaId: "sentinel",
  },
  {
    id: AgentIds.SHANGSHU, name: "尚书省", title: "尚书令",
    dynastyLevel: "三省", color: "#00FF88", icon: Building2,
    role: "派发任务 · 汇总回奏",
    expertise: ["任务调度", "进度追踪", "结果汇总", "跨部协调"],
    aiFamilyPersonaId: "meta-oracle",
  },
  {
    id: AgentIds.HUBU, name: "户部", title: "户部尚书",
    dynastyLevel: "六部", color: "#FF69B4", icon: Coins,
    role: "数据分析 · 资源核算",
    expertise: ["数据洞察", "指标分析", "报表生成", "资源优化"],
    aiFamilyPersonaId: "thinker",
  },
  {
    id: AgentIds.LIBU, name: "礼部", title: "礼部尚书",
    dynastyLevel: "六部", color: "#E8E8E8", icon: BookOpen,
    role: "技术文档 · 规范制定",
    expertise: ["文档撰写", "API设计", "规范输出", "知识管理"],
    aiFamilyPersonaId: "master",
  },
  {
    id: AgentIds.BINGBU, name: "兵部", title: "兵部尚书",
    dynastyLevel: "六部", color: "#FF6600", icon: Code,
    role: "代码研发 · Bug修复",
    expertise: ["功能开发", "Bug修复", "性能优化", "重构改进"],
    aiFamilyPersonaId: "master",
  },
  {
    id: AgentIds.XINGBU, name: "刑部", title: "刑部尚书",
    dynastyLevel: "六部", color: "#FF0044", icon: Shield,
    role: "安全审计 · 合规检查",
    expertise: ["漏洞扫描", "安全审计", "合规验证", "数据保护"],
    aiFamilyPersonaId: "sentinel",
  },
  {
    id: AgentIds.GONGBU, name: "工部", title: "工部尚书",
    dynastyLevel: "六部", color: "#FF7043", icon: Wrench,
    role: "CI/CD · 部署运维",
    expertise: ["部署发布", "流水线管理", "环境维护", "工具链"],
    aiFamilyPersonaId: "bolero",
  },
  {
    id: AgentIds.LIBU_HR, name: "吏部", title: "吏部尚书",
    dynastyLevel: "六部", color: "#C0C0C0", icon: Users,
    role: "注册考核 · 权限管理",
    expertise: ["Agent注册", "角色分配", "考核评分", "勋赏晋级"],
    aiFamilyPersonaId: "prophet",
  },
  {
    id: AgentIds.ZAOCHAO, name: "早朝", title: "朝议大夫",
    dynastyLevel: "辅助", color: "#FFFF00", icon: Sun,
    role: "定时播报 · 健康检查",
    expertise: ["定时巡检", "状态播报", "告警通知", "日报生成"],
    aiFamilyPersonaId: "creative",
  },
];

// ============================================================
// Hub 命令 (注册到 AI Family 浮窗)
// ============================================================

export const DYNASTY_HUB_COMMANDS: HubCommand[] = [
  { id: "d-edict",  label: "皇帝下旨 — 创建新任务",       systemId: "dynasty", icon: Crown,    action: () => {} },
  { id: "d-review", label: "门下审议 — 查看待批奏章",     systemId: "dynasty", icon: Gavel,    action: () => {} },
  { id: "d-court",  label: "召集早朝 — 全体Agent播报",    systemId: "dynasty", icon: Sun,      action: () => {} },
  { id: "d-honor",  label: "勋赏 — 颁发勋章",              systemId: "dynasty", icon: Sparkles, action: () => {} },
];
