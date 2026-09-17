/*
 * @Module : app/[locale]/knowledge — 知识库 RAG（Client）
 * @Family : 📚 格物·宗师
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { KBGrid } from "@/domains/zongshi/KBGrid";
import { QAPanel } from "@/domains/zongshi/QAPanel";

export default function KnowledgePage() {
  return (
    <div className="min-h-screen space-y-6">
      <PageHeader title="知识殿堂" subtitle="格物致知，方为宗师" />
      <div className="p-6 space-y-6">
        <KBGrid />
        <QAPanel kbIds={[]} />
      </div>
    </div>
  );
}
