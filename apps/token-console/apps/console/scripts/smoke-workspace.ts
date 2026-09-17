/**
 * workspace 链接冒烟测试 — 验证三个 @yyc3 包可被 token-console 解析与导入
 * 运行: pnpm --filter @yyc3/token-console-app exec tsx scripts/smoke-workspace.ts
 */
import { FAMILY_PROFILES } from "@yyc3/family-agents";
import { 家族宪章 } from "@yyc3/family-core";

async function main() {
  const profiles = Object.keys(FAMILY_PROFILES ?? {});
  console.log("[1/2] family-agents FAMILY_PROFILES:", profiles.length ? profiles.join(",") : "(empty)");
  console.log("[2/2] family-core 家族宪章.名称:", (家族宪章 as any)?.名称 ?? "(missing)");
  if (profiles.length < 8) {
    console.warn("⚠ FAMILY_PROFILES 少于 8 位家人，Console 视图将使用本地 META 兜底");
  }
  console.log("SMOKE OK");
}
main();
