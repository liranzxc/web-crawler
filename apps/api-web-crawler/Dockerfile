FROM node:18-alpine

WORKDIR /usr/local/app

COPY package.json yarn.lock ./
RUN yarn install --production

ARG APP_NAME=api-web-crawler
ENV PORT=3000

RUN mkdir -p /usr/local/app/apps/$APP_NAME/src


COPY dist/apps/$APP_NAME ./dist

EXPOSE $PORT

CMD [ "node", "./dist/main.js" ]

