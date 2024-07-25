FROM node:20.15.1-alpine3.20

RUN mkdir /app

RUN chown -R node /app 

WORKDIR /app

COPY ./package*.json ./

COPY ./ ./

RUN npm install

EXPOSE 3000

USER node

CMD npm run build && npm run start

