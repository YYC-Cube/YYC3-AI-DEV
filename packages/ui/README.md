# @yyc3/ui

> YYC³ 四端统一 UI 基础件库 — shadcn/radix 同源 49 件 + 4 个品牌件，源码直出。

## 定位

- **唯一控件来源**：业务页面不再自绘按钮/输入框/卡片，统一从本包深路径导入。
- **令牌驱动**：所有颜色/圆角取自 `@yyc3/theme` 的 CSS 变量，切换主题即全局生效。
- **源码直出**：`exports` 指向 `src/*.tsx`，由消费方（Vite）编译，无需构建产物。

## 用法

```tsx
import { Button } from "@yyc3/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@yyc3/ui/card";
import { GlassCard } from "@yyc3/ui/brand/GlassCard";
```

样式入口（消费方必须引入令牌）：

```css
@import "tailwindcss";
@import "@yyc3/theme/theme.css";
@source "../../../packages"; /* 让 Tailwind 扫描本包类名 */
```

## 组件清单

| 分类 | 组件 |
| ------ | ------ |
| 基础控件 | button / input / textarea / label / checkbox / switch / slider / toggle / toggle-group |
| 布局容器 | card / separator / aspect-ratio / resizable / scroll-area / sheet / drawer |
| 导航 | tabs / breadcrumb / navigation-menu / menubar / pagination / command |
| 数据展示 | avatar / badge / table / progress / skeleton / chart / carousel |
| 反馈浮层 | alert / alert-dialog / dialog / popover / hover-card / tooltip / sonner |
| 表单增强 | form / calendar / input-otp / select / radio-group |
| 品牌件 | `brand/GlassCard` / `brand/YYC3Logo` / `brand/YYC3LogoSvg` / `brand/empty-state` |

## 约定

1. 新增组件先在本包实现，再在 `apps/full` 的 `/design` 页登记；
2. 组件只接受 `className` 扩展，不覆盖语义色；
3. 深路径导入优先，barrel（`@yyc3/ui`）仅供一次性聚合。

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）· © 2026 · <a href="mailto:admin@0379.email">admin@0379.email</a>
</p>
