---
file: README.md
description: YYC³ AI-Dev 开发者文档索引 — 导航 · 阅读路径 · 术语表
author: YanYuCloudCube Team <admin@0379.email>
version: v1.0.0
created: 2026-08-19
updated: 2026-08-19
status: stable
tags: [documentation],[index],[developer]
category: index
language: zh-CN
audience: developers
project: yyc3-ai-dev
---

# 📚 YYC³ AI-Dev 开发者文档索引

> **仓库地址**: [github.com/YYC-Cube/YYC3-AI-DEV](https://github.com/YYC-Cube/YYC3-AI-DEV)
> **阅读顺序**: 快速入门 → 架构总纲 → 插件开发指南 → 编码规范 → 测试策略 → 部署运维 → 安全合规

---

## 一、文档导航

| 编号 | 文档 | 难度 | 面向 | 内容 |
|------|------|------|------|------|
| 01 | [快速入门](./01-快速入门.md) | ⭐ 基础 | 新成员 | 环境搭建 · 项目认知 · 首个插件 |
| 02 | [架构总纲](./02-架构总纲.md) | ⭐⭐⭐ 进阶 | 全员 | Shell+插件分层 · EventBus · 存储 · 双主题 |
| 03 | [插件开发指南](./03-插件开发指南.md) | ⭐⭐ 中级 | 插件开发者 | SystemRegistration · 引擎层 · 上线 Checklist |
| 04 | [编码规范](./04-编码规范.md) | ⭐ 基础 | 全员 | TS strict · 命名 · 标头 · Git 提交 |
| 05 | [测试策略](./05-测试策略.md) | ⭐⭐ 中级 | 全员 | Vitest · 分层测试 · 312 tests 基线 |
| 06 | [部署运维](./06-部署运维.md) | ⭐⭐⭐ 进阶 | DevOps | CI/CD · Docker · Vercel · 监控 |
| 07 | [安全合规](./07-安全合规.md) | ⭐⭐⭐ 进阶 | 全员 | 密钥管理 · XSS 防护 · 命名空间隔离 |

---

## 二、推荐阅读路径

```
新成员入职        01 → 02 → 04 → 05
插件开发          03 → 04 → 05（参考 02 的注册清单）
运维 / 发布       06 → 07
安全评审          07 → 05
```

---

## 三、术语表

| 术语 | 说明 |
|------|------|
| **Shell** | 系统外壳，提供注册/路由/存储/事件总线，核心包 `@yyc3/shell` |
| **插件包** | `packages/plugin-*`，按 `SystemRegistration` 注册到 Shell |
| **SystemRegistration** | 插件注册接口：id/name/icon/color/order/menuItems/routes |
| **EventBus** | 跨插件通信总线，命名空间 `ai:* hub:* system:* shell:* dynasty:* target:*` |
| **createSystemStorage** | 命名空间存储工厂，Key 前缀 `yyc3:{systemId}:` |
| **AI Family** | 8 位家人中枢系统，统一人格入口 |
| **Dynasty** | 三省六部 × 13 王朝古文化协同系统 |
| **业务引擎** | TargetEngine · CostEngine · FestivalEngine · BusinessPrompts · DynastyWorkflow |
| **五高** | 高可用 · 高性能 · 高安全 · 高扩展 · 高智能 |

---

## 四、当前基线（2026-08-19 实测）

| 指标 | 值 | 验证命令 |
|------|-----|---------|
| TypeScript 错误 | 0 | `npx tsc --noEmit` |
| 单元测试 | 312 / 312 ✅（26 文件） | `npx vitest run` |
| 插件包 | 13（shell + 12 plugin-*） | `ls packages/` |
| 独立应用 | 8 | `ls apps/` |
| CI | GitHub Actions 8 Job 质量门禁 | `.github/workflows/ai-eco-ci.yml` |

---

## 五、变更历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0.0 | 2026-08-19 | 开发者文档套件重建：接入仓库地址，更新至 312 tests / 13 插件基线 | YanYuCloudCube Team |
