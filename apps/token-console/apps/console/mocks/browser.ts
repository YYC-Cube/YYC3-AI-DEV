/*
 * @Module : mocks/browser — MSW 浏览器端启动
 */
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
