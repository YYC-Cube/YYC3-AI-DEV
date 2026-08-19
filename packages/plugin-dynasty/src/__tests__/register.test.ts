import { describe, it, expect } from "vitest";
import { register } from "../register";

describe("Dynasty register()", () => {
  const sys = register();

  it("应返回有效 SystemRegistration", () => {
    expect(sys.id).toBe("dynasty");
    expect(sys.name).toBe("王朝治理");
    expect(sys.color).toBe("#C9A96E");
    expect(sys.order).toBe(35);
  });

  it("应有菜单项", () => {
    expect(sys.menuItems.length).toBeGreaterThanOrEqual(4);
    expect(sys.menuItems.some(m => m.label.includes("朝堂"))).toBe(true);
    expect(sys.menuItems.some(m => m.label.includes("勋章"))).toBe(true);
  });

  it("应有路由", () => {
    expect(sys.routes.length).toBeGreaterThanOrEqual(4);
  });

  it("应有 Hub 命令", () => {
    expect(sys.hubCommands).toBeDefined();
    expect(sys.hubCommands!.length).toBe(4);
  });
});
