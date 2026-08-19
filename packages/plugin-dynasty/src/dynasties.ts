/**
 * @file: dynasties.ts
 * @description: 十三王朝 · 中华文明脉络 × Skills 分类体系
 */
import {
  Crown, Scroll, BookOpen, Palette, Music, Calculator, Globe,
  Sword, Compass, Gem, Ship, Scale, Sparkles, Wrench, Beaker,
} from "lucide-react";

// ============================================================
// 十三王朝定义
// ============================================================

export interface Dynasty {
  id: string;
  name: string;               // 朝代名
  period: string;             // 年代
  capital: string;            // 都城
  culturalPeak: string;       // 文化巅峰
  color: string;
  icon: typeof Crown;
}

export const THIRTEEN_DYNASTIES: Dynasty[] = [
  { id: "xia",     name: "夏",   period: "约前2070–前1600", capital: "阳城",  culturalPeak: "礼乐雏形·青铜初铸",   color: "#3D5A40", icon: Crown      },
  { id: "shang",   name: "商",   period: "前1600–前1046",   capital: "殷",    culturalPeak: "甲骨文·青铜鼎彝",      color: "#8B6914", icon: Gem        },
  { id: "zhou",    name: "周",   period: "前1046–前256",    capital: "镐/洛", culturalPeak: "周易·礼乐制度",         color: "#C9A96E", icon: Scale      },
  { id: "qin",     name: "秦",   period: "前221–前206",     capital: "咸阳",  culturalPeak: "车同轨·书同文·长城",  color: "#1C1C1C", icon: Sword      },
  { id: "han",     name: "汉",   period: "前202–220",       capital: "长安",  culturalPeak: "史记·造纸术·丝绸之路", color: "#8B0000", icon: Compass    },
  { id: "weijin",  name: "魏晋", period: "220–420",         capital: "洛阳",  culturalPeak: "建安风骨·竹林七贤",    color: "#6B8E23", icon: Scroll     },
  { id: "northsouth", name: "南北朝", period: "420–589",    capital: "建康",  culturalPeak: "玄学·佛教石窟艺术",    color: "#4A0080", icon: Beaker      },
  { id: "sui",     name: "隋",   period: "581–618",        capital: "大兴",  culturalPeak: "大运河·科举制度",      color: "#FF8C00", icon: Ship       },
  { id: "tang",    name: "唐",   period: "618–907",        capital: "长安",  culturalPeak: "唐诗巅峰·开放兼容",    color: "#FFD700", icon: Sparkles   },
  { id: "song",    name: "宋",   period: "960–1279",       capital: "汴/临", culturalPeak: "宋词·活字印刷·理学",    color: "#4169E1", icon: BookOpen   },
  { id: "yuan",    name: "元",   period: "1271–1368",      capital: "大都",  culturalPeak: "元曲·马可波罗游记",    color: "#B8860B", icon: Globe      },
  { id: "ming",    name: "明",   period: "1368–1644",      capital: "南京/北京", culturalPeak: "永乐大典·郑和下西洋", color: "#DC143C", icon: Compass    },
  { id: "qing",    name: "清",   period: "1644–1912",      capital: "北京",  culturalPeak: "四库全书·红楼梦",      color: "#4B0082", icon: BookOpen   },
];

// ============================================================
// 王朝 → Skills 映射
// ============================================================

export interface DynastySkillMap {
  dynastyId: string;
  skillName: string;          // 技能名
  icon: typeof Crown;
  category: string;
  description: string;
  keywords: string[];         // 关键词触发
}

