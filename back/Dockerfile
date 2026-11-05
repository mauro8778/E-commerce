# ==========================================
# Multi-stage Dockerfile para NestJS API
# ==========================================

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de Producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3006

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/seeder.json ./dist/seeder.json

USER node

EXPOSE 3006

CMD ["node", "dist/main.js"]
