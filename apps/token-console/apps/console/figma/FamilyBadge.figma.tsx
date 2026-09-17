/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Module : figma/FamilyBadge.figma — 家人徽章 Code Connect
 * @Family-Owner : 🧠 元启·天枢
 * @Source : Figma > 00_Cover > FamilyBadge
 * ============================================================
 * Figma Code Connect（@figma/code-connect）
 * 注：需安装 figma 依赖后由 Figma 桌面端消费，不参与 Next.js 构建
 * ============================================================
 */
// @ts-nocheck — Code Connect 文件由 Figma 工具链消费，运行时尚无 figma 类型包
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
  },
);
