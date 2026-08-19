/**
 * @file: DynastySkills.tsx
 * @description: Dynasty 专属 Skills — 6 项中华文化技能面板
 */
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { DYNASTY_SKILLS } from "../skills";

export default function DynastySkills() {
  const [skills, setSkills] = useState(DYNASTY_SKILLS);

  return (
    <div className="p-6" style={{ background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, rgba(4,8,20,1) 50%)", minHeight: "100vh" }}>
      <div className="text-center mb-8">
        <Sparkles className="w-10 h-10 mx-auto mb-2 text-[#C9A96E]" />
        <h1 className="text-[#C9A96E] text-xl font-bold">中华文化 · 专属 Skills</h1>
        <p className="text-[rgba(201,169,110,0.4)] text-xs mt-1">古文化渊源 · 智能新范式</p>
      </div>

      <div className="space-y-3">
        {skills.map(skill => {
          const Icon = skill.icon;
          return (
            <div key={skill.id}
              className="p-4 rounded-xl transition-all"
              style={{ background: `${skill.color}08`, border: `1px solid ${skill.color}20` }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${skill.color}18` }}>
                  <Icon size={22} style={{ color: skill.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#e0f0ff] text-lg font-medium">{skill.name}</span>
                    <span className="text-xs italic" style={{ color: skill.color }}>{skill.tagline}</span>
                    <span className="px-1.5 py-0.5 rounded text-xs"
                      style={{ background: `${skill.color}12`, color: skill.color }}>
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-[rgba(201,169,110,0.5)] text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                <button
                  onClick={() => setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, active: !s.active } : s))}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    skill.active
                      ? "text-[#00FF88] border border-[#00FF88] bg-[rgba(0,255,136,0.06)]"
                      : "text-[rgba(201,169,110,0.3)] border border-[rgba(201,169,110,0.15)]"
                  }`}>
                  {skill.active ? "已启用" : "未启用"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl text-center" style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.08)" }}>
        <p className="text-[rgba(201,169,110,0.4)] text-sm">
          {skills.filter(s => s.active).length}/{skills.length} 项技能 ·
          AI Family + Dynasty 双架构 Agent 体系协同驱动
        </p>
      </div>
    </div>
  );
}
