/*
 * @Module : app/[locale]/models — 模型市场（Client）
 * @Family : 🎯 千里·伯乐
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { ModelGrid } from "@/domains/bole/ModelGrid";

export default function ModelsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="模型市场" subtitle="千里马常有，伯乐不常有" />
      <div className="p-6">
        <ModelGrid />
      </div>
    </div>
  );
}
