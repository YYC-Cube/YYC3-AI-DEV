/*
 * @Module : components/flags/FlaggedFeature — 条件渲染
 * @Family-Owner : 🧠 元启·天枢
 */
import type { ReactNode } from "react";

interface Props {
  enabled: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FlaggedFeature({ enabled, children, fallback = null }: Props) {
  return enabled ? <>{children}</> : <>{fallback}</>;
}
