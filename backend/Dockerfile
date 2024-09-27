FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g nodemon

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g nodemon

EXPOSE 5000

CMD npm run dev
