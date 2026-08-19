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

import { DynastyBaseAgent } from './DynastyBaseAgent'
import type { EdictMessage, DynastyAgentID } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface AgentRegistration {
  agent_id: DynastyAgentID;
  registered_at: string;
  capabilities: string[];
  status: 'active' | 'suspended' | 'retired';
  assessment_score: number;
}

export interface PersonnelAssessment {
  agent_id: DynastyAgentID;
  period: string;
  task_count: number;
  success_rate: number;
  honors_earned: number;
  rating: 'S' | 'A' | 'B' | 'C' | 'D';
}

export class LibuHRAgent extends DynastyBaseAgent {
  private registry: Map<DynastyAgentID, AgentRegistration> = new Map();
  private assessments: Map<DynastyAgentID, PersonnelAssessment[]> = new Map();

  constructor() {
    super({ agentId: 'libu_hr' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'register_agent', name: 'Agent注册', description: '注册新的Agent并分配初始权限', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'manage_permissions', name: '权限管理', description: '管理Agent的访问权限和角色', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'assess_performance', name: '绩效考核', description: '评估Agent的工作表现', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('register_agent', async (params: Record<string, unknown>) => {
      return this.registerAgent(params.agent_id as DynastyAgentID, (params.capabilities as string[]) ?? []);
    });
    this.registerCommandHandler('assess_performance', async (params: Record<string, unknown>) => {
      return this.assessPerformance(params.agent_id as DynastyAgentID);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage> {
    const edictId = message.payload.edict_id ?? '';
    const content = message.payload.content as { tasks?: Array<{ id: string; description: string }> };
    const tasks = content?.tasks ?? [];
    const results: Array<AgentRegistration | PersonnelAssessment> = [];

    for (const task of tasks) {
      const desc = task.description.toLowerCase();
      if (desc.includes('注册') || desc.includes('register')) {
        results.push(this.registerAgent('unknown' as DynastyAgentID, []));
      } else {
        results.push(this.assessPerformance('unknown' as DynastyAgentID));
      }
    }
    if (results.length === 0) results.push(this.assessPerformance('unknown' as DynastyAgentID));

    return createEdictMessage('libu_hr', 'shangshu', 'report', {
      edict_id: edictId,
      content: {
        edict_id: edictId,
        task_id: tasks.length > 0 ? tasks[0]!.id : `libu_hr-${Date.now()}`,
        status: 'success',
        result: { personnel_actions: results },
        metrics: { executionTime: results.length * 100, qualityScore: 0.9 },
      },
    });
  }

  registerAgent(agentId: DynastyAgentID, capabilities: string[]): AgentRegistration {
    const registration: AgentRegistration = { agent_id: agentId, registered_at: new Date().toISOString(), capabilities, status: 'active', assessment_score: 0.5 };
    this.registry.set(agentId, registration);
    return registration;
  }

  assessPerformance(agentId: DynastyAgentID): PersonnelAssessment {
    const existing = this.assessments.get(agentId) ?? [];
    const taskCount = Math.floor(Math.random() * 100) + 10;
    const successRate = 0.7 + Math.random() * 0.3;
    let rating: PersonnelAssessment['rating'] = 'C';
    if (successRate > 0.95 && taskCount > 50) rating = 'S';
    else if (successRate > 0.9) rating = 'A';
    else if (successRate > 0.8) rating = 'B';
    else if (successRate > 0.6) rating = 'D';

    const assessment: PersonnelAssessment = { agent_id: agentId, period: new Date().toISOString().substring(0, 7), task_count: taskCount, success_rate: successRate, honors_earned: existing.length, rating };
    existing.push(assessment);
    this.assessments.set(agentId, existing);
    return assessment;
  }

  getRegistration(agentId: DynastyAgentID): AgentRegistration | undefined { return this.registry.get(agentId); }
  getAssessments(agentId: DynastyAgentID): PersonnelAssessment[] { return this.assessments.get(agentId) ?? []; }
  getRegistrySize(): number { return this.registry.size; }
}
