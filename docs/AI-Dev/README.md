# YYC³ Cloud Intelli-Matrix · 架构参考与文档总览

> AI Family 作为中枢，统一协同所有系统
> 仓库地址: <https://github.com/YYC-Cube/YYC3-AI-DEV>

> **注**：本目录曾内嵌 packages/apps 的历史结构快照，现已被仓库真实
> Monorepo（根目录 `packages/` `apps/`）取代并移除。活代码请直接看仓库根。
> 原 `docs/YYC3-项目架构-设计总纲.md` 与本目录 ARCHITECTURE.md 合并（2026-09-16），
> 根级 `AIAssistant/` 冗余副本已清理（唯一版本在本目录 `AIAssistant/`）。

---

## 一、说明文档索引

| 文档 | 说明 |
| ------ | ------ |
| [架构规范](./ARCHITECTURE.md) | 变量词库 · 路由接口 · 存储架构 · 事件总线 · 实际现状对齐 |
| [开发者文档套件](./developer/README.md) | 快速入门 / 架构总纲 / 插件指南 / 编码规范 / 测试 / 部署 / 安全（8 篇） |
| [AIAssistant 复用浮窗](./AIAssistant/README.md) | 原 AI 浮窗组件 v3.0（独立可复用参考实现 + GUIDE） |

**根级规划文档**（同目录上级，均含 frontmatter 与变更历史）：

| 文档 | 说明 |
| ------ | ------ |
| [生产部署就绪规划](../YYC3-生产部署-就绪规划.md) | Phase 0-4 里程碑与验收基线 |
| [任务看板 Phase 0-1](../YYC3-任务看板-Phase0-1.md) | 全量进度跟踪（已闭环） |
| [全链路阶段节点大纲](../YYC3-全链路智能应用-阶段节点设计落地大纲.md) | 业务工具链规划指导 |
| [Figma 视觉规范](../YYC3-视觉设计-Figma规范.md) | 古风 × 科技双主题设计体系 |

## 二、与真实代码的对应

| 本目录文档 | 真实代码位置 |
| ------------ | -------------- |
| ARCHITECTURE.md | [`packages/shell/src/`](../../packages/shell/src/)（event-bus / storage / types） |
| AIAssistant/ | [`packages/shell/src/AIAssistantHub.tsx`](../../packages/shell/src/AIAssistantHub.tsx)（Hub 活版本） |
| developer/ 套件 | 覆盖根目录全部 [`packages/`](../../packages/) 与 [`apps/`](../../apps/) |

## 三、文档写作规范（强制）

新增/修改 Markdown 文档必须遵守：

| 规则 | 要求 |
| ------ | ------ |
| **frontmatter** | 内容文档必填 YAML 元数据：`file / description / author / version / created / updated / status / tags / category` |
| **标头结构** | 唯一 H1 + 引用块注明版本/日期/维护者；章节用中文序号（一、二、三…） |
| **链接** | 站内相对路径，禁止裸 URL；由根目录 [`validate-docs.js`](../../validate-docs.js) 门禁校验零坏链 |
| **代码标头** | `.ts/.tsx` 文件必填 JSDoc 标头（见 [编码规范](./developer/04-编码规范.md)） |
| **收尾** | 每篇文档附「变更历史」表，版本遵循 SemVer |
| **双语** | 面向开源/跨团队的文档采用中文在上、英文在下（内部文档可中文） |
| **术语一致** | Shell / 插件包 / EventBus / SystemRegistration 等以 [开发者术语表](./developer/README.md#三术语表) 为准 |

## 四、变更流程

1. **分支**：从 `main` 拉出 `docs/*` 或 `feat/*` 分支开发
2. **本地门禁**（与 CI 同款）：

   ```bash
   node validate-docs.js     # 文档完整性 + 零坏链
   pnpm type-check           # TS 零错误
   pnpm test                 # 全量测试全绿
   ```

3. **提交**：Conventional Commits（`docs:` / `feat:` / `fix:` / `chore:` …）
4. **PR → main**：CI 全绿后合并；文档变更由 `ecosystem-check` job 的文档门禁自动校验

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.1.0 | 2026-09-16 | 吸收 YYC3-Docs 模板标准：新增文档写作规范/变更流程；合并设计总纲；清理根级 AIAssistant 冗余副本 | YanYuCloudCube Team |
| v1.0.0 | 2026-08-19 | 重写索引：移除历史快照引用，新增与真实代码的对应映射 | YanYuCloudCube Team |
