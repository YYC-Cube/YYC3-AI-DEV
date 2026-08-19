/**
 * DynastyAgentBase — 轻量朝臣基类
 * 不依赖 family-core BaseAgent，自带 EventEmitter + 能力 + 命令路由
 */
import type {
  DynastyAgentID,
  DynastyAgentRole,
  DynastyHonor,
  EdictMessage,
} from '../protocol/DynastyTypes';
import { DYNASTY_ROLES } from '../protocol/DynastyTypes';
import { LightweightEventEmitter } from '../utils/event-emitter';

export interface DynastyAgentConfig {
  agentId: DynastyAgentID;
  modelProvider?: string;
  llmEndpoint?: string;
}

export abstract class DynastyAgentBase extends LightweightEventEmitter {
  public readonly dynastyId: DynastyAgentID;
  public readonly role: DynastyAgentRole;
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  protected honors: DynastyHonor[] = [];
  protected taskCount: number = 0;
  protected rejectCount: number = 0;

  constructor(config: DynastyAgentConfig) {
    super();
    const role = DYNASTY_ROLES[config.agentId];
    this.dynastyId = config.agentId;
    this.role = role;
    this.id = `dynasty-${config.agentId}`;
    this.name = role.name;
    this.description = `${role.title} — ${role.responsibilities.join(', ')}`;
  }

  abstract handleEdict(message: EdictMessage): Promise<EdictMessage | EdictMessage[]>;

  canSendTo(target: DynastyAgentID): boolean {
    return this.role.canSendTo.includes(target);
  }

  canReceiveFrom(source: DynastyAgentID): boolean {
    return this.role.canReceiveFrom.includes(source);
  }

  grantHonor(honor: DynastyHonor): void {
    this.honors.push(honor);
    this.emit('honor:granted', { agent: this.dynastyId, honor });
  }

  getHonors(): DynastyHonor[] {
    return [...this.honors];
  }

  incrementTaskCount(): void { this.taskCount++; }
  incrementRejectCount(): void { this.rejectCount++; }
  getTaskCount(): number { return this.taskCount; }
  getRejectCount(): number { return this.rejectCount; }

  /** 能力注册表（与 family-core BaseAgent 接口兼容） */
  protected capabilities: Array<{ id: string; name: string; description: string; version: string; enabled: boolean }> = [];

  protected addCapability(cap: { id: string; name: string; description: string; version: string; enabled: boolean }): void {
    this.capabilities.push(cap);
  }

  getCapabilities() {
    return [...this.capabilities];
  }

  /** 命令处理器（与 family-core BaseAgent 接口兼容） */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected commandHandlers: Map<string, (params: Record<string, any>) => Promise<unknown>> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected registerCommandHandler(command: string, handler: (params: Record<string, any>) => Promise<unknown>): void {
    this.commandHandlers.set(command, handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async executeCommand(command: string, params: Record<string, any> = {}): Promise<unknown> {
    const handler = this.commandHandlers.get(command);
    if (!handler) throw new Error(`未注册命令: ${command}`);
    return handler(params);
  }
}
