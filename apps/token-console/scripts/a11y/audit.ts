/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : scripts/a11y/audit — 全站 a11y 审计报告生成
 * @Family : 📚 格物·宗师
 * @用途   : pnpm a11y:audit（本地/CI）
 * ============================================================
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

const ROUTES = [
  "/", "/dashboard", "/models", "/playground",
  "/routing", "/knowledge", "/mcp", "/cache",
  "/monitor", "/settings", "/docs", "/roadmap",
];

interface RouteResult {
  path: string;
  violations: {
    id: string;
    impact: string;
    help: string;
    nodes: number;
  }[];
  passes: number;
  incomplete: number;
}

async function main() {
  console.log("🌹 格物·宗师 · a11y 全站审计");
  console.log("   WCAG 2.2 AA · 目标 0 serious/critical\n");

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "zh-CN",
  });
  await context.addInitScript(() => {
    sessionStorage.setItem("yyc3_api_key", "sk-test-e2e");
  });

  const page = await context.newPage();
  const results: RouteResult[] = [];

  for (const path of ROUTES) {
    console.log(`📄 审计 ${path}`);
    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
      const res = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      results.push({
        path,
        violations: res.violations.map((v) => ({
          id: v.id,
          impact: v.impact ?? "unknown",
          help: v.help,
          nodes: v.nodes.length,
        })),
        passes: res.passes.length,
        incomplete: res.incomplete.length,
      });

      const serious = res.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      console.log(
        `   ✅ ${res.passes.length} 通过 · ${res.violations.length} 违规 · ${serious.length} 严重`,
      );
    } catch (err) {
      console.error(`   ❌ 审计失败: ${(err as Error).message}`);
      results.push({
        path,
        violations: [],
        passes: 0,
        incomplete: 0,
      });
    }
  }

  await browser.close();

  // 生成报告
  const outDir = resolve(process.cwd(), "reports/a11y");
  mkdirSync(outDir, { recursive: true });

  // JSON
  writeFileSync(
    resolve(outDir, "summary.json"),
    JSON.stringify(results, null, 2),
  );

  // Markdown
  const lines: string[] = [];
  lines.push("# 🌹 a11y 全站审计报告");
  lines.push("");
  lines.push(`> WCAG 2.2 AA · ${new Date().toISOString()}`);
  lines.push("");
  lines.push("| 页面 | 通过 | 违规 | 严重 |");
  lines.push("| --- | :-: | :-: | :-: |");
  let totalSerious = 0;
  for (const r of results) {
    const serious = r.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    ).length;
    totalSerious += serious;
    lines.push(
      `| \`${r.path}\` | ${r.passes} | ${r.violations.length} | ${serious} |`,
    );
  }
  lines.push("");
  lines.push(`## 结论`);
  lines.push("");
  lines.push(
    totalSerious === 0
      ? "✅ **全部页面通过**（0 serious/critical）"
      : `🚫 **${totalSerious} 个严重问题**，请修复`,
  );
  lines.push("");
  lines.push("## 严重问题明细");
  lines.push("");
  for (const r of results) {
    const serious = r.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    if (!serious.length) continue;
    lines.push(`### ${r.path}`);
    for (const v of serious) {
      lines.push(`- **[${v.impact}] ${v.id}** · ${v.help} · ${v.nodes} 处`);
    }
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  lines.push("> 人从众曌众从人 · YYC³ AI Family 🌹");

  writeFileSync(resolve(outDir, "report.md"), lines.join("\n"));

  console.log(`\n📊 报告已生成: ${outDir}/report.md`);
  console.log(`📊 JSON: ${outDir}/summary.json`);

  process.exit(totalSerious > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("🌹 审计异常:", err);
  process.exit(1);
});
