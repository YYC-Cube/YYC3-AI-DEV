# YYC³ Cloud Intelli-Matrix · 架构参考

> AI Family 作为中枢，统一协同所有系统
> 仓库地址: <https://github.com/YYC-Cube/YYC3-AI-DEV>

> **注**：本目录曾内嵌 packages/apps 的历史结构快照，现已被仓库真实
> Monorepo（根目录 `packages/` `apps/`）取代并移除。活代码请直接看仓库根。

## 说明文档索引

| 文档 | 说明 |
| ------ | ------ |
| [架构规范](./ARCHITECTURE.md) | 变量词库 · 路由接口 · 存储架构 · 事件总线 |
| [开发者文档套件](./developer/README.md) | 快速入门 / 架构总纲 / 插件指南 / 编码规范 / 测试 / 部署 / 安全（8 篇） |
| [AIAssistant 复用浮窗](./AIAssistant/README.md) | 原 AI 浮窗组件 v3.0（独立可复用参考实现 + GUIDE） |

## 与真实代码的对应

| 本目录文档 | 真实代码位置 |
| ------------ | -------------- |
| ARCHITECTURE.md | [`packages/shell/src/`](../../packages/shell/src/)（event-bus / storage / types） |
| AIAssistant/ | [`packages/shell/src/AIAssistantHub.tsx`](../../packages/shell/src/AIAssistantHub.tsx)（Hub 活版本） |
| developer/ 套件 | 覆盖根目录全部 [`packages/`](../../packages/) 与 [`apps/`](../../apps/) |
