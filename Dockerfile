FROM node:18.17 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18.15 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build:prod

FROM node:18.15 as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
