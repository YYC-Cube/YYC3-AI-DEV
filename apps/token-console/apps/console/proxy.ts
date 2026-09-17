/*
 * ============================================================
 * YYC3 AI Family — 人从众曌众从人
 * @Module : apps/console/proxy.ts
 * @Family : YYC3 AI Family (永久开源)
 * @License : Apache-2.0
 * ============================================================
 * Next.js 16 proxy（原 middleware）— 每请求入口
 * 职责：i18n locale 路由 + X-Family 归因透传 + 灰度 Cookie 注入
 * 家人归属：🧭 言启·千行（路由域）
 */
import { NextResponse, type NextRequest } from "next/server";

/** 不需要处理的路径 */
const SKIP = [/_next\/static/, /_next\/image/, /favicon\.ico/, /^\/icons\//, /^\/manifest\.webmanifest$/, /^\/sw\.js$/];

/** 灰度特性 Cookie 名（19-灰度发布与特性开关.md） */
const FLAG_COOKIE = "yyc3-flags";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静态资源直通
  if (SKIP.some((re) => re.test(pathname))) {
    return NextResponse.next();
  }

  const headers = new Headers(request.headers);
  // 透传家人归因（若上游已带 X-Family 则保留）
  if (!headers.has("X-Family")) {
    headers.set("X-Family", "console");
  }
  // 请求 ID（观测关联）
  headers.set("X-Request-Id", crypto.randomUUID());

  const res = NextResponse.next({ request: { headers } });

  // 灰度 Cookie 缺省注入（无 cookie 时视为控制组）
  if (!request.cookies.has(FLAG_COOKIE)) {
    res.cookies.set(FLAG_COOKIE, "control", { path: "/", maxAge: 86400, sameSite: "lax" });
  }

  return res;
}

export const config = {
  matcher: ["/((?!api/health).*)"],
};
