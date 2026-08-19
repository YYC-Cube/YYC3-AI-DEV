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
import type { EdictMessage, MemorialSubtask, DynastyAgentID } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface ExecutionPlan {
  edict_id: string;
  plan_summary: string;
  subtasks: MemorialSubtask[];
  estimated_effort: string;
  risk_assessment: string;
}

const TASK_KEYWORDS: Record<string, string[]> = {
  hubu: ['数据', '分析', '统计', '报表', '资源', '核算', '预算', '成本'],
  libu: ['文档', '规范', '标准', '说明', 'API文档', '技术文档', '教程'],
  bingbu: ['代码', '开发', '修复', 'bug', '功能', '实现', '重构', '编写'],
  xingbu: ['安全', '审计', '合规', '漏洞', '权限', '加密', '入侵', '防护'],
  gongbu: ['部署', 'CI', 'CD', '构建', '发布', '工具', '管道', '环境', '测试'],
  libu_hr: ['注册', '权限', '管理', '考核', '配置', '角色', '人员'],
};

export class ZhongshuAgent extends DynastyBaseAgent {
  private planCounter: number = 0;

  constructor() {
    super({ agentId: 'zhongshu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'draft_memorial', name: '草拟奏章', description: '将旨意转化为执行方案', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'decompose_tasks', name: '任务分解', description: '将大任务分解为可执行的子任务', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'revise_plan', name: '修订方案', description: '根据封驳意见修订方案', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('draft_memorial', async (params: Record<string, unknown>) => {
      return this.draftPlan(params.edict_id as string, params.description as string, (params.keywords as string[]) ?? []);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]> {
    switch (message.type) {
      case 'edict':
        return this.handleNewEdict(message);
      case 'review':
        return this.handleRevision(message);
      default:
        return [createEdictMessage('zhongshu', message.from, message.type, {
          edict_id: message.payload.edict_id, content: { acknowledged: true },
        })];
    }
  }

  draftPlan(edictId: string, description: string, keywords: string[]): ExecutionPlan {
    this.planCounter++;
    const subtasks = this.decomposeTasks(description, keywords, edictId);
    const riskLevel = subtasks.length > 4 ? 'high' : subtasks.length > 2 ? 'medium' : 'low';
    const effort = subtasks.length <= 2 ? '1-2天' : subtasks.length <= 4 ? '3-5天' : '1-2周';

    return {
      edict_id: edictId,
      plan_summary: `执行方案 #${this.planCounter}: ${description}`,
      subtasks,
      estimated_effort: effort,
      risk_assessment: `风险等级: ${riskLevel}，涉及${subtasks.length}个子任务`,
    };
  }

  decomposeTasks(description: string, keywords: string[], edictId: string): MemorialSubtask[] {
    const subtasks: MemorialSubtask[] = [];
    const assignments = this.assignToMinistries(description, keywords);
    let counter = 0;

    for (const assignee of assignments) {
      counter++;
      const ministryKeywords = TASK_KEYWORDS[assignee] ?? [];
      const relevant = keywords.filter(k => ministryKeywords.some(mk => k.includes(mk)));
      const taskDesc = relevant.length > 0
        ? `${assignee}负责: ${relevant.join('、')}相关任务`
        : `${assignee}负责: ${description.substring(0, 60)}相关部分`;

      subtasks.push({
        id: `task-${edictId}-${counter}`,
        description: taskDesc,
        assigned_to: assignee as DynastyAgentID,
        priority: keywords.some(k => ['紧急', '安全', '崩溃'].includes(k)) ? 'high' : 'medium',
      });
    }

    if (subtasks.length === 0) {
      subtasks.push({
        id: `task-${edictId}-1`,
        description: `通用任务: ${description.substring(0, 80)}`,
        assigned_to: 'bingbu',
        priority: 'medium',
      });
    }

    return subtasks;
  }

  private handleNewEdict(message: EdictMessage): EdictMessage {
    const content = message.payload.content as { edict_id?: string; description?: string; keywords?: string[]; text?: string };
    const edictId = content?.edict_id ?? message.payload.edict_id ?? message.message_id;
    const description = content?.description ?? content?.text ?? '';
    const keywords = content?.keywords ?? [];
    const plan = this.draftPlan(edictId, description, keywords);

    return createEdictMessage('zhongshu', 'menxia', 'memorial', {
      edict_id: edictId,
      title: `奏章: ${plan.plan_summary}`,
      content: { edict_id: edictId, plan: plan.plan_summary, subtasks: plan.subtasks, estimated_effort: plan.estimated_effort, risk_assessment: plan.risk_assessment },
      urgency: message.payload.urgency,
    });
  }

  private handleRevision(message: EdictMessage): EdictMessage {
    const rc = message.payload.content as { edict_id: string; verdict: string; comments: string };
    const plan = this.draftPlan(rc.edict_id, `[修订] ${rc.comments}`, []);

    return createEdictMessage('zhongshu', 'menxia', 'memorial', {
      edict_id: rc.edict_id,
      title: `修订奏章: ${plan.plan_summary}`,
      content: { edict_id: rc.edict_id, plan: plan.plan_summary, subtasks: plan.subtasks, estimated_effort: plan.estimated_effort, risk_assessment: plan.risk_assessment + ' (修订后)' },
      urgency: message.payload.urgency,
      metadata: { revised: true, revision_comments: rc.comments },
    });
  }

  private assignToMinistries(description: string, keywords: string[]): string[] {
    const scores: Map<string, number> = new Map();
    const combined = `${description} ${keywords.join(' ')}`.toLowerCase();

    for (const [ministry, kws] of Object.entries(TASK_KEYWORDS)) {
      const score = kws.filter(kw => combined.includes(kw)).length;
      if (score > 0) scores.set(ministry, score);
    }

    const sorted = [...scores.entries()].sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return ['bingbu'];
    return sorted.map(([id]) => id).slice(0, 4);
  }
}
