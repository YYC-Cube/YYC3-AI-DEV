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

export interface DocumentationOutput {
  task_id: string;
  doc_type: 'api_doc' | 'technical_spec' | 'tutorial' | 'changelog' | 'standard';
  content: string;
  sections: string[];
  quality_score: number;
}

export class LibuAgent extends DynastyBaseAgent {
  private docStore: Map<string, DocumentationOutput[]> = new Map();

  constructor() {
    super({ agentId: 'libu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'write_documentation', name: '撰写文档', description: '撰写技术文档和规范说明', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'review_standards', name: '规范审查', description: '审查技术文档是否符合规范', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'generate_api_doc', name: 'API文档生成', description: '根据代码自动生成API文档', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('write_documentation', async (params: Record<string, unknown>) => {
      return this.writeDocumentation(params.task_id as string, params.description as string);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage> {
    const edictId = message.payload.edict_id ?? '';
    const content = message.payload.content as { tasks?: Array<{ id: string; description: string }> };
    const tasks = content?.tasks ?? [];
    const results: DocumentationOutput[] = [];

    for (const task of tasks) {
      results.push(this.writeDocumentation(task.id, task.description));
    }
    if (results.length === 0) {
      results.push(this.writeDocumentation(`libu-${Date.now()}`, String(message.payload.content ?? '')));
    }

    const stored = this.docStore.get(edictId) ?? [];
    stored.push(...results);
    this.docStore.set(edictId, stored);

    return createEdictMessage('libu', 'shangshu', 'report', {
      edict_id: edictId,
      content: {
        edict_id: edictId,
        task_id: tasks.length > 0 ? tasks[0]!.id : `libu-${Date.now()}`,
        status: 'success',
        result: { documents: results },
        metrics: { executionTime: results.length * 200, qualityScore: results.reduce((s, r) => s + r.quality_score, 0) / results.length },
      },
    });
  }

  writeDocumentation(taskId: string, description: string): DocumentationOutput {
    const desc = description.toLowerCase();
    let docType: DocumentationOutput['doc_type'] = 'technical_spec';
    if (desc.includes('api') || desc.includes('接口')) docType = 'api_doc';
    else if (desc.includes('教程') || desc.includes('tutorial')) docType = 'tutorial';
    else if (desc.includes('变更') || desc.includes('changelog')) docType = 'changelog';
    else if (desc.includes('标准') || desc.includes('规范') || desc.includes('standard')) docType = 'standard';

    const sectionMap: Record<string, string[]> = {
      api_doc: ['概述', '接口定义', '请求参数', '返回值', '错误码', '示例'],
      technical_spec: ['背景', '目标', '架构设计', '实现方案', '测试计划', '部署方案'],
      tutorial: ['简介', '前置条件', '快速开始', '详细步骤', '常见问题', '进阶用法'],
      changelog: ['版本号', '变更类型', '变更内容', '影响范围', '迁移指南'],
      standard: ['范围', '术语定义', '规范要求', '检查清单', '参考资料'],
    };
    const sections = sectionMap[docType] ?? ['概述', '详细说明'];

    return {
      task_id: taskId, doc_type: docType,
      content: `# ${description}\n\n${sections.map(s => `## ${s}\n\n(内容待填充)`).join('\n\n')}`,
      sections, quality_score: 0.85 + Math.random() * 0.15,
    };
  }

  getDocResults(edictId: string): DocumentationOutput[] {
    return this.docStore.get(edictId) ?? [];
  }
}
