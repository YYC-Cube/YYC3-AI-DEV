/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : stories/domains/XianzhiDomain — 预见·先知域总览
 * @Family-Owner : 🔮 预见·先知（观测与预测域）
 * @座右铭 : 「见微知著，未卜先知」
 * ============================================================
 */
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { FamilyBadge } from "@/components/family/FamilyBadge";
import { StatCard } from "@/domains/xianzhi/StatCard";
import { LatencyBar } from "@/domains/xianzhi/LatencyBar";
import { ErrorRateBadge } from "@/domains/xianzhi/ErrorRateBadge";
import { ErrorTable } from "@/domains/xianzhi/ErrorTable";
import { HealthGrid } from "@/domains/xianzhi/HealthGrid";

const meta = {
  title: "🎯 Domains/🔮 Xianzhi (预见·先知)",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## 🔮 预见·先知 · 首席预言家

**域**：观测与预测域 · **电话**：0379-0108

> 「见微知著，未卜先知」

**主页面**：04_Dashboard · 11_Monitor_Logs

**核心端点**：
- \`GET /v1/models/summary\` — 聚合总览
- \`GET /v1/models/errors\` — 错误记录
- \`GET /health\` — 完整健康
- \`GET /metrics\` — Prometheus

**专属组件**：StatCard · LatencyBar · ErrorRateBadge · TrendChart
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// 域总览（完整 Dashboard 演示）
export const DomainOverview: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      {/* 家人身份 */}
      <div className="flex items-center gap-3">
        <FamilyBadge member="xianzhi" size="lg" showExt showMotto />
      </div>

      {/* 6 张 StatCard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="总请求" value="12,847" note="累计感知到的召唤" />
        <StatCard label="总 Token" value="2,207,400" note="累计交换的思想" />
        <StatCard label="总成本" value="$0.00" note="预言家尚未学会计价" blBadge="BL-02" />
        <StatCard label="平均延迟" value="420ms" note="思考的速度" tone="warning" />
        <StatCard label="错误率" value="0.35%" note="罕见的迷途" tone="success" />
        <StatCard label="缓存命中率" value="34.2%" note="灵感的复现" />
      </div>

      {/* 健康 + 错误 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HealthGrid
          services={{
            ollama: { status: "healthy" },
            zhipu: { status: "healthy" },
            redis: { status: "healthy" },
            postgresql: { status: "healthy" },
          }}
        />
        <ErrorTable
          errors={[
            {
              id: "e1",
              model_id: "gpt-4o",
              error_type: "timeout",
              message: "Upstream timeout after 30000ms",
            },
            {
              id: "e2",
              model_id: "claude-3-5-sonnet",
              error_type: "validation",
              message: "Invalid parameter: temperature must be between 0 and 2",
            },
            {
              id: "e3",
              model_id: "zhipu-glm-4",
              error_type: "quota",
              message: "Daily quota exceeded",
            },
          ]}
        />
      </div>
    </div>
  ),
};

// 交互测试：StatCard 悬停
export const StatCardHover: Story = {
  render: () => (
    <div className="p-6">
      <StatCard label="总请求" value="12,847" note="悬停我看看" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText("总请求").closest("div");
    if (card) {
      await userEvent.hover(card);
      await expect(card).toBeVisible();
    }
  },
};

// 空态
export const EmptyErrors: Story = {
  render: () => (
    <div className="p-6">
      <ErrorTable errors={[]} />
    </div>
  ),
};

// 空态 a11y 检查
export const EmptyErrorsA11y: Story = {
  ...EmptyErrors,
  parameters: {
    a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } },
  },
};
