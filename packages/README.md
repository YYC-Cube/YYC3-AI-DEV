# packages — 插件包目录

> 13 个插件包，通过 `SystemRegistration` 接口统一注册到 Shell

## 插件包清单

### 核心层

| 包 | 系统名 | 说明 |
|----|--------|------|
| [`shell/`](./shell/README.md) | 系统外壳 | EventBus · Storage · WelcomePage · ErrorBoundary · 双主题 |

### 业务引擎层（含纯函数引擎 + 测试）

| 包　　　　　　　　　　　　　　　　　　　　　　　　　| 系统名　　　| 引擎　　　　　　　　　　　　　| 测试数 |
| -----------------------------------------------------| -------------| -------------------------------| --------|
| [`plugin-target/`](./plugin-target/README.md)　　　 | 🎯 目标量化 | TargetEngine（X公式）　　　　 | 27 ✅　 |
| [`plugin-cost/`](./plugin-cost/README.md)　　　　　 | 💰 成本盈亏 | CostEngine（盈亏平衡）　　　　| 30 ✅　 |
| [`plugin-marketing/`](./plugin-marketing/README.md) | 🎏 节日营销 | FestivalEngine + LunarEngine　| 41 ✅　 |
| [`plugin-prompt/`](./plugin-prompt/README.md)　　　 | 📝 提示词库 | BusinessPrompts（15+ 提示词） | 19 ✅　 |

### 智能系统层

| 包 | 系统名 | 说明 |
| ---- | -------- | ------ |
| [`plugin-ai-family/`](./plugin-ai-family/README.md) | 👨‍👩‍👧‍👦 AI Family | 8位家人中枢 · 8位家人人格 |
| [`plugin-dynasty/`](./plugin-dynasty/README.md) | 👑 王朝治理 | 三省六部 × 13王朝 × 26 Skills（28 tests ✅） |
| [`plugin-ai/`](./plugin-ai/README.md) | 🧠 AI 智能 | AI 建议 |

### 基础设施层

| 包　　　　　　　　　　　　　　　　　　　　　　　| 系统名　　　| 说明　　　　　 |
| -------------------------------------------------| -------------| ----------------|
| [`plugin-llm/`](./plugin-llm/README.md)　　　　 | 🧠 LLM 网关 | 多 Provider 路由 · AES-GCM · SSE（57 tests ✅） |
| [`plugin-monitor/`](./plugin-monitor/README.md) | 📊 监控中心 | 实时 Dashboard |
| [`plugin-ops/`](./plugin-ops/README.md)　　　　 | 🔧 运维管理 | 操作中心　　　 |
| [`plugin-dev/`](./plugin-dev/README.md)　　　　 | 🛠️ 开发工具　| Design System　|
| [`plugin-admin/`](./plugin-admin/README.md)　　 | 🛡️ 系统管理　| 审计日志　　　 |

## 开发规范

- 每个包遵循 `SystemRegistration` 接口注册
- 引擎层为纯函数，零 UI 依赖
- 测试文件与 `src/` 同级，命名 `{name}.test.ts`
- 详见 [开发者文档](../docs/AI-Dev/developer/README.md)
