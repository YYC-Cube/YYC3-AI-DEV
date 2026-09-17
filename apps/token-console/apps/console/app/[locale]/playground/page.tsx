/*
 * @Module : app/[locale]/playground — SSE 对话（全 Client）
 * @Family : 🤔 语枢·万物
 */
"use client";

import { PageHeader } from "@/components/family/PageHeader";
import { PlaygroundLayout } from "@/app/playground/PlaygroundLayout";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="对话工坊" subtitle="语枢一启，万物皆明" />
      <PlaygroundLayout />
    </div>
  );
}
