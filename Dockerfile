FROM node:17

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT [ "/bin/sh", "-c", "./docker-entrypoint.sh" ]
