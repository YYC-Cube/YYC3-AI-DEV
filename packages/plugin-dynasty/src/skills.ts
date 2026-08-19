/**
 * @file: skills.ts
 * @description: Dynasty 专属 Skills — 6 项中华文化技能
 *
 * 依托文化体系，弘扬中华文学，Ai-Family + Dynasty 双架构共创
 */
import {
  BookOpen, Scroll, Palette, Music, Calculator, Globe,
} from "lucide-react";

export interface DynastySkill {
  id: string;
  name: string;               // 技能名 (典故来源)
  tagline: string;            // 古风副标题
  description: string;
  icon: typeof BookOpen;
  category: string;
  color: string;
  active: boolean;
}

export const DYNASTY_SKILLS: DynastySkill[] = [
  {
    id: "skill-poetry",
    name: "诗词歌赋",
    tagline: "风雅颂 · 赋比兴",
    description: "识别古诗体裁(律诗/绝句/词牌/散曲)，对仗检测、平仄分析、韵脚匹配，支持唐诗三百首至宋词万首风格生成",
    icon: Scroll,
    category: "/ 文学",
    color: "#C9A96E",
    active: true,
  },
  {
    id: "skill-calligraphy",
    name: "书法丹青",
    tagline: "颜筋柳骨 · 笔走龙蛇",
    description: "识别篆隶楷行草五种书体，分析章法布局与笔势风格，输出书法名词术语及历代名家赏析(二王/颜柳/苏黄米蔡)",
    icon: Palette,
    category: "/ 艺术",
    color: "#8B4513",
    active: false,
  },
  {
    id: "skill-classics",
    name: "经史子集",
    tagline: "四库全书 · 七略之志",
    description: "经部(十三经)、史部(二十四史)、子部(诸子百家)、集部(诗文总集)的原文检索与智能解读，支持白话翻译与典故溯源",
    icon: BookOpen,
    category: "/ 典籍",
    color: "#800020",
    active: true,
  },
  {
    id: "skill-traditional-music",
    name: "丝竹管弦",
    tagline: "宫商角徵羽 · 乐府新声",
    description: "识别五音十二律，分析古琴减字谱，琵琶工尺谱与简谱互转，推荐与当前情境匹配的古典曲目(高山流水/广陵散/梅花三弄)",
    icon: Music,
    category: "/ 乐律",
    color: "#FF69B4",
    active: false,
  },
  {
    id: "skill-celestial",
    name: "天文历算",
    tagline: "观象授时 · 天工开物",
    description: "解读干支纪年与二十四节气，推算朔望月相与黄道吉日，匹配传统节日(春节/清明/端午/中秋)文化内涵解释与诗词推荐",
    icon: Calculator,
    category: "/ 天文",
    color: "#00BFFF",
    active: true,
  },
  {
    id: "skill-etiquette",
    name: "礼仪之邦",
    tagline: "不学礼 · 无以立",
    description: "基于周礼·仪礼·礼记三礼体系，解析古人称谓、座次、宴饮、祭祀等礼仪规范，生成符合场景的文言书信格式与贺词敬语",
    icon: Globe,
    category: "/ 礼仪",
    color: "#FFD700",
    active: false,
  },
];

// ============================================================
// Hub 提示词 (古风上下文)
// ============================================================

export const DYNASTY_PROMPTS = [
  {
    id: "dp-0",
    name: "Dynasty 御用",
    prompt: "汝乃YYC³王朝之AI治理体系，秉承'三省以治，六部以行'之训。以文言风骨辅以现代技术，所答须简明扼要，不失典雅。凡技术术语保留原文，诗意处可引经典。",
    category: "/ 治",
  },
  {
    id: "dp-1",
    name: "诗词鉴赏家",
    prompt: "汝乃当代诗词鉴赏大家，精通唐诗宋词元曲。品评须引原文，析格律之用，评意境之高下，道创作之背景。风格雅正，言辞优美。",
    category: "/ 文学",
  },
  {
    id: "dp-2",
    name: "史学编修",
    prompt: "汝乃史馆编修，博通古今。论事须考镜源流，方志典章信手拈来。以司马光《资治通鉴》笔法，简明扼要，用典恰切。",
    category: "/ 典籍",
  },
  {
    id: "dp-3",
    name: "易学方士",
    prompt: "汝乃通晓易理之方士，善观天象，精推算命。所论须引八卦五行，言简意深，不涉迷信，只做文化解读与哲学思辨。",
    category: "/ 天文",
  },
];
