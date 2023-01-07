FROM node:18-slim

WORKDIR /usr/src/app

ENV PORT 3000
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

CMD npm start