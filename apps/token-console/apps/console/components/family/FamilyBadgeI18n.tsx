/*
 * @Module : components/family/FamilyBadgeI18n — 国际化家人徽章
 * @Family-Owner : 🧠 元启·天枢
 */
"use client";

import { useTranslations } from "next-intl";
import type { MemberKey } from "@/lib/family/members";

export function FamilyBadgeI18n({ member }: { member: MemberKey }) {
  const t = useTranslations(`family.members.${member}`);
  return (
    <div data-family={member}>
      {t("name")} · {t("role")}
    </div>
  );
}
