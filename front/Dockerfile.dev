FROM node:18.18-alpine

WORKDIR /home

COPY tsconfig.json package.json yarn.lock* ./

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev:docker" ]