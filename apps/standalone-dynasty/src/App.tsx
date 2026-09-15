/**
 * @file: App.tsx
 * @description: Dynasty 独立版 — 古文化版 · 页面互联 · Hub 命令可执行
 */
import React, { useState, useEffect, useRef } from "react";
import { WelcomePage, AIAssistantHub, storage, StorageKeys, eventBus } from "@yyc3/shell";
import { THEME_ANCIENT, DYNASTY_STYLES } from "@yyc3/shell";
import {
  DYNASTY_HUB_COMMANDS, DYNASTY_AGENTS, DynastyEvents,
  issueEdict, approveMemorial, rejectMemorial, submitReport, DynastyWorkflow,
  getPersonaMock, getRandomDynastyQuote, getAgentDisplayName,
  CourtHall, EdictBoard, DynastyTimeline, HonorWall, DynastySkills,
} from "@yyc3/plugin-dynasty";
import { Crown, Activity, Sparkles, Award, BookOpen, Gavel, Gem, Scroll, Home, LayoutGrid } from "lucide-react";

const T = THEME_ANCIENT;
const S = DYNASTY_STYLES;

type DynastyPage = "home" | "court" | "edict" | "timeline" | "honors" | "skills";

const NAV_ITEMS: { key: DynastyPage; label: string; icon: typeof Crown }[] = [
  { key: "home",  label: "首",   icon: Home as any },
  { key: "court", label: "朝堂", icon: Crown },
  { key: "edict", label: "旨意", icon: Scroll },
  { key: "timeline", label: "王朝", icon: LayoutGrid },
  { key: "honors", label: "勋章", icon: Award },
  { key: "skills", label: "技能", icon: BookOpen },
];

