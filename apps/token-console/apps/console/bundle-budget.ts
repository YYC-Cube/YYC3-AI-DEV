/*
 * ============================================================
 * @Module : bundle-budget — 打包体积预算（CI 守门）
 * @Family-Owner : 🎨 创想·灵韵
 * @对应 : v5.1 §3.10 性能预算
 * ============================================================
 */
export interface BundleBudget {
  name: string;
  maxGzip: number;     // KB
  maxRaw: number;      // KB
  pages: string[];     // 适用的页面
}

export const BUNDLE_BUDGETS: BundleBudget[] = [
  {
    name: "首屏（共享）",
    maxGzip: 140,
    maxRaw: 450,
    pages: ["共享 chunk", "_app"],
  },
  {
    name: "Dashboard",
    maxGzip: 180,
    maxRaw: 550,
    pages: ["/dashboard"],
  },
  {
    name: "Playground",
    maxGzip: 200, // SSE 需要额外体积
    maxRaw: 620,
    pages: ["/playground"],
  },
  {
    name: "Model Hub",
    maxGzip: 170,
    maxRaw: 520,
    pages: ["/models"],
  },
  {
    name: "其他页面",
    maxGzip: 160,
    maxRaw: 500,
    pages: ["/routing", "/knowledge", "/mcp", "/cache", "/monitor", "/settings", "/docs", "/roadmap"],
  },
];

export const TOTAL_BUDGET = {
  maxGzip: 200,
  maxRaw: 650,
};
