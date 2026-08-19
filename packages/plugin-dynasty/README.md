# @yyc3/plugin-dynasty — 王朝治理系统

> 古文化渊源 · 智能新范式 — 三省六部制 × 多智能体协同

## 核心设计

```
皇帝(emperor) → 太子(taizi) → 三省(审议) → 六部(执行)
                                 ├─ 中书 草拟
                                 ├─ 门下 审议
                                 └─ 尚书 派发
```

12 个 Agent 协同完成六阶段任务流转：下旨→草拟→审议→派发→回奏→赏赐

## 包含

| 模块 | 说明 |
|------|------|
| `agents.ts` | 12 Dynasty Agent (映射 AI Family 8 位家人) |
| `dynasties.ts` | 十三王朝数据 (夏→清) + 28 项朝代 Skills 映射 + 9 大类别 |
| `edict-protocol.ts` | EdictMessage 消息协议 (6种类型) |
| `honors.ts` | 17 种勋章系统 (1-6星) |
| `skills.ts` | 6 项中华文化专属 Skills |
| `pages/CourtHall.tsx` | 朝堂中央看板 |
| `pages/DynastyTimeline.tsx` | 十三王朝时间轴 + Skills 分类面板 |
| `pages/HonorWall.tsx` | 勋章墙 |
| `pages/DynastySkills.tsx` | 中华 Skills 面板 |

## Hub 浮窗

```tsx
<AIAssistantHub systemId="dynasty" title="王朝治理" accentColor="#C9A96E"
  commands={DYNASTY_CMDS} extraPrompts={DYNASTY_PROMPTS} />
```

## 启动

```bash
pnpm --filter @yyc3/app-standalone-dynasty dev
```
