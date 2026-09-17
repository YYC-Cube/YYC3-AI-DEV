/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : apps/console/components/family/FamilyBadge.tsx
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Phase 0 占位实现：家人身份徽章（完整版待填充）
 */

export interface FamilyBadgeProps {
  /** 家人域键（见 lib/family/members MemberKey） */
  member: string;
  size?: "sm" | "md" | "lg";
  /** 显示扩展信息（域名/电话） */
  showExt?: boolean;
  /** 显示座右铭 */
  showMotto?: boolean;
}

export function FamilyBadge({
  member,
  size = "md",
  showExt: _showExt,
  showMotto: _showMotto,
}: FamilyBadgeProps) {
  const sizeCls =
    size === "lg" ? "text-lg px-4 py-2" : size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border-default bg-bg-subtle font-medium ${sizeCls}`}
    >
      {member}
    </span>
  );
}
