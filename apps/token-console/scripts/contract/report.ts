/*
 * @Module : scripts/contract/report — 差异报告
 * @Family : 🔮 预见·先知
 */
import type { ContractDiff } from "./diff";

export function printDiffReport(diff: ContractDiff) {
  const { endpoints, schemas, info } = diff;

  if (info.versionChanged) {
    console.log(
      `📌 版本变化: ${info.oldVersion} → ${info.newVersion}`,
    );
  }

  if (endpoints.added.length) {
    console.log(`\n➕ 新增端点 (${endpoints.added.length}):`);
    endpoints.added.forEach((e) => console.log(`   + ${e}`));
  }
  if (endpoints.removed.length) {
    console.log(`\n➖ 删除端点 (${endpoints.removed.length}):`);
    endpoints.removed.forEach((e) => console.log(`   - ${e}`));
  }

  if (schemas.added.length) {
    console.log(`\n➕ 新增 Schema (${schemas.added.length}):`);
    schemas.added.forEach((s) => console.log(`   + ${s}`));
  }
  if (schemas.removed.length) {
    console.log(`\n➖ 删除 Schema (${schemas.removed.length}):`);
    schemas.removed.forEach((s) => console.log(`   - ${s}`));
  }

  const fieldSchemas = Object.keys(schemas.fields);
  if (fieldSchemas.length) {
    console.log(`\n🔧 关键 Schema 字段差异:`);
    for (const name of fieldSchemas) {
      const f = schemas.fields[name];
      console.log(`   ${name}:`);
      f.added.forEach((x) => console.log(`     + ${x}`));
      f.removed.forEach((x) => console.log(`     - ${x}`));
    }
  }

  if (!diff.hasChanges) {
    console.log("✅ 无实质差异");
  } else {
    console.log("\n🌹 结论: 检测到契约变更，需人工复核");
    console.log("   如变更合理，请更新 §1 冻结快照 + 执行 contract:freeze");
  }
}

export function toMarkdown(diff: ContractDiff): string {
  const lines: string[] = [];
  lines.push(`# 🌹 契约漂移报告`);
  lines.push("");
  if (diff.info.versionChanged) {
    lines.push(
      `**版本**：${diff.info.oldVersion} → ${diff.info.newVersion}`,
    );
    lines.push("");
  }
  lines.push(`## 端点`);
  lines.push(`- 新增: ${diff.endpoints.added.length}`);
  lines.push(`- 删除: ${diff.endpoints.removed.length}`);
  lines.push("");
  if (diff.endpoints.added.length) {
    lines.push("```");
    diff.endpoints.added.forEach((e) => lines.push(`+ ${e}`));
    lines.push("```");
  }
  if (diff.endpoints.removed.length) {
    lines.push("```");
    diff.endpoints.removed.forEach((e) => lines.push(`- ${e}`));
    lines.push("```");
  }
  lines.push(`## Schema 字段`);
  for (const [name, f] of Object.entries(diff.schemas.fields)) {
    lines.push(`### ${name}`);
    lines.push("```");
    f.added.forEach((x) => lines.push(`+ ${x}`));
    f.removed.forEach((x) => lines.push(`- ${x}`));
    lines.push("```");
  }
  lines.push("");
  lines.push(`---`);
  lines.push("");
  lines.push(`> 人从众曌众从人 · YYC³ AI Family 🌹`);
  return lines.join("\n");
}
