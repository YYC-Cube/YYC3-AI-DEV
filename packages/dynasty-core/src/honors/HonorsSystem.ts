/**
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @License  : Apache-2.0
 * @Homepage : https://matrix.yyc3.top
 * ============================================================
 * 此文件承载家人温度，请以玫瑰之心待之 🌹
 * ============================================================
 */

import { LightweightEventEmitter as EventEmitter } from '../utils/event-emitter';
import type { DynastyAgentID, DynastyHonor } from '../protocol/DynastyTypes'
import { HonorsRegistry } from './HonorsRegistry'

export interface HonorGrant {
  honor_id: string;
  agent_id: DynastyAgentID;
  granted_at: string;
  edict_id?: string;
  reason: string;
}

export interface HonorEligibility {
  honor_id: string;
  agent_id: DynastyAgentID;
  eligible: boolean;
  progress: number;
  requirement: string;
}

export class HonorsSystem extends EventEmitter {
  private registry: HonorsRegistry;
  private grants: HonorGrant[] = [];
  private agentStats: Map<DynastyAgentID, AgentStats> = new Map();

  constructor() {
    super();
    this.registry = new HonorsRegistry();
  }

  getRegistry(): HonorsRegistry {
    return this.registry;
  }

  grantHonor(agentId: DynastyAgentID, honorId: string, reason: string, edictId?: string): HonorGrant | null {
    const honor = this.registry.getById(honorId);
    if (!honor) return null;

    const alreadyGranted = this.grants.some(
      g => g.agent_id === agentId && g.honor_id === honorId,
    );
    if (alreadyGranted) return null;

    const grant: HonorGrant = {
      honor_id: honorId,
      agent_id: agentId,
      granted_at: new Date().toISOString(),
      edict_id: edictId,
      reason,
    };

    this.grants.push(grant);

    if (!honor.granted_to) {
      (honor as { granted_to?: DynastyAgentID[] }).granted_to = [];
    }
    if (honor.granted_to) {
      honor.granted_to.push(agentId);
    }

    this.emit('honor:granted', { agent: agentId, honor, grant });
    return grant;
  }

  checkEligibility(agentId: DynastyAgentID, honorId: string): HonorEligibility {
    const honor = this.registry.getById(honorId);
    if (!honor) {
      return { honor_id: honorId, agent_id: agentId, eligible: false, progress: 0, requirement: '未知荣誉' };
    }

    const alreadyGranted = this.grants.some(
      g => g.agent_id === agentId && g.honor_id === honorId,
    );
    if (alreadyGranted) {
      return { honor_id: honorId, agent_id: agentId, eligible: false, progress: 1, requirement: '已获得' };
    }

    const stats = this.getStats(agentId);
    const result = this.evaluateCondition(honor, stats);

    return {
      honor_id: honorId,
      agent_id: agentId,
      eligible: result.eligible,
      progress: result.progress,
      requirement: honor.condition,
    };
  }

  updateAgentStats(agentId: DynastyAgentID, update: Partial<AgentStats>): void {
    const current = this.getStats(agentId);
    this.agentStats.set(agentId, { ...current, ...update });
  }

  recordTaskCompletion(agentId: DynastyAgentID, success: boolean): void {
    const stats = this.getStats(agentId);
    stats.tasks_completed++;
    if (success) stats.tasks_successful++;
    stats.consecutive_success = success ? stats.consecutive_success + 1 : 0;
    this.agentStats.set(agentId, stats);

    const autoHonors = this.checkAutoEligibility(agentId);
    for (const honorId of autoHonors) {
      this.grantHonor(agentId, honorId, '自动颁发: 满足条件');
    }
  }

  recordRejection(agentId: DynastyAgentID): void {
    const stats = this.getStats(agentId);
    stats.rejections++;
    this.agentStats.set(agentId, stats);
  }

  getAgentHonors(agentId: DynastyAgentID): HonorGrant[] {
    return this.grants.filter(g => g.agent_id === agentId);
  }

  getAllGrants(): HonorGrant[] {
    return [...this.grants];
  }

  private checkAutoEligibility(agentId: DynastyAgentID): string[] {
    const results: string[] = [];
    const stats = this.getStats(agentId);

    if (stats.tasks_completed >= 100) {
      const eligible = this.checkEligibility(agentId, 'ri_li_wan_ji');
      if (eligible.eligible) results.push('ri_li_wan_ji');
    }

    if (stats.rejections >= 10 && agentId === 'menxia') {
      const eligible = this.checkEligibility(agentId, 'feng_bo_zhi_jian');
      if (eligible.eligible) results.push('feng_bo_zhi_jian');
    }

    if (stats.consecutive_success >= 99) {
      const eligible = this.checkEligibility(agentId, 'jiu_gui_yi');
      if (eligible.eligible) results.push('jiu_gui_yi');
    }

    return results;
  }

  private evaluateCondition(honor: DynastyHonor, stats: AgentStats): { eligible: boolean; progress: number } {
    const condition = honor.condition;

    if (condition.includes('完成100个任务')) {
      return { eligible: stats.tasks_completed >= 100, progress: Math.min(stats.tasks_completed / 100, 1) };
    }
    if (condition.includes('驳回10次')) {
      return { eligible: stats.rejections >= 10, progress: Math.min(stats.rejections / 10, 1) };
    }
    if (condition.includes('修复100个bug')) {
      return { eligible: stats.bugs_fixed >= 100, progress: Math.min(stats.bugs_fixed / 100, 1) };
    }
    if (condition.includes('阻止5次安全入侵')) {
      return { eligible: stats.threats_blocked >= 5, progress: Math.min(stats.threats_blocked / 5, 1) };
    }
    if (condition.includes('零封驳')) {
      return { eligible: stats.perfect_collaborations >= 1, progress: stats.perfect_collaborations > 0 ? 1 : 0 };
    }
    if (condition.includes('20个五星回奏')) {
      return { eligible: stats.five_star_reports >= 20, progress: Math.min(stats.five_star_reports / 20, 1) };
    }
    if (condition.includes('连续99个任务无阻塞')) {
      return { eligible: stats.consecutive_success >= 99, progress: Math.min(stats.consecutive_success / 99, 1) };
    }

    if (condition.includes('成为')) {
      return { eligible: true, progress: 1 };
    }

    return { eligible: false, progress: 0 };
  }

  private getStats(agentId: DynastyAgentID): AgentStats {
    if (!this.agentStats.has(agentId)) {
      this.agentStats.set(agentId, {
        tasks_completed: 0,
        tasks_successful: 0,
        consecutive_success: 0,
        rejections: 0,
        bugs_fixed: 0,
        threats_blocked: 0,
        perfect_collaborations: 0,
        five_star_reports: 0,
      });
    }
    return this.agentStats.get(agentId)!;
  }
}

export interface AgentStats {
  tasks_completed: number;
  tasks_successful: number;
  consecutive_success: number;
  rejections: number;
  bugs_fixed: number;
  threats_blocked: number;
  perfect_collaborations: number;
  five_star_reports: number;
}
