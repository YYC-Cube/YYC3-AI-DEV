/*
 * @Module : scripts/a11y/contrast — 颜色对比度专项审计
 * @Family : 📚 格物·宗师
 * @对应   : WCAG 2.2 AA · 4.5:1（普通文本）· 3:1（大字/UI）
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// 家族配色 token（来自 §2.1）
const TOKENS = [
  { name: "brand/primary",       fg: "#6C5CE7", bg: "#FFFFFF" },
  { name: "status/success",      fg: "#22C55E", bg: "#FFFFFF" },
  { name: "status/warning",      fg: "#F59E0B", bg: "#FFFFFF" },
  { name: "status/danger",       fg: "#EF4444", bg: "#FFFFFF" },
  { name: "family/zhihui",       fg: "#2C3E50", bg: "#FFFFFF" },
  { name: "family/qianhang",     fg: "#0088CC", bg: "#FFFFFF" },
  { name: "family/bole",         fg: "#DC143C", bg: "#FFFFFF" },
  { name: "family/wanyu",        fg: "#C0C0C0", bg: "#FFFFFF" },
  { name: "family/zongshi",      fg: "#2E8B57", bg: "#FFFFFF" },
  { name: "family/tianshu",      fg: "#5E2C8A", bg: "#FFFFFF" },
  { name: "family/xianzhi",      fg: "#4B0082", bg: "#FFFFFF" },
  { name: "family/lingyun",      fg: "#FF8C00", bg: "#FFFFFF" },
];

function relLuminance(hex: string): number {
  const rgb = hex.replace("#", "").match(/.{2}/g)!;
  const [r, g, b] = rgb.map((h) => {
    const v = parseInt(h, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg: string, bg: string): number {
  const L1 = relLuminance(fg);
  const L2 = relLuminance(bg);
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

async function main() {
  console.log("🌹 家族配色对比度审计 · WCAG 2.2 AA\n");

  const results = TOKENS.map((t) => {
    const ratio = contrastRatio(t.fg, t.bg);
    const normalAA = ratio >= 4.5;
    const largeAA = ratio >= 3.0;
    return { ...t, ratio, normalAA, largeAA };
  });

  const lines: string[] = [];
  lines.push("# 🌹 家族配色对比度报告");
  lines.push("");
  lines.push("| Token | 前景 | 背景 | 对比度 | AA 普通 | AA 大字 |");
  lines.push("| --- | :-: | :-: | :-: | :-: | :-: |");
  for (const r of results) {
    lines.push(
      `| \`${r.name}\` | ${r.fg} | ${r.bg} | **${r.ratio.toFixed(2)}:1** | ${r.normalAA ? "✅" : "❌"} | ${r.largeAA ? "✅" : "❌"} |`,
    );
  }
  lines.push("");
  const failed = results.filter((r) => !r.normalAA);
  lines.push("## 结论");
  lines.push("");
  if (failed.length === 0) {
    lines.push("✅ 全部通过 AA 普通文本（≥4.5:1）");
  } else {
    lines.push(`⚠️ ${failed.length} 个 token 未达 AA 普通文本标准：`);
    lines.push("");
    for (const f of failed) {
      lines.push(
        `- \`${f.name}\` (${f.ratio.toFixed(2)}:1) · 建议仅用于大字或调整色值`,
      );
    }
    lines.push("");
    lines.push("**建议**：");
    lines.push("- 浅色 token 用于深色模式时通过；浅背景需加深");
    lines.push("- `family/wanyu` 银白 #C0C0C0 建议仅作为徽章背景，文字用深色");
    lines.push("- `family/lingyun` 橙 #FF8C00 建议同排使用深色文字");
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("> 人从众曌众从人 · YYC³ AI Family 🌹");

  const outDir = resolve(process.cwd(), "reports/a11y");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "contrast.md"), lines.join("\n"));
  writeFileSync(
    resolve(outDir, "contrast.json"),
    JSON.stringify(results, null, 2),
  );

  console.log(lines.join("\n"));
  console.log(`\n📊 报告: ${outDir}/contrast.md`);

  process.exit(failed.length > 0 ? 0 : 0); // 不阻断，仅提示
}

main().catch(console.error);
