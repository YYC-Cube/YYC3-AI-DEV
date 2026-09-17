/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : components/family/PageHeader — 页头（纯展示 RSC）
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 */
export function PageHeader({
  title,
  subtitle,
  alignment,
}: {
  title: string;
  subtitle?: string;
  /** 对齐状态徽标，如 ✅ */
  alignment?: string;
}) {
  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm opacity-70">{subtitle}</p> : null}
      </div>
      {alignment ? (
        <span className="rounded-full border px-2.5 py-0.5 text-xs opacity-80">{alignment}</span>
      ) : null}
    </header>
  );
}
