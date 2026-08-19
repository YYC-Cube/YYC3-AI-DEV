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

export interface EmperorEdictResult {
  edict_id: string;
  original_text: string;
  status: 'issued';
}

export class EmperorAgent extends DynastyBaseAgent {
  private edictCounter: number = 0;

  constructor() {
    super({ agentId: 'emperor' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'issue_edict', name: '下旨', description: '发起新任务旨意，传达至太子', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'receive_report', name: '接收回奏', description: '接收尚书省汇总的最终回奏', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'receive_broadcast', name: '接收播报', description: '接收早朝官的系统健康播报', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('issue_edict', async (params: Record<string, unknown>) => {
      const text = params.text as string;
      return this.issueEdict(text, undefined, params.urgency as any);
    });
    this.registerCommandHandler('receive_report', async (params: Record<string, unknown>) => {
      return { received: true, edict_id: params.edict_id };
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]> {
    switch (message.type) {
      case 'edict':
        return this.handleUserEdict(message);
      case 'report':
        return this.handleFinalReport(message);
      case 'reward':
        return this.createAcknowledgment(message, '皇帝准奏赏赐');
      default:
        return this.createAcknowledgment(message, `皇帝收到 ${message.type} 消息`);
    }
  }

  issueEdict(text: string, channel?: string, urgency?: 'low' | 'medium' | 'high' | 'urgent'): { message: EdictMessage; result: EmperorEdictResult } {
    this.edictCounter++;
    const edictId = `imperial-${Date.now()}-${this.edictCounter}`;
    const edictMsg = createEdictMessage('emperor', 'taizi', 'edict', {
      edict_id: edictId,
      title: `圣旨 #${this.edictCounter}`,
      content: { text, channel },
      urgency: urgency ?? 'medium',
    });
    const result: EmperorEdictResult = { edict_id: edictId, original_text: text, status: 'issued' };
    this.emit('edict:issued', { edictId, text });
    return { message: edictMsg, result };
  }

  private handleUserEdict(message: EdictMessage): EdictMessage {
    const content = message.payload.content as { text: string; channel?: string } | undefined;
    const text = content?.text ?? '';
    return this.issueEdict(text, content?.channel, message.payload.urgency).message;
  }

  private handleFinalReport(message: EdictMessage): EdictMessage {
    const rc = message.payload.content as { edict_id: string; status: string };
    this.emit('edict:completed', { edictId: rc.edict_id, status: rc.status });
    return this.createAcknowledgment(message, `皇帝已阅回奏: ${rc.status === 'success' ? '嘉许' : '再议'}`);
  }

  private createAcknowledgment(original: EdictMessage, note: string): EdictMessage {
    return createEdictMessage('emperor', original.from, original.type, {
      edict_id: original.payload.edict_id,
      content: { acknowledgment: note },
    });
  }
}
