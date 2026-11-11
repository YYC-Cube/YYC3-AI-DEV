/**
 * @file: eslint.config.js
 * @description: YYC³ 工作区 ESLint 扁平配置 — TS/React 基础规则 + Hooks 约束
 *
 * 约定:
 * - 错误（error）阻断 CI，告警（warn）仅提示，不阻断
 * - token-console 为独立 Next.js 子工作区，由其自身 eslint 配置接管
 * - docs/ 与构建产物不参与检查
 */
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const hooksRules =
  reactHooks.configs?.recommended?.rules ??
  reactHooks.configs?.["recommended-latest"]?.rules ??
  {};

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.next/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "apps/token-console/**",
      "docs/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...hooksRules,
      // 挂载后异步拉取配置再 setState 属既有模式，降级为告警而不阻断
      "react-hooks/set-state-in-effect": "warn",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-empty-function": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
    },
  },
);
