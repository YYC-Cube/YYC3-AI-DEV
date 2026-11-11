# @yyc3/theme

> YYC³ 四端统一设计令牌层 — CSS 变量为源，TS 常量由脚本生成。

## 定位

- **令牌单源**：颜色、圆角、字号、图表色全部定义在 `src/theme.css`。
- **Tailwind v4 适配**：文件内含 `@theme inline` 映射，`bg-primary`、`text-foreground` 等语义类开箱可用。
- **双主题**：`:root`（深空蓝）+ `.dark` 变体，由 `@custom-variant dark` 驱动。

## 用法

```css
@import "tailwindcss";
@import "@yyc3/theme/theme.css";
```

```ts
import { COLOR_TOKENS, DESIGN_SYSTEM } from "@yyc3/theme/design-system";
```

## 文件

| 文件 | 作用 |
| ------ | ------ |
| `src/theme.css` | CSS 变量 + `@theme inline` 映射（唯一真源） |
| `src/design-system.ts` | 间距/字号/圆角/动效等结构化令牌 |
| `src/colors.ts` / `colors.generated.ts` | 颜色常量与生成产物 |
| `scripts/gen-colors.mjs` | 从 CSS 变量生成 TS 常量 |

## 约定

1. 新增颜色先加 CSS 变量，再补 `@theme inline` 映射，最后运行 `node scripts/gen-colors.mjs`；
2. 业务代码禁止硬编码 HEX，统一走语义类或 `COLOR_TOKENS`；
3. 与 `packages/shell/src/theme.ts` 存在历史双份令牌，收敛前以本包为准。

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）· © 2026 · <a href="mailto:admin@0379.email">admin@0379.email</a>
</p>
