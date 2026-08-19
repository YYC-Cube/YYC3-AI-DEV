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
import type { EdictMessage, ReviewVerdict, MemorialContent } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface ReviewResult {
  edict_id: string;
  verdict: ReviewVerdict;
  comments: string;
  issues: string[];
  suggestions: string[];
}

const RISK_PATTERNS: Array<{ pattern: RegExp; issue: string; severity: 'high' | 'medium' | 'low' }> = [
  { pattern: /删除.*数据库|DROP\s/i, issue: '危险操作: 可能导致数据丢失', severity: 'high' },
  { pattern: /生产环境|线上/i, issue: '涉及生产环境操作', severity: 'high' },
  { pattern: /权限.*开放|所有人/i, issue: '权限设置过于宽松', severity: 'high' },
  { pattern: /TODO|FIXME/i, issue: '包含未完成标记', severity: 'low' },
  { pattern: /硬编码|hardcode/i, issue: '检测到硬编码风险', severity: 'medium' },
  { pattern: /密码|password|secret/i, issue: '涉及敏感信息处理', severity: 'high' },
];

export class MenxiaAgent extends DynastyBaseAgent {
  private reviewHistory: Map<string, ReviewResult[]> = new Map();

  constructor() {
    super({ agentId: 'menxia' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'review_memorial', name: '审议奏章', description: '审查中书省草拟的执行方案', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'veto_plan', name: '封驳', description: '封驳有问题的方案，退回中书省修订', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'approve_plan', name: '准奏', description: '批准方案并转发尚书省执行', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('review_memorial', async (params: Record<string, unknown>) => {
      return this.reviewMemorial(params.edict_id as string, params.plan as string, (params.subtasks as any[]) ?? []);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]> {
    if (message.type === 'memorial') {
      return this.handleMemorial(message);
    }
    return [createEdictMessage('menxia', message.from, message.type, {
      edict_id: message.payload.edict_id, content: { acknowledged: true },
    })];
  }

  reviewMemorial(edictId: string, plan: string, subtasks: Array<{ description: string }>): ReviewResult {
    const issues: string[] = [];
    const suggestions: string[] = [];

    for (const { pattern, issue, severity } of RISK_PATTERNS) {
      if (pattern.test(plan)) issues.push(`[${severity.toUpperCase()}] ${issue}`);
    }

    for (const subtask of subtasks) {
      for (const { pattern, issue } of RISK_PATTERNS) {
        if (pattern.test(subtask.description) && !issues.includes(issue)) {
          issues.push(`[MEDIUM] 子任务风险: ${issue}`);
        }
      }
    }

    if (subtasks.length === 0) {
      issues.push('[MEDIUM] 无子任务，执行方案不完整');
      suggestions.push('建议将任务分解为至少一个子任务');
    }
    if (subtasks.length > 8) {
      issues.push('[LOW] 子任务过多');
      suggestions.push('建议合并相关子任务');
    }

    const hasHigh = issues.some(i => i.includes('[HIGH]'));
    const verdict: ReviewVerdict = hasHigh ? 'rejected' : issues.length > 0 ? 'revision_requested' : 'approved';

    if (verdict === 'approved') suggestions.push('方案合理，准予执行');
    else if (verdict === 'revision_requested') suggestions.push('请修订后重新提交');
    else suggestions.push('方案存在严重风险，需重新草拟');

    const result: ReviewResult = { edict_id: edictId, verdict, comments: this.generateComments(verdict, issues), issues, suggestions };
    const history = this.reviewHistory.get(edictId) ?? [];
    history.push(result);
    this.reviewHistory.set(edictId, history);
    if (verdict === 'rejected') this.incrementRejectCount();

    return result;
  }

  getReviewHistory(edictId: string): ReviewResult[] {
    return this.reviewHistory.get(edictId) ?? [];
  }

  private handleMemorial(message: EdictMessage): EdictMessage {
    const mc = message.payload.content as MemorialContent;
    const edictId = mc.edict_id ?? message.payload.edict_id ?? '';
    const result = this.reviewMemorial(edictId, mc.plan ?? '', mc.subtasks ?? []);
    const target = result.verdict === 'approved' ? 'shangshu' : 'zhongshu';

    return createEdictMessage('menxia', target, 'review', {
      edict_id: edictId,
      title: `审议结果: ${result.verdict === 'approved' ? '准奏' : '封驳'}`,
      content: { edict_id: edictId, verdict: result.verdict, comments: result.comments, issues: result.issues, suggestions: result.suggestions, reviewer: 'menxia' },
      metadata: { review_round: this.reviewHistory.get(edictId)?.length ?? 1 },
    });
  }

  private generateComments(verdict: ReviewVerdict, issues: string[]): string {
    const prefix: Record<ReviewVerdict, string> = { approved: '门下省审议通过', revision_requested: '门下省建议修订', rejected: '门下省封驳' };
    return issues.length === 0 ? prefix[verdict] : `${prefix[verdict]}。发现问题: ${issues.join('; ')}`;
  }
}
