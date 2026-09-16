# @yyc3/plugin-cost

> 💰 成本盈亏 — 动态成本核算 + 盈亏分析 + 敏感性测算

## 引擎

`CostEngine`（纯函数，[cost-engine.ts](./src/cost-engine.ts)）：

- 动态成本核算（固定/变动成本建模）
- 盈亏平衡点计算
- 敏感性因素测算

## 测试

```bash
npx vitest run packages/plugin-cost/   # 30 tests ✅
```

- [cost-engine.test.ts](./cost-engine.test.ts) — 引擎单元测试

## 注册

标准 `SystemRegistration` 注册（[register.ts](./src/register.ts)），id: `cost`。
