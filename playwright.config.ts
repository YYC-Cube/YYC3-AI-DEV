/**
 * @file: playwright.config.ts
 * @description: Playwright E2E 配置 — 同时启动 standalone-ai-family 与合并版开发服务器
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3112",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // E2E 跑构建产物而非 dev server，确保验证的是真实发布物
  webServer: [
    {
      command: "cd apps/standalone-ai-family && npx vite build && npx vite preview --port 3112 --strictPort",
      url: "http://localhost:3112",
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
    {
      command: "cd apps/full && npx vite build && npx vite preview --port 3100 --strictPort",
      url: "http://localhost:3100",
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
  ],
});
