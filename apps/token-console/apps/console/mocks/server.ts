/*
 * @Module : mocks/server — MSW Node 端（vitest 使用）
 */
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