const SYSTEM_CARDS = [{
  id: "dynasty", name: "王朝治理", description: "三省六部 · 古文化渊源",
  icon: Crown, color: T.accent, path: "/dynasty",
}];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(!storage.shell.get(StorageKeys.SHELL_WELCOME_DISMISSED, false));
  const [activePage, setActivePage] = useState<DynastyPage>("home");
  const [activeAgent, setActiveAgent] = useState("emperor");
  const workflowRef = useRef<DynastyWorkflow | null>(null);

  useEffect(() => {
    workflowRef.current = new DynastyWorkflow();
    return () => workflowRef.current?.destroy();
  }, []);

  // Hub 命令 — 连接真实动作
  const hubCommands = DYNASTY_HUB_COMMANDS.map(cmd => {
    if (cmd.id === "d-court" || cmd.id === "d-edict") return { ...cmd, action: () => setActivePage(cmd.id === "d-court" ? "court" : "edict") };
    return cmd;
  });

  if (showWelcome) return (
    <WelcomePage systems={SYSTEM_CARDS} mode="modal" onNavigate={() => setShowWelcome(false)}
      familySummary={`Dynasty 王朝 · ${DYNASTY_AGENTS.length} 位朝臣 · 三省六部制`} />
  );

  const currentAgent = DYNASTY_AGENTS.find(a => a.id === activeAgent);

  return (
    <div className="min-h-screen" style={{ background: S.inkGradient }}>
      {/* Hub 浮窗 — 古文化版 + 命令可导航 */}
      <AIAssistantHub systemId="dynasty" title="王朝治理" accentColor={T.accent}
        themeMode="ancient" commands={hubCommands}
        customMock={getPersonaMock(activeAgent)}
        extraPrompts={[{ id: "dp-a", name: "御用批答", prompt: "汝乃YYC³王朝治理体系，三省以治，六部以行。", category: "治" }]} />

      {/* 顶部导航栏 */}
      <div className="flex items-center justify-center gap-1 py-1 border-b"
        style={{ background: "rgba(30,24,14,0.8)", borderColor: "rgba(201,169,110,0.1)", backdropFilter: "blur(10px)" }}>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => setActivePage(item.key)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-all"
              style={{
                background: activePage === item.key ? "rgba(201,169,110,0.12)" : "transparent",
                color: activePage === item.key ? "#C9A96E" : "rgba(201,169,110,0.4)",
                fontFamily: S.sealHeading.fontFamily,
              }}>
              <Icon size={13} /> {item.label}
            </button>
          );
        })}
        <div className="ml-4 pl-4 flex items-center gap-1" style={{ borderLeft: "1px solid rgba(201,169,110,0.1)" }}>
          {DYNASTY_AGENTS.slice(0, 8).map(a => {
            const Icon = a.icon;
            const isActive = activeAgent === a.id;
            return (
              <button key={a.id} onClick={() => setActiveAgent(a.id)} title={getAgentDisplayName(a.id)}
                className="w-6 h-6 rounded flex items-center justify-center transition-all"
                style={{ background: isActive ? `${a.color}22` : "transparent", border: `1px solid ${isActive ? a.color : "transparent"}` }}>
                <Icon size={11} style={{ color: isActive ? a.color : "rgba(201,169,110,0.3)" }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 页面内容 */}
      <div className="min-h-screen">
        {activePage === "home" && <HomePage onNavigate={setActivePage} />}
        {activePage === "court" && <CourtHall />}
        {activePage === "edict" && <EdictBoard />}
        {activePage === "timeline" && <DynastyTimeline />}
        {activePage === "honors" && <HonorWall />}
        {activePage === "skills" && <DynastySkills />}
      </div>
    </div>
  );
}

/** 首页 — 快捷入口 + 当前状态 */
function HomePage({ onNavigate }: { onNavigate: (p: DynastyPage) => void }) {
  const [taskCount] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-6" style={{ paddingTop: "8vh" }}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #C9A96E, #8B6914)", boxShadow: "0 0 30px rgba(201,169,110,0.25)", border: "2px solid rgba(201,169,110,0.3)" }}>
          <Gem className="w-8 h-8 text-amber-50" />
        </div>
        <h1 className="text-2xl font-bold tracking-[0.3em]" style={{ ...S.sealHeading, color: T.accent }}>
          YYC³ Dynasty
        </h1>
        <p className="text-sm mt-2 italic" style={{ color: T.textSecondary }}>古文化渊源 · 智能新范式</p>
        <div className="mt-3 w-32 h-px mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${T.accent}33, transparent)` }} />
        <p className="mt-2 text-xs italic" style={{ color: T.textMuted }}>《{getRandomDynastyQuote()}》</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {[
          { key: "court" as DynastyPage, label: "朝堂", icon: Crown, desc: "12位朝臣看板" },
          { key: "edict" as DynastyPage, label: "旨意", icon: Scroll, desc: "敕令六段流转" },
          { key: "timeline" as DynastyPage, label: "十三朝", icon: BookOpen, desc: "26项Skills" },
          { key: "honors" as DynastyPage, label: "勋章", icon: Award, desc: "17种勋章" },
          { key: "skills" as DynastyPage, label: "技能", icon: Activity, desc: "6项文化技能" },
          { key: "edict" as DynastyPage, label: "上朝", icon: Gavel, desc: "发起新敕令", onClick: () => onNavigate("edict") },
        ].map(btn => {
          const Icon = btn.icon;
          return (
            <button key={btn.label} onClick={() => btn.onClick ? (btn.onClick(), onNavigate(btn.key)) : onNavigate(btn.key)}
              className="p-4 rounded-xl text-center transition-all hover:scale-105"
              style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.12)", fontFamily: S.sealHeading.fontFamily }}>
              <Icon size={20} style={{ color: T.accent, margin: "0 auto 6px" }} />
              <p className="text-sm font-medium" style={{ color: T.textPrimary }}>{btn.label}</p>
              <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>{btn.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="text-center text-xs" style={{ color: T.textMuted }}>
        {DYNASTY_AGENTS.length} 位朝臣 · AI Family + Dynasty 双架构
      </div>
    </div>
  );
}
