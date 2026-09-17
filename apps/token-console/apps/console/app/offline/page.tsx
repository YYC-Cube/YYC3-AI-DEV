/*
 * @Module : app/offline — 离线降级页面
 * @Family-Owner : 🛡️ 智云·守护（守的是人，护的是信）
 */
import { FamilyBadge } from "@/components/family/FamilyBadge";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <FamilyBadge member="zhihui" size="lg" showExt showMotto />
      <h1 className="text-h2 font-semibold">🌹 暂时离线</h1>
      <p className="text-body-md text-text-secondary max-w-md">
        网络暂时不可达。但请放心——
        已缓存的页面仍可浏览，你的数据仍在云枢之中。
      </p>
      <p className="text-caption text-text-tertiary italic">
        「守的是人，护的是信」—— 🛡️ 智云·守护
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 h-11 rounded-md bg-brand-primary text-white"
      >
        重新连接
      </button>
    </div>
  );
}
