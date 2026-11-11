/**
 * @file: DesignSystemPage.tsx
 * @description: YYC³ 设计系统总览 — @yyc3/ui 基础件 + @yyc3/theme 令牌实测页
 *
 * 用途:
 * 1. 作为 UI/UX 基线页，新增组件先在此登记再进入业务页面
 * 2. 逐项验证按钮/表单/反馈/数据展示/品牌件的视觉与交互
 */
import { Alert, AlertDescription, AlertTitle } from "@yyc3/ui/alert";
import { Avatar, AvatarFallback } from "@yyc3/ui/avatar";
import { Badge } from "@yyc3/ui/badge";
import { GlassCard } from "@yyc3/ui/brand/GlassCard";
import { YYC3Logo } from "@yyc3/ui/brand/YYC3Logo";
import { Button } from "@yyc3/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@yyc3/ui/card";
import { Checkbox } from "@yyc3/ui/checkbox";
import { Input } from "@yyc3/ui/input";
import { Label } from "@yyc3/ui/label";
import { Progress } from "@yyc3/ui/progress";
import { Separator } from "@yyc3/ui/separator";
import { Skeleton } from "@yyc3/ui/skeleton";
import { Switch } from "@yyc3/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@yyc3/ui/tabs";
import { Textarea } from "@yyc3/ui/textarea";
import { Check, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";

const BUTTON_VARIANTS = ["default", "secondary", "destructive", "outline", "ghost", "link"] as const;
const BUTTON_SIZES = ["sm", "default", "lg"] as const;

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-[#e0f0ff] text-lg font-semibold tracking-wide">{title}</h2>
        {desc && <p className="text-[rgba(224,240,255,0.45)] text-xs mt-1">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [switched, setSwitched] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto space-y-10">
      <header className="flex items-center gap-4">
        <YYC3Logo size="lg" />
        <div>
          <h1 className="text-[#e0f0ff] text-2xl font-bold tracking-widest">YYC³ Design System</h1>
          <p className="text-[rgba(224,240,255,0.45)] text-sm mt-1">
            @yyc3/ui 基础件 + @yyc3/theme 令牌 · 新增组件先在此登记
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">
          v0.1.0
        </Badge>
      </header>

      <Tabs defaultValue="button">
        <TabsList>
          <TabsTrigger value="button">按钮</TabsTrigger>
          <TabsTrigger value="form">表单</TabsTrigger>
          <TabsTrigger value="feedback">反馈</TabsTrigger>
          <TabsTrigger value="data">数据展示</TabsTrigger>
          <TabsTrigger value="brand">品牌</TabsTrigger>
        </TabsList>

        <TabsContent value="button" className="pt-6">
          <Section title="按钮变体" desc="variant × size 全量组合；图标按钮使用 icon 尺寸">
            <div className="space-y-4">
              {BUTTON_SIZES.map((size) => (
                <div key={size} className="flex flex-wrap items-center gap-3">
                  <span className="w-16 text-[rgba(224,240,255,0.4)] text-xs">{size}</span>
                  {BUTTON_VARIANTS.map((variant) => (
                    <Button key={variant} variant={variant} size={size}>
                      {variant}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <Plus /> 新建
              </Button>
              <Button variant="secondary">
                <Sparkles /> AI 生成
              </Button>
              <Button variant="outline">
                <Check /> 确认
              </Button>
              <Button variant="destructive">
                <Trash2 /> 删除
              </Button>
              <Button disabled>
                <Loader2 className="animate-spin" /> 处理中
              </Button>
              <Button size="icon" aria-label="新增">
                <Plus />
              </Button>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="form" className="pt-6">
          <Section title="表单控件" desc="输入框 / 文本域 / 开关 / 复选框">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ds-name">名称</Label>
                <Input id="ds-name" placeholder="请输入名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-key">密钥</Label>
                <Input id="ds-key" type="password" placeholder="sk-..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ds-desc">描述</Label>
                <Textarea id="ds-desc" placeholder="补充说明…" rows={3} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8 pt-2">
              <div className="flex items-center gap-3">
                <Switch id="ds-switch" checked={switched} onCheckedChange={setSwitched} />
                <Label htmlFor="ds-switch">启用实时同步</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="ds-check" checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} />
                <Label htmlFor="ds-check">记住本次选择</Label>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="feedback" className="pt-6">
          <Section title="状态与反馈" desc="Alert / Badge / Progress / Skeleton">
            <Alert>
              <Sparkles />
              <AlertTitle>提示</AlertTitle>
              <AlertDescription>当前为设计系统演示数据，接入业务后由真实状态驱动。</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>风险</AlertTitle>
              <AlertDescription>该操作不可撤销，请确认影响范围。</AlertDescription>
            </Alert>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>默认</Badge>
              <Badge variant="secondary">次要</Badge>
              <Badge variant="outline">描边</Badge>
              <Badge variant="destructive">高危</Badge>
            </div>
            <div className="space-y-3">
              <Progress value={72} />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 flex-1" />
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="data" className="pt-6">
          <Section title="数据展示" desc="Card / Avatar / Separator">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>目标量化</CardTitle>
                  <CardDescription>年度营收 X 公式</CardDescription>
                </CardHeader>
                <CardContent className="text-[rgba(224,240,255,0.6)] text-sm">
                  基数 × 城市系数 × 规模系数 × 增速系数 × 调整系数
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">计算</Button>
                  <Button size="sm" variant="ghost">
                    查看明细
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>成员</CardTitle>
                  <CardDescription>AI Family 在线状态</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  {["元枢", "智枢", "言枢", "守枢"].map((name, i) => (
                    <Avatar key={name}>
                      <AvatarFallback style={{ background: `${["#00FF88", "#00d4ff", "#AA55FF", "#FF6600"][i]}22` }}>
                        {name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="text-[rgba(224,240,255,0.45)] text-xs">+4</span>
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="brand" className="pt-6">
          <Section title="品牌件" desc="GlassCard / YYC3Logo">
            <div className="grid gap-4 md:grid-cols-2">
              <GlassCard className="p-6 space-y-3">
                <h3 className="text-[#e0f0ff] font-medium">GlassCard</h3>
                <p className="text-[rgba(224,240,255,0.45)] text-sm">
                  毛玻璃容器，用于浮层、指标卡与中枢面板。
                </p>
                <Button size="sm" variant="outline">
                  查看用法
                </Button>
              </GlassCard>
              <GlassCard className="p-6 flex flex-col items-center justify-center gap-3">
                <YYC3Logo size="xl" />
                <span className="text-[rgba(224,240,255,0.45)] text-xs">YYC³ · YanYuCloudCube™</span>
              </GlassCard>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
