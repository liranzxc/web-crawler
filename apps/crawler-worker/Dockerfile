FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/local/app

COPY package.json yarn.lock ./
RUN yarn install --production

ARG APP_NAME=crawler-worker
ENV PORT=3001

RUN mkdir -p /usr/local/app/apps/$APP_NAME/src


COPY dist/apps/$APP_NAME ./dist

EXPOSE $PORT

CMD [ "node", "./dist/main.js" ]

