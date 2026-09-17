/*
 * @Module : app/[locale]/page — 控制台首页（RSC + Island）
 * @Family : 🛡️ 智云·守护
 */
import { PageHeader } from "@/components/family/PageHeader";
import { ConnectForm } from "@/domains/guardian/ConnectForm";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="接入 · 智云守护"
        subtitle="亦师亦友亦伯乐，一言一语一协同"
      />
      <div className="p-6">
        <ConnectForm />
      </div>
    </div>
  );
}
