/**
 * @file: DynastyTimeline.tsx
 * @description: 十三王朝时间轴 — 中华文明脉络可视化 + Skills 分类
 */
import React, { useState } from "react";
import { THIRTEEN_DYNASTIES, DYNASTY_SKILL_MAP, DYNASTY_CATEGORIES, getSkillsForDynasty, getSkillsByCategory, type Dynasty, type DynastySkillMap } from "../dynasties";
import { BookOpen, Sparkles } from "lucide-react";

export default function DynastyTimeline() {
  const [selectedDynasty, setSelectedDynasty] = useState<string>("tang");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeSkillSet, setActiveSkillSet] = useState<Set<string>>(new Set(DYNASTY_SKILL_MAP.map(s => s.skillName)));

  const dynastySkills = selectedDynasty ? getSkillsForDynasty(selectedDynasty) : [];
  const filteredByCat = categoryFilter === "all"
    ? dynastySkills
    : dynastySkills.filter(s => s.category === categoryFilter);

  const currentDynasty = THIRTEEN_DYNASTIES.find(d => d.id === selectedDynasty);

  return (
    <div className="p-6" style={{ background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, rgba(4,8,20,1) 50%)", minHeight: "100vh" }}>
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-[#C9A96E] text-2xl font-bold tracking-widest">十三王朝</h1>
        <p className="text-[rgba(201,169,110,0.5)] text-sm mt-1 italic">中华文明五千年 · 智能新范式</p>
      </div>

      {/* 朝代选择器 — 横向时间轴 */}
      <div className="flex items-center gap-1 justify-center flex-wrap mb-8">
        {THIRTEEN_DYNASTIES.map((d, i) => {
          const Icon = d.icon;
          const isSelected = selectedDynasty === d.id;
          const skillCount = getSkillsForDynasty(d.id).length;
          return (
            <button key={d.id} onClick={() => setSelectedDynasty(d.id)}
              className="flex flex-col items-center gap-1 shrink-0 transition-all p-1.5 rounded-xl"
              style={{
                background: isSelected ? `${d.color}18` : "transparent",
                border: `1.5px solid ${isSelected ? d.color : "transparent"}`,
                minWidth: "64px",
              }}>
              <Icon size={20} style={{ color: isSelected ? d.color : `${d.color}66` }} />
              <span style={{ fontSize: "0.7rem", color: isSelected ? d.color : `${d.color}55`, fontWeight: isSelected ? 600 : 400 }}>
                {d.name}
              </span>
              <span style={{ fontSize: "0.45rem", color: `${d.color}33` }}>
                {i > 0 && THIRTEEN_DYNASTIES[i - 1].name !== d.name ? d.period.split("–")[0] : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* 当前朝代详情 */}
      {currentDynasty && (
        <div className="p-5 rounded-xl mb-6 text-center"
          style={{ background: `${currentDynasty.color}08`, border: `1px solid ${currentDynasty.color}20` }}>
          <h2 className="text-[#e0f0ff] text-xl font-bold"
            style={{ color: currentDynasty.color }}>
            {currentDynasty.name} 朝
          </h2>
          <p className="text-[rgba(201,169,110,0.5)] text-sm mt-1">{currentDynasty.period}</p>
          <p className="text-[rgba(201,169,110,0.4)] text-xs mt-1">都 {currentDynasty.capital} · {currentDynasty.culturalPeak}</p>
        </div>
      )}

      {/* 类别筛选 */}
      <div className="flex flex-wrap gap-1 mb-4 justify-center">
        {[{ id: "all", name: "全部", icon: Sparkles, color: "#C9A96E" } as any, ...DYNASTY_CATEGORIES].map(cat => {
          return (
            <button key={cat.id} onClick={() => setCategoryFilter(cat.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs"
              style={{
                background: categoryFilter === cat.id ? `${cat.color}18` : "transparent",
                border: `1px solid ${categoryFilter === cat.id ? cat.color : "rgba(201,169,110,0.1)"}`,
                color: categoryFilter === cat.id ? cat.color : "rgba(201,169,110,0.4)",
              }}>
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills 列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredByCat.map(skill => {
          const Icon = skill.icon;
          const isActive = activeSkillSet.has(skill.skillName);
          return (
            <div key={skill.skillName}
              className="p-3 rounded-xl flex items-start gap-3 transition-all"
              style={{ background: `${currentDynasty?.color ?? "#C9A96E"}06`, border: `1px solid ${isActive ? (currentDynasty?.color ?? "#C9A96E") : "rgba(201,169,110,0.08)"}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${currentDynasty?.color ?? "#C9A96E"}12` }}>
                <Icon size={18} style={{ color: currentDynasty?.color ?? "#C9A96E" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#e0f0ff] font-medium" style={{ fontSize: "0.85rem" }}>
                    {skill.skillName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-xs"
                    style={{ background: "rgba(201,169,110,0.06)", color: "rgba(201,169,110,0.5)" }}>
                    {skill.category}
                  </span>
                </div>
                <p className="text-[rgba(201,169,110,0.4)] text-sm mt-0.5">{skill.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skill.keywords.map(kw => (
                    <span key={kw} className="px-1.5 py-0.5 rounded text-xs"
                      style={{ background: `${currentDynasty?.color ?? "#C9A96E"}08`, color: `${currentDynasty?.color ?? "#C9A96E"}66` }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setActiveSkillSet(prev => {
                  const next = new Set(prev);
                  if (next.has(skill.skillName)) next.delete(skill.skillName);
                  else next.add(skill.skillName);
                  return next;
                })}
                className="shrink-0 px-3 py-1 rounded-lg text-xs"
                style={{
                  background: isActive ? `${currentDynasty?.color ?? "#C9A96E"}12` : "transparent",
                  border: `1px solid ${isActive ? (currentDynasty?.color ?? "#C9A96E") : "rgba(201,169,110,0.1)"}`,
                  color: isActive ? currentDynasty?.color ?? "#C9A96E" : "rgba(201,169,110,0.3)",
                }}>
                {isActive ? "活跃" : "启用"}
              </button>
            </div>
          );
        })}
      </div>

      {/* 底部统计 */}
      <div className="mt-6 p-4 rounded-xl text-center" style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.08)" }}>
        <BookOpen className="w-4 h-4 mx-auto mb-1" style={{ color: "rgba(201,169,110,0.4)" }} />
        <p className="text-[rgba(201,169,110,0.4)] text-sm">
          {activeSkillSet.size}/{DYNASTY_SKILL_MAP.length} 项技能活跃 ·
          十三王朝 × 九大类别
        </p>
      </div>
    </div>
  );
}
