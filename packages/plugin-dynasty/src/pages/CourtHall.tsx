/**
 * @file: CourtHall.tsx
 * @description: 朝堂 — 三省六部中央看板 · Dynasty 核心页面
 */
import React from "react";
import { Crown, Activity, Sparkles } from "lucide-react";
import { DYNASTY_AGENTS } from "../agents";
import { DYNASTY_HONORS } from "../honors";
import { EDICT_STAGES } from "../edict-protocol";

export default function CourtHall() {
  const levels = ["决策", "承启", "三省", "六部", "辅助"];

  return (
    <div className="p-6 space-y-8" style={{ background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, rgba(4,8,20,1) 50%)", minHeight: "100vh" }}>
      {/* 标题 */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #C9A96E, #8B6914)" }}>
          <Crown className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-[#C9A96E] text-2xl font-bold tracking-widest">朝 堂</h1>
        <p className="text-[rgba(201,169,110,0.4)] text-sm mt-1">三省以治 · 六部以行</p>
      </div>

      {/* Agent 层级展示 */}
      {levels.map(level => {
        const agents = DYNASTY_AGENTS.filter(a => a.dynastyLevel === level);
        if (agents.length === 0) return null;
        return (
          <div key={level}>
            <h3 className="text-[rgba(201,169,110,0.5)] mb-3 flex items-center gap-2" style={{ fontSize: "0.75rem" }}>
              <Activity className="w-3.5 h-3.5" /> {level}层
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {agents.map(agent => {
                const Icon = agent.icon;
                return (
                  <div key={agent.id}
                    className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: `${agent.color}08`, border: `1px solid ${agent.color}20` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${agent.color}18` }}>
                        <Icon size={20} style={{ color: agent.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#e0f0ff]" style={{ fontSize: "0.85rem" }}>{agent.name}</span>
                          <span style={{ color: agent.color, fontSize: "0.55rem" }}>{agent.title}</span>
                        </div>
                        <p className="text-[rgba(201,169,110,0.3)]" style={{ fontSize: "0.62rem" }}>{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.expertise.map(e => (
                        <span key={e} className="px-1.5 py-0.5 rounded" style={{ background: `${agent.color}10`, color: agent.color, fontSize: "0.55rem" }}>{e}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 任务流转 */}
      <div>
        <h3 className="text-[rgba(201,169,110,0.5)] mb-3 flex items-center gap-2" style={{ fontSize: "0.75rem" }}>
          <Sparkles className="w-3.5 h-3.5" /> 六阶段任务流转
        </h3>
        <div className="flex flex-wrap gap-2">
          {EDICT_STAGES.map((stage, i) => (
            <div key={stage.key} className="flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg text-center" style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
                <span className="text-[#C9A96E]" style={{ fontSize: "0.7rem" }}>{stage.name}</span>
                <p className="text-[rgba(201,169,110,0.25)]" style={{ fontSize: "0.5rem" }}>{stage.desc}</p>
              </div>
              {i < EDICT_STAGES.length - 1 && (
                <span className="text-[rgba(201,169,110,0.2)]">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 勋章统计 */}
      <div className="p-4 rounded-xl" style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.1)" }}>
        <h3 className="text-[rgba(201,169,110,0.5)] mb-2" style={{ fontSize: "0.75rem" }}>勋章概览</h3>
        <div className="flex gap-4">
          {[6,5,4,3,2,1].map(star => {
            const count = DYNASTY_HONORS.filter(h => h.star === star).length;
            return (
              <div key={star} className="text-center">
                <span className="text-[#C9A96E]" style={{ fontSize: "1rem" }}>{"★".repeat(star)}</span>
                <p className="text-[rgba(201,169,110,0.3)]" style={{ fontSize: "0.55rem" }}>{count} 种</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
