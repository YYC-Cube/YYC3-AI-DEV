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

import type {
  EdictMessage,
  EdictType,
  DynastyAgentID,
  EdictPayload,
  EdictUrgency,
} from './DynastyTypes'

let messageCounter = 0;

export function createEdictMessage(
  from: DynastyAgentID,
  to: DynastyAgentID,
  type: EdictType,
  payload: EdictPayload,
): EdictMessage {
  messageCounter++;
  return {
    version: '1.0',
    message_id: `edict-${Date.now()}-${messageCounter.toString(36)}`,
    timestamp: new Date().toISOString(),
    from,
    to,
    type,
    payload,
  };
}

export function createEdict(
  text: string,
  channel?: string,
  urgency?: EdictUrgency,
): EdictMessage {
  return createEdictMessage('emperor', 'taizi', 'edict', {
    content: { text, channel },
    urgency: urgency ?? 'medium',
  });
}

export function createMemorial(
  from: DynastyAgentID,
  edictId: string,
  plan: string,
  urgency?: EdictUrgency,
): EdictMessage {
  return createEdictMessage(from, 'menxia', 'memorial', {
    edict_id: edictId,
    content: { edict_id: edictId, plan, subtasks: [] },
    urgency,
  });
}

export function createReview(
  verdict: 'approved' | 'rejected' | 'revision_requested',
  comments: string,
  edictId: string,
  from: DynastyAgentID = 'menxia',
): EdictMessage {
  return createEdictMessage(from, verdict === 'approved' ? 'shangshu' : 'zhongshu', 'review', {
    edict_id: edictId,
    content: {
      edict_id: edictId,
      verdict,
      comments,
      reviewer: from,
    },
  });
}

export function createDispatch(
  tasks: Array<{ id: string; assignee: DynastyAgentID; description: string; priority: 'low' | 'medium' | 'high' }>,
  edictId: string,
): EdictMessage {
  return createEdictMessage('shangshu', 'shangshu', 'dispatch', {
    edict_id: edictId,
    content: { edict_id: edictId, tasks },
  });
}

export function createReport(
  taskId: string,
  edictId: string,
  status: 'success' | 'partial' | 'failed',
  result: unknown,
  from: DynastyAgentID,
): EdictMessage {
  return createEdictMessage(from, 'shangshu', 'report', {
    edict_id: edictId,
    content: {
      edict_id: edictId,
      task_id: taskId,
      status,
      result,
      metrics: { executionTime: 0 },
    },
  });
}

export function createReward(
  agentId: DynastyAgentID,
  honorId: string,
  reason: string,
  edictId?: string,
): EdictMessage {
  return createEdictMessage('libu_hr', agentId, 'reward', {
    edict_id: edictId,
    content: {
      agent_id: agentId,
      honor_id: honorId,
      reason,
      edict_id: edictId,
    },
  });
}

export function edictToBuffer(message: EdictMessage): string {
  return JSON.stringify(message);
}

export function bufferToEdict(data: string): EdictMessage {
  return JSON.parse(data) as EdictMessage;
}

export function getEdictId(message: EdictMessage): string | undefined {
  return message.payload.edict_id;
}

export function getEdictUrgency(message: EdictMessage): EdictUrgency {
  return message.payload.urgency ?? 'medium';
}
