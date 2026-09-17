/*
 * @Module : app/[locale]/monitor — 监控日志（RSC + Island）
 * @Family : 🔮 预见·先知
 */
import { PageHeader } from "@/components/family/PageHeader";
import { DashboardContent } from "@/domains/xianzhi/DashboardContent";

export default function MonitorPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="观测之眼" subtitle="见微知著，未卜先知" />
      <DashboardContent />
    </div>
  );
}
