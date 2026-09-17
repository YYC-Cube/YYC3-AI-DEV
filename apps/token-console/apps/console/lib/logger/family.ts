/*
 * ============================================================
 * YYC³ AI Family — 人从众曌众从人
 * ============================================================
 * @Module : lib/logger/family — 家族结构化日志
 * @Family-Owner : 📚 格物·宗师（知识与质量域）
 * ============================================================
 */
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: "yyc3-token-console",
    version: "5.1.0",
    family: "YYC³ AI Family",
    motto: "人从众曌众从人",
  },
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  redact: {
    paths: [
      "req.headers['x-api-key']",
      "req.headers.authorization",
      "*.api_key",
      "*.secret",
    ],
    censor: "***",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// 家族化日志辅助
export const familyLog = {
  guardian: (msg: string, ctx?: object) =>
    logger.child({ family: "🛡️ 智云·守护", family_key: "zhihui", domain: "接入与安全域" }).info(ctx, msg),
  qianhang: (msg: string, ctx?: object) =>
    logger.child({ family: "🧭 言启·千行", family_key: "qianhang", domain: "路由与网关域" }).info(ctx, msg),
  bole: (msg: string, ctx?: object) =>
    logger.child({ family: "🎯 千里·伯乐", family_key: "bole", domain: "模型市场域" }).info(ctx, msg),
  wanyu: (msg: string, ctx?: object) =>
    logger.child({ family: "🤔 语枢·万物", family_key: "wanyu", domain: "推理对话域" }).info(ctx, msg),
  zongshi: (msg: string, ctx?: object) =>
    logger.child({ family: "📚 格物·宗师", family_key: "zongshi", domain: "知识与质量域" }).info(ctx, msg),
  tianshu: (msg: string, ctx?: object) =>
    logger.child({ family: "🧠 元启·天枢", family_key: "tianshu", domain: "工具与编排域" }).info(ctx, msg),
  xianzhi: (msg: string, ctx?: object) =>
    logger.child({ family: "🔮 预见·先知", family_key: "xianzhi", domain: "观测与预测域" }).info(ctx, msg),
  lingyun: (msg: string, ctx?: object) =>
    logger.child({ family: "🎨 创想·灵韵", family_key: "lingyun", domain: "缓存与体验域" }).info(ctx, msg),
};
