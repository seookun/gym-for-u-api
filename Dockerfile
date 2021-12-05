FROM node:17

ARG NODE_ENV

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c", "node_modules/.bin/cross-env NODE_ENV=$NODE_ENV node dist/index.js"]
