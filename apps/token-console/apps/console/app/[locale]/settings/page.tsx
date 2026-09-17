/*
 * @Module : app/[locale]/settings — 设置（接入与安全）
 * @Family : 🛡️ 智云·守护
 */
import { PageHeader } from "@/components/family/PageHeader";
import { SettingsConnection } from "@/domains/guardian/SettingsConnection";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="设置" subtitle="守护每一次连接" />
      <div className="p-6">
        <SettingsConnection />
      </div>
    </div>
  );
}
