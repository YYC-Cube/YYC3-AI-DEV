/*
 * @Module : domains/zongshi/QAPanel
 * @Family : 📚 格物·宗师
 * @座右铭 : 「格物致知，诚意正心」
 */
"use client";

import { useState } from "react";
import { useZongshiAsk } from "./useZongshiRAG";
import { CitationFold } from "./CitationFold";

export function QAPanel({ kbIds }: { kbIds: string[] }) {
  const [query, setQuery] = useState("");
  const ask = useZongshiAsk();

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="向宗师提问…"
          className="flex-1 h-10 px-3 rounded-md border border-border-default bg-bg-subtle"
        />
        <button
          onClick={() => ask.mutate({ query, kb_ids: kbIds })}
          disabled={!query || ask.isPending}
          className="h-10 px-4 rounded-md bg-brand-primary text-white"
        >
          {ask.isPending ? "格物中…" : "提问"}
        </button>
      </div>

      {ask.data && (
        <div className="p-4 rounded-lg border border-border-default bg-bg-subtle">
          <p className="text-body-sm whitespace-pre-wrap">{ask.data.answer}</p>
          <p className="text-caption text-text-tertiary italic mt-3">
            「依据 {ask.data.citations.length} 处引用，宗师的回答如下」
          </p>
          <CitationFold citations={ask.data.citations} />
        </div>
      )}
    </div>
  );
}
