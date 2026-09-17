#!/bin/bash
# ============================================================
# YYC³ AI Family — 人从众曌众从人
# @Module : tests/load/k6/build.sh — xk6 + SSE 扩展编译
# @Family-Owner : 🤔 语枢·万物（推理对话域）
# ============================================================
# k6 默认不支持 SSE，必须用 xk6-sse 扩展编译
# ============================================================

set -euo pipefail

K6_VERSION="v0.54.0"
SSE_EXT="github.com/phymbert/xk6-sse"

echo "🌹 编译 xk6 + SSE 扩展"
echo "   k6: $K6_VERSION"
echo "   扩展: $SSE_EXT"

# 安装 xk6（Go 工具链需 ≥1.22）
if ! command -v xk6 &> /dev/null; then
  go install go.k6.io/xk6/cmd/xk6@latest
fi

# 编译带 SSE 扩展的 k6
xk6 build \
  --with "$SSE_EXT" \
  --output ./k6-sse \
  "$K6_VERSION"

echo "✅ 编译完成: ./k6-sse"
./k6-sse version
