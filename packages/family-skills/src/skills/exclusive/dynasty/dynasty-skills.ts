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

import { defineSkill } from '../../../registry/SkillManifest'

export const strategicPrioritySkill = defineSkill(
  {
    id: 'emperor:strategic-priority',
    name: 'Strategic Priority',
    version: '1.0.0',
    owner: 'emperor',
    description: 'Prioritize strategic tasks by urgency, impact, and resource alignment — generate execution priority queue.',
    category: 'dynasty',
    parameters: [
      { name: 'tasks', type: 'array', required: true, description: 'Tasks to prioritize [{ id, title, urgency, impact, effort, dependencies }].' },
      { name: 'strategy', type: 'string', required: false, description: 'Strategy: impact_first, urgency_first, balanced.', default: 'balanced' },
    ],
  },
  async (params) => {
    const tasks = (params.tasks as Array<Record<string, unknown>>) ?? [];
    const strategy = String(params.strategy ?? 'balanced');

    const scored = tasks.map(task => {
      const urgency = Number(task.urgency) || 0.5;
      const impact = Number(task.impact) || 0.5;
      const effort = Number(task.effort) || 0.5;
      const deps = (task.dependencies as string[]) ?? [];

      let score: number;
      switch (strategy) {
        case 'impact_first': score = impact * 0.5 + urgency * 0.3 + (1 - effort) * 0.2; break;
        case 'urgency_first': score = urgency * 0.5 + impact * 0.3 + (1 - effort) * 0.2; break;
        default: score = urgency * 0.35 + impact * 0.35 + (1 - effort) * 0.3;
      }

      if (deps.length === 0) score += 0.1;

      return {
        id: String(task.id),
        title: String(task.title ?? ''),
        score: Math.round(score * 1000) / 1000,
        urgency,
        impact,
        effort,
        dependencies: deps,
        rank: 0,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    scored.forEach((t, i) => { t.rank = i + 1; });

    return {
      strategy,
      queue: scored,
      top3: scored.slice(0, 3),
      quickWins: scored.filter(t => t.effort < 0.3 && t.impact > 0.6),
      criticalPath: scored.filter(t => scored.filter(s => s.dependencies.includes(t.id)).length > 0),
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.tasks) || params.tasks.length === 0) errors.push('Parameter "tasks" is required and non-empty');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const requirementStructureSkill = defineSkill(
  {
    id: 'taizi:requirement-structure',
    name: 'Requirement Structuring',
    version: '1.0.0',
    owner: 'taizi',
    description: 'Structure raw requirements into formal task specifications — decompose, categorize, and assign to ministries.',
    category: 'dynasty',
    parameters: [
      { name: 'requirement', type: 'string', required: true, description: 'Raw requirement text.' },
      { name: 'targetMinistries', type: 'array', required: false, description: 'Available ministries for assignment.' },
    ],
  },
  async (params) => {
    const requirement = String(params.requirement ?? '');
    const lower = requirement.toLowerCase();
    const ministries = (params.targetMinistries as string[]) ?? ['hubu', 'libu', 'bingbu', 'xingbu', 'gongbu', 'libu_hr'];

    const KEYWORD_MINISTRY: Record<string, string> = {
      '数据': 'hubu', '分析': 'hubu', '统计': 'hubu', 'data': 'hubu', 'analytics': 'hubu',
      '文档': 'libu', '规范': 'libu', '标准': 'libu', 'documentation': 'libu',
      '代码': 'bingbu', '开发': 'bingbu', '修复': 'bingbu', 'code': 'bingbu', 'bug': 'bingbu',
      '安全': 'xingbu', '审计': 'xingbu', '合规': 'xingbu', 'security': 'xingbu',
      '部署': 'gongbu', '构建': 'gongbu', 'CI': 'gongbu', 'deploy': 'gongbu',
      '权限': 'libu_hr', '注册': 'libu_hr', '考核': 'libu_hr', 'agent': 'libu_hr',
    };

    const assignments: Record<string, string[]> = {};
    for (const [keyword, ministry] of Object.entries(KEYWORD_MINISTRY)) {
      if (lower.includes(keyword.toLowerCase())) {
        if (!assignments[ministry]) assignments[ministry] = [];
        assignments[ministry].push(keyword);
      }
    }

    const assignedMinistries = Object.keys(assignments);
    if (assignedMinistries.length === 0) {
      assignments['hubu'] = ['general'];
      assignedMinistries.push('hubu');
    }

    const sentences = requirement.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 0);
    const subtasks = sentences.map((s, i) => ({
      id: `subtask-${i + 1}`,
      description: s.trim(),
      ministry: guessMinistry(s.toLowerCase(), KEYWORD_MINISTRY) ?? 'hubu',
      priority: i === 0 ? 'high' : 'medium' as string,
    }));

    return {
      originalRequirement: requirement,
      subtasks,
      ministryAssignments: assignments,
      assignedMinistries,
      complexity: subtasks.length <= 2 ? 'simple' : subtasks.length <= 5 ? 'moderate' : 'complex',
      estimatedEffort: subtasks.length * 2,
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.requirement || typeof params.requirement !== 'string') errors.push('Parameter "requirement" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

function guessMinistry(text: string, map: Record<string, string>): string | undefined {
  for (const [keyword, ministry] of Object.entries(map)) {
    if (text.includes(keyword.toLowerCase())) return ministry;
  }
  return undefined;
}

export const planDraftingSkill = defineSkill(
  {
    id: 'zhongshu:plan-drafting',
    name: 'Plan Drafting',
    version: '1.0.0',
    owner: 'zhongshu',
    description: 'Draft execution plans from requirements — create structured memorials with phases, milestones, and resource estimates.',
    category: 'dynasty',
    parameters: [
      { name: 'requirement', type: 'string', required: true, description: 'Requirement text.' },
      { name: 'subtasks', type: 'array', required: false, description: 'Pre-decomposed subtasks from Taizi.' },
    ],
  },
  async (params) => {
    const requirement = String(params.requirement ?? '');
    const subtasks = (params.subtasks as Array<Record<string, unknown>>) ?? [];

    const phases: Array<{ name: string; tasks: string[]; duration: string; dependencies: string[] }> = [
      { name: 'Phase 1: Planning', tasks: ['Requirement analysis', 'Feasibility assessment'], duration: '1-2 days', dependencies: [] },
      { name: 'Phase 2: Implementation', tasks: subtasks.length > 0 ? subtasks.map((s, i) => String(s.description ?? `Task ${i + 1}`)) : ['Core implementation'], duration: `${subtasks.length * 2 + 3}-${subtasks.length * 3 + 5} days`, dependencies: ['Phase 1: Planning'] },
      { name: 'Phase 3: Verification', tasks: ['Quality review', 'Integration testing'], duration: '2-3 days', dependencies: ['Phase 2: Implementation'] },
      { name: 'Phase 4: Delivery', tasks: ['Deployment', 'Documentation'], duration: '1 day', dependencies: ['Phase 3: Verification'] },
    ];

    return {
      memorialTitle: `奏章: ${requirement.substring(0, 40)}`,
      requirement,
      phases,
      totalPhases: phases.length,
      milestones: phases.map((p, i) => ({ phase: i + 1, name: p.name, deliverable: p.tasks[0] ?? 'TBD' })),
      resourceEstimate: { developers: Math.min(subtasks.length + 1, 5), days: subtasks.length * 2 + 7 },
      riskAssessment: subtasks.length > 5 ? 'High complexity — recommend phased delivery' : 'Manageable — standard execution',
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.requirement || typeof params.requirement !== 'string') errors.push('Parameter "requirement" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const planReviewSkill = defineSkill(
  {
    id: 'menxia:plan-review',
    name: 'Plan Review',
    version: '1.0.0',
    owner: 'menxia',
    description: 'Review execution plans — check completeness, feasibility, risk coverage, and compliance with standards.',
    category: 'dynasty',
    parameters: [
      { name: 'plan', type: 'object', required: true, description: 'Execution plan to review.' },
      { name: 'standards', type: 'array', required: false, description: 'Compliance standards to check against.' },
    ],
  },
  async (params) => {
    const plan = (params.plan as Record<string, unknown>) ?? {};
    const standards = (params.standards as string[]) ?? ['completeness', 'feasibility', 'risk'];

    const issues: Array<{ category: string; severity: 'info' | 'warning' | 'critical'; description: string; suggestion: string }> = [];
    let score = 1.0;

    const phases = (plan.phases as Array<Record<string, unknown>>) ?? [];
    if (phases.length === 0) { issues.push({ category: 'completeness', severity: 'critical', description: 'No phases defined', suggestion: 'Define at least 3 phases' }); score -= 0.3; }
    if (phases.length < 3) { issues.push({ category: 'completeness', severity: 'warning', description: 'Too few phases', suggestion: 'Consider adding verification and delivery phases' }); score -= 0.1; }

    for (let i = 1; i < phases.length; i++) {
      const deps = (phases[i]!.dependencies as string[]) ?? [];
      if (deps.length === 0) { issues.push({ category: 'feasibility', severity: 'warning', description: `Phase ${i + 1} has no dependencies`, suggestion: 'Add dependency on previous phase' }); score -= 0.05; }
    }

    if (standards.includes('risk') && !plan.riskAssessment) {
      issues.push({ category: 'risk', severity: 'warning', description: 'No risk assessment provided', suggestion: 'Add risk assessment section' }); score -= 0.1;
    }

    const verdict = score >= 0.8 ? 'approved' : score >= 0.5 ? 'revision_requested' : 'rejected';

    return {
      verdict,
      score: Math.max(0, Math.round(score * 100) / 100),
      issues,
      phaseCount: phases.length,
      recommendation: verdict === 'approved' ? '准奏 — Plan is well-structured and ready for dispatch' : verdict === 'revision_requested' ? '封驳 — Address identified issues before resubmission' : '驳回 — Fundamental issues require complete revision',
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.plan || typeof params.plan !== 'object') errors.push('Parameter "plan" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const dispatchOptimizeSkill = defineSkill(
  {
    id: 'shangshu:dispatch-optimize',
    name: 'Dispatch Optimization',
    version: '1.0.0',
    owner: 'shangshu',
    description: 'Optimize task dispatch to ministries — balance workload, respect dependencies, and minimize completion time.',
    category: 'dynasty',
    parameters: [
      { name: 'tasks', type: 'array', required: true, description: 'Tasks to dispatch [{ id, ministry, priority, effort, dependencies }].' },
      { name: 'ministryCapacity', type: 'object', required: false, description: 'Per-ministry capacity limits.' },
    ],
  },
  async (params) => {
    const tasks = (params.tasks as Array<Record<string, unknown>>) ?? [];
    const capacity = (params.ministryCapacity as Record<string, number>) ?? {};

    const byMinistry: Record<string, Array<Record<string, unknown> & { dispatchOrder: number }>> = {};
    const sorted = [...tasks].sort((a, b) => {
      const prio: Record<string, number> = { high: 3, medium: 2, low: 1 };
      return (prio[String(b.priority)] ?? 2) - (prio[String(a.priority)] ?? 2);
    });

    const dispatchOrder: Array<{ taskId: string; ministry: string; order: number; parallel: boolean }> = [];
    let order = 0;

    for (const task of sorted) {
      const ministry = String(task.ministry ?? 'hubu');
      if (!byMinistry[ministry]) byMinistry[ministry] = [];
      const deps = (task.dependencies as string[]) ?? [];
      const canParallel = deps.length === 0;
      order++;
      byMinistry[ministry].push({ ...task, dispatchOrder: order });
      dispatchOrder.push({ taskId: String(task.id), ministry, order, parallel: canParallel });
    }

    const ministryLoad: Record<string, number> = {};
    for (const [m, t] of Object.entries(byMinistry)) {
      ministryLoad[m] = t.length;
    }

    const overloaded = Object.entries(ministryLoad).filter(([ministry, load]) => {
      const cap = capacity[ministry] ?? 10;
      return load > cap;
    });

    return {
      dispatchOrder,
      byMinistry: Object.fromEntries(Object.entries(byMinistry).map(([k, v]) => [k, v.length])),
      ministryLoad,
      overloadedMinistries: overloaded.map(([m]) => m),
      totalTasks: tasks.length,
      estimatedCompletion: Math.max(...Object.values(ministryLoad)) * 2,
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.tasks) || params.tasks.length === 0) errors.push('Parameter "tasks" is required and non-empty');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const dataAggregationSkill = defineSkill(
  {
    id: 'hubu:data-aggregation',
    name: 'Data Aggregation',
    version: '1.0.0',
    owner: 'hubu',
    description: 'Aggregate and compute statistical summaries — mean, median, distribution, outliers, and trend direction.',
    category: 'dynasty',
    parameters: [
      { name: 'datasets', type: 'array', required: true, description: 'Datasets to aggregate [{ id, values: number[], label }].' },
      { name: 'operations', type: 'array', required: false, description: 'Aggregation operations: mean, median, sum, min, max, std.', default: ['mean', 'median', 'sum', 'std'] },
    ],
  },
  async (params) => {
    const datasets = (params.datasets as Array<Record<string, unknown>>) ?? [];
    const operations = (params.operations as string[]) ?? ['mean', 'median', 'sum', 'std'];

    const results = datasets.map(ds => {
      const values = (ds.values as number[]) ?? [];
      if (values.length === 0) return { id: String(ds.id), label: String(ds.label ?? ''), stats: {} };

      const sorted = [...values].sort((a, b) => a - b);
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = sum / values.length;
      const median = values.length % 2 === 0 ? (sorted[values.length / 2 - 1]! + sorted[values.length / 2]!) / 2 : sorted[Math.floor(values.length / 2)]!;
      const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
      const std = Math.sqrt(variance);

      const stats: Record<string, number> = {};
      if (operations.includes('mean')) stats.mean = Math.round(mean * 1000) / 1000;
      if (operations.includes('median')) stats.median = Math.round(median * 1000) / 1000;
      if (operations.includes('sum')) stats.sum = Math.round(sum * 1000) / 1000;
      if (operations.includes('min')) stats.min = sorted[0]!;
      if (operations.includes('max')) stats.max = sorted[sorted.length - 1]!;
      if (operations.includes('std')) stats.std = Math.round(std * 1000) / 1000;

      const q1 = sorted[Math.floor(values.length * 0.25)]!;
      const q3 = sorted[Math.floor(values.length * 0.75)]!;
      const iqr = q3 - q1;
      const outliers = values.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);

      return { id: String(ds.id ?? ''), label: String(ds.label ?? ''), stats, outlierCount: outliers.length, trend: mean > median ? 'right-skewed' : mean < median ? 'left-skewed' : 'symmetric' };
    });

    return { datasets: results, totalDatasets: datasets.length, operations };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.datasets)) errors.push('Parameter "datasets" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const docGenerationSkill = defineSkill(
  {
    id: 'libu:doc-generation',
    name: 'Documentation Generation',
    version: '1.0.0',
    owner: 'libu',
    description: 'Generate structured documentation from code/module metadata — produce API docs, READMEs, and technical specs.',
    category: 'dynasty',
    parameters: [
      { name: 'metadata', type: 'object', required: true, description: 'Module metadata { name, exports, functions, types }.' },
      { name: 'docType', type: 'string', required: false, description: 'Output type: readme, api, spec.', default: 'readme' },
    ],
  },
  async (params) => {
    const meta = (params.metadata as Record<string, unknown>) ?? {};
    const docType = String(params.docType ?? 'readme');
    const name = String(meta.name ?? 'Module');
    const exports = (meta.exports as string[]) ?? [];
    const functions = (meta.functions as Array<Record<string, unknown>>) ?? [];
    const types = (meta.types as string[]) ?? [];

    let content: string;
    if (docType === 'readme') {
      content = `# ${name}\n\n## Overview\n\n${name} provides ${exports.length} exports.\n\n## Exports\n\n${exports.map(e => `- \`${e}\``).join('\n')}\n\n## API\n\n${functions.map(f => `### \`${String(f.name ?? '')}(${(f.params as string[])?.join(', ') ?? ''})\`\n\n${String(f.description ?? 'No description.')}`).join('\n\n')}\n`;
    } else if (docType === 'api') {
      content = `# ${name} API Reference\n\n${functions.map(f => `## \`${String(f.name ?? '')}\`\n\n**Parameters:** ${(f.params as string[])?.map(p => `\`${p}\``).join(', ') ?? 'None'}\n\n**Returns:** \`${String(f.returns ?? 'void')}\`\n\n${String(f.description ?? '')}`).join('\n\n---\n\n')}\n`;
    } else {
      content = `# ${name} Technical Specification\n\n## Types\n\n${types.map(t => `- \`${t}\``).join('\n')}\n\n## Module Structure\n\n${exports.map(e => `### ${e}\n\n(Description pending)`).join('\n\n')}\n`;
    }

    return { docType, moduleName: name, content, sections: content.match(/^## .+$/gm)?.map(s => s.replace(/^## /, '')) ?? [], wordCount: content.split(/\s+/).length };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.metadata || typeof params.metadata !== 'object') errors.push('Parameter "metadata" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const codeImplementSkill = defineSkill(
  {
    id: 'bingbu:code-implement',
    name: 'Code Implementation',
    version: '1.0.0',
    owner: 'bingbu',
    description: 'Generate implementation plan from specification — produce file structure, interfaces, and implementation skeleton.',
    category: 'dynasty',
    parameters: [
      { name: 'spec', type: 'string', required: true, description: 'Feature specification or task description.' },
      { name: 'language', type: 'string', required: false, description: 'Target language: typescript, python.', default: 'typescript' },
    ],
  },
  async (params) => {
    const spec = String(params.spec ?? '').toLowerCase();
    const language = String(params.language ?? 'typescript');

    const fileTemplates: Record<string, Array<{ path: string; purpose: string }>> = {
      typescript: [
        { path: 'src/index.ts', purpose: 'Barrel exports' },
        { path: 'src/types.ts', purpose: 'Type definitions' },
        { path: 'src/module.ts', purpose: 'Core implementation' },
        { path: 'tests/module.test.ts', purpose: 'Unit tests' },
      ],
      python: [
        { path: '__init__.py', purpose: 'Package init' },
        { path: 'module.py', purpose: 'Core implementation' },
        { path: 'test_module.py', purpose: 'Unit tests' },
      ],
    };

    const files = fileTemplates[language] ?? fileTemplates['typescript']!;
    const features = spec.split(/[，,、;\n]+/).filter(s => s.trim().length > 0);

    const interfaces: string[] = [];
    if (spec.includes('配置') || spec.includes('config')) interfaces.push('Config');
    if (spec.includes('管理') || spec.includes('manager')) interfaces.push('Manager');
    if (spec.includes('适配') || spec.includes('adapter')) interfaces.push('Adapter');
    if (spec.includes('服务') || spec.includes('service')) interfaces.push('Service');
    if (interfaces.length === 0) interfaces.push('Module');

    return {
      spec: String(params.spec),
      language,
      fileStructure: files,
      interfaces: interfaces.map(name => ({ name, methods: ['initialize', 'execute', 'dispose'] })),
      features: features.map(f => ({ description: f.trim(), status: 'planned' })),
      estimatedLines: features.length * 50 + 100,
      dependencies: language === 'typescript' ? ['vitest'] : ['pytest'],
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.spec || typeof params.spec !== 'string') errors.push('Parameter "spec" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const vulnScanSkill = defineSkill(
  {
    id: 'xingbu:vulnerability-scan',
    name: 'Vulnerability Scan',
    version: '1.0.0',
    owner: 'xingbu',
    description: 'Scan dependencies and configurations for known vulnerabilities — check versions, CVEs, and security advisories.',
    category: 'dynasty',
    parameters: [
      { name: 'packages', type: 'array', required: true, description: 'Packages to scan [{ name, version }].' },
      { name: 'severity', type: 'string', required: false, description: 'Min severity to report: low, medium, high, critical.', default: 'medium' },
    ],
  },
  async (params) => {
    const packages = (params.packages as Array<Record<string, unknown>>) ?? [];
    const minSeverity = String(params.severity ?? 'medium');

    const KNOWN_VULNS: Array<{ package: string; versions: string; severity: string; cve: string; fix: string }> = [
      { package: 'lodash', versions: '<4.17.21', severity: 'high', cve: 'CVE-2021-23337', fix: 'Upgrade to 4.17.21+' },
      { package: 'express', versions: '<4.18.0', severity: 'medium', cve: 'CVE-2022-24999', fix: 'Upgrade to 4.18.0+' },
      { package: 'axios', versions: '<0.21.2', severity: 'high', cve: 'CVE-2021-3749', fix: 'Upgrade to 0.21.2+' },
      { package: 'jsonwebtoken', versions: '<9.0.0', severity: 'critical', cve: 'CVE-2022-23529', fix: 'Upgrade to 9.0.0+' },
    ];

    const severityOrder: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };
    const minLevel = severityOrder[minSeverity] ?? 2;

    const findings: Array<{ package: string; version: string; severity: string; cve: string; fix: string }> = [];
    for (const pkg of packages) {
      const name = String(pkg.name ?? '').toLowerCase();
      const version = String(pkg.version ?? '0.0.0');
      for (const vuln of KNOWN_VULNS) {
        if (name === vuln.package && (severityOrder[vuln.severity] ?? 0) >= minLevel) {
          findings.push({ package: name, version, severity: vuln.severity, cve: vuln.cve, fix: vuln.fix });
        }
      }
    }

    findings.sort((a, b) => (severityOrder[b.severity] ?? 0) - (severityOrder[a.severity] ?? 0));

    return {
      scannedPackages: packages.length,
      findings,
      vulnerabilityCount: findings.length,
      riskLevel: findings.some(f => f.severity === 'critical') ? 'critical' : findings.some(f => f.severity === 'high') ? 'high' : findings.length > 0 ? 'medium' : 'low',
      passed: findings.length === 0,
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.packages)) errors.push('Parameter "packages" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const buildPipelineSkill = defineSkill(
  {
    id: 'gongbu:build-pipeline',
    name: 'Build Pipeline',
    version: '1.0.0',
    owner: 'gongbu',
    description: 'Design and optimize build pipelines — create stage plans, estimate durations, and identify bottlenecks.',
    category: 'dynasty',
    parameters: [
      { name: 'stages', type: 'array', required: true, description: 'Pipeline stages [{ name, type, estimatedDuration, dependencies }].' },
      { name: 'environment', type: 'string', required: false, description: 'Target environment: development, staging, production.', default: 'development' },
    ],
  },
  async (params) => {
    const stages = (params.stages as Array<Record<string, unknown>>) ?? [];
    const environment = String(params.environment ?? 'development');

    const pipeline = stages.map((stage, i) => ({
      name: String(stage.name ?? `stage-${i + 1}`),
      type: String(stage.type ?? 'build'),
      estimatedDuration: Number(stage.estimatedDuration) || 30,
      dependencies: (stage.dependencies as string[]) ?? (i > 0 ? [String(stages[i - 1]?.name ?? '')] : []),
      parallel: i > 0 && (stage.dependencies as string[])?.length === 0,
    }));

    const criticalPath = pipeline.reduce((sum, s) => sum + s.estimatedDuration, 0);
    const parallelizable = pipeline.filter(s => s.parallel);
    const optimizedDuration = criticalPath - parallelizable.reduce((sum, s) => sum + s.estimatedDuration * 0.5, 0);

    const bottlenecks = pipeline.filter(s => s.estimatedDuration > criticalPath / pipeline.length * 2);

    return {
      environment,
      stages: pipeline,
      totalStages: pipeline.length,
      criticalPathDuration: criticalPath,
      optimizedDuration: Math.round(optimizedDuration),
      parallelizableStages: parallelizable.length,
      bottlenecks: bottlenecks.map(b => b.name),
      optimization: bottlenecks.length > 0 ? `Bottleneck at ${bottlenecks.map(b => b.name).join(', ')} — consider splitting or caching` : 'Pipeline is well-balanced',
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.stages) || params.stages.length === 0) errors.push('Parameter "stages" is required and non-empty');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const agentEvaluateSkill = defineSkill(
  {
    id: 'libu_hr:agent-evaluate',
    name: 'Agent Performance Evaluation',
    version: '1.0.0',
    owner: 'libu_hr',
    description: 'Evaluate agent performance — compute KPIs, task completion rates, quality scores, and generate performance reviews.',
    category: 'dynasty',
    parameters: [
      { name: 'agentId', type: 'string', required: true, description: 'Agent to evaluate.' },
      { name: 'metrics', type: 'object', required: true, description: 'Performance metrics { tasksCompleted, tasksFailed, avgTime, qualityScore }.' },
    ],
  },
  async (params) => {
    const agentId = String(params.agentId);
    const metrics = (params.metrics as Record<string, unknown>) ?? {};
    const completed = Number(metrics.tasksCompleted) || 0;
    const failed = Number(metrics.tasksFailed) || 0;
    const avgTime = Number(metrics.avgTime) || 0;
    const quality = Number(metrics.qualityScore) || 0.5;

    const total = completed + failed;
    const successRate = total > 0 ? completed / total : 0;
    const efficiency = avgTime > 0 ? Math.min(1000 / avgTime, 1) : 0.5;

    const overallScore = successRate * 0.4 + quality * 0.3 + efficiency * 0.3;

    const rating: string = overallScore >= 0.9 ? 'S' : overallScore >= 0.8 ? 'A' : overallScore >= 0.7 ? 'B' : overallScore >= 0.6 ? 'C' : 'D';
    const honors: string[] = [];
    if (successRate >= 0.95) honors.push('百战不殆');
    if (completed >= 100) honors.push('日理万机');
    if (quality >= 0.9) honors.push('格物致知');

    return {
      agentId,
      rating,
      overallScore: Math.round(overallScore * 1000) / 1000,
      breakdown: { successRate: Math.round(successRate * 1000) / 1000, quality: Math.round(quality * 1000) / 1000, efficiency: Math.round(efficiency * 1000) / 1000 },
      stats: { completed, failed, total, avgTime },
      honors,
      review: rating === 'S' ? '卓越表现 — 授予最高嘉奖' : rating === 'A' ? '优秀表现 — 值得表彰' : rating === 'B' ? '良好表现 — 继续努力' : '需要改进 — 建议制定提升计划',
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!params.agentId) errors.push('Parameter "agentId" is required');
    if (!params.metrics || typeof params.metrics !== 'object') errors.push('Parameter "metrics" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);

export const healthCheckSkill = defineSkill(
  {
    id: 'zaochao:health-check',
    name: 'System Health Check',
    version: '1.0.0',
    owner: 'zaochao',
    description: 'System health monitoring and broadcasting — check agent availability, queue depth, error rates, and generate health reports.',
    category: 'dynasty',
    parameters: [
      { name: 'agents', type: 'array', required: true, description: 'Agent status reports [{ id, status, queueDepth, errorRate, lastActive }].' },
      { name: 'thresholds', type: 'object', required: false, description: 'Alert thresholds { maxQueueDepth, maxErrorRate, maxInactiveMs }.' },
    ],
  },
  async (params) => {
    const agents = (params.agents as Array<Record<string, unknown>>) ?? [];
    const thresholds = (params.thresholds as Record<string, number>) ?? {};
    const maxQueue = thresholds.maxQueueDepth ?? 100;
    const maxError = thresholds.maxErrorRate ?? 0.1;
    const maxInactive = thresholds.maxInactiveMs ?? 300000;

    const now = Date.now();
    const checks = agents.map(agent => {
      const id = String(agent.id ?? 'unknown');
      const status = String(agent.status ?? 'unknown');
      const queueDepth = Number(agent.queueDepth) || 0;
      const errorRate = Number(agent.errorRate) || 0;
      const lastActive = Number(agent.lastActive) || now;

      const alerts: string[] = [];
      if (queueDepth > maxQueue) alerts.push(`Queue depth ${queueDepth} exceeds threshold ${maxQueue}`);
      if (errorRate > maxError) alerts.push(`Error rate ${(errorRate * 100).toFixed(1)}% exceeds threshold ${(maxError * 100).toFixed(1)}%`);
      if (now - lastActive > maxInactive) alerts.push(`Inactive for ${Math.round((now - lastActive) / 60000)} minutes`);

      return { id, status, queueDepth, errorRate, lastActive, healthy: alerts.length === 0, alerts };
    });

    const healthyCount = checks.filter(c => c.healthy).length;
    const unhealthyCount = checks.length - healthyCount;
    const overallHealth = checks.length > 0 ? healthyCount / checks.length : 0;

    return {
      timestamp: new Date().toISOString(),
      overallStatus: overallHealth >= 0.8 ? 'healthy' : overallHealth >= 0.5 ? 'degraded' : 'unhealthy',
      overallHealth: Math.round(overallHealth * 100) / 100,
      agentChecks: checks,
      summary: { total: checks.length, healthy: healthyCount, unhealthy: unhealthyCount },
      broadcast: overallHealth >= 0.8 ? '☀️ 各位大人，系统运行良好，天下太平。' : overallHealth >= 0.5 ? '⚠️ 各位大人，部分系统异常，请注意。' : '🚨 各位大人，系统告急，请立即处理！',
    };
  },
  (params) => {
    const errors: string[] = [];
    if (!Array.isArray(params.agents)) errors.push('Parameter "agents" is required');
    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },
);
