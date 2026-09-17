/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : components/family/FamilyWatermark — 桌面全屏水印
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * 桌面端（≥768px）显示：SVG 平铺 + 家训文案，纯 RSC 无交互
 */
export function FamilyWatermark() {
  return (
    <div
      id="family-watermark"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] select-none"
      style={{ opacity: 0.06 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wm" width="360" height="220" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
            <text x="12" y="48" fontSize="20" fill="currentColor" fontWeight="600">
              人从众曌众从人
            </text>
            <text x="12" y="78" fontSize="12" fill="currentColor" opacity="0.8">
              YYC³ AI Family · 亦师亦友亦伯乐
            </text>
            <text x="12" y="98" fontSize="12" fill="currentColor" opacity="0.8">
              一言一语一协同 · Apache-2.0
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wm)" />
      </svg>
    </div>
  );
}
