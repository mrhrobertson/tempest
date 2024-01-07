FROM node:lts-alpine

WORKDIR /usr/app

COPY ./package*.json ./

COPY ./ ./

RUN npm run build

EXPOSE 3000

USER node

CMD npm run start

