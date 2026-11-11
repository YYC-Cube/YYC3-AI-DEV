/**
 * @file: full-app.spec.ts
 * @description: 合并版回归 — 欢迎页 → 系统卡片 → 王朝治理子路由（P0-04 防线）
 */
import { test, expect } from "@playwright/test";

const FULL_APP = "http://localhost:3100";

test.describe("合并版 · 系统路由", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto(`${FULL_APP}/`);
    await page.getByRole("button", { name: /进入系统/ }).click();
  });

  test("欢迎页关闭后应渲染 7 个系统入口", async ({ page }) => {
    for (const name of ["监控中心", "运维管理", "AI 智能", "AI Family", "王朝治理", "开发工具", "系统管理"]) {
      await expect(page.getByRole("link", { name: new RegExp(name) }).first()).toBeVisible();
    }
  });

  test("点击王朝治理应渲染朝堂而非空白", async ({ page }) => {
    await page.getByRole("link", { name: /王朝治理/ }).first().click();
    await expect(page).toHaveURL(/#\/dynasty$/);
    await expect(page.getByRole("heading", { name: /朝\s*堂/ })).toBeVisible();
  });

  test("深链 #/dynasty/edict 应直达旨意板", async ({ page }) => {
    await page.goto(`${FULL_APP}/#/dynasty/edict`);
    await expect(page.getByRole("heading", { name: /旨\s*意\s*板/ })).toBeVisible();
  });

  test("未知系统路由不应导致白屏崩溃", async ({ page }) => {
    await page.goto(`${FULL_APP}/#/not-exist`);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("设计系统页应展示组件库", async ({ page }) => {
    await page.goto(`${FULL_APP}/#/design`);
    await expect(page.getByRole("heading", { name: /Design System/ })).toBeVisible();
    await expect(page.getByRole("tab", { name: "按钮" })).toBeVisible();
    await expect(page.getByRole("button", { name: "default" }).first()).toBeVisible();
  });

  test("AI Family 工作台应展示四个视图", async ({ page }) => {
    await page.goto(`${FULL_APP}/#/family`);
    await expect(page.getByRole("heading", { name: /AI Family 工作台/ })).toBeVisible();
    for (const name of ["成员", "对话", "技能", "设置"]) {
      await expect(page.getByRole("tab", { name })).toBeVisible();
    }
  });

  test("中枢浮窗应固定定位，不占据文档流", async ({ page }) => {
    const hub = page.locator("button.fixed").first();
    await expect(hub).toBeVisible();
    await expect
      .poll(async () => hub.evaluate((el) => getComputedStyle(el).position))
      .toBe("fixed");
  });

  test("首屏卡片区应水平居中（mx-auto 生效）", async ({ page }) => {
    const grid = page.locator(".mx-auto").first();
    const box = await grid.boundingBox();
    const viewport = page.viewportSize()!;
    expect(box).not.toBeNull();
    const leftGap = box!.x;
    const rightGap = viewport.width - (box!.x + box!.width);
    expect(Math.abs(leftGap - rightGap)).toBeLessThan(2);
  });
});
