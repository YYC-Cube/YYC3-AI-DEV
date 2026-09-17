/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : scripts/contract/check — CI 契约漂移检测主入口
 * @Family : 🔮 预见·先知
 * @用途   : pnpm contract:check（CI 中阻断 PR）
 * ============================================================
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { sha256Canonical, sha256String } from "./hash";
import { extractContract } from "./schema-extract";
import { diffContracts } from "./diff";
import { printDiffReport } from "./report";

const ROOT = resolve(__dirname, "../..");
const HASH_FILE = resolve(ROOT, ".contract-hash");
const SNAPSHOT_FILE = resolve(ROOT, ".contract-snapshot.json");
const OPENAPI_URL =
  process.env.OPENAPI_URL ?? "https://api.0379.world/openapi.json";
const TIMEOUT_MS = 15_000;

async function fetchOpenApi(): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(OPENAPI_URL, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`拉取 openapi.json 失败：HTTP ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const strict = process.argv.includes("--strict");
  const writeSnapshot = process.argv.includes("--write-snapshot");

  console.log("🌹 契约漂移检测启动 · 人从众曌众从人");
  console.log(`   URL: ${OPENAPI_URL}`);

  // 1. 拉取最新
  let fresh: any;
  try {
    fresh = await fetchOpenApi();
  } catch (err) {
    console.error(`🌹 网络不可达，跳过检测：${(err as Error).message}`);
    process.exit(0); // 网络问题不阻断 CI
  }

  // 2. 计算当前哈希（规范化 JSON）
  const freshHash = sha256Canonical(fresh);
  console.log(`   当前哈希: ${freshHash.slice(0, 16)}…`);

  // 3. 读取冻结哈希
  let frozenHash = "";
  if (existsSync(HASH_FILE)) {
    frozenHash = (await readFile(HASH_FILE, "utf-8")).trim();
    console.log(`   冻结哈希: ${frozenHash.slice(0, 16)}…`);
  } else {
    console.warn("🌹 未找到 .contract-hash，视为首次冻结");
  }

  // 4. 哈希一致 → 通过
  if (frozenHash === freshHash) {
    console.log("✅ 契约未漂移，无需处理");
    process.exit(0);
  }

  // 5. 哈希不一致 → 字段级 diff
  console.log("\n⚠️  检测到契约差异，执行字段级分析…\n");
  const freshC = extractContract(fresh);

  let oldC = freshC;
  if (existsSync(SNAPSHOT_FILE)) {
    const oldSnapshot = JSON.parse(await readFile(SNAPSHOT_FILE, "utf-8"));
    oldC = extractContract(oldSnapshot);
  } else {
    console.warn("🌹 未找到 .contract-snapshot.json，无法做字段级 diff");
    console.warn("   建议执行: pnpm contract:freeze --write-snapshot\n");
  }

  const diff = diffContracts(oldC, freshC);
  printDiffReport(diff);

  // 6. 写回快照（可选）
  if (writeSnapshot) {
    await writeFile(SNAPSHOT_FILE, JSON.stringify(fresh, null, 2));
    console.log(`\n🌹 已写入新快照: ${SNAPSHOT_FILE}`);
  }

  // 7. 决定退出码
  if (strict && diff.hasChanges) {
    console.error(
      "\n🚫 契约漂移（--strict），请人工复核 §1 冻结快照并更新 .contract-hash",
    );
    process.exit(1);
  }

  console.log("\n💡 更新冻结请执行: pnpm contract:freeze");
  process.exit(0);
}

main().catch((err) => {
  console.error("🌹 检测脚本异常:", err);
  process.exit(1);
});
