/**
 * @file: boundaries.test.ts
 * @description: 工作区依赖边界守卫 — 防止幻影声明回潮与架构分层退化
 *
 * 背景: plugin-llm 曾在 manifest 声明 @yyc3/shell peer 但代码零引用，
 * 造成 pnpm 报 cyclic workspace dependencies（幻影循环）。
 * 本套测试以源码扫描方式固化依赖边界，违规即测试失败。
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "../../../..");
const PACKAGES_DIR = join(ROOT, "packages");

/** 递归收集目录下所有源码文件 */
function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "__tests__" || name === "node_modules") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      collectSourceFiles(full, acc);
    } else if (/\.(ts|tsx)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

/** 提取文件中导入的 @yyc3/* 包名 */
function extractWorkspaceImports(file: string): string[] {
  const content = readFileSync(file, "utf-8");
  const matches = content.matchAll(/(?:from|require\(|import\()\s*["'](@yyc3\/[\w-]+)["']/g);
  return [...matches].map(m => m[1]);
}

function getPackageJson(pkg: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(PACKAGES_DIR, pkg, "package.json"), "utf-8"));
}

function getPeerDeps(pkg: string): string[] {
  const peers = getPackageJson(pkg).peerDependencies as Record<string, string> | undefined;
  return Object.keys(peers ?? {});
}

describe("工作区依赖边界守卫", () => {
  it("plugin-llm 不得依赖 @yyc3/shell（保持纯适配层，避免幻影循环）", () => {
    const files = collectSourceFiles(join(PACKAGES_DIR, "plugin-llm/src"));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const imports = extractWorkspaceImports(file);
      expect(imports, `${file} 引用了 ${imports.filter(i => i === "@yyc3/shell").join(",")}`).not.toContain("@yyc3/shell");
    }

    // manifest 也不得声明（幻影 peer 防回潮）
    expect(getPeerDeps("plugin-llm")).not.toContain("@yyc3/shell");
  });

  it("plugin-llm 为纯逻辑层，不得依赖 react", () => {
    const files = collectSourceFiles(join(PACKAGES_DIR, "plugin-llm/src"));
    for (const file of files) {
      expect(readFileSync(file, "utf-8"), `${file} 引用了 react`).not.toMatch(/from ["']react["']/);
    }
    expect(getPeerDeps("plugin-llm")).not.toContain("react");
  });

  it("所有插件包：manifest peer 声明必须与真实代码导入一致（幻影 peer 防回潮）", () => {
    const pluginPkgs = readdirSync(PACKAGES_DIR).filter(name => {
      if (!name.startsWith("plugin-")) return false;
      return statSync(join(PACKAGES_DIR, name)).isDirectory();
    });

    for (const pkg of pluginPkgs) {
      const files = collectSourceFiles(join(PACKAGES_DIR, pkg, "src"));
      const realImports = new Set(files.flatMap(f => extractWorkspaceImports(f)));
      const declaredPeers = getPeerDeps(pkg).filter(p => p.startsWith("@yyc3/"));

      for (const peer of declaredPeers) {
        expect(
          realImports.has(peer),
          `${pkg} 声明了 peer "${peer}" 但 src/ 无任何导入 — 幻影声明，请删除或补齐用途`
        ).toBe(true);
      }
    }
  });

  it("插件不得反向依赖 shell 内部模块路径（只能走包入口）", () => {
    const pluginPkgs = readdirSync(PACKAGES_DIR).filter(name => name.startsWith("plugin-"));
    for (const pkg of pluginPkgs) {
      const files = collectSourceFiles(join(PACKAGES_DIR, pkg, "src"));
      for (const file of files) {
        const imports = extractWorkspaceImports(file);
        // 包内导入只能是裸包名，不允许 @yyc3/shell/src/xxx 这类深路径
        for (const imp of imports) {
          expect(imp, `${file} 使用了深路径导入`).not.toMatch(/\/src\//);
        }
      }
    }
  });
});
