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
import type { EdictMessage, EdictUrgency } from '../protocol/DynastyTypes'
import { createEdictMessage } from '../protocol/EdictMessage'

export interface TaiziClassification {
  is_edict: boolean;
  category: 'task' | 'chat' | 'query' | 'complaint';
  urgency: EdictUrgency;
  summary: string;
  keywords: string[];
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  task: ['修复', '实现', '开发', '创建', '部署', '更新', '添加', '删除', '优化', '重构', '修缮', '上线', '迁移'],
  chat: ['你好', '嗨', '早上好', '晚上好', '辛苦了', '谢谢'],
  query: ['查询', '统计', '报表', '状态', '进度', '数据', '分析', '多少'],
  complaint: ['故障', '错误', '超时', '崩溃', '安全', '入侵', '泄露', '紧急'],
};

const URGENCY_KEYWORDS: Record<string, string[]> = {
  urgent: ['紧急', '立刻', '马上', '崩溃', '入侵', '泄露'],
  high: ['尽快', '重要', '安全', '故障', '修复'],
  medium: ['需要', '请', '帮忙'],
  low: ['顺便', '有空', '不急'],
};

export class TaiziAgent extends DynastyBaseAgent {
  constructor() {
    super({ agentId: 'taizi' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'classify_message', name: '消息分拣', description: '将用户消息分类为闲聊或旨意', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'format_edict', name: '格式化旨意', description: '将用户文本整理为结构化旨意', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'forward_to_emperor', name: '转呈皇帝', description: '将闲聊或回复转呈皇帝', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('classify_message', async (params: Record<string, unknown>) => {
      return this.classifyMessage(params.text as string);
    });
    this.registerCommandHandler('format_edict', async (params: Record<string, unknown>) => {
      const text = params.text as string;
      const classification = this.classifyMessage(text);
      if (!classification.is_edict) return { is_edict: false };
      return this.formatAsEdict(text, classification, params.edict_id as string);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]> {
    const content = message.payload.content as { text: string; channel?: string } | undefined;
    const text = content?.text ?? '';

    if (message.type !== 'edict') {
      return createEdictMessage('taizi', 'emperor', message.type, {
        edict_id: message.payload.edict_id,
        content: message.payload.content,
      });
    }

    const classification = this.classifyMessage(text);

    if (!classification.is_edict) {
      return createEdictMessage('taizi', 'emperor', 'edict', {
        edict_id: message.payload.edict_id,
        content: { text: `[闲聊回复] ${text}`, channel: content?.channel },
        urgency: 'low',
        metadata: { classification },
      });
    }

    const formatted = this.formatAsEdict(text, classification, message.payload.edict_id ?? message.message_id);

    return createEdictMessage('taizi', 'zhongshu', 'edict', {
      edict_id: formatted.edict_id,
      title: formatted.title,
      content: formatted,
      urgency: classification.urgency,
      metadata: { classification, original_text: text },
    });
  }

  classifyMessage(text: string): TaiziClassification {
    const lower = text.toLowerCase();
    let bestCategory: TaiziClassification['category'] = 'chat';
    let bestScore = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const score = keywords.filter(kw => lower.includes(kw)).length;
      if (score > bestScore) { bestScore = score; bestCategory = category as TaiziClassification['category']; }
    }

    let urgency: EdictUrgency = 'medium';
    let urgencyScore = 0;
    for (const [level, keywords] of Object.entries(URGENCY_KEYWORDS)) {
      const score = keywords.filter(kw => lower.includes(kw)).length;
      if (score > urgencyScore) { urgencyScore = score; urgency = level as EdictUrgency; }
    }

    const isEdict = bestCategory !== 'chat';
    const keywords = Object.values(CATEGORY_KEYWORDS).flat().filter(kw => lower.includes(kw));

    return { is_edict: isEdict, category: bestCategory, urgency, summary: `${bestCategory}: ${text.substring(0, 80)}`, keywords };
  }

  formatAsEdict(text: string, classification: TaiziClassification, edictId: string): {
    edict_id: string; title: string; description: string; category: string; keywords: string[]; priority: string;
  } {
    return {
      edict_id: edictId,
      title: `[${classification.category.toUpperCase()}] ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`,
      description: text,
      category: classification.category,
      keywords: classification.keywords,
      priority: classification.urgency,
    };
  }
}
