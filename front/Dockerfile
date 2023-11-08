FROM node:18.18-alpine

WORKDIR /home/app

COPY package.json ./

RUN yarn

EXPOSE 3000

CMD [ "yarn", "dev:docker" ]