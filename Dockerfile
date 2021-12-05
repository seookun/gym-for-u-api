FROM node:17

ARG NODE_ENV

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
RUN npm run build && cross-env NODE_ENV=${NODE_ENV} node dist/index.js
