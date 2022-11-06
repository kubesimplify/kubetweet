FROM node:16 AS backend

LABEL MAINTAINER = "<>"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "node" ]

CMD [ "server.js" ]

EXPOSE 5000
