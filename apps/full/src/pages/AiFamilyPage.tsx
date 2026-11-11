/**
 * @file: AiFamilyPage.tsx
 * @description: AI Family 新版工作台 — 成员 / 对话 / 技能 / 设置 四视图
 *
 * 定位:
 * - 结构完整、可交互的 UI 基线，业务能力（真实 LLM、记忆、任务）逐项接入
 * - 组件统一取自 @yyc3/ui，令牌取自 @yyc3/theme，避免自绘控件
 */
import { Avatar, AvatarFallback } from "@yyc3/ui/avatar";
import { Badge } from "@yyc3/ui/badge";
import { Button } from "@yyc3/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@yyc3/ui/card";
import { Input } from "@yyc3/ui/input";
import { Label } from "@yyc3/ui/label";
import { Progress } from "@yyc3/ui/progress";
import { Separator } from "@yyc3/ui/separator";
import { Switch } from "@yyc3/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@yyc3/ui/tabs";
import { FAMILY_PERSONAS } from "@yyc3/plugin-ai-family";
import { eventBus } from "@yyc3/shell";
import { Send, Sparkles, Users } from "lucide-react";
import React, { useCallback, useState } from "react";

interface ChatItem {
  id: number;
  role: "user" | "family";
  name?: string;
  content: string;
}

const SKILLS = [
  { name: "目标推演", owner: "智枢", desc: "年度营收 X 公式与三阶段拆解" },
  { name: "成本诊断", owner: "算枢", desc: "盈亏平衡、敏感性分析与预警" },
  { name: "节日营销", owner: "言枢", desc: "农历节日日历与营销动作编排" },
  { name: "知识检索", owner: "记枢", desc: "历史会话与经营数据的语义召回" },
  { name: "安全巡检", owner: "守枢", desc: "权限、密钥与依赖风险核查" },
  { name: "内容创作", owner: "视枢", desc: "文案、海报与多模态素材生成" },
];

export default function AiFamilyPage() {
  const [activeId, setActiveId] = useState<string>(FAMILY_PERSONAS[0]?.id ?? "");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [voice, setVoice] = useState(false);
  const [autoRoute, setAutoRoute] = useState(true);
  const [messages, setMessages] = useState<ChatItem[]>([
    { id: 1, role: "family", name: "元枢", content: "家族已就绪，8 位家人待命中。需要我先看哪块数据？" },
  ]);

  const active = FAMILY_PERSONAS.find((p) => p.id === activeId) ?? FAMILY_PERSONAS[0];
  const onlineCount = FAMILY_PERSONAS.filter((p) => p.mood !== "idle").length;

  const call = useCallback((personaId: string) => {
    setActiveId(personaId);
    eventBus.emit("ai:persona-activated", { personaId });
  }, []);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: text }]);
    // 演示回复：接入 plugin-llm 后替换为真实流式响应
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "family",
          name: active?.shortName ?? "元枢",
          content: `已收到「${text}」。当前为界面演示回复，接入模型网关后由 ${active?.shortName ?? "元枢"} 实时作答。`,
        },
      ]);
      setSending(false);
    }, 600);
  }, [active, input, sending]);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto space-y-6">
      <header className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)" }}
        >
          <Users className="w-6 h-6" style={{ color: "#00FF88" }} />
        </div>
        <div>
          <h1 className="text-[#e0f0ff] text-2xl font-bold tracking-widest">AI Family 工作台</h1>
          <p className="text-[rgba(224,240,255,0.45)] text-sm mt-1">
            {FAMILY_PERSONAS.length} 位家人 · {onlineCount} 人在线 · 中枢协同
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">
          {onlineCount}/{FAMILY_PERSONAS.length} 在线
        </Badge>
      </header>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">成员</TabsTrigger>
          <TabsTrigger value="chat">对话</TabsTrigger>
          <TabsTrigger value="skills">技能</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="pt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FAMILY_PERSONAS.map((p) => {
              const isActive = p.id === activeId;
              return (
                <Card
                  key={p.id}
                  className="cursor-pointer transition-colors"
                  style={{
                    borderColor: isActive ? p.color : "rgba(0,180,255,0.15)",
                    background: isActive ? `${p.color}0d` : undefined,
                  }}
                  onClick={() => call(p.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback style={{ background: `${p.color}22`, color: p.color }}>
                          {p.shortName.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm" style={{ color: p.color }}>
                          {p.shortName}
                        </CardTitle>
                        <CardDescription className="text-[0.65rem]">{p.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-[rgba(224,240,255,0.5)] text-xs leading-5 line-clamp-2">{p.personality}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.expertise.slice(0, 2).map((e: string) => (
                        <Badge key={e} variant="outline" className="text-[0.6rem]">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="pt-6">
          <Card className="flex flex-col h-[520px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="size-4" style={{ color: active?.color }} />
                {active?.shortName} · {active?.role}
              </CardTitle>
              <CardDescription>当前为界面演示回复，模型网关接入后自动切换真实流式</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
              <div className="flex-1 overflow-auto space-y-3 pr-1">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className="max-w-[80%] px-3 py-2 rounded-xl text-sm"
                      style={{
                        background: m.role === "user" ? "rgba(0,212,255,0.12)" : "rgba(0,40,80,0.35)",
                        border: `1px solid ${m.role === "user" ? "rgba(0,212,255,0.25)" : "rgba(0,180,255,0.12)"}`,
                        color: "#d6e9f7",
                      }}
                    >
                      {m.name && <div className="text-[0.65rem] mb-1" style={{ color: active?.color }}>{m.name}</div>}
                      {m.content}
                    </div>
                  </div>
                ))}
                {sending && <div className="text-[rgba(224,240,255,0.4)] text-xs">正在输入…</div>}
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={`向 ${active?.shortName} 发送消息…`}
                />
                <Button onClick={send} disabled={sending || !input.trim()} size="icon" aria-label="发送">
                  <Send />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="pt-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <Card key={s.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{s.name}</CardTitle>
                  <CardDescription>{s.owner} 负责</CardDescription>
                </CardHeader>
                <CardContent className="text-[rgba(224,240,255,0.55)] text-xs">{s.desc}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="pt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">交互偏好</CardTitle>
              <CardDescription>设置仅保存在本机，后续接入账号体系后同步</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>语音播报</Label>
                  <p className="text-[rgba(224,240,255,0.4)] text-xs mt-1">家人回复时同步语音朗读</p>
                </div>
                <Switch checked={voice} onCheckedChange={setVoice} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>自动路由</Label>
                  <p className="text-[rgba(224,240,255,0.4)] text-xs mt-1">按问题类型自动选择最合适的家人</p>
                </div>
                <Switch checked={autoRoute} onCheckedChange={setAutoRoute} />
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[rgba(224,240,255,0.45)]">
                  <span>本月协同额度</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
