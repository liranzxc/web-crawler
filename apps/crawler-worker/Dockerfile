FROM node:16-alpine3.15

RUN apk add --no-cache \
    msttcorefonts-installer font-noto fontconfig \
    freetype ttf-dejavu ttf-droid ttf-freefont ttf-liberation \
    chromium \
  && rm -rf /var/cache/apk/* /tmp/*

RUN update-ms-fonts \
    && fc-cache -f

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

RUN addgroup pptruser \
    && adduser pptruser -D -G pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

COPY package.json yarn.lock ./

RUN yarn install --production

ARG APP_NAME=crawler-worker
ENV PORT=3001

RUN mkdir -p /app/apps/$APP_NAME/src

COPY dist/apps/$APP_NAME ./dist

EXPOSE $PORT

CMD [ "node", "./dist/main.js" ]

