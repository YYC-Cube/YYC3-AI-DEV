/*
 * @Module : app/dashboard — 带开关的仪表盘
 * @Family-Owner : 🔮 预见·先知
 */
import { usageBilling, costRealCalculation, requestLogs } from "#/flags";
import { FlaggedFeature } from "@/components/flags/FlaggedFeature";
import { PageHeader } from "@/components/family/PageHeader";
import { DashboardIsland } from "./DashboardIsland";

export default async function DashboardPage() {
  // 服务端解析开关（不在客户端决策）
  const [showBilling, showRealCost, showLogs] = await Promise.all([
    usageBilling(),
    costRealCalculation(),
    requestLogs(),
  ]);

  return (
    <div className="min-h-screen">
      <PageHeader title="今日预言" subtitle="见微知著，未卜先知" />
      <DashboardIsland
        flags={{ showBilling, showRealCost, showLogs }}
      />
    </div>
  );
}
