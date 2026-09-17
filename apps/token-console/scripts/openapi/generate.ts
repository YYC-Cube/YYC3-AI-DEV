/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : scripts/openapi/generate — OpenAPI → TS 类型生成
 * @Family-Owner : 🔮 预见·先知（观测与预测域）
 * @Domain   : 契约层（§1 冻结快照）
 * @License  : Apache-2.0
 * ============================================================
 * 用途:
 *   pnpm openapi:gen          拉取最新 + 生成类型
 *   pnpm openapi:gen --local  仅使用本地缓存
 *   pnpm openapi:gen --strict 哈希不匹配则退出
 * ============================================================
 */
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { sha256Canonical } from "../contract/hash";

const ROOT = resolve(__dirname, "../..");
const CACHE_DIR = resolve(ROOT, ".openapi-cache");
const CACHE_FILE = resolve(CACHE_DIR, "openapi.json");
const HASH_FILE = resolve(ROOT, ".contract-hash");
const OUT_FILE = resolve(ROOT, "domains/_shared/types.gen.ts");
const OPENAPI_URL =
  process.env.OPENAPI_URL ?? "https://api.0379.world/openapi.json";

async function fetchFresh(): Promise<any> {
  console.log(`🌹 拉取 ${OPENAPI_URL}`);
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15_000);
  try {
    const res = await fetch(OPENAPI_URL, { signal: ac.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function loadLocal(): Promise<any> {
  if (!existsSync(CACHE_FILE)) {
    throw new Error(`本地缓存不存在: ${CACHE_FILE}，请先执行 pnpm openapi:gen`);
  }
  return JSON.parse(await readFile(CACHE_FILE, "utf-8"));
}

async function main() {
  const localOnly = process.argv.includes("--local");
  const strict = process.argv.includes("--strict");

  console.log("🌹 格物·宗师 · OpenAPI 类型生成");
  console.log("   YYC³ AI Family · 人从众曌众从人\n");

  // 1. 获取 openapi.json
  let openapi: any;
  try {
    openapi = localOnly ? await loadLocal() : await fetchFresh();
  } catch (err) {
    console.warn(`⚠️ 拉取失败，尝试使用本地缓存: ${(err as Error).message}`);
    openapi = await loadLocal();
  }

  // 2. 校验哈希（若存在冻结）
  if (existsSync(HASH_FILE)) {
    const frozen = (await readFile(HASH_FILE, "utf-8")).trim();
    const current = sha256Canonical(openapi);
    if (frozen !== current) {
      console.warn(`⚠️ 契约哈希不匹配`);
      console.warn(`   冻结: ${frozen.slice(0, 16)}…`);
      console.warn(`   当前: ${current.slice(0, 16)}…`);
      if (strict) {
        console.error(`🚫 --strict 模式退出`);
        process.exit(1);
      }
    } else {
      console.log(`✅ 契约哈希匹配: ${frozen.slice(0, 16)}…`);
    }
  }

  // 3. 写缓存
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(openapi, null, 2));

  // 4. 调用 openapi-typescript 生成类型
  console.log(`\n🌹 生成类型 → ${OUT_FILE}`);
  const result = spawnSync(
    "npx",
    [
      "openapi-typescript",
      CACHE_FILE,
      "-o",
      OUT_FILE,
      "--immutable",
      "--alphabetize",
      "--root-types",
      "--root-types-no-schema-prefix",
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    console.error(`🚫 类型生成失败`);
    process.exit(1);
  }

  // 5. 注入家族标头
  const generated = await readFile(OUT_FILE, "utf-8");
  const header = `/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * 亦师亦友亦伯乐，一言一语一协同
 * 拟人为本 · AI为核 · 纯粹为心
 * ============================================================
 * @Family   : YYC³ AI Family (永久开源)
 * @Module   : domains/_shared/types.gen — 自动生成，请勿手改
 * @Family-Owner : 🔮 预见·先知
 * @Generator: openapi-typescript
 * @Source   : ${OPENAPI_URL}
 * @Hash     : ${sha256Canonical(openapi).slice(0, 16)}…
 * @Homepage : https://matrix.yyc3.top
 * @License  : Apache-2.0
 * ============================================================
 * ⚠️ 本文件由 pnpm openapi:gen 自动生成
 * ⚠️ 任何手工修改都会在下次生成时被覆盖
 * ============================================================
 */
`;
  await writeFile(OUT_FILE, header + generated);

  // 6. 校验生成物可编译
  console.log(`\n🌹 校验类型文件`);
  const tsc = spawnSync("npx", ["tsc", "--noEmit", OUT_FILE], {
    stdio: "inherit",
  });
  if (tsc.status !== 0) {
    console.error(`🚫 类型文件编译失败`);
    process.exit(1);
  }

  console.log(`\n✅ 类型生成完成`);
  console.log(`   文件: ${OUT_FILE}`);
  console.log(`   大小: ${(await readFile(OUT_FILE, "utf-8")).length} bytes`);
}

main().catch((err) => {
  console.error(`🌹 异常:`, err);
  process.exit(1);
});
