/**
 * @file: api/types/vercel.d.ts
 * @description: @vercel/node 最小类型声明（ambient）
 *
 * 背景: Vercel Serverless 运行时自带 @vercel/node 实现，npm 包仅用于本地
 * 类型检查。该包 v5 传递链曾引入 23 条审计漏洞（undici/tar/brace-expansion
 * 等），故移除依赖、以本地声明替代。若未来需要完整类型，可执行
 * `pnpm add -D @vercel/node` 后删除本文件。
 *
 * 注意: 本文件必须保持"无顶层 import/export"的脚本形态，
 * 否则 declare module 会退化为模块增强（augmentation）而失效。
 */
declare module "@vercel/node" {
  export interface VercelRequestQuery {
    [key: string]: string | string[] | undefined;
  }

  export interface VercelRequestCookies {
    [key: string]: string | undefined;
  }

  export interface VercelRequest {
    method: string;
    query: VercelRequestQuery;
    cookies: VercelRequestCookies;
    body: unknown;
    headers: Record<string, string | string[] | undefined>;
    env: Record<string, string | undefined>;
  }

  export interface VercelResponse {
    headersSent: boolean;
    status(statusCode: number): VercelResponse;
    json(jsonBody: unknown): VercelResponse;
    send(body: unknown): VercelResponse;
    redirect(url: string): VercelResponse;
    setHeader(name: string, value: number | string | readonly string[]): VercelResponse;
    write(chunk: string | Uint8Array): boolean;
    end(chunk?: string | Uint8Array): VercelResponse;
  }
}
