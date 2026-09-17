/*
 * @Module : domains/_shared/ApiError — 家人化错误文案（v5.1 §1.6）
 */
import { ApiError } from "./ApiClient";
import { MEMBERS, type MemberKey } from "@/lib/family/members";

export function familyErrorLine(
  member: MemberKey,
  err: unknown,
): string {
  const m = MEMBERS[member];
  if (err instanceof ApiError) {
    return m.errorLine(`${err.status}`, err.message);
  }
  if (err instanceof Error) {
    return m.errorLine("unknown", err.message);
  }
  return m.errorLine("unknown", "未知异常");
}
