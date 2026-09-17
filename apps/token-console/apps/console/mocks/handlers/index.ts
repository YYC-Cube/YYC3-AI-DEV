/*
 * @Module : mocks/handlers — 全部家人域 handler 汇总
 */
import { guardianHandlers } from "./guardian";
import { qianhangHandlers } from "./qianhang";
import { boleHandlers } from "./bole";
import { wanyuHandlers } from "./wanyu";
import { zongshiHandlers } from "./zongshi";
import { tianshuHandlers } from "./tianshu";
import { xianzhiHandlers } from "./xianzhi";
import { lingyunHandlers } from "./lingyun";

export const handlers = [
  ...guardianHandlers,  // 🛡️
  ...qianhangHandlers,  // 🧭
  ...boleHandlers,      // 🎯
  ...wanyuHandlers,     // 🤔
  ...zongshiHandlers,   // 📚
  ...tianshuHandlers,   // 🧠
  ...xianzhiHandlers,   // 🔮
  ...lingyunHandlers,   // 🎨
];
