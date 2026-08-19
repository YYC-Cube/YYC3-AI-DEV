import { Crown } from "lucide-react";
import type { SystemRegistration } from "@yyc3/shell";
import { DYNASTY_HUB_COMMANDS } from "./agents";

export function register(): SystemRegistration {
  return {
    id: "dynasty",
    name: "王朝治理",
    description: "三省六部 · 古文化渊源 · 智能新范式",
    icon: Crown,
    color: "#C9A96E",
    order: 35,

    menuItems: [
      { path: "/dynasty",          label: "朝堂大厅" },
      { path: "/dynasty/court",    label: "三省六部" },
      { path: "/dynasty/edict",    label: "旨意板" },
      { path: "/dynasty/timeline", label: "十三王朝" },
      { path: "/dynasty/honors",   label: "勋章墙" },
      { path: "/dynasty/skills",   label: "中华 Skills" },
    ],

    routes: [
      { index: true,  lazy: async () => ({ Component: (await import("./pages/CourtHall")).default }) },
      { path: "court",    lazy: async () => ({ Component: (await import("./pages/CourtHall")).default }) },
      { path: "edict",    lazy: async () => ({ Component: (await import("./pages/EdictBoard")).default }) },
      { path: "timeline", lazy: async () => ({ Component: (await import("./pages/DynastyTimeline")).default }) },
      { path: "honors",   lazy: async () => ({ Component: (await import("./pages/HonorWall")).default }) },
      { path: "skills",   lazy: async () => ({ Component: (await import("./pages/DynastySkills")).default }) },
    ],

    hubCommands: DYNASTY_HUB_COMMANDS,
  };
}
