FROM node:16 AS frontend

LABEL MAINTAINER = "<>"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "start" ]

EXPOSE 3000
