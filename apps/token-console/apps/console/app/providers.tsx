/*
 * @Module : app/providers — 全局 Provider（含 MSW 启动）
 */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      import("@/mocks/browser").then(({ worker }) =>
        worker.start({ onUnhandledRequest: "bypass" }),
      );
    }
  }, []);

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
