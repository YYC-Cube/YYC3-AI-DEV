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
  DynastyAgentID,
  EdictEnvelope,
  EdictMessage,
  EdictType,
} from '../protocol/DynastyTypes';
import { EDICT_FLOW } from '../protocol/DynastyTypes';
import { LightweightEventEmitter } from '../utils/event-emitter';

export interface DynastyBusConfig {
  maxQueueSize: number;
  retryPolicy: {
    maxRetries: number;
    backoffFactor: number;
  };
}

export type EdictHandler = (message: EdictMessage) => Promise<EdictMessage | EdictMessage[] | void>;

interface QueuedEdict {
  message: EdictMessage;
  retries: number;
  nextRetryAt?: Date;
}

export class DynastyMessageBus extends LightweightEventEmitter {
  private config: DynastyBusConfig;
  private handlers: Map<EdictType, EdictHandler[]> = new Map();
  private agentQueues: Map<DynastyAgentID, QueuedEdict[]> = new Map();
  private envelopes: Map<string, EdictEnvelope> = new Map();
  private processing: boolean = false;

  private metrics = {
    published: 0,
    processed: 0,
    failed: 0,
    retried: 0,
  };

  constructor(config: DynastyBusConfig) {
    super();
    this.config = config;
    // setMaxListeners 在轻量 emitter 中不需要 (无上限)

    for (const type of EDICT_FLOW) {
      this.handlers.set(type, []);
    }
  }

  async publish(message: EdictMessage): Promise<void> {
    if (!message.message_id) {
      message.message_id = `edict-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    }
    if (!message.timestamp) {
      message.timestamp = new Date().toISOString();
    }

    const target = message.to;
    if (!this.agentQueues.has(target)) {
      this.agentQueues.set(target, []);
    }

    const queue = this.agentQueues.get(target)!;
    if (queue.length >= this.config.maxQueueSize) {
      queue.shift();
    }

    queue.push({ message, retries: 0 });
    this.metrics.published++;

    this.updateEnvelope(message);
    this.emit('edict:published', message);

    if (!this.processing) {
      this.processQueue(target);
    }
  }

  subscribe(type: EdictType, handler: EdictHandler): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);
  }

  unsubscribe(type: EdictType, handler: EdictHandler): void {
    const handlers = this.handlers.get(type);
    if (handlers) {
      const idx = handlers.indexOf(handler);
      if (idx > -1) handlers.splice(idx, 1);
    }
  }

  getEnvelope(edictId: string): EdictEnvelope | undefined {
    return this.envelopes.get(edictId);
  }

  getQueueStatus(agentId: DynastyAgentID): { size: number; processing: boolean } {
    return {
      size: this.agentQueues.get(agentId)?.length ?? 0,
      processing: this.processing,
    };
  }

  getMetrics() {
    return { ...this.metrics };
  }

  clear(): void {
    this.agentQueues.clear();
    this.metrics = { published: 0, processed: 0, failed: 0, retried: 0 };
  }

  destroy(): void {
    this.clear();
    this.handlers.clear();
    this.envelopes.clear();
    this.removeAllListeners();
  }

  private async processQueue(agentId: DynastyAgentID): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    const queue = this.agentQueues.get(agentId);
    if (!queue) { this.processing = false; return; }

    while (queue.length > 0) {
      const entry = queue[0]!;

      if (entry.nextRetryAt && entry.nextRetryAt > new Date()) {
        break;
      }

      queue.shift();

      try {
        await this.processEdict(entry);
      } catch (error) {
        if (entry.retries < this.config.retryPolicy.maxRetries) {
          entry.retries++;
          entry.nextRetryAt = new Date(
            Date.now() + Math.pow(this.config.retryPolicy.backoffFactor, entry.retries) * 1000
          );
          queue.push(entry);
          this.metrics.retried++;
        } else {
          this.metrics.failed++;
          this.emit('edict:failed', entry.message, error);
        }
      }
    }

    this.processing = false;
  }

  private async processEdict(entry: QueuedEdict): Promise<void> {
    const { message } = entry;
    const handlers = this.handlers.get(message.type) ?? [];

    if (handlers.length === 0) {
      this.emit('edict:no_handler', message);
      return;
    }

    for (const handler of handlers) {
      const results = await handler(message);
      if (results) {
        const messages = Array.isArray(results) ? results : [results];
        for (const result of messages) {
          if (result && 'type' in result) {
            await this.publish(result);
          }
        }
      }
    }

    this.metrics.processed++;
    this.emit('edict:processed', message);
  }

  private updateEnvelope(message: EdictMessage): void {
    const edictId = message.payload.edict_id;
    if (!edictId) return;

    let envelope = this.envelopes.get(edictId);
    if (!envelope) {
      envelope = {
        edict_id: edictId,
        status: 'pending_taizi',
        created_at: message.timestamp,
        updated_at: message.timestamp,
        messages: [],
        current_phase: message.type,
        origin: message.from,
      };
      this.envelopes.set(edictId, envelope);
    }

    envelope.messages.push(message);
    envelope.updated_at = message.timestamp;
    envelope.current_phase = message.type;
  }
}