export const DYNASTY_SKILL_MAP: DynastySkillMap[] = [
  // ─── 夏 · 礼乐初鸣 ───
  { dynastyId: "xia", skillName: "礼乐溯源",   icon: Music,     category: "礼乐",  description: "追溯华夏礼乐制度起源，解读夏代祭祀音乐与礼仪规范", keywords: ["礼乐", "祭祀", "大禹"] },
  { dynastyId: "xia", skillName: "青铜初铸",   icon: Gem,       category: "工艺",  description: "二里头文化青铜器造型分析与铭文初识",            keywords: ["青铜", "铸造", "冶铁"] },

  // ─── 商 · 甲骨卜辞 ───
  { dynastyId: "shang", skillName: "甲骨卜辞", icon: Scroll,    category: "文字",  description: "甲骨文字形辨识与占卜辞例解读",                 keywords: ["甲骨文", "卜辞", "殷墟"] },
  { dynastyId: "shang", skillName: "青铜彝器", icon: Gem,       category: "工艺",  description: "商代青铜器纹饰分类(饕餮/夔龙/云雷)与铸造工艺", keywords: ["青铜", "鼎", "尊"] },

  // ─── 周 · 周易礼乐 ───
  { dynastyId: "zhou", skillName: "易学推演",   icon: Calculator, category: "哲学", description: "周易六十四卦推演与卦爻辞解读",                    keywords: ["周易", "八卦", "爻"] },
  { dynastyId: "zhou", skillName: "礼乐典章",   icon: Scale,     category: "礼乐", description: "周礼制度(吉凶军宾嘉五礼)与雅乐等级分析",           keywords: ["周礼", "五礼", "雅乐"] },

  // ─── 秦 · 一统度量 ───
  { dynastyId: "qin", skillName: "度量衡一统", icon: Scale,     category: "标准", description: "秦制度量衡(长度/容量/重量)标准解析与现代转换",     keywords: ["度量衡", "统一", "秦制"] },
  { dynastyId: "qin", skillName: "小篆隶变",   icon: Scroll,    category: "文字", description: "小篆字形结构与隶书演变脉络分析",                   keywords: ["小篆", "隶书", "李斯"] },

  // ─── 汉 · 史家绝唱 ───
  { dynastyId: "han", skillName: "史家绝唱",   icon: BookOpen,  category: "典籍", description: "史记体例(本纪/世家/列传/表/书)与叙史技法",          keywords: ["史记", "司马迁", "二十四史"] },
  { dynastyId: "han", skillName: "丝路通商",   icon: Compass,   category: "外交", description: "丝绸之路路线复原与沿途文化交流梳理",                 keywords: ["丝绸之路", "西域", "张骞"] },

  // ─── 魏晋 · 建安风骨 ───
  { dynastyId: "weijin", skillName: "建安文学", icon: Scroll,   category: "文学", description: "建安七子风格特征与三曹文学成就品评",                 keywords: ["建安", "三曹", "曹植"] },
  { dynastyId: "weijin", skillName: "玄学清谈", icon: Beaker,    category: "哲学", description: "魏晋玄学(有无/名教自然/竹林七贤)思辨体系",           keywords: ["玄学", "竹林七贤", "嵇康"] },

  // ─── 南北朝 · 佛韵石窟 ───
  { dynastyId: "northsouth", skillName: "石窟艺术", icon: Palette, category: "艺术", description: "云冈/龙门/敦煌石窟造像风格对比与佛教艺术传播",    keywords: ["石窟", "敦煌", "佛像"] },
  { dynastyId: "northsouth", skillName: "声律启蒙", icon: Music,   category: "乐律", description: "四声八病说与永明体诗歌声韵分析",                    keywords: ["声律", "四声", "沈约"] },

  // ─── 隋 · 运河科举 ───
  { dynastyId: "sui", skillName: "运河工程",   icon: Ship,      category: "工程", description: "大运河水系规划与工程技术创新分析",                   keywords: ["大运河", "水利", "工程"] },
  { dynastyId: "sui", skillName: "科举初创",   icon: Scale,     category: "制度", description: "科举制度起源与选官流程解析",                         keywords: ["科举", "进士", "贡院"] },

  // ─── 唐 · 诗以言志 ───
  { dynastyId: "tang", skillName: "唐诗品鉴",   icon: Scroll,    category: "文学", description: "初盛中晚四唐风格流变与李杜王孟鉴赏",                 keywords: ["唐诗", "李白", "杜甫", "律诗"] },
  { dynastyId: "tang", skillName: "颜筋柳骨",   icon: Palette,   category: "书法", description: "唐代楷书大家(颜真卿/柳公权/欧阳询)笔法解析",         keywords: ["书法", "楷书", "颜真卿"] },

  // ─── 宋 · 格物致知 ───
  { dynastyId: "song", skillName: "宋词婉豪",   icon: Scroll,    category: "文学", description: "婉约(柳永/李清照)与豪放(苏轼/辛弃疾)词风流变",      keywords: ["宋词", "苏轼", "李清照"] },
  { dynastyId: "song", skillName: "活字天工",   icon: Wrench,     category: "科技", description: "活字印刷术工艺复原与天工开物技术谱系",               keywords: ["活字印刷", "天工开物", "沈括"] },

  // ─── 元 · 曲韵悠长 ───
  { dynastyId: "yuan", skillName: "元曲四家",   icon: Music,     category: "文学", description: "关白马郑四大家作品特色与散曲杂剧体制",               keywords: ["元曲", "杂剧", "关汉卿"] },
  { dynastyId: "yuan", skillName: "青花韵致",   icon: Palette,   category: "工艺", description: "元青花钴料特性与纹饰母题(缠枝/云龙/人物)解析",        keywords: ["青花", "陶瓷", "景德镇"] },

  // ─── 明 · 四海扬帆 ───
  { dynastyId: "ming", skillName: "永乐大典",   icon: BookOpen,  category: "典籍", description: "永乐大典类书体例与明代官修文献整理",                 keywords: ["永乐大典", "类书", "解缙"] },
  { dynastyId: "ming", skillName: "下西洋策",   icon: Ship,      category: "外交", description: "郑和七下西洋航线复原与海外文化交流分析",               keywords: ["郑和", "宝船", "海上丝绸之路"] },

  // ─── 清 · 集大成者 ───
  { dynastyId: "qing", skillName: "四库集萃",   icon: BookOpen,  category: "典籍", description: "四库全书经史子集分类体系与清代考据学",              keywords: ["四库全书", "考据", "乾嘉"] },
  { dynastyId: "qing", skillName: "红楼一梦",   icon: Scroll,    category: "文学", description: "红楼梦人物谱系与清代世情小说叙事艺术",               keywords: ["红楼梦", "曹雪芹", "章回"] },
];

