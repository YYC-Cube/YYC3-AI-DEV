/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Module : tests/contract/setup — 契约测试环境
 * @Family-Owner : 📚 格物·宗师
 * ============================================================
 */
import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "../../mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
