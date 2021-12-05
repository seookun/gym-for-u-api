FROM node:17

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c"]
