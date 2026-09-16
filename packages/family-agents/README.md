# @yyc3/family-agents

> 👨‍👩‍👧‍👦 AI Family 人格层 — 8 位家人人格定义与档案数据（纯数据包）

## 内容

- 8 位家人（爸爸/妈妈/爷爷/奶奶/哥哥/姐姐/弟弟/妹妹）人格画像
- 每位家人的专长域、语气模板、协作偏好
- 与 `plugin-prompt` 的业务 Prompt 一一映射

## 测试

```bash
npx vitest run packages/family-agents/   # 10 tests ✅
```

- [family-agents.test.ts](./family-agents.test.ts) — 人格完整性与映射一致性
## 消费方

`plugin-ai-family`（家人系统 UI）、`shell`（AIAssistantHub 中枢）。
