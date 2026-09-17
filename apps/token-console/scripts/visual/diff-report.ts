/*
 * ============================================================
 * @Module : scripts/visual/diff-report — 视觉差异 Markdown 报告
 * @Family-Owner : 🎨 创想·灵韵
 * ============================================================
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";

const ROOT = resolve(__dirname, "../..");
const RESULTS_FILE = resolve(ROOT, "e2e/reports/visual/results.json");
const OUT_DIR = resolve(ROOT, "reports/visual");
const OUT_FILE = resolve(OUT_DIR, "diff-report.md");

interface TestResult {
  title: string;
  status: "passed" | "failed" | "skipped" | "timedOut";
  attachments: { name: string; path: string; contentType: string }[];
}

interface Report {
  suites: Array<{
    title: string;
    specs: Array<{ title: string; tests: TestResult[] }>;
  }>;
}

function main() {
  if (!existsSync(RESULTS_FILE)) {
    console.warn("🌹 未找到结果文件，跳过报告生成");
    return;
  }

  const report: Report = JSON.parse(readFileSync(RESULTS_FILE, "utf-8"));

  const lines: string[] = [];
  lines.push("# 🎨 YYC³ AI Family · 视觉回归报告");
  lines.push("");
  lines.push(`> 生成于 ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## 摘要");
  lines.push("");

  let total = 0, passed = 0, failed = 0;
  const failedTests: TestResult[] = [];

  for (const suite of report.suites) {
    for (const spec of suite.specs) {
      for (const test of spec.tests) {
        total++;
        if (test.status === "passed") passed++;
        else {
          failed++;
          failedTests.push(test);
        }
      }
    }
  }

  lines.push(`- **总数**: ${total}`);
  lines.push(`- ✅ **通过**: ${passed}`);
  lines.push(`- ❌ **失败**: ${failed}`);
  lines.push(`- **通过率**: ${((passed / total) * 100).toFixed(2)}%`);
  lines.push("");

  if (failedTests.length > 0) {
    lines.push("## 失败明细");
    lines.push("");
    lines.push("| 用例 | 状态 | 差异截图 |");
    lines.push("| --- | :-: | --- |");
    for (const t of failedTests) {
      const diff = t.attachments.find((a) => a.name === "diff");
      const diffPath = diff?.path?.split("/").slice(-2).join("/") ?? "-";
      lines.push(`| ${t.title} | ${t.status} | \`${diffPath}\` |`);
    }
  } else {
    lines.push("## ✅ 全部通过");
    lines.push("");
    lines.push("所有视觉基线与当前渲染一致。");
  }

  lines.push("");
  lines.push("## 更新基线");
  lines.push("");
  lines.push("若差异为预期变更，请执行：");
  lines.push("");
  lines.push("```bash");
  lines.push("./scripts/visual/update.sh");
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("> 人从众曌众从人 · YYC³ AI Family 🌹");

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, lines.join("\n"));
  console.log(`✅ 报告: ${OUT_FILE}`);
}

main();
