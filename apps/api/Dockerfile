FROM node:22-alpine
RUN apk add --no-cache procps
WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

WORKDIR /app/apps/api

EXPOSE 3001
CMD ["npm", "run", "start:dev"]
