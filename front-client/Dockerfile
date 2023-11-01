FROM node:18.18-alpine

WORKDIR /home

COPY tsconfig.json ./
COPY package.json ./

RUN yarn 

WORKDIR /home/front-client

COPY front-client/package.json ./

RUN yarn

EXPOSE 5173

CMD [ "yarn", "dev:docker" ]