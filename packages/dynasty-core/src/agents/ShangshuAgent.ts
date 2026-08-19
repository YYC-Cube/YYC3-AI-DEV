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
import type { EdictMessage, DispatchTask, ReportContent, DynastyAgentID } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface DispatchResult {
  edict_id: string;
  dispatches: Array<{ target: string; task_count: number }>;
}

export class ShangshuAgent extends DynastyBaseAgent {
  private pendingReports: Map<string, ReportContent[]> = new Map();
  private expectedReports: Map<string, number> = new Map();

  constructor() {
    super({ agentId: 'shangshu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'dispatch_tasks', name: '派发任务', description: '将审议通过的方案派发至六部', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'aggregate_reports', name: '汇总回奏', description: '汇总六部回奏提交最终报告', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'track_progress', name: '进度追踪', description: '追踪各部执行进度', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('dispatch_tasks', async (params: Record<string, unknown>) => {
      return this.dispatchToMinistries(params as { edict_id: string; subtasks: DispatchTask[] });
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]> {
    switch (message.type) {
      case 'review':
        return this.handleApprovedReview(message);
      case 'report':
        return this.handleReport(message);
      default:
        return [createEdictMessage('shangshu', message.from, message.type, {
          edict_id: message.payload.edict_id, content: { acknowledged: true },
        })];
    }
  }

  dispatchToMinistries(data: { edict_id: string; subtasks: DispatchTask[] }): DispatchResult {
    const dispatchMap: Map<string, number> = new Map();
    for (const task of data.subtasks) {
      const count = dispatchMap.get(task.assignee) ?? 0;
      dispatchMap.set(task.assignee, count + 1);
    }
    this.expectedReports.set(data.edict_id, data.subtasks.length);
    this.pendingReports.set(data.edict_id, []);
    return { edict_id: data.edict_id, dispatches: [...dispatchMap.entries()].map(([target, task_count]) => ({ target, task_count })) };
  }

  createDispatchMessages(edictId: string, subtasks: DispatchTask[]): EdictMessage[] {
    const byAssignee: Map<string, DispatchTask[]> = new Map();
    for (const task of subtasks) {
      const list = byAssignee.get(task.assignee) ?? [];
      list.push(task);
      byAssignee.set(task.assignee, list);
    }

    this.expectedReports.set(edictId, subtasks.length);
    this.pendingReports.set(edictId, []);

    const messages: EdictMessage[] = [];
    for (const [assignee, tasks] of byAssignee) {
      messages.push(createEdictMessage('shangshu', assignee as DynastyAgentID, 'dispatch', {
        edict_id: edictId,
        content: { edict_id: edictId, tasks },
      }));
    }
    return messages;
  }

  aggregateReports(edictId: string, reports: ReportContent[]): {
    edict_id: string; task_id: string; status: 'success' | 'partial' | 'failed';
    result: unknown; metrics: { executionTime: number; qualityScore?: number };
  } {
    const successCount = reports.filter(r => r.status === 'success').length;
    const partialCount = reports.filter(r => r.status === 'partial').length;
    let status: 'success' | 'partial' | 'failed';
    if (successCount === reports.length) status = 'success';
    else if (successCount + partialCount === reports.length) status = 'partial';
    else status = 'failed';

    const avgTime = reports.reduce((s, r) => s + (r.metrics?.executionTime ?? 0), 0) / reports.length;

    return {
      edict_id: edictId, task_id: `aggregate-${edictId}`, status,
      result: { total_tasks: reports.length, successful: successCount, partial: partialCount, failed: reports.length - successCount - partialCount, details: reports.map(r => ({ task_id: r.task_id, status: r.status })) },
      metrics: { executionTime: avgTime, qualityScore: successCount / reports.length },
    };
  }

  getPendingReportCount(edictId: string): { received: number; expected: number } {
    return { received: this.pendingReports.get(edictId)?.length ?? 0, expected: this.expectedReports.get(edictId) ?? 0 };
  }

  private handleApprovedReview(message: EdictMessage): EdictMessage[] {
    const rc = message.payload.content as { edict_id: string; verdict: string; comments: string };
    if (rc.verdict !== 'approved') {
      return [createEdictMessage('shangshu', message.from, message.type, { edict_id: rc.edict_id, content: { acknowledged: true } })];
    }
    const edictId = rc.edict_id;
    return [createEdictMessage('shangshu', 'shangshu', 'dispatch', {
      edict_id: edictId, content: { edict_id: edictId, tasks: [] },
      metadata: { source_review: rc },
    })];
  }

  private handleReport(message: EdictMessage): EdictMessage[] {
    const reportContent = message.payload.content as ReportContent;
    const edictId = reportContent.edict_id ?? message.payload.edict_id ?? '';
    const reports = this.pendingReports.get(edictId) ?? [];
    reports.push(reportContent);
    this.pendingReports.set(edictId, reports);
    const expected = this.expectedReports.get(edictId) ?? 0;

    if (reports.length >= expected && expected > 0) {
      const finalReport = this.aggregateReports(edictId, reports);
      this.pendingReports.delete(edictId);
      this.expectedReports.delete(edictId);
      return [createEdictMessage('shangshu', 'emperor', 'report', { edict_id: edictId, content: finalReport })];
    }

    return [createEdictMessage('shangshu', message.from, message.type, {
      edict_id: edictId, content: { acknowledged: true, note: `已收到 ${reports.length}/${expected} 回奏` },
    })];
  }
}
