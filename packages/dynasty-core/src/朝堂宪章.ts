/**
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : Dynasty Charter · 朝堂宪章
 * @License  : Apache-2.0
 * @Homepage : https://matrix.yyc3.top
 * ============================================================
 * 三省以治，六部以行 · 人从众曌众从人 🌹
 * ============================================================
 */

/**
 * 朝堂宪章.ts
 * =============
 * YYC³ Dynasty · 三省六部 — 朝堂宪章代码化
 * 三省以治，六部以行 · Where AI agents deliberate, draft, review, and execute
 */

// ═══════════════════════════════════════════
// 一、Dynasty 核心常量
// ═══════════════════════════════════════════

export const 朝堂宪章 = {
  名称: 'YYC³ Dynasty',
  标语: 'Rule with Three Councils, Execute with Six Ministries.',
  中文标语: '三省以治，六部以行',
  家族归属: 'YYC³ AI Family · 人从众曌众从人',
  宣言: '以中国古代"三省六部制"为思想根基，以多智能体协同技术为核心的新一代 AI 治理框架',
  开源协议: 'Apache-2.0',
  官网: 'https://matrix.yyc3.top',
} as const;

// ═══════════════════════════════════════════
// 二、12 位朝臣档案
// ═══════════════════════════════════════════

export interface 朝臣档案 {
  id: string;
  头衔: string;
  职能: string;
  徽章名: string;
  图标: string;
  稀有度: string;
}

export const 三省: Record<string, 朝臣档案> = {
  zhongshu: { id: 'zhongshu', 头衔: '中书省', 职能: '草拟执行方案（奏章）', 徽章名: '中书舍人', 图标: '📜🖊️', 稀有度: '⭐' },
  menxia:   { id: 'menxia', 头衔: '门下省', 职能: '审议方案，准奏或封驳',       徽章名: '门下给事中', 图标: '🔍🛡️', 稀有度: '⭐' },
  shangshu: { id: 'shangshu', 头衔: '尚书省', 职能: '派发任务至六部，汇总回奏', 徽章名: '尚书仆射', 图标: '📮⚖️', 稀有度: '⭐' },
};

export const 六部: Record<string, 朝臣档案> = {
  hubu:    { id: 'hubu', 头衔: '户部', 职能: '数据分析、资源核算',      徽章名: '户部郎中', 图标: '💰📊', 稀有度: '⭐' },
  libu:    { id: 'libu', 头衔: '礼部', 职能: '技术文档、规范制定',      徽章名: '礼部侍郎', 图标: '📝📖', 稀有度: '⭐' },
  bingbu:  { id: 'bingbu', 头衔: '兵部', 职能: '代码开发、Bug 修复',    徽章名: '兵部参将', 图标: '⚔️💻', 稀有度: '⭐' },
  xingbu:  { id: 'xingbu', 头衔: '刑部', 职能: '安全审计、合规检查',    徽章名: '刑部给事中', 图标: '⚖️🔒', 稀有度: '⭐' },
  gongbu:  { id: 'gongbu', 头衔: '工部', 职能: 'CI/CD、部署、工具链',   徽章名: '工部大匠', 图标: '🔧🏗️', 稀有度: '⭐' },
  libu_hr: { id: 'libu_hr', 头衔: '吏部', 职能: 'Agent 注册、权限、考核', 徽章名: '吏部主事', 图标: '📋🤖', 稀有度: '⭐' },
};

export const 皇室: Record<string, 朝臣档案> = {
  emperor: { id: 'emperor', 头衔: '皇帝', 职能: '发起任务（下旨），最终决策', 徽章名: '九五之尊', 图标: '👑', 稀有度: '⭐⭐⭐⭐⭐' },
  taizi:   { id: 'taizi', 头衔: '太子', 职能: '消息分拣，需求整理为"旨意"',   徽章名: '太子少师', 图标: '🎎✨', 稀有度: '⭐⭐⭐⭐' },
};

export const 朝臣: Record<string, 朝臣档案> = {
  zaochao: { id: 'zaochao', 头衔: '早朝官', 职能: '每日定时播报、健康检查', 徽章名: '晨钟司晨', 图标: '🌅🔔', 稀有度: '⭐' },
};

export const 全体朝臣: Record<string, 朝臣档案> = {
  ...三省, ...六部, ...皇室, ...朝臣,
};

// ═══════════════════════════════════════════
// 三、勋章成就系统
// ═══════════════════════════════════════════

export interface 勋章定义 {
  id: string;
  名称: string;
  图标: string;
  条件: string;
  稀有度: string;
}

