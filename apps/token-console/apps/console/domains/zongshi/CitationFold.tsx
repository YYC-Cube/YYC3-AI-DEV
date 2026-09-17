/*
 * @Module : domains/zongshi/CitationFold — 情感组件
 * @Family : 📚 格物·宗师
 */
"use client";

import { useState } from "react";
import type { SearchHit } from "./useZongshiRAG";

export function CitationFold({ citations }: { citations: SearchHit[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-caption text-brand-primary hover:underline"
      >
        {open ? "收起引用" : `展开 ${citations.length} 处引用`}
      </button>
      {open && (
        <ul className="mt-2 space-y-2">
          {citations.map((c) => (
            <li
              key={c.chunk_id}
              className="p-2 rounded border border-border-default bg-bg-elevated text-caption"
            >
              <div className="flex justify-between text-text-tertiary mb-1">
                <code>{c.document_id}</code>
                <span>score {c.score.toFixed(3)}</span>
              </div>
              <p>{c.content.slice(0, 200)}…</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
