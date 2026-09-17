/*
 * @Module : app/[locale]/routing — 路由观测（Client）
 * @Family : 🧭 言启·千行
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { UpstreamGrid } from "@/domains/qianhang/UpstreamGrid";

export default function RoutingPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="路由观测" subtitle="千行之路，由此启程" />
      <div className="p-6">
        <UpstreamGrid />
      </div>
    </div>
  );
}
