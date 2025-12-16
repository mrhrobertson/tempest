FROM node:lts-trixie-slim

RUN mkdir /app

WORKDIR /app

COPY ./package*.json ./

COPY ./ ./

RUN chown -R node /app 

RUN npm install

EXPOSE 3000

USER node

CMD npm run build && npm run start

