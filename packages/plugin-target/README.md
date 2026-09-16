# @yyc3/plugin-target

> 🎯 目标量化 — 年度营收X公式 + 三阶段拆分 + 月度节点

## 引擎

`TargetEngine`（纯函数，[target-engine.ts](./src/target-engine.ts)）：

- 年度营收 X 公式推演
- 三阶段目标拆分（Q1 启动 / Q2-Q3 增长 / Q4 冲刺）
- 月度节点量化追踪

## 测试

```bash
npx vitest run packages/plugin-target/   # 27 tests ✅
```

- [target-engine.test.ts](./target-engine.test.ts) — 引擎单元测试
- [engine-integration.test.ts](./engine-integration.test.ts) — 集成测试

## 注册

标准 `SystemRegistration` 注册（[register.ts](./src/register.ts)），id: `target`。
