/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : scripts/bundle/analyze — Turbopack 体积分析
 * @Family-Owner : 🎨 创想·灵韵
 * @用途 : pnpm bundle:analyze（生成 HTML + JSON 报告）
 * ============================================================
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { gzipSync } from "node:zlib";
import { BUNDLE_BUDGETS, TOTAL_BUDGET } from "../apps/console/bundle-budget";

const ROOT = resolve(__dirname, "../..");
const NEXT_DIR = resolve(ROOT, "apps/console/.next");
const OUT_DIR = resolve(ROOT, "reports/bundle");

function getGzipSize(file: string): number {
  const content = readFileSync(file);
  return gzipSync(content).length;
}

function findJSFiles(dir: string): string[] {
  const files: string[] = [];
  const walk = (d: string) => {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (entry.endsWith(".js") && !entry.endsWith(".map")) {
        files.push(full);
      }
    }
  };
  walk(dir);
  return files;
}

function main() {
  console.log("🌹 创想·灵韵 · 打包体积分析");
  console.log("   人从众曌众从人 · 妙笔生花\n");

  // 1. 运行 Turbopack 官方分析器
  console.log("🌹 运行 Turbopack Bundle Analyzer…");
  const analyze = spawnSync(
    "npx",
    ["next", "experimental-analyze", "--output"],
    { cwd: resolve(ROOT, "apps/console"), stdio: "inherit" },
  );

  if (analyze.status !== 0) {
    console.warn("⚠️ Turbopack 分析器运行失败，回退到手动统计");
  }

  // 2. 手动统计各 chunk
  const staticDir = join(NEXT_DIR, "static");
  const files = findJSFiles(staticDir);

  const chunks: { file: string; raw: number; gzip: number }[] = [];
  let totalRaw = 0;
  let totalGzip = 0;

  for (const f of files) {
    const raw = statSync(f).size;
    const gzip = getGzipSize(f);
    chunks.push({
      file: f.replace(NEXT_DIR, ""),
      raw,
      gzip,
    });
    totalRaw += raw;
    totalGzip += gzip;
  }

  chunks.sort((a, b) => b.gzip - a.gzip);

  // 3. 检查预算
  const totalGzipKB = totalGzip / 1024;
  const totalRawKB = totalRaw / 1024;

  const violations: string[] = [];

  if (totalGzipKB > TOTAL_BUDGET.maxGzip) {
    violations.push(
      `总 gzip ${totalGzipKB.toFixed(1)}KB 超过预算 ${TOTAL_BUDGET.maxGzip}KB`,
    );
  }
  if (totalRawKB > TOTAL_BUDGET.maxRaw) {
    violations.push(
      `总 raw ${totalRawKB.toFixed(1)}KB 超过预算 ${TOTAL_BUDGET.maxRaw}KB`,
    );
  }

  // 4. 生成报告
  mkdirSync(OUT_DIR, { recursive: true });

  const report = {
    timestamp: new Date().toISOString(),
    total: { raw: totalRawKB, gzip: totalGzipKB },
    budget: TOTAL_BUDGET,
    chunks: chunks.slice(0, 30),
    violations,
  };

  writeFileSync(
    resolve(OUT_DIR, "bundle-report.json"),
    JSON.stringify(report, null, 2),
  );

  // 5. Markdown 报告
  const lines: string[] = [];
  lines.push("# 🌹 打包体积报告");
  lines.push("");
  lines.push(`> ${new Date().toISOString()} · 创想·灵韵`);
  lines.push("");
  lines.push("## 总览");
  lines.push("");
  lines.push("| 指标 | 实际 | 预算 | 状态 |");
  lines.push("| --- | :-: | :-: | :-: |");
  lines.push(
    `| gzip 总 | **${totalGzipKB.toFixed(1)}KB** | ${TOTAL_BUDGET.maxGzip}KB | ${totalGzipKB <= TOTAL_BUDGET.maxGzip ? "✅" : "❌"} |`,
  );
  lines.push(
    `| raw 总 | **${totalRawKB.toFixed(1)}KB** | ${TOTAL_BUDGET.maxRaw}KB | ${totalRawKB <= TOTAL_BUDGET.maxRaw ? "✅" : "❌"} |`,
  );
  lines.push("");
  lines.push("## Top 20 Chunk");
  lines.push("");
  lines.push("| Chunk | gzip | raw |");
  lines.push("| --- | :-: | :-: |");
  for (const c of chunks.slice(0, 20)) {
    lines.push(
      `| \`${c.file.slice(-50)}\` | ${(c.gzip / 1024).toFixed(1)}KB | ${(c.raw / 1024).toFixed(1)}KB |`,
    );
  }
  lines.push("");
  if (violations.length) {
    lines.push("## ❌ 预算违规");
    lines.push("");
    for (const v of violations) lines.push(`- ${v}`);
  } else {
    lines.push("## ✅ 全部通过预算");
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("> 灵韵一至，妙笔生花 🌹");

  writeFileSync(resolve(OUT_DIR, "bundle-report.md"), lines.join("\n"));

  console.log(`\n📊 报告: ${OUT_DIR}/bundle-report.md`);
  console.log(`   gzip 总: ${totalGzipKB.toFixed(1)}KB / ${TOTAL_BUDGET.maxGzip}KB`);

  if (violations.length) {
    console.error(`\n🚫 ${violations.length} 项违规`);
    process.exit(1);
  }

  console.log(`\n✅ 全部通过`);
}

main();
