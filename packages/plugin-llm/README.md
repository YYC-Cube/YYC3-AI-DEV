# @yyc3/plugin-llm — LLM 网关

> YYC³ LLM 适配层：OpenAI / Anthropic / 通义千问 / DeepSeek / Kimi 统一接口 + SSE 流式 + AES-256-GCM Key 存储

## 能力

| 模块 | 文件 | 说明 |
|------|------|------|
| Provider 适配 | `src/providers.ts` | 5 家 Provider 统一 `LLMChatAdapter` 接口 |
| 智能路由 | `src/router.ts` | cost / latency / quality / manual 四种策略 + 故障转移 |
| SSE 流式 | `src/sse.ts` | 按行解析 · `[DONE]` 标记 · 自动重连 |
| Key 管理 | `src/key-manager.ts` | 会话级 Key + 服务端主密钥加密 |
| 加密 | `src/crypto.ts` | AES-256-GCM（独立 IV / 中文支持） |
| 桥接 | `src/base-adapter.ts` | 统一请求构造与错误归一化 |

## 快速使用

```typescript
import { createAdapter, LLMRouter, SSEClient } from "@yyc3/plugin-llm";

// 非流式
const adapter = createAdapter("openai", { apiKey });
const res = await adapter.chat({ messages });

// 流式
const client = new SSEClient();
client.onChunk = (text) => console.log(text);

// 路由
const router = new LLMRouter();
const best = await router.route("cost", prompt);
```

## 测试

```bash
npx vitest run packages/plugin-llm/   # 57 tests ✅
```

## 安全要点

- 前端不持久化 Key；服务端密钥使用 `SERVER_MASTER_KEY` AES-256-GCM 加密
- 生产环境推荐同源代理（`api/chat/stream.ts`），隐藏 Key + 规避 CORS

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0.0 | 2026-08-19 | 初始 README | YanYuCloudCube Team |
