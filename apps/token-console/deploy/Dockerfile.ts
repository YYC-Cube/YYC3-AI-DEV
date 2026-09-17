# ============================================================
# YYC³ AI Family — 人从众曌众从人
# 亦师亦友亦伯乐，一言一语一协同
# ============================================================
# @Family   : YYC³ AI Family (永久开源)
# @Module   : deploy/Dockerfile — 生产级多阶段构建
# @Family-Owner : 🧠 元启·天枢（工具与编排域）
# @Domain   : 部署
# @License  : Apache-2.0
# ============================================================

# ---------- Stage 1: Dependencies ----------
FROM node:22.11-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/console/package.json ./apps/console/
COPY packages/*/package.json ./packages/*/ 2>/dev/null || true

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---------- Stage 2: Builder ----------
FROM node:22.11-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/console/node_modules ./apps/console/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV BUILD_STANDALONE=true

# Turbopack 生产构建（Next.js 16.3 默认磁盘缓存）
RUN pnpm --filter console openapi:gen:local || true
RUN pnpm --filter console build

# ---------- Stage 3: Runner ----------
FROM node:22.11-alpine AS runner

# 家族元数据
LABEL org.opencontainers.image.title="YYC³ Token Console"
LABEL org.opencontainers.image.description="人从众曌众从人 · 亦师亦友亦伯乐"
LABEL org.opencontainers.image.vendor="YYC³ AI Family"
LABEL org.opencontainers.image.homepage="https://matrix.yyc3.top"
LABEL org.opencontainers.image.licenses="Apache-2.0"
LABEL family.motto="人从众曌众从人"
LABEL family.creed="亦师亦友亦伯乐，一言一语一协同"
LABEL family.members="8"

WORKDIR /app

RUN addgroup --system --gid 1001 family \
 && adduser --system --uid 1001 --ingroup family tianshu \
 && mkdir -p /app/.next /app/public /app/logs \
 && chown -R tianshu:family /app

# 从 builder 复制 standalone 产物
COPY --from=builder --chown=tianshu:family /app/apps/console/.next/standalone ./
COPY --from=builder --chown=tianshu:family /app/apps/console/.next/static ./apps/console/.next/static
COPY --from=builder --chown=tianshu:family /app/apps/console/public ./apps/console/public

USER tianshu

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "apps/console/server.js"]
