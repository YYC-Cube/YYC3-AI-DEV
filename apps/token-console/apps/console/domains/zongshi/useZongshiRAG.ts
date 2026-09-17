/*
 * @Module : domains/zongshi/useZongshiRAG
 * @Family : 📚 格物·宗师 · 首席质量官 · 0379-0208
 */
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "@/domains/_shared/ApiClient";
import { qk } from "@/lib/queryKeys";

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface DocumentInfo {
  id: string;
  kb_id: string;
  name: string;
  status: "pending" | "parsing" | "ready" | "error";
  chunk_count: number;
}

export interface SearchHit {
  document_id: string;
  chunk_id: string;
  content: string;
  score: number;
}

export function useZongshiKBs() {
  return useQuery({
    queryKey: qk.zongshi.knowledgeBases(),
    queryFn: () => apiCall<KnowledgeBase[]>("/v1/knowledge-bases"),
  });
}

export function useZongshiDocuments(kbId?: string) {
  return useQuery({
    queryKey: qk.zongshi.documents(kbId),
    queryFn: () =>
      apiCall<DocumentInfo[]>("/v1/documents", { params: { kb_id: kbId } }),
    enabled: !!kbId,
  });
}

export function useZongshiSearch() {
  return useMutation({
    mutationFn: (body: { query: string; kb_ids: string[]; top_k?: number }) =>
      apiCall<SearchHit[]>("/v1/rag/search", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}

export function useZongshiAsk() {
  return useMutation({
    mutationFn: (body: { query: string; kb_ids: string[] }) =>
      apiCall<{ answer: string; citations: SearchHit[] }>("/v1/rag/ask", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  });
}
