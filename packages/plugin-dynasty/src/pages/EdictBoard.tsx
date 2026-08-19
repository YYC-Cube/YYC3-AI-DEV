/**
 * @file: EdictBoard.tsx
 * @description: 旨意板 — 敕令流转实时看板 (六阶段可视化)
 */
import React, { useState, useEffect } from "react";
import { Scroll, Check, Loader2, RotateCcw, AlertTriangle, Award, Play } from "lucide-react";
import { eventBus } from "@yyc3/shell";
import { EDICT_STAGES, DynastyEvents, issueEdict, approveMemorial, rejectMemorial, submitReport } from "../edict-protocol";
import { DYNASTY_AGENTS } from "../agents";
import { DYNASTY_HONORS, getHonor } from "../honors";

interface EdictRecord {
  id: string;
  title: string;
  currentStage: number;
  agentId: string;
  logs: { time: string; stage: string; msg: string; honor?: string }[];
  blocked?: boolean;
  honor?: string;
}

export default function EdictBoard() {
  const [edicts, setEdicts] = useState<EdictRecord[]>([]);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const unsub = eventBus.on("dynasty:state:changed", (data: { edictId: string; stage: string; honor?: string; blocked?: boolean }) => {
      setEdicts(prev => {
        const now = new Date().toLocaleTimeString("zh-CN");
        return prev.map(e => {
          if (e.id !== data.edictId) return e;
          const stageIdx = EDICT_STAGES.findIndex(s => s.key === data.stage);
          return {
            ...e,
            currentStage: stageIdx >= 0 ? stageIdx + 1 : e.currentStage,
            honor: data.honor || e.honor,
            blocked: data.blocked || e.blocked,
            logs: [...e.logs, { time: now, stage: data.stage, msg: data.blocked ? "封驳" : "完成", honor: data.honor }],
          };
        });
      });
      setTaskCount(prev => prev + 1);
    });
    return unsub;
  }, []);

  const handleNewEdict = () => {
    const title = `敕令 #${taskCount + 1}`;
    const edict = issueEdict("emperor", title, { priority: "normal" });
    const eid = edict.payload.edictId!;
    const now = new Date().toLocaleTimeString("zh-CN");
    setEdicts(prev => [...prev, {
      id: eid, title, currentStage: 1, agentId: "emperor",
      logs: [{ time: now, stage: "issued", msg: "皇帝下旨" }],
    }]);

    // 自动流转
    setTimeout(() => {
      setEdicts(prev => prev.map(e => e.id === eid ? { ...e, currentStage: 2, logs: [...e.logs, { time: new Date().toLocaleTimeString("zh-CN"), stage: "drafting", msg: "中书草拟中" }] } : e));
    }, 1500);

    setTimeout(() => {
      if (Math.random() > 0.2) {
        approveMemorial("menxia", eid);
        setEdicts(prev => prev.map(e => e.id === eid ? { ...e, currentStage: 3, logs: [...e.logs, { time: new Date().toLocaleTimeString("zh-CN"), stage: "reviewing", msg: "准奏" }] } : e));
        setTimeout(() => {
          const ministry = ["hubu", "libu", "bingbu"][Math.floor(Math.random() * 3)];
          submitReport(ministry, eid, { success: true });
          const honor = DYNASTY_HONORS[Math.floor(Math.random() * 3)];
          setEdicts(prev => prev.map(e => e.id === eid ? { ...e, currentStage: 6, honor: honor?.name, logs: [...e.logs, { time: new Date().toLocaleTimeString("zh-CN"), stage: "reporting", msg: "回奏", honor: honor?.name }] } : e));
        }, 2000);
      } else {
        rejectMemorial("menxia", eid, "粮草不足");
        setEdicts(prev => prev.map(e => e.id === eid ? { ...e, currentStage: 2, blocked: true, logs: [...e.logs, { time: new Date().toLocaleTimeString("zh-CN"), stage: "reviewing", msg: "封驳" }] } : e));
      }
    }, 3000);
  };

  return (
    <div className="p-6" style={{ background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, rgba(4,8,20,1) 50%)", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <Scroll className="w-10 h-10 mx-auto mb-2" style={{ color: "#C9A96E" }} />
          <h1 className="text-xl font-bold tracking-[0.2em]" style={{ color: "#C9A96E" }}>旨 意 板</h1>
          <p className="text-xs mt-1" style={{ color: "rgba(201,169,110,0.4)" }}>敕令流转 · 三省六部 · 实时看板</p>
        </div>

        {/* 新建敕令 */}
        <div className="mb-6 text-center">
          <button onClick={handleNewEdict}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105"
            style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)", color: "#C9A96E" }}>
            <Play size={16} /> 发起新敕令
          </button>
          <p className="text-xs mt-2" style={{ color: "rgba(201,169,110,0.2)" }}>
            {edicts.length > 0 ? `${edicts.length} 条敕令 · 点击自动流转` : "点击发起一次三省六部敕令流转"}
          </p>
        </div>

        {/* 敕令列表 */}
        <div className="space-y-4">
          {edicts.map(edict => {
            const completed = edict.currentStage >= EDICT_STAGES.length - 1;
            return (
              <div key={edict.id} className="p-4 rounded-xl transition-all"
                style={{ background: completed ? "rgba(0,255,136,0.03)" : "rgba(201,169,110,0.03)", border: `1px solid ${completed ? "rgba(0,255,136,0.15)" : "rgba(201,169,110,0.1)"}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm" style={{ color: "#E8D5A3" }}>{edict.title}</span>
                    {edict.blocked && <AlertTriangle size={14} color="#FF3366" />}
                    {edict.honor && <Award size={14} color="#C9A96E" />}
                    {edict.honor && <span className="text-xs" style={{ color: "#C9A96E" }}>{edict.honor}</span>}
                  </div>
                  {completed && <Check size={16} color="#00FF88" />}
                  {!completed && !edict.blocked && <Loader2 size={16} className="animate-spin" style={{ color: "#C9A96E" }} />}
                </div>

                {/* 六阶段进度条 */}
                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  {EDICT_STAGES.slice(0, 7).map((stage, i) => {
                    const isDone = i < edict.currentStage - 1;
                    const isCurrent = i === edict.currentStage - 1;
                    const isRejected = edict.blocked && stage.key === "reviewing";
                    return (
                      <React.Fragment key={stage.key}>
                        {i > 0 && <span className="text-xs" style={{ color: "rgba(201,169,110,0.2)" }}>→</span>}
                        <div className={`px-2 py-1 rounded text-xs ${isDone ? "opacity-100" : isCurrent ? "opacity-100" : "opacity-30"}`}
                          style={{
                            background: isRejected ? "rgba(255,51,102,0.1)" : isDone ? "rgba(0,255,136,0.06)" : isCurrent ? "rgba(201,169,110,0.1)" : "transparent",
                            border: `1px solid ${isRejected ? "#FF3366" : isDone ? "#00FF88" : isCurrent ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                            color: isRejected ? "#FF3366" : isDone ? "#00FF88" : isCurrent ? "#C9A96E" : "rgba(201,169,110,0.3)",
                          }}>
                          {stage.name}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* 流转日志 */}
                <div className="space-y-0.5" style={{ fontSize: "0.62rem", fontFamily: "monospace" }}>
                  {edict.logs.map((log, i) => (
                    <div key={i} style={{ color: "rgba(201,169,110,0.3)", opacity: 0.4 + (i / edict.logs.length) * 0.6 }}>
                      [{log.time}] {log.stage} {log.msg} {log.honor ? `🏅${log.honor}` : ""}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {edicts.length === 0 && (
          <div className="text-center py-12" style={{ color: "rgba(201,169,110,0.15)" }}>
            <Scroll size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
            <p className="text-sm">暂无敕令</p>
            <p className="text-xs mt-1">点击上方的「发起新敕令」开始三省六部任务流转</p>
          </div>
        )}
      </div>
    </div>
  );
}
