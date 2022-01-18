FROM node:12.22.7-alpine

RUN mkdir -p /home/web/node_modules && chown -R node:node /home

WORKDIR /home/web/

COPY package*.json ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 3000