export const 勋章库: 勋章定义[] = [
  // 朝臣身份章
  { id: 'tai_zi_shao_shi',     名称: '太子少师', 图标: '🎎✨', 条件: '成为太子', 稀有度: '⭐' },
  { id: 'zhong_shu_she_ren',    名称: '中书舍人', 图标: '📜🖊️', 条件: '成为中书省', 稀有度: '⭐' },
  { id: 'men_xia_ji_shi_zhong', 名称: '门下给事中', 图标: '🔍🛡️', 条件: '成为门下省', 稀有度: '⭐' },
  { id: 'shang_shu_pu_ye',      名称: '尚书仆射', 图标: '📮⚖️', 条件: '成为尚书省', 稀有度: '⭐' },
  { id: 'hu_bu_lang_zhong',     名称: '户部郎中', 图标: '💰📊', 条件: '成为户部', 稀有度: '⭐' },
  { id: 'libu_shi_lang',        名称: '礼部侍郎', 图标: '📝📖', 条件: '成为礼部', 稀有度: '⭐' },
  { id: 'bingbu_can_jiang',     名称: '兵部参将', 图标: '⚔️💻', 条件: '成为兵部', 稀有度: '⭐' },
  { id: 'xingbu_ji_shi_zhong',  名称: '刑部给事中', 图标: '⚖️🔒', 条件: '成为刑部', 稀有度: '⭐' },
  { id: 'gong_bu_da_jiang',     名称: '工部大匠', 图标: '🔧🏗️', 条件: '成为工部', 稀有度: '⭐' },
  { id: 'libu_zhu_shi',         名称: '吏部主事', 图标: '📋🤖', 条件: '成为吏部', 稀有度: '⭐' },
  { id: 'chen_zhong_si_chen',   名称: '晨钟司晨', 图标: '🌅🔔', 条件: '成为早朝官', 稀有度: '⭐' },
  // 成就章
  { id: 'ri_li_wan_ji',  名称: '日理万机', 图标: '📜💯', 条件: '完成100个任务', 稀有度: '⭐⭐' },
  { id: 'feng_bo_zhi_jian', 名称: '封驳直谏', 图标: '🚫💬', 条件: '门下省成功驳回10次', 稀有度: '⭐⭐⭐' },
  { id: 'bai_zhan_bu_dai', 名称: '百战不殆', 图标: '⚔️🛡️', 条件: '兵部修复100个bug', 稀有度: '⭐⭐' },
  { id: 'tong_qiang_tie_bi', 名称: '铜墙铁壁', 图标: '🛡️🔐', 条件: '刑部阻止5次安全入侵', 稀有度: '⭐⭐⭐⭐' },
  { id: 'san_sheng_tong_xin', 名称: '三省同心', 图标: '🤝🌀', 条件: '一次任务零封驳完美协作', 稀有度: '⭐⭐⭐⭐' },
  { id: 'ren_cong_zhong_zhao', 名称: '人从众曌', 图标: '🌹👑', 条件: '获得20个五星回奏', 稀有度: '⭐⭐⭐⭐⭐' },
  { id: 'jiu_jiu_gui_yi',  名称: '九九归一', 图标: '🌀🌌', 条件: '连续99个任务无阻塞', 稀有度: '⭐⭐⭐⭐⭐⭐' },
];

export function 查找勋章(id: string): 勋章定义 | undefined {
  return 勋章库.find(h => h.id === id);
}

// ═══════════════════════════════════════════
// 四、标头生成器（Dynasty 专用）
// ═══════════════════════════════════════════

export function 生成朝堂标头(模块名: string): string {
  const date = new Date().toISOString().split('T')[0]!;
  return `/**
 * YYC³ Dynasty · 三省以治，六部以行
 * Rule with Three Councils, Execute with Six Ministries
 * @Family   : YYC³ AI Family · 人从众曌众从人
 * @Module   : ${模块名}
 * @Date     : ${date}
 * @License  : Apache-2.0
 * @Homepage : https://matrix.yyc3.top
 * 万象归元于云枢，深栈智启新纪元 🌹
 */`;
}

export function 生成朝堂徽章(id: string): string {
  const official = 全体朝臣[id];
  if (!official) return '';
  return `![${official.头衔}](https://img.shields.io/badge/${encodeURIComponent(official.头衔)}-${encodeURIComponent(official.徽章名)}-%235e2c8a?style=for-the-badge)`;
}

// ═══════════════════════════════════════════
// 五、Family × Dynasty 统一索引
// ═══════════════════════════════════════════

export const FAMILY_DYNASTY_UNION = {
  familyMembers: 8,
  dynastyOfficials: 12,
  totalAgents: 20,
  motto: '人从众曌众从人',
  family: '亦师亦友亦伯乐，一言一语一协同',
  dynasty: '三省以治，六部以行',
  union: 'Family 为魂，Dynasty 为骨，Cloud 为枢',
} as const;
