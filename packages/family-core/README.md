# @yyc3/family-core

> 🧬 AI Family 内核 — 家族协作生命周期与生态治理（纯逻辑层）

## 模块

- 家族成员生命周期（加入/协作/解散）
- 生态健康度治理与一致性校验
- `ecosystem.test.ts` 守卫 8 位家人生态完整性

## 测试

```bash
npx vitest run packages/family-core/   # 8 tests ✅
```

- [ecosystem.test.ts](./ecosystem.test.ts)（包根）— 生态完整性守卫

## 消费方

`family-agents`（人格层）、`plugin-ai-family`（UI 层）。
