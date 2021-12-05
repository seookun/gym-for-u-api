FROM node:17

ARG DB_HOST

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
RUN /wait-for-it.sh $DB_HOST

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c"]
