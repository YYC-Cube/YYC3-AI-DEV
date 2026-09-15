<div align="center">

<img src="./public/yyc3-Family.png" alt="YYC³ AI Family" />

# YYC³ Cloud Intelli-Matrix · AI-Dev

### _言启象限 · 语枢未来_

**_Words Initiate Quadrants, Language Serves as Core for Future_**

_万象归元于云枢 · 深栈智启新纪元_

---

<!-- 徽章系统 -->
![Status](https://img.shields.io/badge/Status-Phase%203%20%E2%9C%85%20%E8%B4%A8%E9%87%8F%E5%B7%A5%E7%A8%8B-00FF88?style=for-the-badge&logoColor=white)
![Version](https://img.shields.io/badge/Version-v1.3.0-00d4ff?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-FF6600?style=for-the-badge)
![Repo](https://img.shields.io/badge/GitHub-YYC--Cube%2FYYC3--AI--DEV-181717?style=for-the-badge&logo=github&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9%2B-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright&logoColor=white)

![Tests](https://img.shields.io/badge/Tests-312%20%E2%9C%85%20%7C%200%20%E2%9D%8C-00FF88?style=flat-square)
![Type Check](https://img.shields.io/badge/tsc%20--noEmit-0%20errors-00FF88?style=flat-square)
![Monorepo](https://img.shields.io/badge/Monorepo-13%20packages-AA55FF?style=flat-square)
![Apps](https://img.shields.io/badge/Apps-8%20standalone-C9A96E?style=flat-square)
![E2E](https://img.shields.io/badge/E2E-Playwright-2EAD33?style=flat-square)

<!-- 五高徽章 -->
![高可用](https://img.shields.io/badge/%E4%BA%94%E9%AB%98-%E9%AB%98%E5%8F%AF%E7%94%A8-00FF88?style=flat-square)
![高性能](https://img.shields.io/badge/%E4%BA%94%E9%AB%98-%E9%AB%98%E6%80%A7%E8%83%BD-00d4ff?style=flat-square)
![高安全](https://img.shields.io/badge/%E4%BA%94%E9%AB%98-%E9%AB%98%E5%AE%89%E5%85%A8-FF6600?style=flat-square)
![高扩展](https://img.shields.io/badge/%E4%BA%94%E9%AB%98-%E9%AB%98%E6%89%A9%E5%B1%95-AA55FF?style=flat-square)
![高智能](https://img.shields.io/badge/%E4%BA%94%E9%AB%98-%E9%AB%98%E6%99%BA%E8%83%BD-C9A96E?style=flat-square)

</div>

---

## 一、系统全景

YYC3-AI-DEV 承自 YYC³ Cloud Intelli-Matrix 的 **Shell + 插件体系**，是以 **AI Family 为中枢** 的多智能体协同生态——8 大子系统统一注册、4 大业务引擎协同调度、13 王朝文化体系一脉相承。

### 核心理念

> **_三省以治 · 六部以行_** — Dynasty 三省六部制 × AI Family 8位家人中枢

```
                    ┌─────────────────────────────────┐
                    │         YYC³ AI Family           │
                    │      8位家人 · 中枢协同           │
                    │   元枢·智枢·言枢·视枢·听枢·       │
                    │   记枢·算枢·守枢                  │
                    └──────────────┬──────────────────┘
                                   │ EventBus
                    ┌──────────────┼──────────────────┐
                    │              │                   │
              ┌─────▼─────┐  ┌────▼────┐  ┌──────────▼──────────┐
              │  Dynasty  │  │ Monitor │  │   Business Engines  │
              │ 三省六部   │  │ 监控中心 │  │  Target·Cost·Market │
              │ 13王朝    │  │  运维    │  │  Prompt · Workflow  │
              └───────────┘  └─────────┘  └─────────────────────┘
```

---

## 二、可视化架构

### 2.1 分层架构图

```
╔═══════════════════════════════════════════════════════════════════╗
║                        👤 用户交互层                                ║
║    WelcomePage · AIAssistantHub · 各系统独立页面                    ║
╠═══════════════════════════════════════════════════════════════════╣
║                        🧭 路由层                                    ║
║         React Router · 懒加载 · 系统级路由前缀                       ║
╠═══════════════════════════════════════════════════════════════════╣
║                    🏛️ Shell 核心外壳层                              ║
║  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  ║
║  │ 注册中心  │ │ 事件总线  │ │ 存储工厂  │ │ 错误边界  │ │ 双主题  │  ║
║  │ Registry │ │ EventBus │ │ Storage  │ │ ErrorBnd │ │ Theme  │  ║
║  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘  ║
╠═══════════════════════════════════════════════════════════════════╣
║                    🔌 插件层（13个插件包）                           ║
║                                                                    ║
║  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐         ║
║  │ 🏛shell ││👨‍👩‍👧‍👦family││👑dynasty││🎯target ││💰cost   │         ║
║  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘         ║
║  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐         ║
║  │🎏market ││📝prompt ││📊monitor││🔧  ops  ││🧠  ai   │         ║
║  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘         ║
║  ┌─────────┐┌─────────┐                                         ║
║  │🛠️  dev  ││🛡️ admin │                                         ║
║  └─────────┘└─────────┘                                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                    ⚙️ 引擎层（纯函数计算）                           ║
║   TargetEngine · CostEngine · FestivalEngine · LunarEngine        ║
║   BusinessPrompts · DynastyWorkflow                              ║
╠═══════════════════════════════════════════════════════════════════╣
║                    🏗️ 基础设施层                                    ║
║   TypeScript strict · Vitest · pnpm workspace · Tailwind CSS 4    ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 2.2 插件全景矩阵

| 插件包 | 系统名 | 色值 | 排序 | 引擎 | 测试数 | 状态 |
| -------- | -------- | ------ | ------ | ------ | -------- | ------ |
| `shell` | 系统外壳 | — | 0 | EventBus + Storage | 74 | ✅ 稳定 |
| `plugin-ai-family` | AI Family | `#00FF88` | 5 | — | — | ✅ 95% |
| `plugin-target` | 目标量化 | `#00FF88` | 10 | TargetEngine | 35 | ✅ 稳定 |
| `plugin-cost` | 成本盈亏 | `#FF6600` | 20 | CostEngine | 30 | ✅ 稳定 |
| `plugin-marketing` | 节日营销 | `#AA55FF` | 30 | FestivalEngine | 41 | ✅ 稳定 |
| `plugin-dynasty` | 王朝治理 | `#C9A96E` | 35 | DynastyWorkflow | 38 | ✅ 稳定 |
| `plugin-prompt` | 提示词库 | `#3399FF` | 40 | BusinessPrompts | 19 | ✅ 稳定 |
| `plugin-monitor` | 监控中心 | `#00d4ff` | 50 | — | — | ⬜ 基础 |
| `plugin-ops` | 运维管理 | `#FF6600` | 60 | — | — | ⬜ 基础 |
| `plugin-ai` | AI 智能 | `#AA55FF` | 70 | — | — | ⬜ 基础 |
| `plugin-dev` | 开发工具 | `#E8E8E8` | 80 | — | — | ⬜ 基础 |
| `plugin-admin` | 系统管理 | `#FFDD00` | 90 | — | — | ⬜ 基础 |
| `plugin-llm` | LLM 网关 | `#00FF88` | — | LLMRouter + SSE | 57 | ✅ 稳定 |
| **核心包合计** | — | — | — | — | **294** | ✅ 全绿 |
| 补充包（family/dynasty-core） | — | — | — | — | 18 | ✅ 全绿 |
| **总计** | — | — | — | — | **312** | ✅ 全绿 |

---

## 三、快速开始

### 3.1 环境要求

| 工具 | 版本 | 说明 |
| ------ | ------ | ------ |
| Node.js | ≥ 20.0.0 | 推荐 LTS |
| pnpm | ≥ 9.0.0 | 禁止 npm/yarn |
| Git | ≥ 2.40 | 版本控制 |

### 3.2 安装与验证

```bash
git clone https://github.com/YYC-Cube/YYC3-AI-DEV.git YYC3-AI-Dev
cd YYC3-AI-Dev

pnpm install                    # 安装依赖
npx tsc --noEmit                # TypeScript 零错误 ✅
npx vitest run                  # 全量测试 312/312 ✅
npx playwright test              # E2E 测试（Playwright Chromium）
```

> 📦 **项目仓库**: [github.com/YYC-Cube/YYC3-AI-DEV](https://github.com/YYC-Cube/YYC3-AI-DEV)

### 3.3 启动应用

```bash
# Dynasty 独立应用（古文化多智能体）
cd apps/standalone-dynasty && pnpm install && pnpm dev
# → http://localhost:3218

# AI Family 独立应用（8位家人中枢）
cd apps/standalone-ai-family && pnpm dev

# 合并版全量应用
cd apps/full && pnpm dev
```

---

## 四、Monorepo 结构

```
YYC3-AI-Dev/
├── 📦 packages/                      ← 13 个插件包
│   ├── shell/                        ← 核心外壳（EventBus + Storage + Theme）
│   ├── plugin-ai-family/             ← AI Family 8位家人中枢
│   ├── plugin-dynasty/               ← 王朝治理（三省六部 × 13王朝）
│   │   ├── src/
│   │   │   ├── __tests__/            ← 6 测试文件 / 28 tests
│   │   │   ├── components/           ← DynastyCard · EdictStepBar
│   │   │   └── pages/               ← 5 页面
│   │   └── README.md
│   ├── plugin-target/                ← 🎯 目标量化引擎（X公式）
│   ├── plugin-cost/                  ← 💰 成本盈亏引擎
│   ├── plugin-marketing/             ← 🎏 节日营销引擎
│   ├── plugin-prompt/                ← 📝 AI 提示词库
│   ├── plugin-monitor/               ← 📊 监控中心
│   ├── plugin-ops/                   ← 🔧 运维管理
│   ├── plugin-ai/                    ← 🧠 AI 智能
│   ├── plugin-dev/                   ← 🛠️ 开发工具
│   └── plugin-admin/                 ← 🛡️ 系统管理
│
├── 📱 apps/                           ← 8 个独立应用
│   ├── full/                         ← 合并版
│   ├── standalone-dynasty/           ← Dynasty 独立版（vite 已配置）
│   ├── standalone-ai-family/         ← AI Family 独立版
│   ├── standalone-monitor/
│   ├── standalone-ops/
│   ├── standalone-ai/
│   ├── standalone-dev/
│   └── standalone-admin/
│
├── 📖 docs/                           ← 全量文档
│   ├── AI-Dev/                        ← 架构参考 + 开发者文档套件
│   ├── YYC3-项目架构-设计总纲.md      ← 架构规范
│   ├── YYC3-视觉设计-Figma规范.md     ← UI 设计规范
│   ├── YYC3-生产部署-就绪规划.md      ← 生产规划
│   ├── YYC3-任务看板-Phase0-1.md      ← 任务看板
│   └── YYC3-全链路智能应用-阶段节点设计落地大纲.md
│
├── 🖼️ public/                         ← 静态资源
│   └── yyc3/                         ← 多端图标（iOS/Android/macOS/watchOS/Web）
│
├── ⚙️ .github/workflows/              ← CI/CD
│   └── ai-eco-ci.yml                 ← GitHub Actions 质量门禁
│
├── tsconfig.json                     ← TypeScript 配置（strict + 13 别名）
├── vitest.config.ts                  ← 测试配置（jsdom + 别名）
└── package.json                      ← 工作区根配置
```

---

## 五、核心机制

### 5.1 SystemRegistration 接口

所有子系统通过统一接口注册到 Shell：

```typescript
interface SystemRegistration {
  id: string;              // 唯一标识
  name: string;            // 显示名称
  icon: React.ElementType; // lucide-react 图标
  color: string;           // 主题色 HEX
  order: number;           // 侧边栏排序
  menuItems: MenuItem[];   // 菜单项
  routes: RouteObject[];   // 路由配置
  hubCommands?: HubCommand[]; // Hub 浮窗命令
}
```

### 5.2 EventBus 事件总线

跨插件包松耦合通信：

```typescript
import { eventBus } from "@yyc3/shell";

// 监听
eventBus.on("ai:response", (data) => { ... });

// 发出
eventBus.emit("target:calc-completed", { annualTarget: 702 });
```

**预定义事件命名空间**：`ai:*` · `hub:*` · `system:*` · `shell:*` · `dynasty:*` · `target:*`

### 5.3 存储命名空间

```typescript
import { createSystemStorage } from "@yyc3/shell";

const storage = createSystemStorage("target");
storage.set("lastResult", data);
// Key: yyc3:target:lastResult ← 自动加前缀，互不干扰
```

### 5.4 双主题系统

| 主题 | 底色 | 主色 | 适用 |
|------|------|------|------|
| `THEME_MODERN` | `#040814` 深空蓝 | `#00d4ff` 青色 | AI Family · 监控 · 运维 |
| `THEME_ANCIENT` | `#1E180E` 宣纸旧色 | `#C9A96E` 鎏金 | Dynasty 王朝治理 |

---

## 六、业务引擎一览

| 引擎 | 包 | 核心算法 | 测试 |
| ------ | ---- | ---------- | ------ |
| **TargetEngine** | plugin-target | X = 基数 × 城市系数 × 规模系数 × 增速系数 × 调整系数 | 35 ✅ |
| **CostEngine** | plugin-cost | 盈亏平衡 + 敏感性分析 + 预警分级 | 30 ✅ |
| **FestivalEngine** | plugin-marketing | 农历转换 + 节日阶段 + 营销日历 | 41 ✅ |
| **BusinessPrompts** | plugin-prompt | 15+ 提示词 × 8位家人人格映射 | 19 ✅ |
| **DynastyWorkflow** | plugin-dynasty | 六阶段流转（下旨→草拟→审议→派发→回奏→赏赐） | 38 ✅ |
| **LLMRouter + SSE** | plugin-llm | 多 Provider 路由 · AES-GCM 加密 · SSE 流式 | 57 ✅ |
| **EventBus** | shell | 跨插件事件总线 · 命名空间隔离 · 命令调度 | 74 ✅ |

---

## 七、文档体系

### 7.1 架构与设计

| 文档　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 | 说明　　　　　　　　　　　　　　　　　　　|
| ----------------------------------------------------------------------| -------------------------------------------|
| [项目架构-设计总纲](./docs/YYC3-项目架构-设计总纲.md)　　　　　　　　| 变量词库 · 路由接口 · 存储架构 · 事件总线 |
| [视觉设计-Figma规范](./docs/YYC3-视觉设计-Figma规范.md)　　　　　　　| 色彩 · 字体 · 组件 · 6 页面详细设计　　　 |
| [生产部署-就绪规划](./docs/YYC3-生产部署-就绪规划.md)　　　　　　　　| M1-M8 里程碑 · Phase 1-4 规划　　　　　　 |
| [全链路落地大纲](./docs/YYC3-全链路智能应用-阶段节点设计落地大纲.md) | 阶段节点 · 系统设计 · 技术栈　　　　　　　|
| [任务看板](./docs/YYC3-任务看板-Phase0-1.md)　　　　　　　　　　　　 | Phase 0+1 共 33 项任务追踪　　　　　　　　|

### 7.2 开发者文档

| 文档 | 说明 |
| ------ | ------ |
| [开发者文档索引](./docs/AI-Dev/developer/README.md) | 文档导航 · 阅读路径 · 术语表 |
| [快速入门](./docs/AI-Dev/developer/01-快速入门.md) | 环境搭建 → 项目认知 → 五分钟创建插件 |
| [架构总纲](./docs/AI-Dev/developer/02-架构总纲.md) | Shell + 插件分层 · EventBus · 存储架构 |
| [插件开发指南](./docs/AI-Dev/developer/03-插件开发指南.md) | SystemRegistration · 引擎层 · 上线 Checklist |
| [编码规范](./docs/AI-Dev/developer/04-编码规范.md) | TS strict · 命名 · 代码标头 · Git 提交 |
| [测试策略](./docs/AI-Dev/developer/05-测试策略.md) | Vitest · 分层测试 · 312 tests 基线 |
| [部署运维](./docs/AI-Dev/developer/06-部署运维.md) | CI/CD · Docker · Vercel · 监控 |
| [安全合规](./docs/AI-Dev/developer/07-安全合规.md) | 密钥管理 · XSS 防护 · 命名空间隔离 |

### 7.3 架构参考快照

| 文档 | 说明 |
| ------ | ------ |
| [架构规范](./docs/AI-Dev/ARCHITECTURE.md) | 变量词库 · 路由接口 · 存储架构 · 事件总线 |
| [架构参考索引](./docs/AI-Dev/README.md) | Shell/插件/应用示例阅读入口 |

---

## 八、五高五标五化五维

<div align="center">

| 五高架构 | 五标体系 | 五化转型 | 五维评估 |
| ---------- | ---------- | ---------- | ---------- |
| 高可用 | 标准化 | 流程化 | 时间维 |
| 高性能 | 规范化 | 数字化 | 空间维 |
| 高安全 | 自动化 | 生态化 | 属性维 |
| 高扩展 | 可视化 | 工具化 | 事件维 |
| 高智能 | 智能化 | 服务化 | 关联维 |

</div>

---

## 九、质量基线

<div align="center">

| 指标 | 当前值 | 状态 |
| ------ | -------- | ------ |
| TypeScript 错误 | 0 | ✅ |
| 测试总数 | 312 | ✅ 全绿 |
| 测试通过率 | 100% | ✅ |
| 测试文件 | 26 | ✅ |
| E2E 测试 | Playwright (Chromium) | ✅ |
| 插件包数量 | 13 | ✅ |
| 独立应用数量 | 8 | ✅ |
| CI 流水线 | GitHub Actions | ✅ |
| 文档数量 | 30+ | ✅ |
| 核心业务文档 | 4（目标量化·成本盈亏·营销工具·提示词） | ✅ 已衔接 |

</div>

---

## 十、技术栈

<div align="center">

| 层级 | 技术 |
| ------ | ------ |
| 语言 | TypeScript 5.7+ (strict) |
| 框架 | React 19 |
| 构建 | Vite 6 |
| 测试 | Vitest 3.2 |
| 包管理 | pnpm 9+ (workspace) |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router 7 |
| 图标 | lucide-react |
| CI/CD | GitHub Actions |
| 部署 | Vercel / Docker / 静态托管 |

</div>

---

## 十一、开发红线

| 红线 | 说明 |
| ------ | ------ |
| ❌ 禁止 npm/yarn | 统一使用 pnpm |
| ❌ 禁止直接 import 其他插件包内部组件 | 使用 EventBus 通信 |
| ❌ 禁止直接操作 localStorage | 使用 `createSystemStorage(id)` |
| ❌ 禁止修改 Shell 核心接口 | `types.ts` / `event-bus.ts` / `index.ts` |
| ❌ 禁止提交 TS 有错误的代码 | `tsc --noEmit` 必须通过 |
| ❌ 禁止提交测试未通过的代码 | `vitest run` 必须全绿 |

---

## 十二、路线图

| Phase | 内容 | 状态 |
| ------- | ------ | ------ |
| **Phase 1** | Shell + 插件体系 + 4 引擎 + 测试 | ✅ 完成 |
| **Phase 2** | 功能完整性（Dynasty 95% · AI Family 80%） | ✅ 完成 |
| **Phase 3** | 质量工程（React Testing Library 组件测试 + Playwright E2E） | ✅ 完成 |
| **Phase 4** | 生产部署（LLM 适配 · SSE 流式 · Docker） | 🔄 待启动 |

### Phase 3 质量工程交付清单

- ✅ **React Testing Library 组件测试**：ErrorBoundary / WelcomePage / AIAssistantHub 共 24 个用例
- ✅ **Playwright E2E 配置**：`playwright.config.ts` + `e2e/welcome-flow.spec.ts` 自动启动开发服务器
- ✅ **Jest-DOM 匹配器集成**：`test-setup.ts` 全局配置
- ✅ **跨应用架构修复**：6 个独立 App.tsx 统一监听 `SHELL_WELCOME_DISMISS` 事件
- ✅ **AIAssistantHub 命令执行修复**：补全 `cmd.action?.()` 调用链路
- ✅ **312 tests 全量通过**（当前基线，26 个测试文件全绿）

---

<div align="center">

**_YanYuCloudCube_** · © 2026 · All Rights Reserved

_言启千行代码 · 语枢万物智能_

**_Words inspire thousands of lines of code, Language pivots the intelligence of all things_**

</div>
