/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Module : figma/FamilyBadge.figma — 家人徽章 Code Connect
 * @Family-Owner : 🧠 元启·天枢
 * @Source : Figma > 00_Cover > FamilyBadge
 * ============================================================
 * Template API（2026 新规范）
 * Storybook 集成：连接后 Dev Mode 直接显示 Storybook 故事
 * ============================================================
 */
import figma from "figma";
import { FamilyBadge } from "@/components/family/FamilyBadge";

figma.connect(
  FamilyBadge,
  "https://www.figma.com/file/YYC3_TOKEN_CONSOLE/00_Cover?node-id=family-badge",
  {
    props: {
      member: figma.enum("Member", {
        Zhihui: "zhihui",
        Qianhang: "qianhang",
        Bole: "bole",
        Wanyu: "wanyu",
        Zongshi: "zongshi",
        Tianshu: "tianshu",
        Xianzhi: "xianzhi",
        Lingyun: "lingyun",
      }),
      size: figma.enum("Size", {
        Small: "sm",
        Medium: "md",
        Large: "lg",
      }),
      showExt: figma.boolean("Show Extension"),
      showMotto: figma.boolean("Show Motto"),
    },
    example: ({ member, size, showExt, showMotto }) => (
      <FamilyBadge
        member={member}
        size={size}
        showExt={showExt}
        showMotto={showMotto}
      />
    ),
    // Storybook 集成（新规范支持）
    storybook: {
      id: "🌹-family-familybadge--all-members",
    },
  },
);
