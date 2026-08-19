/**
 * DynastyBaseAgent — 向后兼容的 re-export
 * 实际实现移至 DynastyAgentBase（轻量，不依赖 family-core BaseAgent）
 */
export { DynastyAgentBase as DynastyBaseAgent } from './DynastyAgentBase';
export type { DynastyAgentConfig } from './DynastyAgentBase';
