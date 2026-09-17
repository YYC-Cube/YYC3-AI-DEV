/*
 * @Module : components/console/Sidebar — 8 域导航
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE_MEMBER_MAP, MEMBERS } from "@/lib/family/members";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "连接", key: "zhihui" as const },
  { href: "/dashboard", label: "仪表盘", key: "xianzhi" as const },
  { href: "/models", label: "模型市场", key: "bole" as const },
  { href: "/playground", label: "Playground", key: "wanyu" as const },
  { href: "/routing", label: "路由观测", key: "qianhang" as const },
  { href: "/knowledge", label: "知识库", key: "zongshi" as const },
  { href: "/mcp", label: "MCP 工具", key: "tianshu" as const },
  { href: "/cache", label: "缓存管理", key: "lingyun" as const },
  { href: "/monitor", label: "监控日志", key: "xianzhi" as const },
  { href: "/settings", label: "设置", key: "zhihui" as const },
  { href: "/docs", label: "API 文档", key: "lingyun" as const },
  { href: "/roadmap", label: "Roadmap", key: "tianshu" as const },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="w-60 border-r border-border-default bg-bg-subtle p-3 space-y-1">
      {NAV.map((item) => {
        const member = MEMBERS[item.key];
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-body-sm transition-colors",
              active
                ? "bg-brand-primary text-white"
                : "hover:bg-bg-elevated text-text-secondary",
            )}
          >
            <span>{member.emoji}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
