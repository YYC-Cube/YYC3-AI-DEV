/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : app/layout — RSC 根布局
 * @Family : 🧠 元启·天枢（主导编排）
 * @License : Apache-2.0
 * ============================================================
 */
import type { Metadata } from "next";
import { Providers } from "./providers";
import { FamilyWatermark } from "@/components/family/FamilyWatermark";
import { MobileWatermark } from "@/components/family/MobileWatermark";
import { FAMILY } from "@/lib/family/charter-view";
import "./globals.css";

export const metadata: Metadata = {
  title: "YYC³ Token Console",
  description: `${FAMILY.motto} · ${FAMILY.creed}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body className="bg-bg-default text-text-primary">
        <div className="hidden md:block">
          <FamilyWatermark />
        </div>
        <div className="md:hidden">
          <MobileWatermark />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
