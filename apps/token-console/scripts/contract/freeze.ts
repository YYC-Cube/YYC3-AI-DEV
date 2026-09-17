/*
 * @Module : scripts/contract/freeze — 刷新冻结哈希与快照
 * @Family : 🔮 预见·先知
 * @用途   : 人工确认契约变更后执行
 */
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { sha256Canonical } from "./hash";

const ROOT = resolve(__dirname, "../..");
const HASH_FILE = resolve(ROOT, ".contract-hash");
const SNAPSHOT_FILE = resolve(ROOT, ".contract-snapshot.json");
const OPENAPI_URL =
  process.env.OPENAPI_URL ?? "https://api.0379.world/openapi.json";

async function main() {
  console.log("🌹 契约冻结刷新 · 人从众曌众从人");

  const res = await fetch(OPENAPI_URL);
  if (!res.ok) {
    console.error(`🌹 拉取失败: HTTP ${res.status}`);
    process.exit(1);
  }
  const openapi = await res.json();

  const hash = sha256Canonical(openapi);
  await writeFile(HASH_FILE, hash + "\n");
  await writeFile(SNAPSHOT_FILE, JSON.stringify(openapi, null, 2));

  console.log(`✅ 冻结完成`);
  console.log(`   哈希: ${hash}`);
  console.log(`   文件: ${HASH_FILE}`);
  console.log(`   快照: ${SNAPSHOT_FILE}`);
  console.log("");
  console.log(`🌹 请同步更新 §1 冻结快照并提交到仓库`);
}

main().catch((err) => {
  console.error("🌹 冻结失败:", err);
  process.exit(1);
});
