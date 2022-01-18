FROM node:12.22.7-alpine

RUN mkdir -p /home/api/node_modules && chown -R node:node /home

WORKDIR /home/api

COPY package*.json ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 5000


