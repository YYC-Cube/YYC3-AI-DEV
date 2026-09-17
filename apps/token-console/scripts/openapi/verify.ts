/*
 * ============================================================
 * @Module : scripts/openapi/verify — CI 校验：类型与冻结契约一致
 * @Family-Owner : 🔮 预见·先知
 * ============================================================
 * 用途:
 *   pnpm openapi:verify
 *   在 CI 中检测开发者是否忘记执行 openapi:gen
 * ============================================================
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";

const ROOT = resolve(__dirname, "../..");
const OUT_FILE = resolve(ROOT, "domains/_shared/types.gen.ts");
const CACHE_FILE = resolve(ROOT, ".openapi-cache/openapi.json");

async function main() {
  console.log("🌹 校验类型文件新鲜度");

  if (!existsSync(OUT_FILE)) {
    console.error(`🚫 类型文件不存在: ${OUT_FILE}`);
    console.error(`   请执行: pnpm openapi:gen`);
    process.exit(1);
  }

  if (!existsSync(CACHE_FILE)) {
    console.error(`🚫 OpenAPI 缓存不存在`);
    console.error(`   请执行: pnpm openapi:gen`);
    process.exit(1);
  }

  // 用缓存重新生成到临时文件对比
  const tmpFile = resolve(ROOT, ".openapi-cache/types.verify.ts");
  const result = spawnSync(
    "npx",
    [
      "openapi-typescript",
      CACHE_FILE,
      "-o",
      tmpFile,
      "--immutable",
      "--alphabetize",
      "--root-types",
      "--root-types-no-schema-prefix",
    ],
    { stdio: "pipe" },
  );

  if (result.status !== 0) {
    console.error(`🚫 临时生成失败`);
    process.exit(1);
  }

  const generated = (await readFile(tmpFile, "utf-8")).trim();
  const existing = (await readFile(OUT_FILE, "utf-8"))
    .replace(/^\/\*[\s\S]*?\*\/\s*/m, "")
    .trim();

  if (generated !== existing) {
    console.error(`🚫 类型文件与当前契约不一致`);
    console.error(`   请执行: pnpm openapi:gen 并提交变更`);
    process.exit(1);
  }

  console.log(`✅ 类型文件与契约一致`);
}

main().catch((err) => {
  console.error(`🌹 异常:`, err);
  process.exit(1);
});
