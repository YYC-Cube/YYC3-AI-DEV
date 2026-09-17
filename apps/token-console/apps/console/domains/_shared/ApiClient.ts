/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * @Module : domains/_shared/ApiClient
 * @Family : YYC³ AI Family (共享)
 * ============================================================
 */
import { FAMILY_REQUEST_HEADERS } from "@/lib/family/headers";

const API_BASE = "https://api.0379.world";

export interface ApiCallOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public errorType: "network" | "api" | "timeout" | "validation",
    message: string,
    public context?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("yyc3_api_key") ??
    localStorage.getItem("yyc3_api_key")
  );
}

export async function apiCall<T>(
  path: string,
  options: ApiCallOptions = {},
): Promise<T> {
  const { params, ...rest } = options;
  const url = new URL(path, API_BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }

  const key = getApiKey();
  const response = await fetch(url.toString(), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(key ? { "X-API-Key": key } : {}),
      ...FAMILY_REQUEST_HEADERS,
      ...rest.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body?.detail ?? {};
    throw new ApiError(
      response.status,
      detail.error ?? "api",
      detail.message ?? `HTTP ${response.status}`,
      detail.context,
    );
  }

  return response.json();
}
