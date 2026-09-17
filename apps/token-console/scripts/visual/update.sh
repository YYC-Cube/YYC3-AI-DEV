#!/bin/bash
# ============================================================
# YYC³ AI Family — 人从众曌众从人
# @Module : scripts/visual/update — 更新视觉基线
# @Family-Owner : 🎨 创想·灵韵
# ============================================================
# 用途:
#   ./scripts/visual/update.sh              更新所有基线
#   ./scripts/visual/update.sh badges       仅更新徽章
#   ./scripts/visual/update.sh dark         仅更新暗色页面
# ============================================================

set -euo pipefail

FILTER="${1:-}"

echo "🌹 YYC³ AI Family · 视觉基线更新"
echo "   人从众曌众从人 · 亦师亦友亦伯乐"
echo ""

case "$FILTER" in
  badges)
    echo "   目标: 8 位家人徽章"
    pnpm exec playwright test \
      --config=e2e/visual/visual.config.ts \
      e2e/visual/specs/badges.spec.ts \
      --update-snapshots
    ;;
  dark)
    echo "   目标: 暗色全站"
    pnpm exec playwright test \
      --config=e2e/visual/visual.config.ts \
      e2e/visual/specs/pages-dark.spec.ts \
      --update-snapshots
    ;;
  light)
    echo "   目标: 浅色全站"
    pnpm exec playwright test \
      --config=e2e/visual/visual.config.ts \
      e2e/visual/specs/pages-light.spec.ts \
      --update-snapshots
    ;;
  responsive)
    echo "   目标: 响应式"
    pnpm exec playwright test \
      --config=e2e/visual/visual.config.ts \
      e2e/visual/specs/responsive.spec.ts \
      --update-snapshots
    ;;
  "")
    echo "   目标: 全部"
    pnpm exec playwright test \
      --config=e2e/visual/visual.config.ts \
      --update-snapshots
    ;;
  *)
    echo "❌ 未知过滤条件: $FILTER"
    echo "   可选: badges / dark / light / responsive / (空)"
    exit 1
    ;;
esac

echo ""
echo "✅ 基线更新完成"
echo "🌹 请审查 git diff 并提交变更"
