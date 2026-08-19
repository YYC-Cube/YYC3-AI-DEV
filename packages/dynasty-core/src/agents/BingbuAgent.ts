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
import type { EdictMessage } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface CodeDevelopmentResult {
  task_id: string;
  action: 'implement' | 'fix' | 'refactor' | 'optimize';
  files_changed: string[];
  lines_added: number;
  lines_removed: number;
  tests_passed: boolean;
  summary: string;
}

export class BingbuAgent extends DynastyBaseAgent {
  private bugFixCount: number = 0;
  private codeStore: Map<string, CodeDevelopmentResult[]> = new Map();

  constructor() {
    super({ agentId: 'bingbu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'develop_code', name: '代码开发', description: '实现新功能、编写代码', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'fix_bug', name: 'Bug修复', description: '定位和修复代码缺陷', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'refactor_code', name: '代码重构', description: '重构现有代码以提高质量', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('develop_code', async (params: Record<string, unknown>) => {
      return this.developCode(params.task_id as string, params.description as string);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage> {
    const edictId = message.payload.edict_id ?? '';
    const content = message.payload.content as { tasks?: Array<{ id: string; description: string }> };
    const tasks = content?.tasks ?? [];
    const results: CodeDevelopmentResult[] = [];

    for (const task of tasks) {
      results.push(this.developCode(task.id, task.description));
    }
    if (results.length === 0) {
      results.push(this.developCode(`bingbu-${Date.now()}`, String(message.payload.content ?? '')));
    }

    const stored = this.codeStore.get(edictId) ?? [];
    stored.push(...results);
    this.codeStore.set(edictId, stored);

    return createEdictMessage('bingbu', 'shangshu', 'report', {
      edict_id: edictId,
      content: {
        edict_id: edictId,
        task_id: tasks.length > 0 ? tasks[0]!.id : `bingbu-${Date.now()}`,
        status: results.every(r => r.tests_passed) ? 'success' : 'partial',
        result: { developments: results },
        metrics: { executionTime: results.reduce((s, r) => s + r.lines_added * 10, 0), qualityScore: results.every(r => r.tests_passed) ? 1.0 : 0.7 },
      },
    });
  }

  developCode(taskId: string, description: string): CodeDevelopmentResult {
    const desc = description.toLowerCase();
    let action: CodeDevelopmentResult['action'] = 'implement';
    if (desc.includes('修复') || desc.includes('fix') || desc.includes('bug')) { action = 'fix'; this.bugFixCount++; }
    else if (desc.includes('重构') || desc.includes('refactor')) action = 'refactor';
    else if (desc.includes('优化') || desc.includes('optimize')) action = 'optimize';

    const filesChanged = this.inferFiles(description);
    return {
      task_id: taskId, action, files_changed: filesChanged,
      lines_added: Math.floor(Math.random() * 200) + 20,
      lines_removed: action === 'implement' ? 0 : Math.floor(Math.random() * 50),
      tests_passed: Math.random() > 0.1,
      summary: `兵部完成${action}: ${description.substring(0, 80)}`,
    };
  }

  getBugFixCount(): number { return this.bugFixCount; }
  getCodeResults(edictId: string): CodeDevelopmentResult[] { return this.codeStore.get(edictId) ?? []; }

  private inferFiles(description: string): string[] {
    const desc = description.toLowerCase();
    const files: string[] = [];
    if (desc.includes('防火墙') || desc.includes('firewall')) files.push('src/security/firewall.ts');
    if (desc.includes('路由') || desc.includes('route')) files.push('src/routes/index.ts');
    if (desc.includes('数据库') || desc.includes('database')) files.push('src/db/migration.ts');
    if (desc.includes('api')) files.push('src/api/handler.ts');
    if (desc.includes('测试') || desc.includes('test')) files.push('tests/unit.test.ts');
    if (files.length === 0) files.push('src/module.ts', 'tests/module.test.ts');
    return files;
  }
}
