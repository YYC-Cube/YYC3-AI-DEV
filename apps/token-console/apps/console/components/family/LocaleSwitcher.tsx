/*
 * @Module : components/family/LocaleSwitcher — 语言切换
 * @Family-Owner : 🧭 言启·千行
 */
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  "zh-CN": "🇨🇳 中文",
  en: "🇺🇸 English",
  ja: "🇯🇵 日本語",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      className="h-9 px-2 rounded-md border border-border-default bg-bg-subtle text-body-sm"
      aria-label="切换语言"
    >
      {routing.locales.map((l: string) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  );
}
