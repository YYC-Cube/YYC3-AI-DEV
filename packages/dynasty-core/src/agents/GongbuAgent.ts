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

export interface CICDResult {
  task_id: string;
  action: 'build' | 'deploy' | 'test_run' | 'pipeline' | 'tool_setup';
  environment: 'development' | 'staging' | 'production';
  status: 'passed' | 'failed' | 'warning';
  artifacts: string[];
  duration_ms: number;
  summary: string;
}

export class GongbuAgent extends DynastyBaseAgent {
  private deployCount: number = 0;
  private buildStore: Map<string, CICDResult[]> = new Map();

  constructor() {
    super({ agentId: 'gongbu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'run_pipeline', name: '执行CI/CD管道', description: '构建、测试、部署一体化管道', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'deploy', name: '部署', description: '将构建产物部署到指定环境', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'setup_toolchain', name: '工具链配置', description: '配置开发工具链和构建环境', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('run_pipeline', async (params: Record<string, unknown>) => {
      return this.runPipeline(params.task_id as string, params.description as string);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage> {
    const edictId = message.payload.edict_id ?? '';
    const content = message.payload.content as { tasks?: Array<{ id: string; description: string }> };
    const tasks = content?.tasks ?? [];
    const results: CICDResult[] = [];

    for (const task of tasks) {
      results.push(this.runPipeline(task.id, task.description));
    }
    if (results.length === 0) {
      results.push(this.runPipeline(`gongbu-${Date.now()}`, String(message.payload.content ?? '')));
    }

    const stored = this.buildStore.get(edictId) ?? [];
    stored.push(...results);
    this.buildStore.set(edictId, stored);

    return createEdictMessage('gongbu', 'shangshu', 'report', {
      edict_id: edictId,
      content: {
        edict_id: edictId,
        task_id: tasks.length > 0 ? tasks[0]!.id : `gongbu-${Date.now()}`,
        status: results.every(r => r.status === 'passed') ? 'success' : 'partial',
        result: { pipelines: results },
        metrics: { executionTime: results.reduce((s, r) => s + r.duration_ms, 0), qualityScore: results.every(r => r.status === 'passed') ? 1.0 : 0.75 },
      },
    });
  }

  runPipeline(taskId: string, description: string): CICDResult {
    const desc = description.toLowerCase();
    let action: CICDResult['action'] = 'pipeline';
    let environment: CICDResult['environment'] = 'development';

    if (desc.includes('构建') || desc.includes('build')) action = 'build';
    else if (desc.includes('部署') || desc.includes('deploy')) { action = 'deploy'; this.deployCount++; }
    else if (desc.includes('测试') || desc.includes('test')) action = 'test_run';
    else if (desc.includes('工具') || desc.includes('tool')) action = 'tool_setup';

    if (desc.includes('生产') || desc.includes('production')) environment = 'production';
    else if (desc.includes('预发') || desc.includes('staging')) environment = 'staging';

    const artifacts = action === 'deploy' ? ['dist/bundle.js', 'dist/bundle.js.map'] : action === 'build' ? ['build/output.js', 'build/output.d.ts'] : [];
    const duration = action === 'pipeline' ? Math.floor(Math.random() * 120000) + 30000 : Math.floor(Math.random() * 30000) + 5000;
    const status: CICDResult['status'] = Math.random() > 0.15 ? 'passed' : Math.random() > 0.5 ? 'warning' : 'failed';

    return { task_id: taskId, action, environment, status, artifacts, duration_ms: duration, summary: `工部完成${action} (${environment}): ${status}` };
  }

  getDeployCount(): number { return this.deployCount; }
  getBuildResults(edictId: string): CICDResult[] { return this.buildStore.get(edictId) ?? []; }
}
