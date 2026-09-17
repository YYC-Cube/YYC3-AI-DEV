/*
 * @Module : app/[locale]/roadmap — 路线图
 * @Family : 🧠 元启·天枢
 */
import { PageHeader } from "@/components/family/PageHeader";

const PHASES = [
  { name: "Phase 0 · 骨架", status: "done", desc: "8 域路由 + MSW Mock + SSE 状态机" },
  { name: "BL-02 · 真实成本", status: "todo", desc: "后端补 cost_usd 计算（当前恒 0）" },
  { name: "BL-04 · SSE V2", status: "todo", desc: "request_id 全链路追踪" },
  { name: "BL-05 · API Keys CRUD", status: "todo", desc: "守护域密钥管理页" },
  { name: "BL-06 · 请求级日志", status: "todo", desc: "先知域用量明细" },
  { name: "Phase 1 · 全量", status: "todo", desc: "灰度开关 PHASE_1_ENABLED 全开" },
];

const BADGE = {
  done: "bg-status-success/15 text-status-success",
  todo: "bg-status-warning/15 text-status-warning",
} as const;

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="路线图" subtitle="言启千行，象限在望" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {PHASES.map((p) => (
          <article
            key={p.name}
            className="p-4 rounded-lg border border-border-default bg-bg-subtle space-y-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-body-md font-semibold">{p.name}</h2>
              <span className={`px-2 py-0.5 rounded text-caption ${BADGE[p.status as keyof typeof BADGE]}`}>
                {p.status === "done" ? "已完成" : "待启动"}
              </span>
            </div>
            <p className="text-caption text-text-tertiary">{p.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
