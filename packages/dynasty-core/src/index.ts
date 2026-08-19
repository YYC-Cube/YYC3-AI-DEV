/**
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : Dynasty Core · 三省六部
 * @License  : Apache-2.0
 * @Homepage : https://matrix.yyc3.top
 * ============================================================
 * 三省以治，六部以行 · 人从众曌众从人 🌹
 * ============================================================
 *
 * @file index.ts
 * @description YYC³ Dynasty Core — 统一导出
 *              12 朝臣 Agent + Edict 协议 + 勋章系统 + 消息总线
 */

// ===== 协议层 =====
export type {
  DynastyAgentID,
  DynastyTier,
  EdictType,
  EdictStatus,
  EdictUrgency,
  ReviewVerdict,
  HonorRarity,
  DynastyAgentRole,
  EdictMessage,
  EdictPayload,
  EdictContent,
  MemorialContent,
  MemorialSubtask,
  ReviewContent,
  DispatchContent,
  DispatchTask,
  ReportContent,
  RewardContent,
  EdictEnvelope,
  DynastyHonor,
} from './protocol/DynastyTypes';

export {
  DYNASTY_ROLES,
  DYNASTY_HONORS,
  EDICT_FLOW,
} from './protocol/DynastyTypes';

export {
  createEdictMessage,
  createEdict,
  createMemorial,
  createReview,
  createDispatch,
  createReport,
  createReward,
  edictToBuffer,
  bufferToEdict,
  getEdictId,
  getEdictUrgency,
} from './protocol/EdictMessage';

// ===== Agent 基类 =====
export type { DynastyAgentConfig } from './agents/DynastyAgentBase';
export { DynastyAgentBase } from './agents/DynastyAgentBase';
// 向后兼容别名
export { DynastyAgentBase as DynastyBaseAgent } from './agents/DynastyAgentBase';

// ===== 12 朝臣 Agent =====
export { EmperorAgent } from './agents/EmperorAgent';
export type { EmperorEdictResult } from './agents/EmperorAgent';

export { TaiziAgent } from './agents/TaiziAgent';
export type { TaiziClassification } from './agents/TaiziAgent';

export { ZhongshuAgent } from './agents/ZhongshuAgent';
export type { ExecutionPlan } from './agents/ZhongshuAgent';

export { MenxiaAgent } from './agents/MenxiaAgent';
export type { ReviewResult } from './agents/MenxiaAgent';

export { ShangshuAgent } from './agents/ShangshuAgent';
export type { DispatchResult } from './agents/ShangshuAgent';

export { HubuAgent } from './agents/HubuAgent';
export type { DataAnalysisResult } from './agents/HubuAgent';

export { LibuAgent } from './agents/LibuAgent';
export type { DocumentationOutput } from './agents/LibuAgent';

export { BingbuAgent } from './agents/BingbuAgent';
export type { CodeDevelopmentResult } from './agents/BingbuAgent';

export { XingbuAgent } from './agents/XingbuAgent';
export type { SecurityAuditResult } from './agents/XingbuAgent';

export { GongbuAgent } from './agents/GongbuAgent';
export type { CICDResult } from './agents/GongbuAgent';

export { LibuHRAgent } from './agents/LibuHRAgent';
export type { AgentRegistration, PersonnelAssessment } from './agents/LibuHRAgent';

export { ZaochaoAgent } from './agents/ZaochaoAgent';
export type { BroadcastMessage } from './agents/ZaochaoAgent';

// ===== 勋章系统 =====
export { HonorsRegistry } from './honors/HonorsRegistry';
export { HonorsSystem } from './honors/HonorsSystem';
export type { HonorGrant, HonorEligibility, AgentStats } from './honors/HonorsSystem';

// ===== 消息总线 =====
export type { DynastyBusConfig, EdictHandler } from './bus/DynastyMessageBus';
export { DynastyMessageBus } from './bus/DynastyMessageBus';

// ===== 朝堂宪章 =====
export { 朝堂宪章, 三省, 六部 } from './朝堂宪章';
