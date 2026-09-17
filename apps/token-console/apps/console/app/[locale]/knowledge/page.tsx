/*
 * @Module : app/[locale]/knowledge — 知识库 RAG（Client）
 * @Family : 📚 格物·宗师
 */
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/family/PageHeader";
import { KBGrid } from "@/domains/zongshi/KBGrid";
import { QAPanel } from "@/domains/zongshi/QAPanel";

export default function KnowledgePage() {
  // 宗师问学：勾选的知识库决定 RAG 检索范围
  const [kbIds, setKbIds] = useState<string[]>([]);

  return (
    <div className="min-h-screen space-y-6">
      <PageHeader title="知识殿堂" subtitle="格物致知，方为宗师" />
      <div className="p-6 space-y-6">
        <KBGrid selected={kbIds} onToggle={(id) =>
          setKbIds((prev) =>
            prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id],
          )
        } />
        <QAPanel kbIds={kbIds} />
      </div>
    </div>
  );
}
