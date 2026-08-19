/**
 * @file: HonorWall.tsx
 * @description: 勋章墙 — 17 种中华文化勋章展示
 */
import React from "react";
import { Award } from "lucide-react";
import { DYNASTY_HONORS, DynastyHonor } from "../honors";

const categoryLabels: Record<string, string> = {
  "角色": "角色", "成就": "成就", "协作": "协作", "安全": "安全", "效率": "效率",
};

export default function HonorWall() {
  const categories = [...new Set(DYNASTY_HONORS.map(h => h.category))];

  return (
    <div className="p-6" style={{ background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, rgba(4,8,20,1) 50%)", minHeight: "100vh" }}>
      <div className="text-center mb-8">
        <Award className="w-10 h-10 mx-auto mb-2 text-[#C9A96E]" />
        <h1 className="text-[#C9A96E] text-xl font-bold">勋 章 墙</h1>
        <p className="text-[rgba(201,169,110,0.4)] text-xs mt-1">{DYNASTY_HONORS.length} 种 · 1-6 星</p>
      </div>

      {categories.map(cat => {
        const honors = DYNASTY_HONORS.filter(h => h.category === cat);
        return (
          <div key={cat} className="mb-6">
            <h3 className="text-[rgba(201,169,110,0.5)] mb-3 text-sm">/ {categoryLabels[cat] ?? cat}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {honors.map(h => {
                const Icon = h.icon;
                return (
                  <div key={h.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.08)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(201,169,110,0.1)" }}>
                      <Icon size={20} style={{ color: "#C9A96E" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#e0f0ff] font-medium" style={{ fontSize: "0.85rem" }}>{h.name}</span>
                        <span className="text-[#C9A96E]" style={{ fontSize: "0.55rem" }}>
                          {"★".repeat(h.star)}
                        </span>
                      </div>
                      <p className="text-[rgba(201,169,110,0.4)]" style={{ fontSize: "0.65rem" }}>{h.desc}</p>
                      <p className="text-[rgba(201,169,110,0.2)]" style={{ fontSize: "0.55rem" }}>条件: {h.condition}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
