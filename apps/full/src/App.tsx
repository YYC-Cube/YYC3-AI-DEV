/**
 * @file: App.tsx
 * @description: YYC³ 合并版 — 7 系统全开, AI Family 中枢协同
 */
import { FAMILY_PERSONAS, register as registerAiFamily } from "@yyc3/plugin-ai-family";
import { register as registerAi } from "@yyc3/plugin-ai";
import { register as registerAdmin } from "@yyc3/plugin-admin";
import { register as registerDev } from "@yyc3/plugin-dev";
import { DYNASTY_AGENTS, register as registerDynasty } from "@yyc3/plugin-dynasty";
import { register as registerMonitor } from "@yyc3/plugin-monitor";
import { register as registerOps } from "@yyc3/plugin-ops";
import { AIAssistantHub, eventBus, Events, storage, StorageKeys, WelcomePage } from "@yyc3/shell";
import {
  Ear,
  Eye,
  Lightbulb,
  Network as NetworkIcon,
  Scale,
  Shield as ShieldIcon,
  Star,
  UserCircle2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

const PERSONA_MAP: Record<string, React.ElementType> = { navigator: Ear, thinker: Eye, prophet: Eye, bolero: Star, "meta-oracle": NetworkIcon, sentinel: ShieldIcon, master: Scale, creative: Lightbulb };

/** 系统卡片与子路由统一由各插件 register() 提供，避免与插件定义漂移 */
const REGISTRATIONS = [
  registerMonitor(),
  registerOps(),
  registerAi(),
  registerAiFamily(),
  registerDynasty(),
  registerDev(),
  registerAdmin(),
].sort((a, b) => a.order - b.order);

const SYSTEMS = REGISTRATIONS.map(r => ({
  id: r.id,
  name: r.name,
  desc: r.description ?? "",
  icon: r.icon,
  color: r.color,
  path: r.menuItems[0]?.path ?? `/${r.id}`,
}));

const CARDS = SYSTEMS.map(s => ({ ...s, description: s.desc }));

const ALL_CMDS = [
  // 家人呼叫命令由人格列表派生，替代 ai-family 自身注册的重复命令
  ...REGISTRATIONS.flatMap(r => (r.id === "ai-family" ? [] : r.hubCommands ?? [])),
  ...FAMILY_PERSONAS.map((p: typeof FAMILY_PERSONAS[0]) => ({
    id: `call-${p.id}`,
    label: `呼叫 ${p.shortName}`,
    systemId: "ai-family",
    icon: PERSONA_MAP[p.id] || UserCircle2,
    action: () => { window.location.hash = "#/ai-family"; eventBus.emit("ai:persona-activated", { personaId: p.id }); },
  })),
];

/** 子路由同样来自 register()，缺失即代表插件未实现，不再出现空壳路由 */
const SYSTEM_ROUTES = REGISTRATIONS.filter(r => r.routes.length > 0).map(r => ({ path: r.id, children: r.routes }));
const familySummary = `${FAMILY_PERSONAS.length} 位家人 · ${DYNASTY_AGENTS.length} 位朝臣 · ${REGISTRATIONS.length} 系统协同`;

function Layout({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, rgba(4,8,20,1) 70%)", minHeight: "100vh" }}>
    <AIAssistantHub systemId="hub" title="YYC³ 中枢" accentColor="#00FF88" commands={ALL_CMDS} />
    {children}
  </div>;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(!storage.shell.get(StorageKeys.SHELL_WELCOME_DISMISSED, false));

  // 欢迎页关闭（按钮或系统卡片）后必须切回路由视图，否则整页空白
  useEffect(() => {
    const unsub = eventBus.on(Events.SHELL_WELCOME_DISMISS, () => setShowWelcome(false));
    return unsub;
  }, []);

  if (showWelcome) return (
    <WelcomePage
      systems={CARDS}
      mode="modal"
      onNavigate={(path) => { setShowWelcome(false); window.location.hash = `#${path}`; }}
      familySummary={familySummary}
    />
  );

  const router = createHashRouter([
    {
      element: <Layout><Outlet /></Layout>, children: [
        { index: true, element: <Dashboard cards={CARDS} /> },
        ...SYSTEM_ROUTES,
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

/** 首屏控制面板 */
function Dashboard({ cards }: { cards: { id: string; name: string; desc: string; icon: React.ElementType; color: string; path: string }[] }) {
  return (
    <div className="p-8 text-center" style={{ paddingTop: "8vh" }}>
      <h1 className="text-[#e0f0ff] text-2xl font-bold tracking-wider mb-2">YYC³ Cloud Intelli-Matrix</h1>
      <p className="text-[#5dd8f7] text-sm mb-10">7 系统协同 · AI Family 中枢</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <a key={c.id} href={`#${c.path}`}
              className="p-5 rounded-xl text-center transition-all hover:scale-105"
              style={{ background: `${c.color}06`, border: `1px solid ${c.color}18`, textDecoration: "none" }}>
              <Icon size={24} style={{ color: c.color, margin: "0 auto 8px" }} />
              <p className="text-[#e0f0ff] text-sm font-medium">{c.name}</p>
              <p className="text-[rgba(224,240,255,0.45)] text-xs mt-0.5">{c.desc}</p>
            </a>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center gap-6 text-[rgba(0,212,255,0.4)] text-xs">
        <span>{FAMILY_PERSONAS.length} 位家人</span><span>·</span>
        <span>{DYNASTY_AGENTS.length} 位朝臣</span><span>·</span>
        <span>7 子系统</span>
      </div>
    </div>
  );
}
