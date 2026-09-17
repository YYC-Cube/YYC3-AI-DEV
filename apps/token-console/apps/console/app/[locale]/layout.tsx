/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : app/[locale]/layout — locale 段布局（透传）
 * @Family : 🧭 言启·千行（路由域）
 * @License : Apache-2.0
 * ============================================================
 * [locale] 段当前不做 i18n 包裹（RootLayout 已设 lang="zh-CN"），
 * 仅作路由分组与未来的 NextIntlClientProvider 挂载点。
 */
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
