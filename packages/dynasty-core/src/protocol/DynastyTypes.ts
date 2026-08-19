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

export type DynastyAgentID =
  | 'emperor'
  | 'taizi'
  | 'zhongshu'
  | 'menxia'
  | 'shangshu'
  | 'hubu'
  | 'libu'
  | 'bingbu'
  | 'xingbu'
  | 'gongbu'
  | 'libu_hr'
  | 'zaochao';

export type DynastyTier = 'emperor' | 'heir' | 'council' | 'ministry';

export type EdictType =
  | 'edict'
  | 'memorial'
  | 'review'
  | 'dispatch'
  | 'report'
  | 'reward';

export type EdictStatus =
  | 'pending_taizi'
  | 'pending_zhongshu'
  | 'pending_menxia'
  | 'pending_shangshu'
  | 'dispatched'
  | 'executing'
  | 'review_pending'
  | 'completed'
  | 'blocked'
  | 'rejected';

export type EdictUrgency = 'low' | 'medium' | 'high' | 'urgent';

export type ReviewVerdict = 'approved' | 'rejected' | 'revision_requested';

export type HonorRarity = 1 | 2 | 3 | 4 | 5 | 6;

export interface DynastyAgentRole {
  id: DynastyAgentID;
  name: string;
  title: string;
  tier: DynastyTier;
  icon: string;
  responsibilities: string[];
  canSendTo: DynastyAgentID[];
  canReceiveFrom: DynastyAgentID[];
}

export interface EdictMessage {
  version: '1.0';
  message_id: string;
  timestamp: string;
  from: DynastyAgentID;
  to: DynastyAgentID;
  type: EdictType;
  payload: EdictPayload;
  signature?: string;
}

export interface EdictPayload {
  edict_id?: string;
  title?: string;
  content: unknown;
  urgency?: EdictUrgency;
  related_ids?: string[];
  metadata?: Record<string, unknown>;
}

export interface EdictContent {
  text: string;
  channel?: string;
}

export interface MemorialContent {
  edict_id: string;
  plan: string;
  subtasks: MemorialSubtask[];
  estimated_effort?: string;
  risk_assessment?: string;
}