// ============================================================
// 按朝代聚合 Skill 类别
// ============================================================

export const DYNASTY_CATEGORIES = [
  { id: "character",  name: "文字演变",  icon: Scroll,    color: "#C9A96E" },
  { id: "literature", name: "文学巅峰",  icon: BookOpen,  color: "#FFD700" },
  { id: "art",        name: "书画艺术",  icon: Palette,   color: "#FF69B4" },
  { id: "music",      name: "礼乐音律",  icon: Music,     color: "#00d4ff" },
  { id: "philosophy", name: "哲学思辨",  icon: Beaker,     color: "#AA55FF" },
  { id: "science",    name: "科技发明",  icon: Wrench,    color: "#00FF88" },
  { id: "diplomacy",  name: "邦交贸易",  icon: Globe,     color: "#FF6600" },
  { id: "craft",      name: "工艺器物",  icon: Gem,       color: "#8B6914" },
  { id: "archive",    name: "典籍文献",  icon: BookOpen,  color: "#800020" },
] as const;

export function getSkillsForDynasty(dynastyId: string): DynastySkillMap[] {
  return DYNASTY_SKILL_MAP.filter(s => s.dynastyId === dynastyId);
}

export function getSkillsByCategory(categoryId: string): DynastySkillMap[] {
  return DYNASTY_SKILL_MAP.filter(s => s.category === categoryId);
}

export function getDynasty(id: string): Dynasty | undefined {
  return THIRTEEN_DYNASTIES.find(d => d.id === id);
}
