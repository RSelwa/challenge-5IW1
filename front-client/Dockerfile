FROM node:18.18-alpine

WORKDIR /home

COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn 

WORKDIR /home/front-client

COPY front-client/package.json ./
COPY front-client/yarn.lock ./

RUN yarn

EXPOSE 3000

CMD [ "yarn", "dev" ]