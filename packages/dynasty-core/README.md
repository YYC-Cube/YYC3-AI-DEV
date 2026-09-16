# @yyc3/dynasty-core

> 🏛️ 王朝协议核心 — 敕令信封协议 + 消息总线 + 勋章系统（零 UI，纯逻辑层）

## 模块

- [protocol/DynastyTypes.ts](./src/protocol/DynastyTypes.ts) — 12 朝臣角色 + 敕令流转链常量
- [protocol/EdictMessage.ts](./src/protocol/EdictMessage.ts) — 六类敕令工厂（edict/memorial/review/dispatch/report/reward）+ Buffer 序列化 + 提取器
- [bus/](./src/bus/) — `DynastyMessageBus` 消息总线（队列/重试策略）
- [honors/](./src/honors/) — `HonorsSystem` 勋章系统

## 测试

```bash
npx vitest run packages/dynasty-core/   # 8 tests ✅
```

- [dynasty-core.test.ts](./src/__tests__/dynasty-core.test.ts) — 协议常量 / 六类工厂 / 序列化往返 / 总线 / 勋章

## 消费方

`plugin-dynasty`（朝堂 UI 层）基于本包协议驱动三省六部协同。
