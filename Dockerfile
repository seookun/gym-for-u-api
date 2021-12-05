FROM node:17

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c"]
