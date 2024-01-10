FROM node:lts-alpine

WORKDIR /app

COPY ./package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 3000

USER node

CMD npm run build && npm run start