export interface MemorialSubtask {
  id: string;
  description: string;
  assigned_to: DynastyAgentID;
  dependencies?: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface ReviewContent {
  edict_id: string;
  verdict: ReviewVerdict;
  comments: string;
  issues?: string[];
  suggestions?: string[];
  reviewer: DynastyAgentID;
}

export interface DispatchContent {
  edict_id: string;
  tasks: DispatchTask[];
}

export interface DispatchTask {
  id: string;
  assignee: DynastyAgentID;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
}

export interface ReportContent {
  edict_id: string;
  task_id: string;
  status: 'success' | 'partial' | 'failed';
  result: unknown;
  metrics?: {
    executionTime: number;
    tokensUsed?: number;
    qualityScore?: number;
  };
}

export interface RewardContent {
  agent_id: DynastyAgentID;
  honor_id: string;
  reason: string;
  edict_id?: string;
}

export interface EdictEnvelope {
  edict_id: string;
  status: EdictStatus;
  created_at: string;
  updated_at: string;
  messages: EdictMessage[];
  current_phase: EdictType;
  origin: string;
}

export interface DynastyHonor {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: HonorRarity;
  condition: string;
  granted_to?: DynastyAgentID[];
}

export const DYNASTY_ROLES: Record<DynastyAgentID, DynastyAgentRole> = {
  emperor: {
    id: 'emperor',
    name: '皇帝',
    title: 'Emperor',
    tier: 'emperor',
    icon: '👑',
    responsibilities: ['发起任务（下旨）', '最终决策'],
    canSendTo: ['taizi'],
    canReceiveFrom: ['taizi', 'shangshu', 'zaochao'],
  },
  taizi: {
    id: 'taizi',
    name: '太子',
    title: 'Crown Prince',
    tier: 'heir',
    icon: '🎎',
    responsibilities: ['消息分拣', '需求整理为旨意'],
    canSendTo: ['emperor', 'zhongshu'],
    canReceiveFrom: ['emperor'],
  },
  zhongshu: {
    id: 'zhongshu',
    name: '中书省',
    title: 'Secretariat',
    tier: 'council',
    icon: '📜',
    responsibilities: ['草拟执行方案（奏章）', '任务分解'],
    canSendTo: ['menxia', 'shangshu'],
    canReceiveFrom: ['taizi', 'menxia'],
  },
  menxia: {
    id: 'menxia',
    name: '门下省',
    title: 'Chancellery',
    tier: 'council',
    icon: '🔍',
    responsibilities: ['审议方案', '准奏或封驳'],
    canSendTo: ['zhongshu', 'shangshu'],
    canReceiveFrom: ['zhongshu'],
  },
  shangshu: {
    id: 'shangshu',
    name: '尚书省',
    title: 'Department of State Affairs',
    tier: 'council',
    icon: '📮',
    responsibilities: ['派发任务至六部', '汇总回奏'],
    canSendTo: ['emperor', 'zhongshu', 'menxia', 'hubu', 'libu', 'bingbu', 'xingbu', 'gongbu', 'libu_hr'],
    canReceiveFrom: ['menxia', 'zhongshu', 'hubu', 'libu', 'bingbu', 'xingbu', 'gongbu', 'libu_hr'],
  },
  hubu: {
    id: 'hubu',
    name: '户部',
    title: 'Ministry of Revenue',
    tier: 'ministry',
    icon: '💰',
    responsibilities: ['数据分析', '资源核算'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  libu: {
    id: 'libu',
    name: '礼部',
    title: 'Ministry of Rites',
    tier: 'ministry',
    icon: '📝',
    responsibilities: ['技术文档', '规范制定'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  bingbu: {
    id: 'bingbu',
    name: '兵部',
    title: 'Ministry of War',
    tier: 'ministry',
    icon: '⚔️',
    responsibilities: ['代码开发', 'Bug 修复'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  xingbu: {
    id: 'xingbu',
    name: '刑部',
    title: 'Ministry of Justice',
    tier: 'ministry',
    icon: '⚖️',
    responsibilities: ['安全审计', '合规检查'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  gongbu: {
    id: 'gongbu',
    name: '工部',
    title: 'Ministry of Works',
    tier: 'ministry',
    icon: '🔧',
    responsibilities: ['CI/CD', '部署', '工具链'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  libu_hr: {
    id: 'libu_hr',
    name: '吏部',
    title: 'Ministry of Personnel',
    tier: 'ministry',
    icon: '📋',
    responsibilities: ['Agent 注册', '权限管理', '考核'],
    canSendTo: ['shangshu'],
    canReceiveFrom: ['shangshu'],
  },
  zaochao: {
    id: 'zaochao',
    name: '早朝官',
    title: 'Morning Court Herald',
    tier: 'ministry',
    icon: '🌅',
    responsibilities: ['每日定时播报', '健康检查'],
    canSendTo: ['emperor'],
    canReceiveFrom: [],
  },
};

export const DYNASTY_HONORS: DynastyHonor[] = [
  { id: 'tai_zi_shao_shi', name: '太子少师', icon: '🎎✨', description: '成为太子', rarity: 1, condition: '成为太子' },
  { id: 'zhong_shu_she_ren', name: '中书舍人', icon: '📜🖊️', description: '成为中书省', rarity: 1, condition: '成为中书省' },
  { id: 'men_xia_gei_shi', name: '门下给事中', icon: '🔍🛡️', description: '成为门下省', rarity: 1, condition: '成为门下省' },
  { id: 'shang_shu_pu_ye', name: '尚书仆射', icon: '📮⚖️', description: '成为尚书省', rarity: 1, condition: '成为尚书省' },
  { id: 'hu_bu_lang_zhong', name: '户部郎中', icon: '💰📊', description: '成为户部', rarity: 1, condition: '成为户部' },
  { id: 'li_bu_shi_lang', name: '礼部侍郎', icon: '📝📖', description: '成为礼部', rarity: 1, condition: '成为礼部' },
  { id: 'bing_bu_can_jiang', name: '兵部参将', icon: '⚔️💻', description: '成为兵部', rarity: 1, condition: '成为兵部' },
  { id: 'xing_bu_gei_shi', name: '刑部给事中', icon: '⚖️🔒', description: '成为刑部', rarity: 1, condition: '成为刑部' },
  { id: 'gong_bu_da_jiang', name: '工部大匠', icon: '🔧🏗️', description: '成为工部', rarity: 1, condition: '成为工部' },
  { id: 'li_bu_zhu_shi', name: '吏部主事', icon: '📋🤖', description: '成为吏部', rarity: 1, condition: '成为吏部' },
  { id: 'chen_zhong_si_chen', name: '晨钟司晨', icon: '🌅🔔', description: '成为早朝官', rarity: 1, condition: '成为早朝官' },
  { id: 'ri_li_wan_ji', name: '日理万机', icon: '📜💯', description: '完成100个任务', rarity: 2, condition: '完成100个任务' },
  { id: 'feng_bo_zhi_jian', name: '封驳直谏', icon: '🚫💬', description: '门下省成功驳回10次', rarity: 3, condition: '门下省成功驳回10次' },
  { id: 'bai_zhan_bu_dai', name: '百战不殆', icon: '⚔️🛡️', description: '兵部修复100个bug', rarity: 2, condition: '兵部修复100个bug' },
  { id: 'tong_qiang_tie_bi', name: '铜墙铁壁', icon: '🛡️🔐', description: '刑部阻止5次安全入侵', rarity: 4, condition: '刑部阻止5次安全入侵' },
  { id: 'san_sheng_tong_xin', name: '三省同心', icon: '🤝🌀', description: '一次任务零封驳完美协作', rarity: 4, condition: '一次任务零封驳完美协作' },
  { id: 'ren_cong_zhong_zhao', name: '人从众曌', icon: '🌹👑', description: '获得20个五星回奏', rarity: 5, condition: '获得20个五星回奏' },
  { id: 'jiu_gui_yi', name: '九九归一', icon: '🌀🌌', description: '连续99个任务无阻塞', rarity: 6, condition: '连续99个任务无阻塞' },
];

export const EDICT_FLOW: EdictType[] = [
  'edict',
  'memorial',
  'review',
  'dispatch',
  'report',
  'reward',
];
