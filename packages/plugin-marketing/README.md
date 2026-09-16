# @yyc3/plugin-marketing

> 🎏 节日营销 — 6类节日聚合 + 农历转换 + 营销动作触发

## 引擎

`FestivalEngine` + `LunarEngine`（纯函数，[src/](./src/)）：

- 6 类节日聚合（法定/传统/节气/行业/自创/国际）
- 农历-公历转换（LunarEngine）
- 营销动作自动触发

## 测试

```bash
npx vitest run packages/plugin-marketing/   # 41 tests ✅
```

- [festival-engine.test.ts](./festival-engine.test.ts) — 双引擎单元测试

## 注册

标准 `SystemRegistration` 注册（[register.ts](./src/register.ts)），id: `marketing`。
