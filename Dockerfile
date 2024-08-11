FROM node:alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app ./

RUN addgroup -S nodejs -g 1001
RUN adduser -S nextjs -u 1001 -G nodejs

USER nextjs

CMD ["yarn", "start"]
