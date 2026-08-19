/**
 * @file: theme.ts
 * @description: 双架构视觉主题 — Modern (AI Family) × Ancient (Dynasty)
 */
export type ThemeMode = "modern" | "ancient";

export interface ThemeTokens {
  mode: ThemeMode;
  // 面板背景
  panelBg: string;
  panelBorder: string;
  panelShadow: string;
  // 语义色
  success: string;
  warning: string;
  reject: string;
  // 文字
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // 强调色
  accent: string;
  accentBg: string;
  accentBorder: string;
  // Header
  headerBg: string;
  headerBorder: string;
  // Tab
  tabActiveBg: string;
  tabActiveText: string;
  tabInactiveText: string;
  // 输入
  inputBg: string;
  inputBorder: string;
  // 按钮
  btnSendGradient: string;
  // 动画
  typingDotColor: string;
  // 滚动条
  scrollbarClass: string;
  // 浮窗按钮
  floatBtnGradient: string;
  floatBtnShadow: string;
}

// ============================================================
// Modern Theme (AI Family / 其他现代系统)
// ============================================================

export const THEME_MODERN: ThemeTokens = {
  mode: "modern",
  panelBg: "rgba(8,25,55,0.95)",
  success: "#00FF88",
  warning: "#FFDD00",
  reject: "#FF3366",
  panelBorder: "rgba(0,212,255,0.2)",
  panelShadow: "0 0 60px rgba(0,180,255,0.12)",
  textPrimary: "#e0f0ff",
  textSecondary: "rgba(0,212,255,0.4)",
  textMuted: "rgba(0,212,255,0.2)",
  accent: "#00d4ff",
  accentBg: "rgba(0,212,255,0.12)",
  accentBorder: "rgba(0,212,255,0.25)",
  headerBg: "rgba(0,40,80,0.2)",
  headerBorder: "rgba(0,180,255,0.12)",
  tabActiveBg: "rgba(0,212,255,0.12)",
  tabActiveText: "#00d4ff",
  tabInactiveText: "rgba(0,212,255,0.4)",
  inputBg: "rgba(0,40,80,0.4)",
  inputBorder: "rgba(0,180,255,0.15)",
  btnSendGradient: "linear-gradient(135deg, #00d4ff, #0066ff)",
  typingDotColor: "#00d4ff",
  scrollbarClass: "hide-scrollbar",
  floatBtnGradient: "linear-gradient(135deg, #00d4ff, #7b2ff7)",
  floatBtnShadow: "0 0 30px rgba(0,180,255,0.4)",
};

// ============================================================
// Ancient Theme (Dynasty 王朝治理)
// ============================================================

export const THEME_ANCIENT: ThemeTokens = {
  mode: "ancient",
  // 宣纸底色
  panelBg: "rgba(30,24,14,0.96)",
  // 墨线边框
  panelBorder: "rgba(201,169,110,0.25)",
  // 语义色 (from Dynasty Design System theme.css)
  success: "#00FF88",    // 准奏绿
  warning: "#FFDD00",    // 待审议黄
  reject: "#FF3366",     // 封驳红
  panelShadow: "0 0 60px rgba(201,169,110,0.1)",
  // 墨色文字
  textPrimary: "#E8D5A3",
  textSecondary: "rgba(201,169,110,0.5)",
  textMuted: "rgba(201,169,110,0.25)",
  // 金色点缀
  accent: "#C9A96E",
  accentBg: "rgba(201,169,110,0.12)",
  accentBorder: "rgba(201,169,110,0.3)",
  // 卷轴头部
  headerBg: "rgba(40,30,10,0.3)",
  headerBorder: "rgba(201,169,110,0.15)",
  // 竹简标签
  tabActiveBg: "rgba(201,169,110,0.15)",
  tabActiveText: "#C9A96E",
  tabInactiveText: "rgba(201,169,110,0.35)",
  // 砚台输入框
  inputBg: "rgba(20,15,8,0.6)",
  inputBorder: "rgba(201,169,110,0.2)",
  // 朱砂发送按钮
  btnSendGradient: "linear-gradient(135deg, #C0392B, #8B0000)",
  // 灯火闪烁
  typingDotColor: "#C9A96E",
  scrollbarClass: "hide-scrollbar",
  // 玉玺按钮
  floatBtnGradient: "linear-gradient(135deg, #C9A96E, #8B6914)",
  floatBtnShadow: "0 0 30px rgba(201,169,110,0.3)",
};

// ============================================================
// 主题选择器
// ============================================================

export function getTheme(mode: ThemeMode): ThemeTokens {
  return mode === "ancient" ? THEME_ANCIENT : THEME_MODERN;
}

const DEFAULT_THEME: Record<string, ThemeMode> = {
  "dynasty": "ancient",
  "ai-family": "modern",
  monitor: "modern",
  ops: "modern",
  ai: "modern",
  dev: "modern",
  admin: "modern",
  hub: "modern",
};

export function getSystemTheme(systemId: string): ThemeTokens {
  return getTheme(DEFAULT_THEME[systemId] ?? "modern");
}

// ============================================================
// AI Family 现代化设计增强
// ============================================================

export const AI_FAMILY_STYLES = {
  // 时钟环光晕
  clockRingGlow: (color: string) => `0 0 40px ${color}33, 0 0 80px ${color}11`,
  // 家人卡片悬浮
  personaHover: (color: string) => `0 0 20px ${color}44`,
  // 渐变背景
  bgGradient: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, rgba(4,8,20,1) 70%)",
} as const;

// ============================================================
// Dynasty 古文化风格增强
// ============================================================

export const DYNASTY_STYLES = {
  // 宣纸纹理
  parchmentBg: "linear-gradient(135deg, rgba(30,24,14,1) 0%, rgba(25,20,12,1) 50%, rgba(30,24,14,1) 100%)",
  // 卷轴边框
  scrollBorder: "rgba(201,169,110,0.15)",
  // 印章红
  sealRed: "#C0392B",
  // 水墨渐变
  inkGradient: "linear-gradient(180deg, rgba(201,169,110,0.04) 0%, rgba(4,8,20,1) 50%)",
  // 金色描边
  goldStroke: "1px solid rgba(201,169,110,0.2)",
  // 隶书标题
  sealHeading: {
    fontFamily: "'STKaiti', 'KaiTi', '楷体', serif",
    letterSpacing: "0.25em",
    fontWeight: 700,
  },
} as const;
