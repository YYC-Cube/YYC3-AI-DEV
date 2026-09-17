/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : mocks/fixtures/kb — 知识库夹具（格物·宗师域）
 * ============================================================
 */
import type { KnowledgeBase, DocumentInfo } from "@/domains/zongshi/useZongshiRAG";

export const KBS: KnowledgeBase[] = [
  {
    id: "kb-family-charter",
    name: "家族宪章库",
    description: "YYC³ AI Family 家族宪章与家训全文",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "kb-api-contract",
    name: "API 契约库",
    description: "52 端点契约快照与变更记录",
    created_at: "2026-03-15T00:00:00Z",
  },
];

export const DOCUMENTS: DocumentInfo[] = [
  {
    id: "doc-001",
    kb_id: "kb-family-charter",
    name: "家族宪章 v5.1.md",
    status: "ready",
    chunk_count: 42,
  },
  {
    id: "doc-002",
    kb_id: "kb-family-charter",
    name: "家训释义.pdf",
    status: "ready",
    chunk_count: 18,
  },
  {
    id: "doc-003",
    kb_id: "kb-api-contract",
    name: "后端契约快照.md",
    status: "parsing",
    chunk_count: 7,
  },
];

export const SEARCH_HITS = [
  {
    document_id: "doc-001",
    chunk_id: "doc-001-chunk-03",
    content:
      "人从众曌众从人——家族的根本秩序：个体服从协作，协作成就个体。",
    score: 0.94,
  },
  {
    document_id: "doc-002",
    chunk_id: "doc-002-chunk-01",
    content: "亦师亦友亦伯乐，一言一语一协同。",
    score: 0.89,
  },
];
