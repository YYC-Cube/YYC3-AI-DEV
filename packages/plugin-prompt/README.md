# @yyc3/plugin-prompt

> 📝 提示词库 — 15 个业务 Prompt 模板 + 8 位家人映射

## 引擎

`BusinessPrompts`（纯数据 + 纯函数，[src/](./src/)）：

- 15+ 业务场景 Prompt 模板
- 与 AI Family 8 位家人人格一一映射
- 变量插值与上下文拼装

## 测试

```bash
npx vitest run packages/plugin-prompt/   # 19 tests ✅
```

- [business-prompts.test.ts](./business-prompts.test.ts) — 模板完整性测试

## 注册

标准 `SystemRegistration` 注册（[register.ts](./src/register.ts)），id: `prompt`。
