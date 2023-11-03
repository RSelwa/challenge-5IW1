FROM node:18.18-alpine

WORKDIR /home

COPY tsconfig.json ./
COPY package.json ./

RUN yarn 

WORKDIR /home/monorepo
COPY monorepo/package.json ./
RUN yarn

WORKDIR /home/front-client
COPY front-client/package.json ./
RUN yarn



EXPOSE 3000

CMD [ "yarn", "dev:docker" ]