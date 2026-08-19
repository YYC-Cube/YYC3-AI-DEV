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

export interface SecurityAuditResult {
  task_id: string;
  audit_type: 'vulnerability_scan' | 'compliance_check' | 'permission_review' | 'encryption_audit';
  severity_counts: Record<'critical' | 'high' | 'medium' | 'low', number>;
  findings: Array<{ id: string; severity: 'critical' | 'high' | 'medium' | 'low'; category: string; description: string; recommendation: string }>;
  passed: boolean;
  summary: string;
}

const OWASP_CHECKS: Array<{ category: string; keywords: string[]; severity: 'critical' | 'high' | 'medium'; description: string; recommendation: string }> = [
  { category: 'SQL注入', keywords: ['sql', 'query', '数据库'], severity: 'critical', description: '检测到潜在SQL注入风险', recommendation: '使用参数化查询' },
  { category: 'XSS', keywords: ['html', '渲染', '用户输入'], severity: 'high', description: '检测到跨站脚本风险', recommendation: '对用户输入进行转义' },
  { category: '认证缺陷', keywords: ['登录', '密码', '认证'], severity: 'high', description: '认证机制需要加固', recommendation: '启用多因素认证' },
  { category: '敏感数据暴露', keywords: ['密钥', 'token', '证书'], severity: 'critical', description: '检测到敏感数据处理', recommendation: '使用加密存储和传输' },
  { category: '访问控制缺陷', keywords: ['权限', '角色', '管理'], severity: 'high', description: '访问控制策略需要审查', recommendation: '实施最小权限原则' },
  { category: '安全配置错误', keywords: ['配置', '环境', '部署'], severity: 'medium', description: '安全配置需要检查', recommendation: '遵循安全配置基线' },
];

export class XingbuAgent extends DynastyBaseAgent {
  private threatBlockCount: number = 0;
  private auditStore: Map<string, SecurityAuditResult[]> = new Map();

  constructor() {
    super({ agentId: 'xingbu' });
  }

  protected setupDynastyCapabilities(): void {
    this.addCapability({ id: 'security_audit', name: '安全审计', description: '执行安全漏洞扫描和合规检查', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'compliance_check', name: '合规检查', description: '检查是否符合安全合规标准', version: '1.0.0', enabled: true });
    this.addCapability({ id: 'threat_detection', name: '威胁检测', description: '检测和阻止安全威胁', version: '1.0.0', enabled: true });
  }

  protected setupDynastyCommandHandlers(): void {
    this.registerCommandHandler('security_audit', async (params: Record<string, unknown>) => {
      return this.performAudit(params.task_id as string, params.description as string);
    });
  }

  async handleEdict(message: EdictMessage): Promise<EdictMessage> {
    const edictId = message.payload.edict_id ?? '';
    const content = message.payload.content as { tasks?: Array<{ id: string; description: string }> };
    const tasks = content?.tasks ?? [];
    const results: SecurityAuditResult[] = [];

    for (const task of tasks) {
      results.push(this.performAudit(task.id, task.description));
    }
    if (results.length === 0) {
      results.push(this.performAudit(`xingbu-${Date.now()}`, String(message.payload.content ?? '')));
    }

    if (results.some(r => r.severity_counts.critical > 0)) this.threatBlockCount++;

    const stored = this.auditStore.get(edictId) ?? [];
    stored.push(...results);
    this.auditStore.set(edictId, stored);

    return createEdictMessage('xingbu', 'shangshu', 'report', {
      edict_id: edictId,
      content: {
        edict_id: edictId,
        task_id: tasks.length > 0 ? tasks[0]!.id : `xingbu-${Date.now()}`,
        status: results.every(r => r.passed) ? 'success' : 'partial',
        result: { audits: results },
        metrics: { executionTime: results.length * 300, qualityScore: results.every(r => r.passed) ? 1.0 : 0.6 },
      },
    });
  }

  performAudit(taskId: string, description: string): SecurityAuditResult {
    const desc = description.toLowerCase();
    let auditType: SecurityAuditResult['audit_type'] = 'vulnerability_scan';
    if (desc.includes('合规') || desc.includes('compliance')) auditType = 'compliance_check';
    else if (desc.includes('权限') || desc.includes('permission')) auditType = 'permission_review';
    else if (desc.includes('加密') || desc.includes('encryption')) auditType = 'encryption_audit';

    const findings: SecurityAuditResult['findings'] = [];
    const severity_counts = { critical: 0, high: 0, medium: 0, low: 0 };

    for (const check of OWASP_CHECKS) {
      if (check.keywords.some(kw => desc.includes(kw))) {
        findings.push({ id: `finding-${taskId}-${findings.length + 1}`, severity: check.severity, category: check.category, description: check.description, recommendation: check.recommendation });
        severity_counts[check.severity]++;
      }
    }

    if (findings.length === 0) {
      severity_counts.low++;
      findings.push({ id: `finding-${taskId}-info`, severity: 'low', category: '常规检查', description: '未发现明显安全风险', recommendation: '建议定期进行安全审计' });
    }

    const passed = severity_counts.critical === 0 && severity_counts.high === 0;
    return { task_id: taskId, audit_type: auditType, severity_counts, findings, passed, summary: `刑部安全审计${passed ? '通过' : '发现风险'}: ${severity_counts.critical}严重, ${severity_counts.high}高危` };
  }

  getThreatBlockCount(): number { return this.threatBlockCount; }
  getAuditResults(edictId: string): SecurityAuditResult[] { return this.auditStore.get(edictId) ?? []; }
}
