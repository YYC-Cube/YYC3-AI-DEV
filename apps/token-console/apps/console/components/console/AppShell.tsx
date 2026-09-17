/*
 * @Module : components/console/AppShell — 全局壳（侧边栏 + 主内容）
 * @Family : 🧠 元启·天枢（主导编排）
 */
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* 桌面：常驻侧边栏 */}
      <aside className="hidden lg:block shrink-0">
        <Sidebar />
      </aside>

      {/* 平板/移动：抽屉式侧边栏 */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-bg-overlay/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-bg-subtle transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar onNavigate={() => setOpen(false)} />
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        {/* 顶栏 + 汉堡菜单（<lg 显示） */}
        <header className="lg:hidden flex items-center gap-2 px-4 h-12 border-b border-border-default">
          <button
            onClick={() => setOpen(true)}
            aria-label="打开导航"
            className="w-10 h-10 flex items-center justify-center rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-body-sm font-medium">YYC³ Console</span>
        </header>
        <div className="flex-1 min-w-0">{children}</div>
      </main>
    </div>
  );
}
