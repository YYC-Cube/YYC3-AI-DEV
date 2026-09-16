#!/usr/bin/env node
/**
 * @file: validate-docs.js
 * @description: 文档完整性门禁 — 校验核心文档存在性 + Markdown 相对链接有效性
 *
 * 用途: CI (ecosystem-check job) 与本地 `node validate-docs.js`
 * 规则: 仅校验仓库核心文档体系；链接检查覆盖 README.md + docs/（跳过归档类 HTML 锚点）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
let errors = 0;
const err = (msg) => { console.error(`❌ ${msg}`); errors++; };
const ok = (msg) => console.log(`✅ ${msg}`);

// ---- 1. 核心文档存在性 ----
const REQUIRED = [
  "README.md",
  "docs/AI-Dev/README.md",
  "docs/AI-Dev/ARCHITECTURE.md",
  "docs/AI-Dev/AIAssistant/README.md",
  "docs/AI-Dev/developer/README.md",
  "docs/AI-Dev/developer/01-快速入门.md",
  "docs/AI-Dev/developer/02-架构总纲.md",
  "docs/AI-Dev/developer/03-插件开发指南.md",
  "docs/AI-Dev/developer/04-编码规范.md",
  "docs/AI-Dev/developer/05-测试策略.md",
  "docs/AI-Dev/developer/06-部署运维.md",
  "docs/AI-Dev/developer/07-安全合规.md",
  "packages/README.md",
  "apps/README.md",
];
for (const rel of REQUIRED) {
  if (fs.existsSync(path.join(ROOT, rel))) ok(rel);
  else err(`核心文档缺失: ${rel}`);
}

// ---- 2. 插件 README 全覆盖 ----
const pkgsDir = path.join(ROOT, "packages");
for (const name of fs.readdirSync(pkgsDir)) {
  const full = path.join(pkgsDir, name);
  if (fs.statSync(full).isDirectory() && !fs.existsSync(path.join(full, "README.md"))) {
    err(`插件缺 README: packages/${name}/`);
  }
}
ok("插件 README 覆盖检查完成");

// ---- 3. Markdown 相对链接有效性（README + docs/，跳过外链与锚点）----
let checked = 0;
function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    if (f === "node_modules" || f === ".git" || f === "dist") continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (f.endsWith(".md")) acc.push(full);
  }
  return acc;
}
const mdFiles = [path.join(ROOT, "README.md"), ...walk(path.join(ROOT, "docs"))];
for (const file of mdFiles) {
  if (!fs.existsSync(file)) continue;
  const base = path.dirname(file);
  const content = fs.readFileSync(file, "utf-8");
  for (const m of content.matchAll(/\[[^\]]*\]\(([^)#]+?)(#[^)]*)?\)/g)) {
    const link = m[1].trim();
    if (!link || /^(https?:|mailto:)/.test(link)) continue;
    checked++;
    if (!fs.existsSync(path.resolve(base, link))) {
      err(`坏链 [${path.relative(ROOT, file)}] → ${link}`);
    }
  }
}
ok(`链接检查完成: ${checked} 条相对链接`);

// ---- 结果 ----
if (errors > 0) {
  console.error(`\n💥 文档门禁失败: ${errors} 个问题`);
  process.exit(1);
}
console.log("\n🎉 文档完整性检查全部通过");
